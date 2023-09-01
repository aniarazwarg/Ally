import React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity, Pressable, Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";



export function Cadastro({navigation}){
    
  const [password, setPassword] = useState('');
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleSubmit = () => {
    console.log('Senha enviada:', password);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');


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

      if(Platform.OS === 'android') {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate));
      }

    } else
      toggleDatepicker();
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${month}` : day;

    return `${day}/${month}/${year}`;
  };


  return (

   
    // estrutura de cadastro
    <View style={styles.container}>
      <View>
      <View>
        <Image style={styles.logo} source={require('../assets/Logo_Brothers.png')} />
      </View>
      <View style={{alignItems:'center'}}>
        <Text style={styles.text0}>Bem vindo ao aplicativo da Brothers! Para se cadastrar preencha seus dados:</Text>
      </View>
      </View>
      <View style={{alignItems:'center'}}>
        <TextInput 
          style={styles.text1}
          placeholder="Nome"
          placeholderTextColor={'#fff'}
        />
        <TextInput 
          style={styles.text1}
          placeholder="Email"
          placeholderTextColor={'#fff'}
        />
        <TextInput 
          style={styles.text1}
          placeholder="Senha"
          placeholderTextColor={'#fff'}
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput 
          style={styles.text1}
          placeholder="Confirme a senha"
          placeholderTextColor={'#fff'}
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput 
          style={styles.text1}
          placeholder="CPF"
          placeholderTextColor={'#fff'}
        />
        {!showPicker && (
          <Pressable
          onPress={toggleDatepicker}
          style={{width:'100%', alignItems:'center'}}
        >
          <TextInput 
            style={styles.text1}
            placeholder="Data de Nascimento"
            placeholderTextColor={"#fff"}
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
        
      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity  style={styles.button} onPress={handleSubmit}>
          <Text style={{color:'white'}}>Enviar</Text>
        </TouchableOpacity>
      </View>



      <Image style={styles.logo2} source={require('../assets/ally.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffff',
      backgroundColor:'#F2EAD0',

    },
    link:{
      marginTop:100,
      textAlign:'center',
      fontSize:20,
      fontFamily:'arial',
    },
    input:{
      textAlign:'center',
      fontSize:20,
      marginTop:90,
      backgroundColor:'#273A73',
      color:'#fff',
      padding:10,
      borderRadius:20,
    },
    logo:{
        height:200,
        width:400,
    },
    logo2:{
        height:90,
        width:90,
    },
  
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 40,
      borderRadius:20,
      backgroundColor: '#6FAA9C',
      padding:10,
      width: '80%',
    },

    text1:{
      textAlign:'center',
      fontSize:15,
      backgroundColor:'#273A73',
      marginTop:20,
      color:'#fff',
      padding:10,
      borderRadius:20,
      width:'80%'
      // width:'100',
    },

    text0:{
      textAlign:'center',
      fontSize:15,
      marginHorizontal: 55,
    },

    text2:{
      ...StyleSheet.absoluteFillObject,
      top: 590,
      left: 40,
      width: 110,
      height: 45,
      flexDirection: 'row',
      textAlign:'center',
      fontSize:15,
      backgroundColor:'#273A73',
      marginTop:20,
      color:'#fff',
      padding:5,
      borderRadius:20,
    
    },

    text3:{
      ...StyleSheet.absoluteFillObject,
      top: 590,
      left: 200,
      width: 110,
      height: 45,
      flexDirection: 'row',
      textAlign:'center',
      fontSize:15,
      backgroundColor:'#273A73',
      marginTop:20,
      color:'#fff',
      padding:5,
      borderRadius:20,

    }
  });