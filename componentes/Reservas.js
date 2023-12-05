import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function Reservas({ navigation, route }) {

    const [reservas, setReservas] = useState([])
    const [users, setUsers] = useState([])
    const [statusReserva, setStatusReserva] = useState('Aprovado')

    function getReservas() {
        fetch('http://localhost/api/reservas')
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setReservas(json))
    }

    function getUsers() {
        fetch('http://localhost/api/usuarios')
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    const updateReserva = async (cd_cliente, statusReserva) => {
        try {
            const newData = { statusReserva };
            const response = await fetch(`http://localhost/api/atualizaReserva/${cd_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData), // Os dados de atualização
            });

            if (response.status === 200) {
                console.log('Registro atualizado com sucesso.');
                console.log(newData)
            } else {
                console.error('Erro ao atualizar registro.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };


    console.log(users)
    useEffect(() => {
        getReservas();
        getUsers();
    }, [,])

    return (
        <ScrollView>
            <View style={styles.container}>
                {reservas.map((reserva) => (
                    <View key={reserva.cd_servico} style={{ borderRadius: 40, borderWidth: 2, padding: 20, width: '80%', margin: 5 }}>
                        <Text> {reserva.dt_checkin} - {reserva.dt_checkout}</Text>
                        <Text>Cliente: {reserva.cd_cliente}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cliente', { cd_cliente: reserva.cd_cliente })} style={styles.botaoVer}>
                            <Text style={{ color: 'white' }}>Ver usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoAceitar}>
                            <Text onPress={() => updateReserva(reserva.cd_cliente, 'Aprovado')} style={{ color: 'white' }}>Aceitar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoNegar}>
                            <Text onPress={() => updateReserva(reserva.cd_cliente, 'Reprovado')} style={{ color: 'white' }}>Recusar</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2EAD0',
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
})