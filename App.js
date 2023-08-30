import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './componentes/Login';
import { Cadastro } from './componentes/Cadastro';
import { RecuperacaoSenha } from './componentes/RecuperacaoSenha';
import { Passeio } from './componentes/Passeio';
import { Feed } from './componentes/Feed';

const Stack = createNativeStackNavigator();

export default class App extends Component{
  render(){
  return (
    // estrutura do app
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
        <Stack.Screen name='Passeio' component={Passeio}/>
        <Stack.Screen name='RecuperacaoSenha' component={RecuperacaoSenha}/>
        <Stack.Screen name='Feed' component={Feed}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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
  }
});
