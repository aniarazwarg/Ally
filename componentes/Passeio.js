import * as React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";

import { Modal, Portal, Text, Button, PaperProvider, Card, Avatar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

export function Passeio({ navigation }) {

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (

    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Tela não imprementada</Text>
        </Modal>
      </Portal>

      <View style={styles.container}>
        <ScrollView style={styles.scrollView}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerConteudo}>
              Passeio
            </Text>
          </View>
          {/* Logo Agility */}
          <View style={styles.imagem}>
            <Image source={require('../assets/passeio.png')}
              style={styles.logoBrothers} />
          </View>
          {/* Card de Texto */}
          <Card style={{marginTop: 30}}>
            <Card.Content style={styles.card}>
              <Text variant="titleLarge">Sobre:</Text>
              <Text variant="bodyLarge">  Contrate passeadores para levar seus cães para dar um volta.</Text>
            </Card.Content>
          </Card>
          {/* Texto  de Contato*/}
          <Text style={styles.texto}>
            Para realizar o agendamento deste serviço
            entre em contato com o Whatsapp:
            (13)999999999
          </Text>
          {/* Botão Voltar */}
          <TouchableOpacity style={styles.buttonCadastrar} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textButton}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAD0',
    paddingTop: StatusBar.currentHeight,
  },
  card: {
    backgroundColor: '#FCF6D7',
  },
  texto: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonCadastrar: {
    alignSelf: 'center',
    backgroundColor: '#6FAA9C',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    zIndex: 1,
    backgroundColor: '#F2EAD0',
    width: '100%'
  },
  headerConteudo: {
    flexDirection: 'row',
    textAlign: "center",
    marginHorizontal: 20,
    padding: 10,
    fontSize: 30,
    marginBottom: 20
  },
  logosHeader: {
    width: 40,
    height: 40
  },
  imagem: {
    alignItems: 'center',
  },
  logoBrothers: {
    maxHeight: 400,
    maxWidth: 400,
    width: "90%"
  },
  servicos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  servico: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
    borderColor: '#C0C0C0',
  },
});