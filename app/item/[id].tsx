import React from 'react';
import { Image, FlatList, ScrollView } from 'react-native';
import { View, Text } from '../../components/Themed';
import foodData from '../../data.json';
import { router, useLocalSearchParams } from 'expo-router';
import FoodItem from '../../components/FoodItem';

const ItemDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    const item = foodData.find(item => item.id === id);
  
    if (!item) {
      return (
        <View>
          <Text>Item not found</Text>
        </View>
      );
    }
  
    const similarItems = foodData.filter(
      foodItem => foodItem.specialty === item.specialty && foodItem.id !== item.id
    );
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 16 }} />
          <Text style={{ fontSize: 24, marginVertical: 8 }}>{item.name}</Text>
          <Text style={{ marginVertical: 4 }}>{item.description}</Text>
          <Text style={{ marginVertical: 4 }}>${item.price}</Text>
          <Text style={{ marginVertical: 4 }}>{item.ingredients.join(" ")}</Text>
          <Text style={{ marginVertical: 4 }}>{item.specialty}</Text>
          <Text style={{ marginVertical: 4 }}>{item.rating}</Text>
          <Text style={{ fontSize: 24, marginVertical: 8 }}>Reviews:</Text>
          {item.reviews.map((review, index) => (
            <View key={index}>
              <Text style={{ marginVertical: 4 }}>User: {review.user}</Text>
              <Text style={{ marginVertical: 4 }}>Rating: {review.rating}</Text>
              <Text style={{ marginVertical: 4 }}>Comment: {review.comment}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 18, marginVertical: 8 }}>Similar Items</Text>
          <FlatList
                  data={similarItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item: similarItem }) => (
                      <FoodItem
                          item={similarItem}
                          onPress={(id) => router.push({pathname: `/item/${id}`, params: {id}})}
                      />
                  )}
              />
        </ScrollView>
      </View>
    );
  };
  
  export default ItemDetailsScreen;