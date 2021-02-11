import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import { getItems } from '../api/api';

function HomeScreen(props) {
  const [items, setItems] = useState([]);

  useEffect(() => { itemList(); }, []);
  const itemList = async () => {
    const result = await getItems();
    if (result.error) {
      ToastAndroid.show(result.error, ToastAndroid.SHORT);
    }
    if (result.ok) {
      setItems(result.data);
    }
  };
    return (
        <View style={styles.container}>
      <FlatList
        data={items}
          renderItem={({ item }) => <Text style={styles.item}>{item.item_id} {item.owner} {item.auction_status}</Text>}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    paddingTop: 0,
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