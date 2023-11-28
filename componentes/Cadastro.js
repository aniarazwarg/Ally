import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image, Text, View, Button, TouchableOpacity, Pressable, Platform, ImageBackground } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import validator from 'validator';
import { Modal, Portal,  PaperProvider } from 'react-native-paper';




export function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [nasc, setNasc] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [senhaNaoCoincideMsg, setsenhaNaoCoincideMsg] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [telefone, setTelefone] = useState('');
  const [telefoneFormat, setTelefoneFormat] = useState('');
  const [users, setUsers] = useState('');
  const [cpfInvalidMsg, setCpfInvalidMsg] = useState(null)
  const [emailInvalidMsg, setEmailInvalidMsg] = useState(null)
  const [senhaInvalidMsg, setSenhaInvalidMsg] = useState(null)
  const [nomeInvalidMsg, setNomeInvalidMsg] = useState(null)
  // const [forceRerender, setForceRerender] = useState(false);


  // validacao nome

  function validarNome(nome) {
    regexNome = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
    if (nome.length >= 3 && nome.length <= 45 && regexNome.test(nome)) {
      return true;
    } else {
      return false;
    }
  }

  // validacao senha

  function validarSenha(password) {
    if (password.length >= 8 && password.length <= 30 && password == confirmPassword) {
      return true;
    } else {

      return false;
    }
  }

  // validacao de cpf

  function validarCPF(cpf) {
    var cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
    if (!cpfRegex.test(cpf)) {
      // console.log("cpf invalido")
      return false;
    }

    var numeros = cpf.match(/\d/g).map(Number);
    var soma = numeros.reduce((acc, cur, idx) => {
      if (idx < 9) {
        return acc + cur * (10 - idx);
      }
      return acc;
    }, 0);

    var resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== numeros[9]) {
      // console.log("cpf invalido")
      return false;
    }

    soma = numeros.reduce((acc, cur, idx) => {
      if (idx < 10) {
        return acc + cur * (11 - idx);
      }
      return acc;
    }, 0);

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== numeros[10]) {
      // console.log('cpf invalido')
      return false;
    }

    if (users.some(user => user.cpf === cpf)) {
      console.log('cpf ja utilizado')
      return false;
    }

    // console.log('cpf valido')

    return true;
  }

  // validacao de email

  function validaEmail() {
    if (validator.isEmail(email)) {
      // console.log('Valid email!')
      if (users.some(user => user.email === email)) {
        console.log('email ja utilizado')
        return false;
      } else {
        return true;
      }
    } else {
      // console.log('Enter valid Email!')
      return false;
    }
  }

  // handles

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleNomeChange = (text) => {
    setNome(text);
  };
  const handleCpfChange = (text) => {
    const cpfFormatado = formatCpfString(text);
    setCpf(cpfFormatado);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handleNascChange = (text) => {
    const formatado = formatDateString(text);
    setNasc(formatado);
  };
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };
  const handleTelefoneChange = (text) => {
    const telefoneFormatado = formatTelefoneString(text);
    setTelefone(telefoneFormatado);
  };

  // formata telefone

  const formatTelefoneString = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      return `(${cleaned.slice(0, 2)}) `
    }
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`
    }
    if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }
  }

  // Formata data

  const formatDateString = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      return cleaned;
    }
    if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  // formata cpf

  const formatCpfString = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    }
    if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    }
    if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}`;
    }
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }

  //funcao getUsers

  function getUsers() {
    fetch('http://localhost/api/usuarios')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }


  //Função cadastro
  
  const enviarDados = () => {
     fetch('http://localhost/api/cadastro', {
  //  fetch('http://192.168.0.11/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        nasc: dataNasc,
        email: email,
        senha: password,
        cpf: cpf,
        fotoPerfil: fotoPerfil,
        telefone: telefoneFormat
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

  // Função cadastrar

  function cadastrar() {
    if (validarCPF(cpf) && validaEmail() && validarNome(nome) && validarSenha(password)) {
      console.log('Cadastro realizado com sucesso!')
      enviarDados();
      navigation.navigate('Login')
    } else {
      if (!validarCPF(cpf)) {
        console.log('CPF inválido.')
        setCpfInvalidMsg('CPF inválido ou já utilizado. Tente outro.')
      }
      if (!validaEmail()) {
        console.log('Email inválido.')
        setEmailInvalidMsg('*Email inválido ou já utilizado. Tente outro.')
      }
      if (!validarNome(nome)) {
        console.log('Nome inválido')
        setNomeInvalidMsg('Nome não pode conter caracteres especiais ou números.')
      }
      if (!validarSenha(password)) {
        console.log('Senha inválida')
        setSenhaInvalidMsg('Email ou senha incorretos. Tente novamente.')
      }
    }
    // validaEmail();
    // console.log(validaEmail());
  }

  useEffect(() => {
    getUsers();

    if (dateOfBirth != "") {
      var data = dateOfBirth.split('/').reverse().join('-')
      setNasc(data)
    }
    if (nasc != "") {
      var data = nasc.split('/').reverse().join('-')
      setDataNasc(data);
    }
    if (telefone != "") {
      var tel = telefone.replace(/\D/g, '')
      setTelefoneFormat(tel)
    }
    if (password == confirmPassword) {
      setPasswordsMatch(true)
    } else {
      setPasswordsMatch(false)
      setsenhaNaoCoincideMsg('*Senhas não coincidem')
    }

    // setForceRerender(prevState => !prevState);
  }, [dateOfBirth, nasc, telefone, confirmPassword])

  
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const showModalAlert = () => setVisibleAlert(true);
  const hideModalAlert = () => setVisibleAlert(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={100}>

<PaperProvider>
  <Portal>
    <Modal visible={visibleAlert} onDismiss={hideModalAlert} contentContainerStyle={containerStyle}>
                 <Text>Ocorreu um Errro :( </Text>   
    </Modal>
  </Portal>

  <ImageBackground style={{ width: '100%', height: '100%', }}  source={require('../assets/pegadas2.jpg')}>

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
          {!validaEmail() && <Text style={{ color: 'red' }}>{emailInvalidMsg}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor={'#273A73'}
            onChangeText={handleTelefoneChange}
            value={telefone}
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
          <TextInput
          style={styles.input}
          placeholder='Data de nascimento'
          placeholderTextColor={'#273A73'}
          onChangeText={handleNascChange}
          autoComplete='birthdate-full'
          value={nasc}
          />
          {/* {!showPicker && (
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
          )} */}
        </View>
        <View style={{ flexDirection: 'row', width: '85%', justifyContent: 'space-evenly', alignSelf: 'center' }}>
          <View style={{ alignItems: 'center', width: '45%' }}>
            <TouchableOpacity style={styles.buttonVoltar} onPress={() => navigation.navigate('Feed')}>
              <Text style={styles.textButton} >Voltar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', width: '45%' }}>
            <TouchableOpacity style={styles.buttonCadastrar} onPress={cadastrar}>
              <Text style={styles.textButton} >Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ImageBackground>
      </PaperProvider>

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
    height: 120,
    width: '90%',
    backgroundColor: '#F8F4E8',
    borderRadius: 20,
    margin: 10,
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
  buttonCadastrar: {
    marginTop: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#6FAA9C',
    padding: 10,
    width: '100%',
  },
  buttonVoltar: {
    marginTop: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#2E1A82',
    padding: 10,
    width: '100%',
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },


});