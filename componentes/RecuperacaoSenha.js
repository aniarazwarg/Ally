import React from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity } from 'react-native';

export function RecuperacaoSenha({navigation}){
    return (
      // estrutura login
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../assets/Logo_Brothers.png')} />
        </View>
        <View style={{alignItems:'center'}}>
          <Text>Enviaremos sua senha no Email cadastrado:</Text>  
        </View>              
        <View style={{alignItems:'center'}}>
          <TextInput 
          style={styles.input}
          placeholder="Digite seu Email"
          />
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textButton}>Enviar</Text>
          </TouchableOpacity>
       
        </View>
        
  
        <Image style={styles.logo2} source={require('../assets/ally.png')} />
      </View>
    );
  }
  
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2EAD0',
    },
    link:{
      marginTop:100,
      textAlign:'center',
      fontSize:20,
      fontFamily:'arial',
    },
    input:{
      textAlign:'center',
      fontSize:20,
      marginTop:60,
      backgroundColor:'#273A73',
      color:'#fff',
      padding:10,
      borderRadius:20,
      width:'80%'
    },
    input1:{
    //   flex:'1',   (tentativa de diminuir o tam. do balão)
      textAlign:'center',
      fontSize:20,
      marginTop:60,
      backgroundColor:'#273A73',
      color:'#fff',
      padding:10,
      borderRadius:20,
    //   width:'30',   (tentativa de diminuir o tam. do balão)
    },
    logo:{
    height:150,
    width:300,
    },
    logo2:{
    height:90,
    width:90,
    marginTop:130,
    },
  
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
    marginTop:90,
    },

    text:{
        textAlign:'center',
        fontSize:15,
        marginTop:30,
    },
    button2:{
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#6FAA9C',
      width: '30%',
      padding: 10,
      borderRadius: 20,
      marginTop: 20,
    },
    textButton:{
      color: 'white',
      fontSize: 20
    }
  });