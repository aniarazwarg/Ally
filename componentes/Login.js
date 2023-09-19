import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity } from 'react-native';


export function Login({navigation}){
  
   const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    // estrutura login
    <View style={styles.container}>
      {/* Imagem */}
      <View>
        <Image style={styles.logo} source={require('../assets/Logo_Brothers.png')} />
      </View>
      {/* Formulário de login */}
      
      <View style={{marginTop: 20, alignItems:'center'}}>
     
  
        <TextInput 
          style={styles.input}
          placeholder="Login"
          // placeholderTextColor={'#fff'}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          // placeholderTextColor={'#fff'}
        />
       
      </View>   
      {/* Botão entrar/cadastrar*/}
      <View style={{alignItems:'center', marginTop: 30}}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() =>navigation.navigate('Cadastro')}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      {/* Esqueceu a senha */}
      <View style={styles.link}>
        <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('RecuperacaoSenha')}>
          <Text style={styles.texto}>Esqueceu a senha?</Text>
          <Text style={styles.texto}>Clique aqui!</Text>
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
    justifyContent:'center'
  },
  link:{
    alignItems:'center',
    marginTop:100,
    textAlign:'center',
    fontSize:20,
  },
  input:{
    textAlign:'center',
    color:'#273A73',
    fontSize:20,
    marginVertical: 10,
    backgroundColor:'#f5fffa',
    borderWidth:1,
    borderColor:'#273A73',
    padding:10,
    borderRadius:20,
    width: '90%'
    
  },

  // input:focus {
  //   bordercolor: #FF0000; 
  // },

  logo:{
    alignSelf:'center',
    height:"40vw",
    width:'90vw',
  },
  logo2:{
  height:90,
  width:90,
  },

  button:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#273A73',
    width: '40%',
    padding: 10,
    borderRadius: 20,
    shadowRadius:10,
  },
  button2:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6FAA9C',
    width: '40%',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    shadowRadius:10,
  },
  texto:{
    textDecorationLine: 'underline',
    color: '#273A73',
    fontSize:20,
  },
  textButton:{
    color: 'white',
    fontSize: 20
  }
});