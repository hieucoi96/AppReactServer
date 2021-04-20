import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {TextInput} from 'react-native-paper'

export default function Test({route, navigation}) {

    const {_id, username, password, fullname, phone_number} = route.params;
    const [newusername, setUsername] = useState(username);
    const [newpassword, setPassword] = useState(password);
    const [newfullname, setFullName] = useState(fullname);
    const [newphone, setPhone] = useState(phone_number);


    const changeData = () => {
        fetch("https://hieuhmph12287-lab-6-7.herokuapp.com/edit",{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id: _id,
                username: newusername,
                password: newpassword,
                fullname: newfullname,
                phone_number: newphone,
            })
        }).then(data=>{
            navigation.navigate("Profile")
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update</Text>
            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {name => setUsername(name)}
                           value = {newusername}
                           mode = "outlined"
                           label = "Username"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {pass => setPassword(pass)}
                           value = {newpassword}
                           mode = "outlined"
                           label = "Password"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {pass => setFullName(pass)}
                           value = {newfullname}
                           mode = "outlined"
                           label = "FullName"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {pass => setPhone(pass)}
                           value = {newphone}
                           keyboardType= "number-pad"
                           mode = "outlined"
                           label = "Phone Number"/>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {changeData()}}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSection: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        width: '90%',
        fontSize: 16,
        color: '#000000',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#C5FBF4',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        padding: 10,
    },
    location: {
        width: '80%',
        marginTop: 15,
    },
    locationText: {
        fontSize: 20,
        color: '#AAAAAA',
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
    },
});
