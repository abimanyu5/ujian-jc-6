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
        console.log('Total data laporan: ', querySnapshot.size);

        querySnapshot.forEach((documentSnapshot) => {
          console.log('Data: ', documentSnapshot.id, documentSnapshot.data());
          this.setState({datas: documentSnapshot.data()});
          //console.log(this.state.datas)
        });
      });
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
            .collection('laporan')
            .doc(this.state.nama)
            .set({
              nama: this.state.nama,
              umur: this.state.umur,
              gender: this.state.gender,
              status: this.state.status,
              urlDownload: download,
            })
            .then((res) => {
              console.log(JSON.stringify(res));
              console.log('Laporan added!');
              this.props.navigation.navigate("show")
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
          <Fieldset label="Laporan Kejadian">
            <FormGroup style={styles.FormGroup}>
              <Label>Nama</Label>
              <Input
                placeholder="Nama"
                onChangeText={(nama) => this.setState({nama: nama})}
              />
            </FormGroup>
            <FormGroup style={styles.FormGroup}>
              <Label>umur</Label>
              <Input
                placeholder="umur"
                onChangeText={(umur) => this.setState({umur: umur})}
              />
            </FormGroup>

            <FormGroup style={styles.FormGroup}>
              <Label>gender</Label>
              <Select
                name="lstgender"
                label="gender"
                options={lstgender}
                placeholder="gender"
                onValueChange={(gender) => this.setState({gender:gender})}
              />
            </FormGroup>

            <Label>status</Label>
            <Input
              name="status"
              label="status"
              placeholder=""
              multiline={true}
              numberOfLines={5}
              inlineLabel={false}
              onChangeText={(status) =>
                this.setState({status: status})
              }
            />
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

}