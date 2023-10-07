import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

interface FoodItemProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
    };
    onPress: (id: string) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item.id)}>
            <View style={{ marginBottom: 16 }}>
                <Image source={{ uri: item.image }} style={styles.imgContainer} />
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodItem;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
    imgContainer: {
        width: 200,
        height: 200,
        borderRadius: 16
    }
})