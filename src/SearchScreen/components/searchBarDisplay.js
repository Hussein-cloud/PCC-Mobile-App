import React from "react";
import { SearchBar } from "react-native-elements";
import  styles  from "../style/styles";

const SearchBarDisplay = ({ searchValue, onChangeText }) => {
  return (
    <SearchBar
      placeholder="Search Reports.."
      round
      value={searchValue}
      onChangeText={onChangeText}
      autoCorrect={false}
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.inputContainerStyle}
    />
  );
};

export default SearchBarDisplay;
