import React, {Component} from 'react';
import {Button, PermissionsAndroid, View, Image} from 'react-native';
import {
  ActionsContainer,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Input,
  Label,
  Switch,
  Select,
} from 'react-native-clean-form';

import * as ImagePicker from 'react-native-image-picker';

import styles from './style';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const FirebaseStorage = storage();

export default class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadUrl: '',
      uri: '',
      fileImage: null,
      gps:'',
    };
  }

  requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

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

  submitData = () => {
    let storageRef = this.createStorageReferences(this.state.fileImage);
    storageRef
      .putFile(this.state.fileImage.uri)
      .then((res) => {
        console.log(JSON.stringify(res));

        storageRef.getDownloadURL().then((download) => {
          firestore()
            .collection('users')
            .doc(this.state.email)
            .set({
              nama: this.state.nama,
              umur: this.state.umur,
              urlDownload: download,
            })
            .then((res) => {
              console.log(JSON.stringify(res));
              console.log('check in add');
              this.props.navigation.navigate("home")
            })
            .catch((error) => {
              Alert.alert('Maaf Gagal Simpan', JSON.stringify(error));
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  createStorageReferences = (response) => {
    const {fileName} = response;

    return FirebaseStorage.ref(fileName);
  };

  render() {
    return (
      <Form>
        <FieldsContainer>
          <Fieldset label="Check In">
            
          </Fieldset>
          <View style={styles.image}>
            <Image
              style={styles.cameraContainer}
              source={{uri: this.state.uri}}
            />
          </View>
        </FieldsContainer>
        <Button
          title="Take image"
          onPress={() => {
            if (this.requestPermission()) {
              this.captureCamera();
            }
          }}
          style={styles.Button}
        />
        <ActionsContainer>
          <Button title="Submit" onPress={this.submitData}>
            Save
          </Button>
        </ActionsContainer>
      </Form>
    );
  }
}
