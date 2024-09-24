// SearchScreen.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import SearchBarDisplay from "../components/searchBarDisplay";
import { getDataFromFirestore } from "../../Backend/DatabaseConnection/firebaseService";
import AgendaList from "../components/searchresults";
import styles from "../style/styles";

const SearchScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const arrayholder = useRef([]);
  const navigationScreen = useNavigation();

  useEffect(() => {
    setLoading(true);

    getDataFromFirestore("RecordTable")
      .then((items) => {
        setData(items);
        arrayholder.current = items; // Store the original data
      })
      .catch((error) => console.error("Error fetching data: ", error))
      .finally(() => setLoading(false));
  }, []);

  const searchFunction = (text) => {
    const updatedData = arrayholder.current.filter((item) => {
      const item_data = `${item.assignee.toUpperCase()} ${item.customer.toUpperCase()} ${item.address.toUpperCase()} ${item.agendaType.toUpperCase()} ${item.date}`;
      const text_data = text.toUpperCase();
      return item_data.includes(text_data);
    });
    setData(updatedData);
    setSearchValue(text);
  };

  const handleItemPress = (item) => {
    navigationScreen.navigate("Generate a PDF File", item );
    
  };

  return (
    <View style={styles.container}>
      <SearchBarDisplay
        searchValue={searchValue}
        onChangeText={searchFunction}
      />
      <AgendaList
        data={data}
        onItemPress={handleItemPress}
      />
    </View>
  );
};

export default SearchScreen;
