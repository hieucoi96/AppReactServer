import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import * as firebase from 'firebase';

export default function Profile({route, navigation}) {

    const [list, setList] = useState([]);
    const [value, setValue] = useState("0");
  
    useEffect(() => {
      firebase.database().ref('users').on('value', (snapshot) => {
        var templist = [];
        snapshot.forEach((child) => {
          var item = child.val();
          item.key = child.key;
          templist.push(item);
        })
    
        setList(templist);
        console.log("Data: " + JSON.stringify(list));
      });
    }, []);
    
    function timkiem(){
        let clonelist2 = [...list];
        let filterPrice = parseInt(value);
        let filterList = clonelist2.filter(user =>  user.price >= filterPrice);
        setList(filterList);
        console.log("DataFilter: " + JSON.stringify(filterList));
    }
    

    function deleteItem(key){
      var removeRef = firebase.database().ref('users/'+ key);
      removeRef.remove()
        .then(function() {
          console.log("Remove succeeded.");
          let cloneList = [...list];
          let newList = cloneList.filter(user =>  user.key !== key);
          setList(newList);
          console.log("DataAfterDelete " + key + " : "+ JSON.stringify(newList));
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
    }
    
      return (
          <View style={styles.container}>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           placeholder = "Nhập giá"
                           placeholderTextColor = "#AAAAAA"
                           onChangeText = {value => setValue(value)}
                           value = {value}/>
                <Button onPress={() => timkiem()}
                    title = "Tìm"/>
            </View>

              <FlatList style={{flex: 1, width: "100%", marginTop: 30}}
                  data={list}
                  extraData={list}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem = 
                  {
                      ({item}) => 
                          <View style={styles.item}>
  
                            <View style={styles.itemContainer}>
                              <Text style={styles.itemText}>Id: {item.id}</Text>
                              <Text style={styles.itemText}>Name: {item.name}</Text>
                              <Text style={styles.itemText}>Brand: {item.brand}</Text>
                              <Text style={styles.itemText}>Price: {item.price}</Text>
                            </View>
                            
                            <View style={styles.itemButtonRow}>
                              <TouchableOpacity style={styles.itemButtonFix}
                                                onPress={() => {navigation.navigate("Update",{key: item.key, id: item.id, 
                                                                name: item.name, brand: item.brand, price: item.price});}}>
                                <Text>Sửa</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.itemButtonDelete}
                                                onPress={() => {deleteItem(item.key)}}>
                                <Text>Xóa</Text>
                              </TouchableOpacity>
                            </View>
  
                          </View>
                  }
              />
              <TouchableOpacity style={styles.button}
                                onPress={() => {navigation.navigate("InputForm");}}>
                  <Text>Back</Text>
              </TouchableOpacity>
          </View>
      );
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
      },
      item: {
        width: '80%',
        backgroundColor: '#ebfff6',
        marginVertical: 3,
        alignSelf: 'center',
        borderRadius: 5,
      },
      itemContainer: {
        paddingVertical: 10,
      },
      itemText: {
        color: '#000000',
        paddingHorizontal: 20,
      },
      button: {
        width: '80%',
        backgroundColor: '#C5FBF4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
      },
      itemButtonRow: {
        flexDirection: 'row',
      },
      itemButtonFix: {
        backgroundColor: '#ffd4b5',
        width: '50%',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        paddingVertical: 3,
      },
      itemButtonDelete: {
        backgroundColor: '#ffb5b5',
        width: '50%',
        alignItems: 'center',
        borderBottomEndRadius: 5,
        paddingVertical: 3,
      },
      inputSection: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#AAAAAA',
    },
    input:{
        width: '80%',
        fontSize: 16,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 0,
        color: '#000000',
    },
  });