import react from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import React, { useState } from "react";

export function AdicionarPet({ navigation, route }) {


  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [porte, setPorte] = useState('');
  const [cor, setCor] = useState('');
  const [peso, setPeso] = useState('');
  const [v8, setV8] = useState(false);
  const [antirrabica, setAntirrabica] = useState(false);
  const [gripe, setGripe] = useState(false);
  const [giardia, setGiardia] = useState(false);
  const { cd_cliente } = route.params || { cd_cliente: null };

  const handleNomeChange = (text) => {
    setNome(text);
  };
  const handleRacaChange = (text) => {
    setRaca(text);
  };
  const handlePorteChange = (text) => {
    setPorte(text);
  };
  const handleCorChange = (text) => {
    setCor(text);
  };
  const handlePesoChange = (text) => {
    setPeso(text);
  };



  //Função adicionar

  const enviarDados = () => {
    fetch('http://localhost/api/AdicionarPet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        raca: raca,
        porte: porte,
        cor: cor,
        peso: peso,
        cd_cliente: cd_cliente,
        v8: v8,
        antirrabica: antirrabica,
        gripe: gripe,
        giardia: giardia,
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

  
  function AdicionarPet() {
    enviarDados();
    // navigation.navigate('Home')
  }




  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
      </View>
      <View style={{ alignItems: 'center', width: '85%', marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor={'#273A73'}
          onChangeText={handleNomeChange}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          placeholderTextColor={'#273A73'}
          onChangeText={handleRacaChange}
          value={raca}
        />
        <TextInput
          style={styles.input}
          placeholder="Porte"
          placeholderTextColor={'#273A73'}
          onChangeText={handlePorteChange}
          value={porte}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor"
          placeholderTextColor={'#273A73'}
          onChangeText={handleCorChange}
          value={cor}
        />
        <TextInput
          style={styles.input}
          placeholder="Peso"
          placeholderTextColor={'#273A73'}
          onChangeText={handlePesoChange}
          value={peso}
        />
        <View style={styles.vacinas}>
          <View>
            <Text style={{ alignSelf: 'center', fontSize: 15, color: '#273A73' }}>Vacinas</Text>
          </View>
          <View style={styles.vacina}>
            <Text style={{ fontSize: 15, marginRight: 5, width: '30%' }}>V8/V10</Text>
            <Checkbox
              value={v8}
              onValueChange={setV8}
            />
          </View>
          <View style={styles.vacina}>
            <Text style={{ fontSize: 15, marginRight: 5, width: '30%' }}>Antirrabica</Text>
            <Checkbox
              value={antirrabica}
              onValueChange={setAntirrabica}
            />
          </View>
          <View style={styles.vacina}>
            <Text style={{ fontSize: 15, marginRight: 5, width: '30%' }}>Gripe</Text>
            <Checkbox
              value={gripe}
              onValueChange={setGripe}
            />
          </View>
          <View style={styles.vacina}>
            <Text style={{ fontSize: 15, marginRight: 5, width: '30%' }}>Giardia</Text>
            <Checkbox
              value={giardia}
              onValueChange={setGiardia}
            />
          </View>

        </View>

        {/* <View style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={AdicionarPet}>
            <Text style={styles.textButton} >Enviar</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ alignItems: 'center', width: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={AdicionarPet}>
          <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.textButton}>Voltar</Text>
        </TouchableOpacity>
      </View>







      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2EAD0',
  },
  logoUser: {
    width: 200,
    height: 200
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
    backgroundColor: '#F3EEDB',
    width: '100%'
  },
  input2: {
    textAlign: 'center',
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#273A73',
    color: '#273A73',
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    width: '48%',
    backgroundColor: '#F3EEDB',
  },
  vacinas: {
    flexDirection: 'column', justifyContent: 'space-between', width: '100%', borderWidth: 2, borderRadius: 20, backgroundColor: '#F3EEDB', borderColor: '#273A73', marginTop: 15, paddingBottom: 10
  },
  vacina: {
    flexDirection: 'row', alignItems: 'center', paddingLeft: 10, justifyContent:'space-around'
  },
  textVacina: {
    FontSize: 15, marginRight: 5, width: '30%'
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#6FAA9C',
    padding: 12,
    width: '100%',
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
});