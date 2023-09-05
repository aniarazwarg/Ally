import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './componentes/Login';
import { Cadastro } from './componentes/Cadastro';
import { RecuperacaoSenha } from './componentes/RecuperacaoSenha';
import { Passeio } from './componentes/Passeio';
import { Feed } from './componentes/Feed';
import { Calendario } from './componentes/Calendario';

const Stack = createNativeStackNavigator();

export default function App(){
 
  return (

 <Calendario></Calendario>
  );
}
