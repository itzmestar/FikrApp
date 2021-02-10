import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import { getItems } from '../api/api';

function HomeScreen(props) {
  const itemList = async () => {

  };
    return (
        <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    paddingTop: 22,
   
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    borderColor: colors.white,
    fontFamily: 'Montserrat-Regular',
  },
});

export default HomeScreen;