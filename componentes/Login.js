import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

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
    users.forEach((user) => {
      if (user.email === email && user.senha === senha) {
        alert("Login realizado com sucesso!");
        navigation.navigate('Feed', { cd_cliente: user.cd_cliente });
        setEmail('');
        setSenha('');
      } else {
        console.log(email, senha)
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
  }, [users])


  return (
    <View style={styles.container}>
      {/* Imagem */}
      <ImageBackground style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} source={require('../assets/pegadas.jpg')}>
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
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={'#596AA1'}
            secureTextEntry={true}
            onChangeText={handleSenhaChange}
            value={senha}
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
        {/* {users.map((user) => (
          <Text key={user.cd_cliente}>{user.email}</Text>
        ))} */}
      </ImageBackground>
    </View>
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
    backgroundColor: '#F6F1EB',
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
