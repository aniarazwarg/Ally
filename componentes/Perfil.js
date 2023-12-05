import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput} from "react-native";
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';

export function Perfil({ navigation, route }) {

    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()
   
    const [users, setUsers] = useState([])
    const [nome, setNome] = useState(null)
    const [fotoPerfil, setFotoPerfil] = useState(null)


    
    const [visibleTel, setVisibleTel] = React.useState(false);
    const showModalTel = () => setVisibleTel(true);
    const hideModalTel = () => setVisibleTel(false);

    const [visibleEmail, setVisibleEmail] = React.useState(false);
    const showModalEmail = () => setVisibleEmail(true);
    const hideModalEmail = () => setVisibleEmail(false);

    const [visibleEnd, setVisibleEnd] = React.useState(false);
    const showModalEnd = () => setVisibleEnd(true);
    const hideModalEnd = () => setVisibleEnd(false);

    const containerStyle = { backgroundColor: 'white', padding: 20 };


    const { cd_cliente } = route.params || { cd_cliente: null };


    // Função update email
  const updateEmail = () => {
    fetch(`http://localhost/api/updateEmail/${cd_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // Updated email value
      }),
    })
      .then(response => response.json())
      .then(data => {
      
        console.log(data);
        hideModalEmail(); 
      })
      .catch(error => {
       
        console.error('Error:', error);
      });
  };

  const resetValues = () => {
    getUsers();
    setEmail(users.find(user => user.cd_cliente === cd_cliente)?.email || '');
    setTelefone(users.find(user => user.cd_cliente === cd_cliente)?.telefone || '');
  };

     // Função update telefone
  const updateTelefone = () => {
    fetch(`http://localhost/api/updateTelefone/${cd_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telefone: telefone, 
      }),
    })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
        hideModalTel(); 
      })
      .catch(error => {
       
        console.error('Error:', error);
      });
  };


    function getUsers() {
        fetch('http://localhost/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    if (users.length === 0 && cd_cliente !== null) {
        getUsers();
    }

    useEffect(() => {
        users.forEach((user) => {
            if (cd_cliente == user.cd_cliente) {
                setNome(user.nm_cliente)
                
                setTelefone(user.telefone)
                setEmail(user.email)
                setFotoPerfil(user.fotoPerfil)
                console.log(user.fotoPerfil)
            }
        })
    }, [users])


    return (

        <PaperProvider>
        <Portal>
         {/* Modal Email */}
      <Modal visible={visibleEmail} onDismiss={hideModalEmail} contentContainerStyle={containerStyle}>
        <TextInput
          placeholder="Altere o Email"
          style={{ textAlign: 'center', borderWidth: 1, padding: 14, borderRadius: 20 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity style={styles.botaoEditar2} onPress={updateEmail}>
          <Text style={styles.textoBotao}>Atualizar Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoEditar2} onPress={() => { hideModalEmail(); resetValues(); }}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </Modal>

      {/* Modal Telefone */}
      <Modal visible={visibleTel} onDismiss={hideModalTel} contentContainerStyle={containerStyle}>
        <TextInput
          placeholder="Altere o Telefone"
          style={{ textAlign: 'center', borderWidth: 1, padding: 14, borderRadius: 20 }}
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />

        <TouchableOpacity style={styles.botaoEditar2} onPress={updateTelefone}>
          <Text style={styles.textoBotao}>Atualizar Telefone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoEditar2} onPress={() => { hideModalTel(); resetValues(); }}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </Modal>

       

        </Portal>

        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                {fotoPerfil !== null && (
                    <Image style={styles.logoUser} source={'../assets/' + fotoPerfil}></Image>
                )}
                {fotoPerfil == null && (
                    <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
                )}
                <Text style={styles.nomeText}>{nome}</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <View style={styles.campo}>
                    <Text style={styles.informacao}>Telefone: {telefone}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={styles.textoBotao} onPress={showModalTel}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.informacao}>Email: {email}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={styles.textoBotao} onPress={showModalEmail}>Editar</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            <View style={styles.campoPets}>
                <Text style={styles.nomeText}>Meus pets</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', alignItems: 'center' }}>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet', { cd_cliente: cd_cliente })} style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet', { cd_cliente: cd_cliente })} style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet', { cd_cliente: cd_cliente })} style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ width: '100%', backgroundColor: '#6FAA9C', padding: 10, alignSelf: 'center', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Feed', { cd_cliente: cd_cliente })}>
                    <Text style={{ color: 'white' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </PaperProvider>
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
        height: 200,
        borderRadius: 60,
        marginTop: 40
    },
    nomeText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    campo: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#FCF6D7',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5
    },
    informacao: {
        fontSize: 14,
        marginLeft: 15,
        textAlign: 'center'
    },
    botaoEditar: {
        justifyContent: 'center',
        backgroundColor: '#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2
    },
    botaoEditar2: {
        justifyContent: 'center',
        backgroundColor: '#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2,
        marginTop:20,
    },
    textoBotao: {
        color: 'white',
    },
    campoPets: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    iconPet: {
        width: 50,
        height: 50,
    },
    pet: {
        borderRadius: 200,
        borderWidth: 1,
        padding: 20,
        marginTop: 20
    },
    botaoAdicionar: {
        backgroundColor: '#6FAA9C',
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
});