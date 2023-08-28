import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';
import { Cadastro } from './componentes/Cadastro';
import { Login } from './componentes/Login';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default class App extends Component{

  render(){
  return (
    // estrutura de navegação do app
  <NavigationContainer initialRouteName='Login'>
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro}  />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
}



