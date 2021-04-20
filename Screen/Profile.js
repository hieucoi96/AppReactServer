import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

export default function Profile({route, navigation}) {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true)
    const link = 'https://hieuhmph12287-lab-6-7.herokuapp.com/getUsers'
    const fetchData = () =>{
        fetch(link)
            .then((response) => response.json())
            .then((baseJson) =>{

                if(baseJson.errorCode === 200){
                    setData(baseJson.data);
                    setLoading(false)
                }else{
                    alert(baseJson.errorMessage)
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(()=>{
        fetchData()
    }, [isFocused])
    const [data, setData] = useState([])

    const deleteItem = (_id) =>{
        fetch("https://hieuhmph12287-lab-6-7.herokuapp.com/delete/" + _id)
            .then(r => fetchData())
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <FlatList style={{flex: 1, width: "100%", marginTop: 30}}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                onRefresh = {() => fetchData()}
                refreshing={loading}
                renderItem =
                {
                    ({item}) =>
                        <View style={styles.item}>

                          <View style={styles.itemContainer}>
                              <Text style={styles.itemText}>ID: {item._id}</Text>
                              <Text style={styles.itemText}>Username: {item.username}</Text>
                              <Text style={styles.itemText}>Password: {item.password}</Text>
                              <Text style={styles.itemText}>FullName: {item.fullname}</Text>
                              <Text style={styles.itemText}>Phone Number: {item.phone_number}</Text>
                          </View>

                          <View style={styles.itemButtonRow}>
                            <TouchableOpacity style={styles.itemButtonFix}
                                              onPress={() => {navigation.navigate("Update",{_id: item._id, username: item.username,
                                                              password: item.password, fullname: item.fullname, phone_number: item.phone_number});}}>
                              <Text>Sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.itemButtonDelete}
                                              onPress={() => {deleteItem(item._id)}}>
                              <Text>Xóa</Text>
                            </TouchableOpacity>
                          </View>

                        </View>
                }
            />
            <TouchableOpacity style={styles.button}
                              onPress={() => {navigation.navigate("InputForm");}}>
                <Text>Thêm</Text>
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
    }
});
