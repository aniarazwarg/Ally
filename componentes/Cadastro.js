import React, {Component} from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity } from 'react-native';



export function Cadastro({navigation}){
    
  const [password, setPassword] = useState('');
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleSubmit = () => {
    console.log('Senha enviada:', password);
  };
  const [confirmPassword, setConfirmPassword] = useState('');

  return (

   
    // estrutura de cadastro
    <View style={styles.container}>
      <View>
      <View>
        <Image style={styles.logo} source={require('../assets/Logo_Brothers.png')} />
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={styles.text0}>Bem vindo ao aplicativo da Brothers! Para se cadastrar preencha seus dados.</Text>
      </View>
      </View>
      <View style={{alignItems:'center'}}>
        <TextInput 
          style={styles.text1}
          placeholder="Nome"
        />
        <TextInput 
          style={styles.text1}
          placeholder="Email"
        />
        <TextInput 
          style={styles.text1}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput 
          style={styles.text1}
          placeholder="Confirme a senha"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput 
          style={styles.text1}
          placeholder="CPF"
        />
        <TextInput 
          style={styles.text1}
          placeholder="Data de Nascimento"
        />   
      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity  style={styles.button} onPress={handleSubmit}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>



      <Image style={styles.logo2} source={require('../assets/ally.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffff',
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
      marginTop:'90px',
      backgroundColor:'#273A73',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
    },
    logo:{
        alignSelf:'center',
        height:'200px',
        width:'400px',
    },
    logo2:{
        alignSelf:'end',
        height:'90px',
        width:'90px',
    },
  
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 40,
      borderRadius:'20px',
      backgroundColor: '#6FAA9C',
      padding:'10px',
      width: '80%',
    },

    text1:{
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
      width:'80%'
      // width:'100',
    },

    text0:{
      textAlign:'center',
      fontSize:'15px',
    },

    text2:{
      ...StyleSheet.absoluteFillObject,
      top: 590,
      left: 40,
      width: 110,
      height: 45,
      flexDirection: 'row',
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'5px',
      borderRadius:'20px',
    
    },

    text3:{
      ...StyleSheet.absoluteFillObject,
      top: 590,
      left: 200,
      width: 110,
      height: 45,
      flexDirection: 'row',
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'5px',
      borderRadius:'20px',

    }
  });