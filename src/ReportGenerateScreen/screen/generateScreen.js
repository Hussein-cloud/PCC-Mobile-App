import React, { useState, useEffect } from "react";
import { ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { firestore } from "../../Backend/DatabaseConnection/DataBaseAuth";
import { formatTimestamp } from "../../SearchScreen/utils/utils";
import CustomerInfo from "../components/CustomerInfo";
import AgendaDetails from "../components/AgendaDetails";
import MaterialsUsed from "../components/MaterialsUsed";
import AssigneeInfo from "../components/AssigneeInfo";
import TechnicianComments from "../components/TechnicianComments";
import SaveButton from "../components/SaveButton";
import styles from "../style/styles";

const AgendaFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const agenda = route.params || {};

  // State for form fields
  const [inspectionFee, setInspectionFee] = useState("");
  const [treatmentFee, setTreatmentFee] = useState("");
  const [materialsUsedFee, setMaterialsUsedFee] = useState("");
  const [labourCost, setLabourCost] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [usedMaterials, setUsedMaterials] = useState("");
  const [comment, setComment] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  // State for managing input field editability
  const [isEditable, setIsEditable] = useState({
    costSection: false,
    materialsSection: false,
    commentSection: false,
  });
  const [recordExists, setRecordExists] = useState(false);

  useEffect(() => {
    // Calculate the total cost whenever cost inputs change
    const inspectionFeeNum = Number(inspectionFee) || 0;
    const treatmentFeeNum = Number(treatmentFee) || 0;
    const materialsUsedFeeNum = Number(materialsUsedFee) || 0;
    const labourCostNum = Number(labourCost) || 0;

    setTotalCost(
      inspectionFeeNum + treatmentFeeNum + materialsUsedFeeNum + labourCostNum
    );
  }, [inspectionFee, treatmentFee, materialsUsedFee, labourCost]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "RecordTable", agenda.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setInspectionFee(data.inspectionFee.toString());
          setTreatmentFee(data.treatmentFee.toString());
          setMaterialsUsedFee(data.materialsUsedFee.toString());
          setLabourCost(data.labourCost.toString());
          setUsedMaterials(data.usedMaterials);
          setComment(data.comment);
          setInvoiceNumber(data.invoiceNumber);
          setRecordExists(true); // Record exists in the database
          setIsEditable({
            costSection: false,
            materialsSection: false,
            commentSection: false,
          });
        } else {
          // Generate a unique invoice number if no record exists
          const querySnapshot = await getDocs(collection(firestore, "RecordTable"));
          let newInvoiceNumber = 1;

          querySnapshot.forEach((doc) => {
            const data = doc.data();
           
       
          });

          // Format invoice number to be at least 4 digits long
          const formattedInvoiceNumber = `#${newInvoiceNumber.toString().padStart(4, '0')}`;
          setInvoiceNumber(formattedInvoiceNumber);
          setRecordExists(false); // No record in the database
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data from database.");
      }
    };

    fetchData();
  }, [agenda.id]);

  const handleSave = async () => {
    if (totalCost <= 0) {
      Alert.alert("Validation Error", "Total cost must be greater than 0.");
      return;
    }
    if (!usedMaterials.trim()) {
      Alert.alert("Validation Error", "Materials used cannot be empty.");
      return;
    }
    if (
      !inspectionFee.trim() ||
      !treatmentFee.trim() ||
      !materialsUsedFee.trim() ||
      !labourCost.trim()
    ) {
      Alert.alert("Validation Error", "All cost breakdown fields must be filled.");
      return;
    }

    try {
      const agendaId = agenda.id || new Date().getTime().toString();

      const searchableText = [
        agenda.customer || "",
        agenda.address || "",
        agenda.phoneNumber || "",
        agenda.agenda || "",
        agenda.assignee || "",
        invoiceNumber || "",
      ].join(" ").toUpperCase();

      const recordData = {
        inspectionFee: Number(inspectionFee),
        treatmentFee: Number(treatmentFee),
        materialsUsedFee: Number(materialsUsedFee),
        labourCost: Number(labourCost),
        totalCost,
        usedMaterials,
        comment,
        invoiceNumber,
        customer: agenda.customer,
        address: agenda.address,
        phoneNumber: agenda.phoneNumber,
        agendaType: agenda.agendaType,
        assignee: agenda.assignee,
        searchableText,
        date: formatTimestamp(agenda.date),
        id: route.params.id,
      };
      route.params = recordData;

      await setDoc(doc(firestore, "RecordTable", agendaId), recordData);

      Alert.alert("Success", "Record saved successfully!", [
        {
          text: "Go to generate pdf",
          onPress: () => navigation.navigate("Generate a PDF File", { ...route.params }),
        },
      ]);
    } catch (error) {
      console.error("Error saving record:", error);
      Alert.alert("Error", "Failed to save record.");
    }
  };

  const toggleEdit = (section) => {
    setIsEditable((prevState) => ({ ...prevState, [section]: !prevState[section] }));
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <CustomerInfo
        customer={agenda.customer}
        address={agenda.address}
        phoneNumber={agenda.phoneNumber}
      />
      <AgendaDetails
        agendaType={agenda.agendaType}
        inspectionFee={inspectionFee}
        setInspectionFee={setInspectionFee}
        treatmentFee={treatmentFee}
        setTreatmentFee={setTreatmentFee}
        materialsUsedFee={materialsUsedFee}
        setMaterialsUsedFee={setMaterialsUsedFee}
        labourCost={labourCost}
        setLabourCost={setLabourCost}
        totalCost={totalCost}
        isEditable={isEditable}
        recordExists={recordExists}
        toggleEdit={toggleEdit}
      />
      <MaterialsUsed
        usedMaterials={usedMaterials}
        setUsedMaterials={setUsedMaterials}
        isEditable={isEditable}
        recordExists={recordExists}
        toggleEdit={toggleEdit}
      />
      <AssigneeInfo
        assignee={agenda.assignee}
        date={formatTimestamp(agenda.date)}
      />
      <TechnicianComments
        assignee={agenda.assignee}
        comment={comment}
        setComment={setComment}
        isEditable={isEditable}
        recordExists={recordExists}
        toggleEdit={toggleEdit}
      />
      <SaveButton handleSave={handleSave} />
    </ScrollView>
  );
};

export default AgendaFormScreen;
