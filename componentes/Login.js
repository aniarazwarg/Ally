import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';



export function Login({navigation}){
  return (
    // estrutura login
    <View style={styles.container}>

      <Image style={styles.logo} source={require('/assets/Logo_Brothers.png')} />
            
      <TextInput 
       style={styles.input}
       placeholder="Login"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
      />

      <View 
        style={styles.button}>

      <Button onPress={() => navigation.navigate('Cadastro')} title="  Entrar  " color="#273A73"/>
      </View>


      <View style={styles.link}>
        <div>Esqueceu sua senha?</div>
        <div>Clique aqui!</div>

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
    backgroundColor:'#F2EAD0',
    marginTop:'50px',
    textAlign:'center',
    fontSize:'20px',
    fontFamily:'arial',
  },
  input:{
    textAlign:'center',
    fontSize:'20px',
    marginTop:'50px',
    backgroundColor:'#273A73',
    color:'#fff',
    padding:'10px',
    borderRadius:'20px',
  },
  logo:{
    backgroundColor:'#F2EAD0',
    alignSelf:'center',
    height:'20%',
    width:'100%',
  },
  logo2:{
    backgroundColor:'#F2EAD0',
    alignSelf:'end',
    height:'15%',
    width:'15%',
  },

  button:{
    backgroundColor:'#F2EAD0',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:'50px',
  }
});
