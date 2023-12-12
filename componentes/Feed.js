import * as React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar, ImageBackground } from "react-native";
import { Modal, Portal, Text, Snackbar ,Button, PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';



export function Feed({ navigation, route }) {


  const [visible, setVisible] = React.useState(false);
  const [nome, setNome] = React.useState(null);
  const [fotoPerfil, setFotoPerfil] = React.useState(null);
  const [Comentario, setComentario] = React.useState('');
  const [email, setEmail] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const { cd_cliente } = route.params || { cd_cliente: null };
  const [users, setUsers] = React.useState([]);
  // const foto = require(fotoPerfil)
  const [erro, setErro] = React.useState(false);
  const [comentarios, setComentarios] = React.useState([]);

  const [visible2, setVisible2] = React.useState(false);
  const onToggleSnackBar = () => setVisible2(!visible2);
  const onDismissSnackBar = () => setVisible2(false);

  function dataComentarios() {
    fetch('http://localhost/api/comentarios')
      .then((response) => response.json())
      .then((json) => {
        // Assuming json is an array of comentarios
        // Modify this logic to get only two comentarios
        const limitedcomentarios = json.slice(0, 2);
        setComentarios(limitedcomentarios);
      });
  }

  function getUsers() {
    fetch('http://localhost/api/usuarios')
      // fetch('http://localhost/api/usuarios')
      .then((response) => response.json())
      .then((json) => setUsers(json))

  }

  function sair() {
    navigation.navigate('Feed', { cd_cliente: null })
    hideModal();
    setNome('')
  }


  if (users.length === 0 && cd_cliente !== null) {
    getUsers();

  }

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handleComentarioChange = (text) => {
    setComentario(text);
  };

  const enviarComentario = () => {
    try {
      if (cd_cliente != null && Comentario != null && Comentario.length >= 3 ){
    setErro(false);
     fetch('http://localhost/api/postComentario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        comentario: Comentario,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getUsers(); // Recarrega os dados dos usuários após o cadastro
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
      onToggleSnackBar();
   } else {
    setErro(true)
   }
    } catch (error) {
      setErro(true)

    }
   

   
  };



  React.useEffect(() => {
    dataComentarios()
    users.forEach((user) => {
      if (cd_cliente == user.cd_cliente) {
        setNome(user.nm_cliente)
        setFotoPerfil(user.fotoPerfil)
        console.log(user.fotoPerfil)
        console.log(user.nm_cliente)

      }

    })
  }, [users, cd_cliente]);


  return (

    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={sair} contentContainerStyle={containerStyle}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Volte sempre!</Text>
        </Modal>
      </Portal>

      <View style={styles.container}>
           <ImageBackground style={{ width: '100%', height: '100%', }} source={require('../assets/pegadas2.jpg')}>
        <ScrollView style={styles.scrollView}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll>
       
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerConteudo}>
                {(cd_cliente == null) && (
                  <View>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>

                      <Image source={require('../assets/menu-bar.png')}
                        style={styles.logosHeader}
                      />
                    </TouchableOpacity>
                  </View>)}
                {(cd_cliente !== null) && (
                  <View>
                    <TouchableOpacity onPress={showModal}>
                      <Text style={{ fontWeight: 'bold' , borderWidth: 2, borderRadius: 10,padding: 5, borderColor: 'black', }}>Sair</Text>
                    </TouchableOpacity>
                  </View>)}
                <View>
                  {cd_cliente !== null && (
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bem vindo, {nome}!</Text>
                  )}
                  {cd_cliente == null && (
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
                      {(fotoPerfil !== null && fotoPerfil !== "") && (
                        <Image source={require('../assets/icon_usuario.png')}
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
            {(cd_cliente != null) && (
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
                    onPress={() => navigation.navigate('Calendario', { cd_cliente: cd_cliente })}>
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
              </View>)}
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
                <TouchableOpacity
                  style={styles.leiaMais}
                  onPress={() => navigation.navigate("Comentarios")}
                >
                  <Text>Leia mais {'>'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.comentarios}>

                {comentarios.map((comentario) => (
                  <View key={comentario.id} style={styles.comentarioCard}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={require('../assets/icon_usuario.png')}
                          style={{ width: 30, height: 30 }}
                        />
                        <Text style={styles.nomeUsuario}>{comentario.nome}</Text>
                      </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.textoComentario}>{comentario.comentario}</Text>
                    </View>

                  </View>
                ))}
              </View>
            </View>
            {/* Digita comentário */}
           {(cd_cliente != null) && (
            <View style={styles.digiteComentario}>
               
              <Text style={styles.textTopicos}>Envie sua mensagem:</Text>
              <TextInput
                placeholder="Digite o comentário"
                style={styles.inputComentario}
                onChangeText={handleComentarioChange}
                value={Comentario}
              />
                {erro && (
            <Text style={styles.errorMessage}>
              *Comentario inválido
            </Text>
          )}
              <TouchableOpacity style={styles.enviarComentario} onPress={enviarComentario}>
                <Text > Enviar Comentário</Text>
              </TouchableOpacity>
            </View>)}

        </ScrollView>
            <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar}
        duration={400}
        >
      Comentario enviado com sucesso!
      </Snackbar></ImageBackground>
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
  errorMessage:{
    color: 'red' ,
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
    height: 40
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
    height: 120,
    width: '90%',
    backgroundColor: '#F6F1EB',
    borderRadius: 20,
    margin: 10,

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
    backgroundColor: '#F6F1EB',
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
    borderRadius: 10,
    backgroundColor: '#F2EAD0',
    color: 'white'

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

  },
  nomeUsuario: {
    marginLeft: 10,
  },
  textoComentario: {
    fontSize: 13,
    margin: 10,
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
    backgroundColor: '#F2EAD0',
    color: 'white'
  },
});