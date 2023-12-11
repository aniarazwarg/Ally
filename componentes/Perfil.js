import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';



export function Perfil({ navigation, route }) {

    const [telefone, setTelefone] = useState('(13) 99779-7442')
    const [email, setEmail] = useState('exemplo@exemplo.com.br')
    const [endereco, setEndereco] = useState('Rua Exemplo, 999')
    const [users, setUsers] = useState([])
    const [nome, setNome] = useState(null)
    const [fotoPerfil, setFotoPerfil] = useState(null)
    const [reservas, setReservas] = useState([])
    const [reserva, setReserva] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')

    const { cd_cliente } = route.params || { cd_cliente: null };


    const [visibleTel, setVisibleTel] = useState(false);
    const showModalTel = () => setVisibleTel(true);
    const hideModalTel = () => setVisibleTel(false);

    const [visibleEmail, setVisibleEmail] = useState(false);
    const showModalEmail = () => setVisibleEmail(true);
    const hideModalEmail = () => setVisibleEmail(false);

    const [visibleEnd, setVisibleEnd] = useState(false);
    const showModalEnd = () => setVisibleEnd(true);
    const hideModalEnd = () => setVisibleEnd(false);

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    function getUsers() {
        fetch('http://localhost/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    function getReservas() {
        fetch('http://localhost/api/reservas')
            .then((response) => response.json())
            .then((json) => setReservas(json))
    }

    if (users.length === 0 && cd_cliente !== null) {
        getUsers();
        console.log('oi?')
    }
    if (reservas.length === 0 && cd_cliente !== null) {
        getReservas();
    }


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
        reservas.forEach((reserva) => {
            if (cd_cliente == reserva.cd_cliente) {
                setReserva(reserva.statusReserva)
                setCheckIn(reserva.dt_checkin)
                setCheckOut(reserva.dt_checkout)
            }
        })
    }, [users, reservas])


    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visibleTel} onDismiss={hideModalTel} contentContainerStyle={containerStyle}>
                    <TextInput
                        onChangeText={(text) => setTelefone(text)}
                        placeholder="Altere o Telefone"
                        value={telefone}
                        style={{ textAlign: 'center', borderWidth: 1, padding: 14, borderRadius: 20, }}
                    />
                    <TouchableOpacity style={styles.botaoEditar2} onPress={updateTelefone}>
                        <Text style={styles.textoBotao}>Atualizar Telefone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoEditar2} onPress={() => { hideModalTel(); resetValues(); }}>
                        <Text style={styles.textoBotao}>Voltar</Text>
                    </TouchableOpacity>
                </Modal>
                <Modal visible={visibleEmail} onDismiss={hideModalEmail} contentContainerStyle={containerStyle}>
                    <TextInput
                        placeholder="Altere o Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ textAlign: 'center', borderWidth: 1, padding: 14, borderRadius: 20 }}
                    />
                    <TouchableOpacity style={styles.botaoEditar2} onPress={updateEmail}>
                        <Text style={styles.textoBotao}>Atualizar Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoEditar2} onPress={() => { hideModalEmail(); resetValues(); }}>
                        <Text style={styles.textoBotao}>Voltar</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>

            <View style={styles.container}>
                <View style={{ marginTop: 20 }}>
                    {fotoPerfil !== null && (
                        <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
                    )}
                    {fotoPerfil == null && (
                        <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
                    )}
                    <Text style={styles.nomeText}>{nome}</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                    <View style={styles.campo}>
                        <Text style={styles.informacao}>Telefone: {telefone}</Text>
                        <TouchableOpacity style={styles.botaoEditar} onPress={showModalTel}>
                            <Text style={styles.textoBotao}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.informacao}>Email: {email}</Text>
                        <TouchableOpacity style={styles.botaoEditar} onPress={showModalEmail}>
                            <Text style={styles.textoBotao}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.informacao}>Status da reserva: {reserva}</Text>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.informacao}>Data da reserva: {checkIn.split('-').reverse().join('/')} - {checkOut.split('-').reverse().join('/')}</Text>
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
        marginTop: 20,
    },

});