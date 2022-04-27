import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';

const categoriesCollection = firestore().collection('categories');

export default function CategoriesComponent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoriesCollection.get().then(querySnapshot => {
      console.log('Total categories: ', querySnapshot.size);
      const categoriesTmp = [];
      querySnapshot.forEach(documentSnapshot => {
        categoriesTmp.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setCategories(categoriesTmp);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục</Text>
      <ScrollView horizontal>
        {categories.map(category => {
          //
          return (
            <View style={styles.categoryContainer} key={category.id}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: category.image}} />
              </View>
              <Text>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
});
