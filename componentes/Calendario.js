import React from 'react';
import { StyleSheet, TextInput, Image, Text, View, TouchableOpacity, Pressable, Platform, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Modal, Portal,  PaperProvider, Snackbar, Button } from 'react-native-paper';




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

export function Calendario({ navigation, route }) {

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [statusReserva, setStatusReserva] = useState('Aguardando');
  const { cd_cliente } = route.params || { cd_cliente: null };
  const [hoje, setHoje] = useState(new Date().toJSON().slice(0, 10))
  const [erro, setErro] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const onToggleSnackBar = () => setVisible2(!visible2);
  const onDismissSnackBar = () => setVisible2(false);

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

    const agendar = () => {
      try {
       
        setErro(false);
        fetch('http://localhost/api/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cd_cliente: cd_cliente,
          dt_checkin: selectedStartDate,
          dt_checkout: selectedEndDate,
          statusReserva: statusReserva,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    
    
      } catch (error) {
        setErro(true)
      }
      }
      

    console.log(cd_cliente)

  function validaAgendamento() {
    if(selectedStartDate !=null && selectedEndDate !=null && selectedStartDate !='' && selectedEndDate !=''){
      setErro(false);
    onToggleSnackBar();
    agendar();
    setSelectedStartDate('');
    setSelectedEndDate('');
    }
    else{
      setErro(true)
    }
    // navigation.navigate('Home');
  };


function teste(){

  alert(hoje)

}
 
  return (
    <PaperProvider>
    <View style={styles.container}>
      <ImageBackground style={{ width: '100%', height: '100%', }}  source={require('../assets/pegadas2.jpg')}>
      <View>
        <Text style={styles.header}>Agendamento no Hotel</Text>
      </View>
      <View>
        <Calendar
          minDate={hoje}
          onDayPress={onDayPress}
          markedDates={markedDates}
          enableSwipeMonths={true}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            margin: 25,
            borderRadius: 10,
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e',
            
            }}
        />
      </View>
{/* <Button onPress={teste}>aaaa</Button> */}
      <View>
        <TextInput
          placeholder='Check in'
          style={styles.input}
          value={selectedStartDate == null ? selectedStartDate : selectedStartDate.split('-').reverse().join('/')}
          keyboardType="numeric"
        />
        <TextInput
          placeholder='Check out'
          style={styles.input}
          value={selectedEndDate == null ? selectedEndDate : selectedEndDate.split('-').reverse().join('/')}
          keyboardType="numeric"
        />
        {erro && (
            <Text style={styles.errorMessage}>
              *Erro no agendamento
            </Text>
          )}
      </View>
      <View style={{ marginHorizontal: 25, marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={validaAgendamento}>
          <Text style={styles.textButton}>Agendar</Text>
        </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 25, marginTop: 10 }}>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>
      </View></ImageBackground>
    </View>
    <Snackbar
    visible={visible2}
    onDismiss={onDismissSnackBar}
    duration={700}
    >
   Seu pedido de reserva foi enviado com sucesso!
  </Snackbar>
</PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAD0',

  },
  calendario: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#273A73',
    borderRadius: 20,
  },

  link: {
    alignItems: 'center',
    marginTop: 100,
    textAlign: 'center',
    fontSize: 20,
  },
  errorMessage:{
    color: 'red' ,
    fontSize:15,
    alignSelf:'center',
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#273A73',
    fontSize: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#273A73',
    padding: 10,
    borderRadius: 10,
    width: '90%'

  },

  // input:focus {
  //   bordercolor: #FF0000; 
  // },

  logo: {
    alignSelf: 'center',
  },
  logo2: {
    height: 90,
    width: 90,
  },

  button: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#273A73',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    
  },
  button2: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6FAA9C',
    width: '50%',
    padding: 10,
    borderRadius: 20,
   
  },
  texto: {
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowRadius: 3,
    marginTop: 30,
    color: '#273A73',
    fontSize: 20,
  },
  header: { 
    textAlign: 'center',
    flex: 0,
    fontSize: 30,
    margin: 20,
    marginBottom: 0,
    fontWeight: 'bold',

    height: 120,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
  
  },
  textButton: {
    color: 'white',
    fontSize: 20
  }
});