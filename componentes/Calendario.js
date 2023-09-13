import React from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button, TouchableOpacity, Pressable, Platform } from 'react-native';
import  {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';



LocaleConfig.locales['fr'] = {
   
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Quin.', 'Sext.', 'Sáb.'],
    today: "Hoje"
  };

  LocaleConfig.defaultLocale = 'fr';

export function Calendario({navigation}){

    const [selected, setSelected] = useState('');
    
    return (
    
        <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{ 
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      />
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2EAD0',
      alignItems:'center',
      justifyContent:'center'
    },
    image: {
      alignItems:'center'
    },
    logoBrothers:{
        height:100,
        width:'70%',
    },
    welcome: {
      alignItems:'center',
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
      color:'#273A73',
      fontSize:20,
      marginVertical: 10,
      backgroundColor:'#f5fffa',
      borderWidth:1,
      borderColor:'#273A73',
      padding:10,
      borderRadius:20,
      width: '90%'
      
    },

    text0:{
      textAlign:'center',
      fontSize:15,
      marginHorizontal: 55,
    },
    formulario: {
      alignItems:'center',
    },
    input:{
      textAlign:'center',
      fontSize:15,
      borderWidth: 2,
      borderColor: '#273A73',
      color:'#273A73',
      marginTop:15,
      padding:10,
      borderRadius:20,
      width:'85%',
      backgroundColor:'#F3EEDB'
    },
    button:{
      marginTop: 25,
      borderRadius:20,
      alignItems:'center',
      backgroundColor: '#6FAA9C',
      padding:12,
      width: '50%',
    },
    textButton: {
      color:'white',
      fontSize:15,
    },
    
   
  });