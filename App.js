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
<<<<<<< HEAD
=======
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
    }
    }>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastro" component={Cadastro} />
    </Drawer.Navigator>
  )
}

export default function App() {
>>>>>>> parent of da7ee92 (atualiza)

export default function App(){
 
  return (
<<<<<<< HEAD

<NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
        <Stack.Screen name='Passeio' component={Passeio}/>
        <Stack.Screen name='RecuperacaoSenha' component={RecuperacaoSenha}/>
        <Stack.Screen name='Feed' component={Feed}/>
        <Stack.Screen name='Hotel' component={Calendario}/>
=======
    // estrutura do app
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Alo'>
        <Stack.Screen name='Passeio' component={Passeio} />
        <Stack.Screen name='RecuperacaoSenha' component={RecuperacaoSenha} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='AdicionarPet' component={AdicionarPet} />
        <Stack.Screen name='Perfil' component={Perfil} />
        <Stack.Screen name='Calendario' component={Calendario} />
>>>>>>> parent of da7ee92 (atualiza)
      </Stack.Navigator>
    </NavigationContainer>
  );
}
