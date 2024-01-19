import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, Button, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal, PaperProvider } from 'react-native-paper';


export function Reservas({ navigation, route }) {

    const [reservas, setReservas] = useState([])
    const [users, setUsers] = useState([])
    const [statusReserva, setStatusReserva] = useState('Aprovado')

    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [visibleRejeitado, setVisibleRejeitado] = useState(false);
    const showModalRejeitado = () => setVisibleRejeitado(true);
    const hideModalRejeitado = () => { setVisibleRejeitado(false); renderiza() }
    const containerStyle = { backgroundColor: 'white', padding: 20, width: '80%', alignSelf: 'center', borderRadius: 40, justifyContent: 'center', alignItems: 'center' };




    function getReservas() {
        fetch('http://192.168.26.94/api/reservas')
            // fetch('http://192.168.26.94/api/usuarios')
            .then((response) => response.json())
            .then((json) => setReservas(json.reverse()))
    }

    function getUsers() {
        fetch('http://192.168.26.94/api/usuarios')
            // fetch('http://192.168.26.94/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    async function deletarReserva(id) {
        try {
            await fetch(`http://192.168.26.94/api/deletarReserva/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    const updateReserva = async (cd_cliente, statusReserva) => {
        try {
            const newData = { statusReserva };
            const response = await fetch(`http://192.168.26.94/api/atualizaReserva/${cd_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData), // Os dados de atualização
            });

            if (response.status === 200) {
                console.log('Registro atualizado com sucesso.');
                console.log(newData)
                getReservas();
            } else {
                console.error('Erro ao atualizar registro.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };



    useEffect(() => {
        getReservas();
        getUsers();
    }, [,])

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text style={{ fontSize: 22 }}>Pedido de reserva aceito.</Text>
                    <Button title="OK" onPress={hideModal} />
                </Modal>
                <Modal visible={visibleRejeitado} onDismiss={hideModalRejeitado} contentContainerStyle={containerStyle}>
                    <Text style={{ fontSize: 22 }}>Pedido de reserva rejeitado.</Text>
                    <Button title="OK" onPress={hideModalRejeitado} />
                </Modal>
            </Portal>
            <ScrollView style={{ backgroundColor: '#F2EAD0' }}>
                <View style={styles.container}>
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

                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reservas</Text>

                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Feed' })}>
                                    <Text style={{ fontWeight: 'bold', borderWidth: 2, borderRadius: 10, padding: 5, borderColor: 'black', }}>Sair</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                    {reservas.map((reserva) => (reserva.statusReserva == 'Aguardando') && (
                        <View key={reserva.cd_servico} style={{ borderRadius: 40, borderWidth: 2, padding: 20, width: '80%', margin: 5 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}> {reserva.dt_checkin.split('-').reverse().join('/')} - {reserva.dt_checkout.split('-').reverse().join('/')}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Cliente: {reserva.cd_cliente}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Status reserva: {reserva.statusReserva}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cliente', { cd_cliente: reserva.cd_cliente })} style={styles.botaoVer}>
                                <Text style={{ color: 'white' }}>Ver cliente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { updateReserva(reserva.cd_cliente, 'Aprovado'); getReservas(); showModal(); }} style={styles.botaoAceitar}>
                                <Text style={{ color: 'white' }}>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoNegar}>
                                <Text onPress={() => { updateReserva(reserva.cd_cliente, 'Reprovado'); getReservas(); showModalRejeitado(); }} style={{ color: 'white' }}>Recusar</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </PaperProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2EAD0',
        paddingTop: StatusBar.currentHeight,
    },
    botaoVer: {
        backgroundColor: '#6FAA9C',
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
    botaoAceitar: {
        backgroundColor: '#6f9baa',
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
    botaoNegar: {
        backgroundColor: '#aa6f7d',
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
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
})