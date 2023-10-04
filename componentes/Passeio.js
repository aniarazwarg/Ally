import * as React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
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
            <View style={styles.headerConteudo}>
              <View>
                <Text>
                    Agility
                </Text>
              </View>
              
            </View>
          </View>
          {/* Logo Agility */}
          <View style={styles.imagem}>
            <Image source={require('../assets/agility.png')}
              style={styles.logoBrothers} />
          </View>
         {/* Card de Texto */}
        <Text>
            Sobre: O agility é um esporte para cães, o qual
            eles percorrem um circuito desafiador e que exige
            habilidade dos bichos. Este tipo de atividade visa
            buscar melhorar a saúde do animal.
        </Text>

         {/* Card de Texto */}
        <Text>
        Para realizar o agendamento deste serviço
        entre em contato com o Whatsapp:
        (13)999999999
        </Text>

          {/* Botão Voltar */}
          <TouchableOpacity>
          <View style={styles.noticias}>  
             
            <View style={styles.noticia}>           
              <Text style={styles.text2}>Voltar</Text>
            </View>
          </View>
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
  scrollView: {

  },
  header: {
    zIndex: 1,
    backgroundColor: '#F2EAD0',
    width: '100%'
  },
  headerConteudo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 5,
    fontSize: 340,

  },
  logosHeader: {
    width: 40,
    height: 40
  },
  imagem: {
    alignItems: 'center',
  },
  logoBrothers: {
    height: 300,
    width: '90%',
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
  logoServicos: {
    height: 80,
    width: 80,
  },
  textServicos: {
    fontSize: 10,
    textAlign: 'center',
  },

  //Noticias
  noticias: {
    marginLeft: 20,
    marginTop: 15,
  },
  noticia: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FCF6D7',
    padding: 6,
    borderRadius: 10,
    marginRight: 20
  },
  logo3: {
    height: 50,
    width: 50,
  },

  text2: {
    color: "#273A73",
    marginLeft: 20
  },

  //Comentários
  comentariosHeader: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leiaMais: {
    marginRight: 20,
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  comentarios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20
  },
  comentarioCard: {
    backgroundColor: '#FCF6D7',
    width: '45%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    height: 150,
    justifyContent: 'space-between'
  },
  nomeUsuario: {
    marginLeft: 10,
  },

  //Cria comentários
  digiteComentario: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 300,
  },
  textTopicos: {
    color: '#60452F',
    fontWeight: 'bold'
  },
  inputComentario: {
    backgroundColor: '#FCF6D7',
    height: 40,
    marginRight: 30,
    borderRadius: 20,
    paddingLeft: 30,
    marginTop: 10,
  }
});