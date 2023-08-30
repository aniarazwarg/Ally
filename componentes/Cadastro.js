import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';



export function Cadastro({navigation}){
    return (
    // estrutura de cadastro
    <View style={styles.container}>
      <View>
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
        </View>
        <View>
        <Text>Pet</Text>
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
          style={styles.text3}
          placeholder="Foto"
        />
      </View>
      <View style={styles.button}>
      <Button  title="  Enviar  " color="#273A73" borderRadius="20px"/>
      </View>



      <Image style={styles.logo2} source={require('/assets/ally.png')} />
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
      marginTop:'90px',
      borderRadius:'20px',
    },

    text1:{
      textAlign:'center',
      fontSize:'15px',
      backgroundColor:'#273A73',
      marginTop:'20px',
      color:'#fff',
      padding:'10px',
      borderRadius:'20px',
      // width:'100',
    },

    text0:{
      textAlign:'center',
      fontSize:'15px',
      marginTop:'30px',
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