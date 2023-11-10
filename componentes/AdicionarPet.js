import react from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, } from "react-native";
import React, { useState } from "react";

export function AdicionarPet({ navigation }) {


  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [porte, setPorte] = useState('');
  const [cor, setCor] = useState('');
  const [peso, setPeso] = useState('');


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
    fetch('http://192.168.0.11/api/AdicionarPet', {
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
    navigation.navigate('Home')
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <TextInput
            style={styles.input2}
            placeholder="Vacinas"
            placeholderTextColor={'#273A73'}
          />
          <TextInput
            style={styles.input2}
            placeholder="Foto"
            placeholderTextColor={'#273A73'}
          />
        </View>
        <View style={{ alignItems: 'center', width:'100%' }}>
          <TouchableOpacity style={styles.button} onPress={AdicionarPet}>
            <Text style={styles.textButton} >Envar</Text>
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