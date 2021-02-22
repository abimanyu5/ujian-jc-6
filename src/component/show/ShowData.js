import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default class ShowData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      
    };
  }

  componentDidMount() {
    firestore()
      .collection('laporan')
      .get()
      .then((querySnapshot) => {
        console.log('Total data: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log('Data: ', documentSnapshot.id, documentSnapshot.data());
          this.setState({datas: documentSnapshot.data()});
          //console.log(this.state.datas)
        });
      });
  }

    const TambahData = () => {
        navigation.navigate('input');
    };
  const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
        
              }}
              style={styles.row}>
                <Image source={{ uri: urlDownload }} style={styles.picture} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.nama}</Text>
                        <Text style={styles.mblTxt}>{item.status}</Text>
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={styles.msgTxt}>{item.gender} / {item.usia} Tahun</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    render(){
        return (
           <View style={styles.container}>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={styles.label}>Total User : {data.length}</Text>
                <TouchableOpacity onPress={TambahData} style={styles.tombol}>
                    <Text style={styles.textTombol}>Tambah User</Text>
                </TouchableOpacity>
            </View>
            <Divider/>
            <FlatList
                data={data}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={renderItem} />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 5,
    },
    picture: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 20,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 15,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 15,
        marginLeft: 15,
    },
    tombol: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'pink',

    },
});
