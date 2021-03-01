/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import InputData from './src/component/input/InputData';
import Home from './src/component/home/Home';

import ShowData from './src/component/show/ShowData';
import Update from './src/component/update/Update';
import Ijin from './src/component/ijin/Ijin';
import Login from './src/component/login/Login';
import CheckOut from './src/component/checkout/CheckOut';
import Register from './src/component/register/Register';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((userdata) => {
      console.log('user' + JSON.stringify(userdata));
      if (userdata === null) {
        this.setState({isLoggedIn: false});
      } else {
        this.setState({user: userdata, isLoggedIn: true});
      }
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoggedIn ? (
            <>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="show" component={ShowData} />
              <Stack.Screen name="input" component={InputData} />
              <Stack.Screen name="ijin" component={Ijin} />
              <Stack.Screen name="checkout" component={CheckOut} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registrasi" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
