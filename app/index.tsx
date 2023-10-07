import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput } from '../components/Themed';
import FoodItem from '../components/FoodItem';
import foodData from '../data.json';

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('price');

    const filteredData = foodData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => 
        filter === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                value={search}
                onChangeText={setSearch}
                placeholder="Search for food"
                style={styles.textInput}
            />
            {/* ...other UI elements like filter dropdown */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <FoodItem item={item} onPress={(id) => console.log('Navigate to Details with', id)} />
                )}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 16,
        borderRadius: 16,
        padding:16
    }
})