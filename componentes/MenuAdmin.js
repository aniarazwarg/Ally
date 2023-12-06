import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from "react-native";

export function MenuAdmin({ navigation, route }) {

    const [info, setInfo] = useState('')
    const [imagem, setImagem] = useState('')

    const inserirNoticias = () => {
        // fetch('http://192.168.26.94/api/cadastro', {
        fetch('http://localhost/api/inserirNoticias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                info: info,
                imagem: imagem,
                
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View>
                <TextInput placeholder="Insira a notícia" value={info} onChangeText={(text) => setInfo(text)}/>
                <TextInput placeholder="Insira a notícia" value={info} onChangeText={(text) => setInfo(text)}/>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
                    <Text>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
                    <Text>Agendamentos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    botaoVer: {
        backgroundColor: '#6FAA9C',
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2EAD0',
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
})

