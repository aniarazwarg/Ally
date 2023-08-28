import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';



export function Cadastro({navigation}){
    return (
    // estrutura de cadastro
    <View style={styles.container}>

      
            
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
        />

        <TextInput 
            style={styles.text1}
            placeholder="CPF"
        />

        <TextInput 
            style={styles.text1}
            placeholder="Data de Nascimento"
        />   

        <TextInput
            style={styles.text0}
            placeholder="Pet"
        />

        <TextInput 
          style={styles.text1}
          placeholder="Nome"
        />

        <TextInput 
          style={styles.text1}
          placeholder="Porte"
        />

        <TextInput 
          style={styles.text1}
          placeholder="Cor"
        />

        <TextInput 
          style={styles.text1}
          placeholder="Peso"
        />

        <TextInput 
          style={styles.text2}
          placeholder="Vacinas"
        />

        <TextInput 
          style={styles.text2}
          placeholder="Foto"
        />

      <View 
        style={styles.button}>

      <Button onPress={() => navigation.navigate('Login')} title="  Entrar  " color="#273A73"/>
      </View>



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
        height:'15%',
        width:'15%',
    },
  
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop:'90px',
    },

    text1:{
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
    },

    text0:{
      textAlign:'center',
      fontSize:'15px',
      marginTop:'30px',
    },

    text2:{
      flexDirection: 'row',
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
    }
  });