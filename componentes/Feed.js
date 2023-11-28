import * as React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

export function Feed({ navigation, route }) {

  const [visible, setVisible] = React.useState(false);
  const [nome, setNome] = React.useState(null);
  const [fotoPerfil, setFotoPerfil] = React.useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const { cd_cliente } = route.params || { cd_cliente: null };
  const [users, setUsers] = React.useState([]);
  // const foto = require(fotoPerfil)

  function getUsers() {
    fetch('http://localhost/api/usuarios')
    // fetch('http://192.168.0.11/api/usuarios')
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }


  console.log(nome, cd_cliente)

  if (users.length === 0 && cd_cliente !== null) {
    getUsers();
  }

  React.useEffect(() => {
    users.forEach((user) => {
      if (cd_cliente == user.cd_cliente) {
        setNome(user.nm_cliente)
        setFotoPerfil(user.fotoPerfil)

      }
    })
  }, [users])

  return (

    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Não imprementado</Text>
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
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Image source={require('../assets/menu-bar.png')}
                    style={styles.logosHeader}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {nome !== null && (
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bem vindo, {nome}!</Text>
                )}
                {nome == null && (
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bem vindo!</Text>
                )}

              </View>
              <View>
                {cd_cliente == null && (
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image source={require('../assets/icon_usuario.png')}
                      style={styles.logosHeader2} />
                  </TouchableOpacity>
                )}
                {cd_cliente !== null && (
                  <TouchableOpacity onPress={() => navigation.navigate('Perfil', { cd_cliente: cd_cliente })}>
                    {(fotoPerfil !== null && fotoPerfil !== "" ) && (
                      <Image source={'../assets/' + fotoPerfil}
                        style={styles.logosHeader2} />
                    )}
                    {(fotoPerfil == null || fotoPerfil == "") && (
                      <Image source={require('../assets/icon_usuario.png')}
                        style={styles.logosHeader2} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          {/* Logo Brothers */}
          <View style={styles.imagem}>
            <Image source={require('../assets/Logo_Brothers.png')}
              style={styles.logoBrothers} />
          </View>
          {/* Logo serviços */}
          <View style={styles.servicos}>
            {cd_cliente == null && (
              <TouchableOpacity style={styles.servico}
                onPress={() => navigation.navigate('Login')}>
                <Image source={require('../assets/hotel.png')}
                  style={styles.logoServicos}
                />
                <Text style={styles.textServicos}>Hotel</Text>
              </TouchableOpacity>
            )}
            {cd_cliente !== null && (
              <TouchableOpacity style={styles.servico}
                onPress={() => navigation.navigate('Calendario')}>
                <Image source={require('../assets/hotel.png')}
                  style={styles.logoServicos}
                />
                <Text style={styles.textServicos}>Hotel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.servico}
              onPress={() => navigation.navigate('Passeio')}>
              <Image source={require('../assets/passeio.png')}
                style={styles.logoServicos}
              />
              <Text style={styles.textServicos}>Passeio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.servico}
              onPress={() => navigation.navigate('Adestramento')}>
              <Image source={require('../assets/adestrar.png')}
                style={styles.logoServicos}
              />
              <Text style={styles.textServicos}>Adestramento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.servico}
              onPress={() => navigation.navigate('Agility')}>
              <Image source={require('../assets/agility.png')}
                style={styles.logoServicos}
              />
              <Text style={styles.textServicos}>Agility</Text>
            </TouchableOpacity>
          </View>
          {/* Noticias */}
          <View style={styles.noticias}>
            <Text style={styles.textTopicos}>Notícias:</Text>
            <View style={styles.noticia}>
              <Image source={require('../assets/favicon.png')}
                style={styles.logo3} />
              <Text style={styles.text2}>Vagas para o feriado!</Text>
            </View>
            <View style={styles.noticia}>
              <Image source={require('../assets/favicon.png')}
                style={styles.logo3} />
              <View>
                <Text style={styles.text2}>Live no Instagram</Text>
                <Text style={styles.text3}>Novidades pra vocês!</Text>
              </View>
            </View>
          </View>
          {/* Comentários */}
          <View>
            <View style={styles.comentariosHeader}>
              <Text style={styles.textTopicos}>Comentários:</Text>
              <TouchableOpacity style={styles.leiaMais} onPress={() => navigation.navigate("Comentarios")}>
                <Text>Leia mais {'>'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.comentarios}>
              <View style={styles.comentarioCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/icon_usuario.png')}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.nomeUsuario}>Maria</Text>
                  </View>
                  <Image
                    source={require('../assets/avaliacao.png')}
                    style={{ width: 50, height: 20 }}
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.textoComentario}>Adorei a experiência que o Bob Marley teve com vocês!</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/like.png')}
                      style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/dislike.png')}
                      style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.comentarioCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/icon_usuario.png')}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.nomeUsuario}>José</Text>
                  </View>
                  <Image
                    source={require('../assets/avaliacao.png')}
                    style={{ width: 50, height: 20 }}
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.textoComentario}>Adestradores nota 10!!!</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/like.png')}
                      style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/dislike.png')}
                      style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* Digita comentário */}
          <View style={styles.digiteComentario}>
            <Text style={styles.textTopicos}>Envie sua mensagem:</Text>
            <TextInput
              placeholder="Digite o comentário"
              style={styles.inputComentario}
            />
            <TextInput
              placeholder="Informe seu email ou whatsapp"
              style={styles.inputComentario}
            />
            <TouchableOpacity style={styles.enviarComentario} onPress={showModal}>
              <Text>Enviar Comentário</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center'
  },
  logosHeader: {
    width: 40,
    height: 40,
  },
  logosHeader2: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  imagem: {
    alignItems: 'center',
  },
  logoBrothers: {
    height: 150,
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
  text3: {
    fontSize: 10,
    marginLeft: 20
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
  textoComentario: {
    fontSize: 13
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
  },
  enviarComentario: {
    margin: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '35%',
  },
});