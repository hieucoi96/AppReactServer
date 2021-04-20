import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as firebase from 'firebase';

export default function Test({route, navigation}) {

    const [username, setUsername] = useState('');
    const [passcode, setPasscode] = useState('');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);
    
    let longitude = 'Waiting..';
    let latitude = 'Waiting..';
    if (errorMsg) {
        longitude = errorMsg;
        latitude = errorMsg;
    } else if (location) {
        longitude = location.coords.longitude;
        latitude = location.coords.latitude;
    }
    
    function storeData() {
        var postListRef = firebase.database().ref('users');
        var newPostRef = postListRef.push();
        newPostRef.set({
            username: username,
            passcode: passcode,
            latitude: latitude,
            longitude: longitude,
        }); 
    }

    return (
        <View style={styles.container}>
            <Text>TestPage</Text>
            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           placeholder = "Username"
                           placeholderTextColor = "#AAAAAA"
                           onChangeText = {name => setUsername(name)}
                           value = {username}/>
            </View>

            <View style={styles.inputSection}>
                <TextInput style = {styles.input}
                           secureTextEntry={true}
                           placeholder = "Passcode"
                           placeholderTextColor = "#AAAAAA"
                           onChangeText = {pass => setPasscode(pass)}
                           value = {passcode}/>
            </View>

            <View style={styles.location}>
                <Text style={styles.locationText}>Vĩ độ: {latitude}</Text>
                <Text style={styles.locationText}>Kinh độ: {longitude}</Text>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => {storeData();
                                                                    navigation.navigate("Profile");}}>
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
    button: {
        marginTop: 20,
        backgroundColor: '#C5FBF4',
        borderRadius: 5,
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
});