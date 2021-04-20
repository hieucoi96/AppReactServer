import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Album = ({navigation}) => {

  const [mang, setMang] = useState([]);

  fetch("https://www.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=331d821f9dc7606d6827ba795a26e29b&user_id=191861875%40N06&extras=views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_q%2C+url_m%2C+url_n%2C+url_z%2C+url_c%2C+url_l%2C+url_o&per_page=20&page=1&format=json&nojsoncallback=1")
      .then(response => response.json())
      .then(result => setMang(result.photos.photo))
      .catch(error => console.log('error', error));

  return (
    <View style={styles.container}>

        <FlatList style={{flex: 1}}
                data={mang}
                renderItem = 
                {
                    ({item, index}) => 
                    <TouchableOpacity style={{flex: 0.5, margin: 5}}
                        onPress={() => navigation.navigate('Home', {url_c: item.url_c, url_l: item.url_l, url_z: item.url_z, id: index, mang: mang})}>
                        <View style={styles.item}>
                            <Image
                                style={styles.tinyLogo}
                                source={ {uri:item.url_c} }
                            />
                            <View style={styles.infoImage}>
                                <Ionicons name="md-eye" size={18} color="black" />
                                <Text style={styles.title}>{item.views} views</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                numColumns={2}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        justifyContent: 'center',
    },
    item: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'rgba(191, 191, 191, 0.3)',
    },
    tinyLogo: {
        width: '100%',
        height: 120,
    },
    title: {
        fontSize: 16,
        color: '#FFFFFF',
        paddingLeft: 10,
        paddingVertical: 5,
        alignSelf: 'center',
    },
    infoImage: {
        position: 'absolute',
        left: "5%",
        bottom: "2%",
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Album;
