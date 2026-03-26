import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';

// Reusable search form component.
// Props:
//   placeholder  - input placeholder text
//   initialValue - pre-filled search value
//   onSearch     - callback called with the search query string when submitted
export default function SearchForm({ placeholder, initialValue = '', onSearch }) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <View style={styles.searchForm}>
      <TextInput
        style={styles.searchInput}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#555577"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        autoCorrect={false}
      />
      <Pressable
        style={({ pressed }) => [styles.searchButton, pressed && { opacity: 0.8 }]}
        onPress={handleSearch}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchForm: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1a1a2e',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#0d0d1a',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  searchButton: {
    backgroundColor: '#7c6fff',
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
