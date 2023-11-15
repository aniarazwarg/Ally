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
  // const [dateOfBirth, setDateOfBirth] = useState('');

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



  //validarEmail
//   const apiKey = '673ddd839d5d421295bcb2d9e44cbc5b';
// const apiURL = 'https://emailvalidation.abstractapi.com/v1/?api_key=673ddd839d5d421295bcb2d9e44cbc5b&email=niah.zwarg@gmail.com';

// const sendEmailValidationRequest = async (email) => {
//   try {
//       const response = await fetch.get(apiURL + '&email=' + email);
//       const data = response.json();
//       return data.is_valid_format.value;
//   } catch (error) {
//       throw error;
//   }
// }
// const handleSubmit2 = async (email) => {
//   try {
//       const isValid = await sendEmailValidationRequest(email);
//       if (isValid) {
//           setErrorMessage("");
//           console.log("SUBMITTED! ", email);
//       } else {
//           setErrorMessage("INVALID EMAIL.PLEASE CHECK YOUR INPUT AND TRY AGAIN.");
//           console.log("EMAIL WAS INVALID.", email);
//       }
//       return isValid;
//   } catch (error) {
//       setErrorMessage("SOMETHING WENT WRONG.PLEASE TRY AGAIN LATER.");
//   }





  //Função cadastro
  
  const enviarDados = () => {
    fetch('http://localhost/api/cadastro', {
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
  function validaCPF() {
      //  // Extrai somente os números
       
      //  var exp = /\.|\-/g
      //  cpf = cpf.toString().replace(exp, "");

   
    // Verifica se foi informado todos os digitos corretamente
    if (cpf.length != 11) {
        alert('CPF Invalido!');
        return;
    }
    // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
    if (cpf.match(/(\d)\1{10}/)) {
        alert('CPF Invalido!');
        return;
    }
    // Faz o calculo para validar o CPF
    for (let t = 9; t < 11; t++) {
        for (d = 0, c = 0; c < t; c++) {
            d += cpf[c] * ((t + 1) - c);
        }
        d = ((10 * d) % 11) % 10;
        if (cpf[c] != d) {
            alert('CPF Invalido!');
            return;
        }
    }
    alert('CPF valido!');
    enviarDados();
    sendEmailValidationRequest();

    navigation.navigate('Feed')
    return;
 }
  function cadastrar() {

    validaCPF();
   
    
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
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.textButton} >Enviar</Text>
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