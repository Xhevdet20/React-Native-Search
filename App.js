import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {

  const [masterData, setMasterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPosts = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredData(responseJson);
        setMasterData(responseJson);
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchPosts();
    return () => {

    }
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? 
          item.title.toUpperCase() 
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData)  > -1
      });
      setFilteredData(newData);
      setSearch(text)
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  }

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}{'. '}{item.title.toUpperCase()}
      </Text>
    )
  }

  const ItemSeparatorView = () => {
    return (
      <View 
        style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
       
      />
    )
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInputStyle}
        value={search}
        placeholder="search here"
        underlineColorAndroid= "transparent"
        onChangeText={(text) => searchFilter(text) }
      />
     <FlatList 
      data={filteredData}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={ItemView}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding : 15
  },
  textInputStyle : {
    height: 50,
    borderWidth: 1,
    paddingLeft : 20,
    margin : 5,
    borderColor: '#009688',
    backgroundColor:'white'
  }
});
