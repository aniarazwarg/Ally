import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './componentes/Login';
import { Cadastro } from './componentes/Cadastro';
import { RecuperacaoSenha } from './componentes/RecuperacaoSenha';
import { Passeio } from './componentes/Passeio';
import { Feed } from './componentes/Feed';

const Stack = createNativeStackNavigator();

export default function App(){
 
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
