import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity } from 'react-native';


export function Login({navigation}){
  return (
    // estrutura login
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('/assets/Logo_Brothers.png')} />
      </View>
      <View style={{marginTop: 20, alignItems:'center'}}>
        <TextInput 
          style={styles.input}
          placeholder="Login"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
        />
      </View>            
      <View style={{alignItems:'center', marginTop: 20}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.link}>
        <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('RecuperacaoSenha')}>
          <Text style={styles.texto}>Esqueceu a senha?</Text>
          <Text style={styles.texto}>CLique aqui!</Text>

        </TouchableOpacity>

      </View>

      <Image style={styles.logo2} source={require('/assets/ally.png')} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2EAD0',
    justifyContent:'center'
  },
  link:{
    alignItems:'center',
    marginTop:'100px',
    textAlign:'center',
    fontSize:'20px',
    fontFamily:'arial',
  },
  input:{
    textAlign:'center',
    fontSize:'20px',
    marginVertical: 10,
    backgroundColor:'#273A73',
    color:'#fff',
    padding:'10px',
    borderRadius:'20px',
    width: '90%'
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
    backgroundColor: '#273A73',
    width: '30%',
    padding: 10,
    borderRadius: 20,
    
  },

  texto:{
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize:20,
  },
  textButton:{
    color: 'white',
    fontSize: 20
  }
});
