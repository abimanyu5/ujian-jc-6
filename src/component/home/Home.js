import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';

import styles from './style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: 'Check In',
          image:
            'https://img.icons8.com/ios-filled/50/000000/to-come.png',
        },
        {
          id: 2,
          title: 'Check Out',
          image: 'https://img.icons8.com/ios/50/000000/to-come.png',
        },
        {
          id: 3,
          title: 'Ijin',
          image: 'https://img.icons8.com/ios-filled/50/000000/work-in-bed.png',
        },
        {
          id: 4,
          title: 'History',
          image: 'https://img.icons8.com/ios/50/000000/check--v2.png',
        },
        
        {
          id: 5,
          title: 'Signout',
          image: 'https://img.icons8.com/material-sharp/64/000000/shutdown.png',
        },
      ],
      counter: 1,
    };
  }

  componentDidMount() {}


  clickEventListener = (item) => {
    switch (item.title) {
      case 'Check In':
        this.props.navigation.navigate('input');
        break;
      case 'Check Out':
        this.props.navigation.navigate('checkout');
        break;
        case 'Ijin':
        this.props.navigation.navigate('ijin');
        break;
      case 'History':
        this.props.navigation.navigate('show');
        break;
      case 'Signout':
        auth()
          .signOut()
          .then(() => {
            console.log('User signed out!');
            this.props.navigation.navigate('Login');
          })
          .catch((error) => {
            this.props.navigation.navigate('Register');
          });
        break;
        Alert.alert(item.title);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.clickEventListener(item)}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={{uri: item.image}} />
                <View style={styles.cardHeader}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default Home;
