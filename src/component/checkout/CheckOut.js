import React, {Component} from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

export default class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  createThreeButtonAlert = () =>
    Alert.alert(
      'Check Out sukses',
      ' ',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('home')},
      ],
      {cancelable: false},
    );
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={'Check Out Sekarang'}
          onPress={this.createThreeButtonAlert}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
