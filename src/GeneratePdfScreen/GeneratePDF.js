import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import styles from "../ReportGenerateScreen/style/styles";
import { firestore } from "../Backend/DatabaseConnection/DataBaseAuth";
import { collection, getDocs } from "firebase/firestore";
import { Asset } from 'expo-asset';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { checkIsAdmin } from '../Backend/DatabaseConnection/verifyAdmin'; // Adjust path accordingly

const AgendaReportScreen = () => {
  const route = useRoute(); // Access route to get params
  const { id } = route.params;
  const [records, setRecords] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  // Fetch records whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchRecords = async () => {
        try {
          const querySnapshot = await getDocs(collection(firestore, "RecordTable"));
          const fetchedRecords = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const filteredRecords = fetchedRecords.filter(record => record.id === id);
          setRecords(filteredRecords);
        } catch (error) {
          console.error("Error fetching records:", error);
          Alert.alert("Error", "Failed to fetch records from the database.");
        }
      };

      fetchRecords();
    }, [id])
  );

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await checkIsAdmin();
      setIsAdmin(adminStatus);
    };

    checkAdminStatus();
  }, []);

  const generatePDF = async () => {
    // Read the image file as base64
    const logoAsset = Asset.fromModule(require('../SignInScreen/assets/logo.png'));
    const logoUri = logoAsset.uri;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #fffff; /* Light grey background for a modern touch */
        }
        .container {
          max-width: 850px;
          margin: 30px auto; /* Centering the container */
          padding: 20px;
          background-color: #ffffff; /* White background for the content */
          border-radius: 12px; /* More rounded corners for a modern look */
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 4px solid #d32f2f;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .header-left img {
          width: 120px; /* Consistent logo size */
          margin-right: 20px;
        }
        .header-left h2 {
          color: #d32f2f;
          margin: 0;
          font-size: 22px; /* Slightly larger for emphasis */
        }
        .header-left p {
          margin: 2px 0;
          font-size: 12px;
          color: #666; /* Subtle grey for less emphasis */
        }
        .header-right {
          text-align: right;
          font-size: 12px;
          color: #666;
          max-width: 250px; /* Limited width for better alignment */
        }
        .title {
          font-size: 20px; /* Larger title for prominence */
          font-weight: bold;
          margin: 20px 0 10px;
          color: #333; /* Darker color for readability */
        }
        .section {
          margin-bottom: 20px;
        }
        .text {
          font-size: 14px;
          margin-bottom: 8px; /* Increased spacing for readability */
        }
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th, .table td {
  border: 1px solid #f0f0f0;
  padding: 12px;
  font-size: 14px;
  text-align: right; /* Align all cells to the right */
}

.table th:first-child, 
.table td:first-child {
  text-align: left; /* Align the first column to the left */
}

           .table2 {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .comment {
          color: #666;
          font-style: italic;
        }
        .table-right {
        text-align:left;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-top: 20px;
        }
        .footer a {
          color: #d32f2f; /* Matching link color with header */
          text-decoration: none;
          font-weight: bold; /* Emphasize the link */
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <img src="${logoUri}" alt="Logo" />
            <div>
              <h2>Pest Control Center Inc.</h2>
              <p>1826 Robertson Rd</p>
              <p>Unit 16, Suite 332, Nepean, ON K2H 1B9 Canada</p>
              <p>welcome@pestcontrolcenter.ca | 613-227-7175</p>
              <p>GST/HST: 717863682RT0001</p>
            </div>
          </div>
          ${records.map(record => `
          <div class="header-right">
            <p><strong>Invoice #</strong> ${record.invoiceNumber}</p>
            <p><strong>Issue Date:</strong> 01-01-2023</p>
            <p><strong>Due Date:</strong> 01-02-2023</p>
          </div>
        </div>
        
          <div class="section">
            <div class="title">Customer</div>
            <p class="text"><strong>Customer Name:</strong> ${record.customer}</p>
            <p class="text"><strong>Address:</strong> ${record.address}</p>
            <p class="text"><strong>Email:</strong> ${record.email}</p>
            <p class="text"><strong>Phone:</strong> ${record.phoneNumber}</p>
          </div>
          <!-- Invoice Details -->
          <div class="section">
            <table class="table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td class="table-right">${record.agendaType} Treatment </br> <p class="comment">${record.comment}</p></td>
                  <td>1</td>
                  <td>$${record.totalCost}</td>
                  <td>$${record.totalCost}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Payment Summary -->
          <div class="section">
          <table class="table">
              <tbody>
                <tr>
                  <td class="table-right">Subtotal:</td>
                  <td>$${record.totalCost}</td>
                </tr>
                <tr>
                  <td class="table-right">HST:</td>
                  <td>$${(record.totalCost * 0.13).toFixed(2)}</td>
                </tr>
                <tr>
                  <td class="table-right">Total Paid:</td>
                  <td>$${(parseFloat(record.totalCost) + parseFloat(record.totalCost * 0.13)).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <p class="text"><strong></strong> </p>
            <p class="text"><strong></strong> </p>
            <p class="text"><strong></strong> </p>
          </div>
        `).join('')}
        <div class="footer">
        
        </div>
      </div>
    </body>
    </html>
    
    
            `;


    try {
      const { uri: pdfUri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfUri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Report Summary</Text>
        </View>
        
        {/* Table Rows */}
        {records.map((record) => (
          <View key={record.id} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Customer:</Text>
              <Text style={styles.cellValue}>{record.customer}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Address:</Text>
              <Text style={styles.cellValue}>{record.address}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Phone Number:</Text>
              <Text style={styles.cellValue}>{record.phoneNumber}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Email:</Text>
              <Text style={styles.cellValue}>{record.email}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Invoice Number:</Text>
              <Text style={styles.cellValue}>{record.invoiceNumber}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Date:</Text>
              <Text style={styles.cellValue}>{record.date}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Agenda Type:</Text>
              <Text style={styles.cellValue}>{record.agendaType}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Subtotal:</Text>
              <Text style={styles.cellValue}>${record.totalCost}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>HST:</Text>
              <Text style={styles.cellValue}>${(record.totalCost * 0.13).toFixed(2)}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Total Paid:</Text>
              <Text style={styles.cellValue}>${(record.totalCost + record.totalCost * 0.13).toFixed(2)}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.cellLabel}>Comment:</Text>
              <Text style={styles.cellValue}>{record.comment}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonGenerate} onPress={generatePDF}>
          <Text style={styles.buttonText}>Generate PDF</Text>
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity 
            style={styles.buttonModify} 
            onPress={() => navigation.navigate("Create Report", route.params)}
          >
            <Text style={styles.buttonText}>Modify Report</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default AgendaReportScreen;
