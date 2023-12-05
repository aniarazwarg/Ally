import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function Reservas({ navigation, route }) {

    const [reservas, setReservas] = useState([])

    function getReservas() {
        fetch('http://localhost/api/reservas')
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setReservas(json))
    }

    useEffect(() => {
        getReservas();
    }, [,])

    return (
        <ScrollView>
            <View style={styles.container}>
                {reservas.map((reserva) => (
                    <View key={reserva.cd_servico} style={{ borderRadius: 40, borderWidth: 2, padding: 20, width: '80%', margin: 5 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{reserva.cd_servico}</Text>
                        </View>
                        <Text> {reserva.dt_checkin} - {reserva.dt_checkout}</Text>
                        <Text>Cliente: {reserva.cd_cliente}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cliente', { cd_cliente: reserva.cd_cliente })} style={styles.botaoVer}>
                            <Text style={{ color: 'white' }}>Ver usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoVer}>
                            <Text style={{ color: 'white' }}>Aceitar</Text>
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
})