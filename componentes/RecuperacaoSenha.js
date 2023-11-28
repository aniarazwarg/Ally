import React from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity,ImageBackground } from 'react-native';

export function RecuperacaoSenha({navigation}){
    return (
      
      <ImageBackground style={{ width: '100%', height: '100%', }}  source={require('../assets/pegadas2.jpg')}>
      <View style={styles.container}>
        <View style={styles.imagem}>
          <Image style={styles.logoBrothers} source={require('../assets/Logo_Brothers.png')} />
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.text}>Enviaremos sua senha no Email cadastrado:</Text>  
        </View>              
        <View style={{alignItems:'center'}}>
          <TextInput 
          style={styles.input}
          placeholder="Digite seu Email"
          />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textButton}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    );
  }
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2EAD0',
     
    },
    imagem: {
      alignItems:'center',
    },
    logoBrothers:{
      height:150,
      width:'90%',
      backgroundColor: '#F8F4E8',
      borderRadius: 20,
      margin: 10,
    },
    text: {
      fontSize: 15
    },
    input:{
      textAlign:'center',
      fontSize:20,
      marginVertical: 10,
      borderColor:'#273A73',
      borderWidth:2,
      color:'#273A73',
      padding:10,
      borderRadius:20,
      width: '90%',
      backgroundColor:'#F3EEDB'
    },
    button:{
      alignItems:'center',
      backgroundColor: '#6FAA9C',
      width: '40%',
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
    },
    textButton:{
      color: 'white',
      fontSize: 20
    }
   
  });