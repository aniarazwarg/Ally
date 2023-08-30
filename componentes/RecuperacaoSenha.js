import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';

export function RecuperacaoSenha({navigation}){
    return (
      // estrutura login
      <View style={styles.container}>
  
        <Image style={styles.logo} source={require('/assets/Logo_Brothers.png')} />
              
        <TextInput
            style={styles.text}
            placeholder="Enviaremos sua senha no Email cadastrado:"
        />

        <TextInput 
         style={styles.input}
         placeholder="Digite seu Email"
        />
  
        <TextInput
          style={styles.input1}
          placeholder="Enviar"
        />  
  
        <Image style={styles.logo2} source={require('/assets/ally.png')} />
      </View>
    );
  }
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2EAD0',
    },
    link:{
      marginTop:'100px',
      textAlign:'center',
      fontSize:'20px',
      fontFamily:'arial',
    },
    input:{
      textAlign:'center',
      fontSize:'20px',
      marginTop:'60px',
      backgroundColor:'#273A73',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
    },
    input1:{
    //   flex:'1',   (tentativa de diminuir o tam. do balão)
      textAlign:'center',
      fontSize:'20px',
      marginTop:'60px',
      backgroundColor:'#273A73',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
    //   width:'30',   (tentativa de diminuir o tam. do balão)
    },
    logo:{
      alignSelf:'center',
    height:'150px',
    width:'300px',
    },
    logo2:{
    alignSelf:'end',
    height:'90px',
    width:'90px',
    marginTop:'130px',
    },
  
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
    marginTop:'90px',
    },

    text:{
        textAlign:'center',
        fontSize:'15px',
        marginTop:'30px',
    },
  });