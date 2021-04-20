import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { FloatingAction } from 'react-native-floating-action';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function Home({route, navigation}) {

  const {mang, id, url_l, url_c, url_z} = route.params;
  const [url_L, setUrl_L] = useState(url_l);
  const [url_C, setUrl_C] = useState(url_c);
  const [url_Z, setUrl_Z] = useState(url_z);
  const [size_L, setSize_L] = useState("");
  const [size_C, setSize_C] = useState("");
  const [size_Z, setSize_Z] = useState("");
  
  const listItems = mang.map((item, index) =>
    <View style={styles.page} key={index}>
      <Image
        style={{width: 400, height: 250}}
        source={ {uri: item.url_c} }
      />
    </View>
  );

  useEffect(() => {
    (async () => {
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  const downloadFile = async (url) => {
    const fileUri = FileSystem.documentDirectory + "filename.png";
  
    let downloadObject = FileSystem.createDownloadResumable(
      url,
      fileUri
    );
    let response = await downloadObject.downloadAsync();
    const assetLink = await MediaLibrary.createAssetAsync(response.uri);
  }

  const actions = [{
    text: size_L,
    color: '#ff2200',
    buttonSize: 56,
    textBackground: '#363636',
    textColor: '#ffffff',
    margin: 0,
    icon: require('../assets/download_icon.png'),
    name: url_L,
    position: 1
  }, {
    text: size_C,
    color: '#ff2200',
    buttonSize: 56,
    textBackground: '#363636',
    textColor: '#ffffff',
    margin: 0,
    icon: require('../assets/download_icon.png'),
    name: url_C,
    position: 2
  }, {
    text: size_Z,
    color: '#ff2200',
    buttonSize: 56,
    textBackground: '#363636',
    textColor: '#ffffff',
    margin: 0,
    icon: require('../assets/download_icon.png'),
    name: url_Z,
    position: 3
  }];

  return (
    <View style={{flex: 1}}>
    <ViewPager  style={styles.viewPager} 
                initialPage={id}
                onPageSelected={e => {console.log("Current page index", e.nativeEvent.position);
                                      setUrl_L(mang[e.nativeEvent.position].url_l);
                                      setUrl_C(mang[e.nativeEvent.position].url_c);
                                      setUrl_Z(mang[e.nativeEvent.position].url_z);
                                      setSize_L(mang[e.nativeEvent.position].height_l + "x" + mang[e.nativeEvent.position].width_l);
                                      setSize_C(mang[e.nativeEvent.position].height_c + "x" + mang[e.nativeEvent.position].width_c);
                                      setSize_Z(mang[e.nativeEvent.position].height_z + "x" + mang[e.nativeEvent.position].width_z);}}>
      {listItems}
    </ViewPager>
    <FloatingAction
                actions={actions}
                color = '#ff2200'
                distanceToEdge={20}
                overlayColor='rgba(68, 68, 68, 0)'
                onPressItem={
                  (name) => {
                    console.log(`Download Image: ${name}`);
                    downloadFile(name);
                  }   
                }
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPager: {
    flex: 1,
    backgroundColor: 'black',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
