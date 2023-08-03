import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from "@expo/vector-icons"

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [resPermission, setResPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const camRef = useRef(null); // Declaração da referência para a câmera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setResPermission(status === "granted");
    })();
  }, []);

  if (resPermission === null) {
    return <View />;
  }
  if (resPermission === false) {
    return <Text>Acesso negado.</Text>; // Adicione o "return" aqui
  }

  async function takePicture() { // Corrija o nome da função para "takePicture"
    if (camRef) {
      const data = await camRef.current.takePictureAsync(); // Corrija o nome do método para "takePictureAsync"
      setCapturedPhoto(data.uri)
      setOpen(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={camRef} // Passe a referência para a câmera aqui
      >
        <View style={styles.contentbuutons}>
          <TouchableOpacity style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }}>
            <FontAwesome name="exchange" size={23} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
            <FontAwesome name='camera' size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto &&
      <Modal animationType='slide' transparent={true} visible={open}>
        <View style={styles.contentModal}>
        <TouchableOpacity style={styles.closebutton}
                          onPress={()=>{setOpen(false)}}>
                            <FontAwesome name='close' size={50} color="#fff"></FontAwesome>
                          </TouchableOpacity>
          <Image style={styles.imgPhoto} source={{ uri : capturedPhoto}}/>
        </View>
      </Modal>
} 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera:{
    width:"100%",
    height:"100%",
  },
  contentbuutons:{
    flex:1,
    backgroundColor:"transparent",
    flexDirection:"row",
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue", // Altere a cor de fundo do botão aqui
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // Altere a cor de fundo do botão aqui
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  contentModal:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    margin:20,

  },
  closebutton:{
    position:"absolute",
    top:10,
    left:2,
    margin:10,
  },
  imgPhoto:{
    width:"100%",
    height:400,
    
  }

});
