import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./Screen/Home"
import Profile from "./Screen/Profile";
import Album from "./Screen/Album";
import Test from "./Screen/Test";
import Update from "./Screen/Update";
import Search from "./Screen/Search";
import InputForm from "./Screen/InputForm";
import * as SplashScreen from 'expo-splash-screen';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCh7rHI__BjXqVSMcB1BJ5z6H5s3Oocs5U",
  authDomain: "react-f85c9.firebaseapp.com",
  databaseURL: "https://react-f85c9-default-rtdb.firebaseio.com",
  projectId: "react-f85c9",
  storageBucket: "react-f85c9.appspot.com",
  messagingSenderId: "747554041653",
  appId: "1:747554041653:web:2716188f39e6a5fa71a67c",
  measurementId: "G-MTPC1782EE"
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn);

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000); // <-- Set this to `5000` ms to hide it after 5 seconds
  }, []);
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={"Profile"}
                            component={Profile}
                            options={{
                                headerShown: false,
                            }}/>
              <Stack.Screen name={"InputForm"}
                            component={InputForm}
                            options={{
                              headerShown: false,
                            }}/>
              <Stack.Screen name={"Search"}
                            component={Search}
                            options={{
                              headerShown: false,
                            }}/>

              <Stack.Screen name={"Test"}
                            component={Test}
                            options={{
                              headerShown: false,
                            }}/>
              <Stack.Screen name={"Album"}
                            component={Album}
                            options={{
                              headerStyle: {
                                backgroundColor: '#161616',
                              },
                              headerTintColor: '#fff',
                            }}/>
              <Stack.Screen name={"Home"}
                            component={Home}
                            options={{
                              headerShown: false,
                            }}/>
              <Stack.Screen name={"Update"}
                            component={Update}
                            options={{
                              headerShown: false,
                            }}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
