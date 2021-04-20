import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {TextInput} from 'react-native-paper'

export default function InputForm({route, navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    const [phone_number, setPhone] = useState('');

    const storeData = () => {
        fetch("https://hieuhmph12287-lab-6-7.herokuapp.com/insertUser",{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username,
                password,
                fullname,
                phone_number,
            })
        })
            // .then(res=> res.json())
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add</Text>
            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {username => setUsername(username)}
                           value = {username}
                           mode = "outlined"
                           label = "Username"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {pass => setPassword(pass)}
                           value = {password}
                           mode = "outlined"
                           label = "Password"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {fullname => setFullName(fullname)}
                           value = {fullname}
                           mode = "outlined"
                           label = "FullName"/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           onChangeText = {phone => setPhone(phone)}
                           value = {phone_number}
                           keyboardType= "number-pad"
                           mode = "outlined"
                           label = "Phone Number"/>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {storeData();}}>
                <Text style={styles.buttonText}>Create</Text>
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
    image: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
    },
});
