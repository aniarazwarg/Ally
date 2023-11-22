import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image, Text, View, Button, TouchableOpacity, Pressable, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [nasc, setNasc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [senhaNaoCoincideMsg, setsenhaNaoCoincideMsg] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [forceRerender, setForceRerender] = useState(false);

  //Confirmação de senha

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleNomeChange = (text) => {
    setNome(text);
  };
  const handleCpfChange = (text) => {
    setCpf(text);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleNascChange = (text) => {
    setNasc(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleSubmit = () => {
    if (password === confirmPassword) {
      console.log('Senhas coincidem:', password);
      setsenhaNaoCoincideMsg('')
    } else {
      setPasswordsMatch(false);
      setsenhaNaoCoincideMsg('*Senhas não coincidem.')
    }
  }

  //Função cadastro

  const enviarDados = () => {
    // fetch('http://localhost/api/cadastro', {
    fetch('http://192.168.0.11/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        nasc: nasc,
        email: email,
        senha: password,
        cpf: cpf,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };
  function cadastrar() {
    enviarDados();
    navigation.navigate('Login')
  }


  // DatePicker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  }
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate)

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate));
      }

    } else
      toggleDatepicker();
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${month}` : day;

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    var data = dateOfBirth.split('/').reverse().join('-')
    setNasc(data)
    setForceRerender(prevState => !prevState);
  }, [dateOfBirth])


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={100}>
      <View>
        <View>
          <View style={styles.image}>
            <Image style={styles.logoBrothers} source={require('../assets/Logo_Brothers.png')} />
          </View>
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>Bem vindo ao aplicativo da Brothers! Para se cadastrar preencha seus dados:</Text>
          </View>
        </View>
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor={'#273A73'}
            onChangeText={handleNomeChange}
            value={nome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'#273A73'}
            onChangeText={handleEmailChange}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={'#273A73'}
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            placeholderTextColor={'#273A73'}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />
          {!passwordsMatch && <Text style={{ color: 'red' }}>{senhaNaoCoincideMsg}</Text>}
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor={'#273A73'}
            onChangeText={handleCpfChange}
            value={cpf}
          />

          {/* <TextInput
            style={styles.input}
            placeholder='Data de nascimento'
            placeholderTextColor={'#273A73'}
            onChangeText={handleNascChange}
            autoComplete='birthdate-full'
            value={nasc}
          /> */}
          {!showPicker && (
            <Pressable
              onPress={toggleDatepicker}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <TextInput
                style={styles.input}
                placeholder="Data de Nascimento"
                placeholderTextColor={"#273A73"}
                value={dateOfBirth}
                onChange={setDateOfBirth}
                editable={false}
              />
            </Pressable>
          )}

          {showPicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onChange}
              maximumDate={new Date(2006, 0, 0)}
            />
          )}
          <Text>{nasc}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.textButton} >Enviar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
            <Text style={styles.textButton} >Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAD0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignItems: 'center'
  },
  logoBrothers: {
    height: 100,
    width: '70%',
  },
  welcome: {
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 15,
    marginHorizontal: 55,
  },
  formulario: {
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#273A73',
    color: '#273A73',
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    width: '85%',
    backgroundColor: '#F3EEDB'
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#6FAA9C',
    padding: 12,
    width: '50%',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },


});