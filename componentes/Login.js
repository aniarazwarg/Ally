import React from 'react';
import { StyleSheet, TextInput, Image, Text, View, TouchableOpacity } from 'react-native';

export function Login({navigation}){
  return (
    <View style={styles.container}>
      {/* Imagem */}
      <View style={styles.imagem}>
        <Image style={styles.logoBrothers} source={require('../assets/Logo_Brothers.png')} />
      </View>
      {/* Formulário de login */}
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Login"
          placeholderTextColor={'#596AA1'}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={'#596AA1'}
        />
      </View>   
      {/* Botão entrar/cadastrar*/}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonEntrar} onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCadastrar} onPress={() =>navigation.navigate('Cadastro')}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {/* Esqueceu a senha */}
      <View style={styles.link}>
        <TouchableOpacity  onPress={() => navigation.navigate('RecuperacaoSenha')}>
          <Text style={styles.texto}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F2EAD0',
    justifyContent:'center'
  },
  imagem: {
    alignItems:'center',
  },
  logoBrothers:{
    height:150,
    width:'90%',
  },
  form: {
    marginTop: 20,
    alignItems:'center',
  },
  input:{
    textAlign:'center',
    fontSize:20,
    backgroundColor:'#F3EEDB',
    marginVertical: 10,
    borderColor:'#273A73',
    borderWidth:2,
    color:'#273A73',
    padding:10,
    borderRadius:20,
    width: '90%'
  },
  buttons:{
    alignItems:'center',
    marginTop: 30
  },
  buttonEntrar:{
    alignItems:'center',
    backgroundColor: '#273A73',
    width: '50%',
    padding: 10,
    borderRadius: 20,
  },
  buttonCadastrar:{
    alignItems:'center',
    backgroundColor: '#6FAA9C',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  texto:{
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize:20,
  },
  textButton:{
    color: 'white',
    fontSize: 20
  },
  link:{
    alignItems:'center',
    marginTop:20,
    fontSize:20,
  },
});
