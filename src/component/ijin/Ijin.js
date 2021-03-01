import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export default class Ijin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kategori: '',
      hal: '',
      text: '',
      fromdate: new Date(),
      untildate: new Date(),
      fileImage: null,
      uri: '',
    };
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );
  };

  captureCamera = () =>
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );

  kirimdata = () => {
    firestore()
      .collection('ijin')
      .add({
        kategori: this.state.kategori,
        fromdate: this.state.fromdate,
        untildate: this.state.untildate,
        hal: this.state.hal,
        ket: this.state.text,
        uri: this.state.uri,
      })
      .then(() => {
        Alert.alert('Ijin Add');
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1, width: '100%'}}
          keyboardShouldPersistTaps="always">
          <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
            Kategori
          </Text>
          <Picker
            selectedValue={this.state.kategori}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({kategori: itemValue})
            }>
            <Picker.Item label="Pilih Kategori" value=" " color="#aaaaaa" />
            <Picker.Item label="Izin Bencana" value="bencana" />
            <Picker.Item label="Izin Sakit" value="sakit" />
            <Picker.Item label="Izin Anak Sakit" value="anaksakit" />
          </Picker>
          <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
            Dari Tanggal
          </Text>
          <DatePicker
            style={styles.datePickerStyle}
            placeholder="select date"
            date={this.state.fromdate}
            onDateChange={(fromdate) => this.setState({fromdate})}
          />
          <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
            Sampai Tanggal
          </Text>
          <DatePicker
            style={styles.datePickerStyle}
            placeholder="select date"
            date={this.state.untildate}
            onDateChange={(untildate) => this.setState({untildate})}
          />
          <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
            Perihal
          </Text>
          <TextInput
            placeholder="Perihal"
            style={styles.input}
            value={this.state.hal}
            onChangeText={(hal) => this.setState({hal})}
          />
          <Text style={{fontSize: 15, marginBottom: 10, marginTop: 10}}>
            Keterangan
          </Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            maxLength={120}
            placeholder="Keterangan"
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity
            style={styles.buttonGallery}
            onPress={this.pickImage}>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={this.captureCamera}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
          <Image
            source={this.state.fileImage}
            style={{height: 100, width: 100}}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.kirimdata}>
            <Text style={styles.buttonText}>Kirim</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
