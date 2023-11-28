import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export function Clientes({ navigation, route }) {

    const [users, setUsers] = useState([])

    function getUsers() {
        fetch('http://localhost/api/usuarios')
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    useEffect(() => {
        getUsers();
    }, [,])

    return (
        <View style={{width: '100%', alignItems:'center'}}>
            {users.map((user) => (
                <View key={user.cd_cliente} style={{borderRadius: 40, borderWidth: 2, padding: 20, width: '80%', margin: 5}}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.cd_cliente} - {user.nm_cliente}</Text>
                    </View>
                    <Text>Data de nascimento: {user.dt_nasc_cliente}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>CPF: {user.cpf}</Text>
                    <Text>Telfone: {user.telefone}</Text>
                </View>
            ))}
        </View>
    )
}

