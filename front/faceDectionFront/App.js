import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import _ from 'lodash';

const App = () => {
  const [predictResult, setPredictResult] = useState('');
  const createFormData = photo => {
    console.log(photo);
    const formData = new FormData();

    formData.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });
    return formData;
  };

  const handleUploadPhoto = photo => {
    const fileData = createFormData(photo);
    console.log(fileData);
    fetch('http://172.30.113.154:8080', {
      method: 'POST',
      body: fileData,
      headers: {'content-type': 'multipart/form-data'},
    })
      .then((response) => response.json())
      .then((data)=>{
        setPredictResult(data.result);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const runCamera = async () => {
    const result = await launchCamera({cameraType: 'front'});
    handleUploadPhoto(result.assets[0]);
  };

  return (
    <View style={styles.layout}>
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          runCamera();
        }}>
        <Text style={{borderWidth:1, paddingVertical:20, paddingHorizontal:40, borderRadius: 15, backgroundColor:'white', fontWeight:'bold', color:'black'}}>📷 촬영</Text>
      </TouchableOpacity>
      {
        _.isEmpty(!predictResult) 
        ? <PredictResultComponent resultText={predictResult} />
        : null
      }
    </View>
  );
};

const PredictResultComponent = ({resultText}) => {
  return (
    <View style={{flex: 3 ,  alignItems: 'center'}}>
      <Text>{resultText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaffaa'
  },
  captureButton: {
    flex:7,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 50,
  },
});

export default App;
