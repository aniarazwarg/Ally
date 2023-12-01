import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { Login } from './componentes/Login';
import { Cadastro } from './componentes/Cadastro';
import { RecuperacaoSenha } from './componentes/RecuperacaoSenha';
import { Passeio } from './componentes/Passeio';
import { Feed } from './componentes/Feed';
import { AdicionarPet } from './componentes/AdicionarPet';
import { Perfil } from './componentes/Perfil';
import { Calendario } from './componentes/Calendario';
import { ConexaoBanco } from './componentes/ConexaoBanco';
import { Adestramento } from './componentes/Adestramento';
import { Agility } from './componentes/Agility';
import { Comentarios } from './componentes/Comentarios';
import { MenuAdmin } from './componentes/MenuAdmin';
import { Clientes } from './componentes/Clientes';
import { Cliente } from './componentes/Cliente';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          backgroundColor: "#F2EAD0",
        }
      }}
      backBehavior='none'
    >
       <Drawer.Screen name="Feed" component={Feed} options={{
        drawerItemStyle: {
          backgroundColor: "#C1BBA6",
          width: '100%',
          margin: 0
        },
        drawerLabelStyle: {
          color: '#C1BBA6'
        },
        sceneContainerStyle: {
          backgroundColor: "red",
        }
      }}
      />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastro" component={Cadastro} />
      {/* <Drawer.Screen name="ConexaoBanco" component={ConexaoBanco} /> */}
    </Drawer.Navigator>
  )
}

function Admin() {
  return (
    <Drawer.Navigator initialRouteName='Clientes'>
      <Drawer.Screen name='MenuAdmin' component={MenuAdmin}/>
      <Drawer.Screen name='Clientes' component={Clientes}/>
      <Drawer.Screen name='Cliente' component={Cliente}/>
    </Drawer.Navigator>
  )
}


export default function App() {

  return (
    // estrutura do app
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Admin' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Passeio' component={Passeio} />
        <Stack.Screen name='RecuperacaoSenha' component={RecuperacaoSenha} />
        <Stack.Screen name='Home' component={MyDrawer} />
        <Stack.Screen name='AdicionarPet' component={AdicionarPet} />
        <Stack.Screen name='Perfil' component={Perfil} />
        <Stack.Screen name='Calendario' component={Calendario} />
        <Stack.Screen name='Adestramento' component={Adestramento} />
        <Stack.Screen name='Agility' component={Agility} />
        <Stack.Screen name='Comentarios' component={Comentarios}/>
        <Stack.Screen name='Admin' component={Admin}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
