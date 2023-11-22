import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Modal, Portal,  PaperProvider,Button, Snackbar } from 'react-native-paper';


export function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [users, setUsers] = useState([]);

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handleSenhaChange = (text) => {
    setSenha(text);
  };

  function validaUsuario() {
//alert importante para a futura validação abaixo
 
    $validacao = users.find(user => user.email == email)
     
      try {
         if ($validacao.email == email && $validacao.senha == senha) {
       showModalAlertSucesso();
      } 
      else {
        onToggleSnackBar();
      }
      }
      catch {
        onToggleSnackBar();
      }
     
      
    
  }
  
 function NavigateLogin() {
  
  users.forEach((user) => {
    if (user.email == email) {
       navigation.navigate('Feed', { cd_cliente: user.cd_cliente, nm_cliente: user.nm_cliente });
    } 
  })

 }



  function getUsers() {
    fetch('http://localhost/api/usuarios')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }


  useEffect(() => {
    getUsers();
  }, [])

  const [visibleAlertErro, setVisibleAlertErro] = React.useState(false);
  const showModalAlertErro = () => setVisibleAlertErro(true);
  const hideModalAlertErro = () => setVisibleAlertErro(false);

  const [visibleAlertSucesso, setVisibleAlertSucesso] = React.useState(false);
  const showModalAlertSucesso = () => setVisibleAlertSucesso(true);
  const hideModalAlertSucesso = () => setVisibleAlertSucesso(false);

  const [visible2, setVisible2] = React.useState(false);

  const onToggleSnackBar = () => setVisible2(!visible2);
  const onDismissSnackBar = () => setVisible2(false);

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <PaperProvider>
  <Portal>

     <Modal visible={visibleAlertSucesso} onDismiss={NavigateLogin} contentContainerStyle={containerStyle}>
                 <Text>Login Feito com Sucesso ☺</Text>   
    </Modal>
    
    <Modal visible={visibleAlertErro} onDismiss={hideModalAlertErro} contentContainerStyle={containerStyle}>
                 <Text>Ocorreu um Errro ;-; </Text>   
    </Modal>

   
  </Portal>

    <View style={styles.container}>
      {/* Imagem */}
      <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} source={require('../assets/pegadas2.jpg')}>
        <View style={styles.imagem}>
          <Image style={styles.logoBrothers} source={require('../assets/Logo_Brothers.png')} />
        </View>
        {/* Formulário de login */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#596AA1'}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={'#596AA1'}
            onChangeText={handleSenhaChange}
          />
        </View>
        {/* Botão entrar/cadastrar*/}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonEntrar} onPress={(validaUsuario)}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCadastrar} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Esqueceu a senha */}
        <View style={styles.link}>
          <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
            <Text style={styles.texto}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        {users.map((user) => (
          <Text key={user.cd_cliente}>{user.email}</Text>
        ))}

         <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar}
        duration={300}
        >
       Erro ao acessar conta. Tente Novamente.
      </Snackbar>
      </ImageBackground>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAD0',
    justifyContent: 'center',
  },
  imagem: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoBrothers: {
    height: 150,
    width: '100%',
    backgroundColor: '#F8F4E8',
    borderRadius: 20
  },
  form: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%'
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#F3EEDB',
    marginVertical: 10,
    borderColor: '#273A73',
    borderWidth: 2,
    color: '#273A73',
    padding: 10,
    borderRadius: 20,
    width: '90%'
  },
  buttons: {
    alignItems: 'center',
    marginTop: 30,
    width: '100%'
  },
  buttonEntrar: {
    alignItems: 'center',
    backgroundColor: '#273A73',
    width: '50%',
    padding: 10,
    borderRadius: 20,
  },
  buttonCadastrar: {
    alignItems: 'center',
    backgroundColor: '#6FAA9C',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  texto: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 20
  },
  link: {
    alignItems: 'center',
    marginTop: 20,
    fontSize: 20,
    width: '60%',
    backgroundColor: '#F6F1EB',
    borderRadius: 20
  },
});
