import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, View } from '../components/Themed';
import { Picker } from '@react-native-picker/picker';
import FoodItem from '../components/FoodItem';
import foodData from '../data.json';

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({ specialty: 'All', rating: '0', vegetarian: 'All' });

    const parsedRating = parseFloat(filter.rating);

    const filteredData = foodData.filter(item =>
        (filter.specialty === 'All' || item.specialty === filter.specialty) &&
        item.rating >= parsedRating &&
        (filter.vegetarian === 'All' || (filter.vegetarian === 'Veg' ? item.vegetarian : !item.vegetarian)) &&
        (item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                value={search}
                onChangeText={setSearch}
                placeholder="Search for food"
                style={styles.textInput}
            />
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={filter.specialty}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, specialty: value }))}
                    style={styles.picker}
                >
                    <Picker.Item label="All Specialties" value="All" />
                    <Picker.Item label="Italian" value="Italian" />
                    <Picker.Item label="American" value="American" />
                    <Picker.Item label="Japanese" value="Japanese" />
                    <Picker.Item label="Mexican" value="Mexican" />
                    <Picker.Item label="Healthy" value="Healthy" />
                    {/* ...other specialties */}
                </Picker>
                <Picker
                    selectedValue={filter.rating}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, rating: value }))}
                    style={styles.picker}
                >
                    <Picker.Item label="All Ratings" value={0} />
                    <Picker.Item label="4 Stars & Up" value={4} />
                    <Picker.Item label="3 Stars & Up" value={3} />
                    <Picker.Item label="2 Stars & Up" value={2} />
                    <Picker.Item label="1 Star & Up" value={1} />
                    {/* ...other ratings */}
                </Picker>
                <Picker
                    selectedValue={filter.vegetarian}
                    onValueChange={(value) => setFilter(prev => ({ ...prev, vegetarian: value }))}
                    style={styles.picker}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Veg" value="Veg" />
                    <Picker.Item label="Non-Veg" value="Non-Veg" />
                </Picker>
            </View>
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
    },
    filterContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 16,  
    },
    picker: {
        flex: 1,
        marginHorizontal: 16,
    },
})