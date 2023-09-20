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

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Selecionando data de início
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
      setMarkedDates({ [day.dateString]: { selected: true, color: 'green' } });
    } else {
      // Selecionando data de saída
      const start = new Date(selectedStartDate);
      const end = new Date(day.dateString);
      const dateRange = {};

      let currentDate = new Date(start);
      while (currentDate <= end) {
        const dateString = currentDate.toISOString().split('T')[0];
        dateRange[dateString] = { selected: true, color: 'green' };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedEndDate(day.dateString);
      setMarkedDates(dateRange);
    }
  };
    return (
      <View style={styles.container}> 
    <Text style={styles.header}>Agendamento no Hotel</Text>

 <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
      />
    
         
      <TextInput
      placeholder='Check in'
        style={styles.input}   
       value={selectedStartDate}
       
        keyboardType="numeric"
      />
      <TextInput
      placeholder='Check out'
        style={styles.input}   
        value={selectedEndDate}
        keyboardType="numeric"
      />
       

       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.textButton}>Agendar</Text>
        </TouchableOpacity>

        <Text style={styles.texto}>
        xx/xx horário especial de funcionamento.<br />
         ( 10 às 16h ) para check in
        </Text>

      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2EAD0',
     
    },

    calendario:{
      margin:'5.5vw',
      padding: 10,
      borderWidth:1,
      borderColor:'#273A73',
      borderRadius: 20,
    },
  
    link:{
      alignItems:'center',
      marginTop:100,
      textAlign:'center',
      fontSize:20,
    },
    input:{
      alignSelf:'center',
      textAlign:'center',
      color:'#273A73',
      fontSize:20,
      marginVertical: 10,
      backgroundColor:'#fff',
      borderWidth:1,
      borderColor:'#273A73',
      padding:10,
      borderRadius:10,
      width: '90%'
      
    },
  
    // input:focus {
    //   bordercolor: #FF0000; 
    // },
  
    logo:{
      alignSelf:'center',
      height:"40vw",
      width:'90vw',
    },
    logo2:{
    height:90,
    width:90,
    },
  
    button:{
      margin:'2.5vw',
      alignSelf:'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#273A73',
      width: '40%',
      padding: 10,
      borderRadius: 20,
      shadowRadius:10,
    },
    button2:{
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#6FAA9C',
      width: '40%',
      padding: 10,
      borderRadius: 20,
      marginTop: 20,
      shadowRadius:10,
    },
    texto:{ 
      textAlign:'center', 
      margin:'2vw',
      alignSelf:'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      shadowRadius:3,
      padding: '3vw',
  
      color: '#273A73',
      fontSize:20,
    },
    header:{
      textAlign:'center',
      fontSize:'4.7vw', 
      flex: 0,
      padding: '5%',
    },
    textButton:{
      color: 'white',
      fontSize: 20
    }
  });