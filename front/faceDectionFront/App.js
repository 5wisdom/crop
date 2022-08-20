import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, TouchableOpacity, View, Button, ImageBackground, Modal} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import _ from 'lodash';

const App = () => {
  const [predictResult, setPredictResult] = useState('');
  const [cropType, setCropType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const createFormData = (photo,crop) => {
    console.log(photo);
    const formData = new FormData();

    formData.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });
    formData.append('crop', crop)

    return formData;
  };

  const runCamera = async (crop) => {
    const result = await launchCamera({cameraType: 'front'});
    handleUploadPhoto(result.assets[0], crop);
  };
  
  const handleUploadPhoto = (photo, crop) => {
    const fileData = createFormData(photo,crop);
  
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: fileData,
      headers: {'content-type': 'multipart/form-data'},
    })
      .then((response) => response.json())
      .then((data)=>{
        setPredictResult(data.result);
        setModalVisible(true)
      })
      .catch(e => {
        console.error(e);
      });
  };



  return (
    
    <View style={styles.layout}>
      <ImageBackground source={require("./leaves.png")}  style={styles.bgImage}>
        <View style={ styles.captureButton}>
          <View style={{marginBottom: 40, paddingBottom: -10, borderBottomColor:'#ffaa00', borderBottomWidth: 13}}>
          <Text style={{color: '#fff', marginBottom: -10, color:'#ffff', fontSize: 30, fontWeight: 'bold'}}>🌱작물을 선택해주세요</Text>
          </View>
          <TouchableOpacity style={ styles.cropTouchable } onPress={() => {runCamera('포도')}}>
            <Text style={ styles.cropTest}>포도🍇</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={ styles.cropTouchable } onPress={() => {runCamera('딸기')}}>
            <Text style={ styles.cropTest}>딸기🍓</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={ styles.cropTouchable } onPress={() => {runCamera('수박')}}>
            <Text style={ styles.cropTest}>수박🍉</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={ styles.cropTouchable } onPress={() => {runCamera('고추')}}>
            <Text style={ styles.cropTest}>고추🌶</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={ styles.cropTouchable } onPress={() => {runCamera('참외')}}>
            <Text style={ styles.cropTest}>참외🍈</Text> 
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* 분석결과 모달창 */}
      <ModalComponent 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}
        predictResult={predictResult}
      />
    </View>
  );
};

const ModalComponent = ({modalVisible, setModalVisible, predictResult}) => {
  return(
    <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{predictResult}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  bgImage:{
    width: '100%',
    height: '100%'
  },
  captureButton: {
    flex:15,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 50,
  },
  cropTouchable:{
    paddingVertical:10,
    paddingHorizontal: 50,
    backgroundColor:'#fff',
    borderRadius: 10,
    marginVertical: 10
  },
  cropTest:{
    fontSize: 24,
    fontWeight: '800',
    color: '#000'
  },
  TextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#ffaaaa',
    fontSize: 20,
    textDecorationLine: 'underline',
  //line-through is the trick
  }, 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 80,
    paddingVertical: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#ffaa00",
    marginTop: 30
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  modalText: {
    marginBottom: 15,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#000'
  }
});

export default App;
