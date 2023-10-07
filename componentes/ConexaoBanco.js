import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Button } from "react-native";

export function ConexaoBanco({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [valor1, setValor1] = useState('');
    const [valor2, setValor2] = useState('');

    const handleInsertData = () => {
        fetch('http://localhost/api/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                valor1: valor1,
                valor2: valor2,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Trate a resposta do servidor conforme necessário
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    };

    function data() {
        fetch('http://localhost/api/produtos')
            .then((response) => response.json())
            .then((json) => setProdutos(json))
    }

    useEffect(() => {
        data();
    }, []);

    return (
        <View>
            <View>
                {produtos.map((produto) => (
                    <Text key={produto.ID}>{produto.NOME}</Text>
                ))}
            </View>
            <TextInput
                placeholder="Digite o valor 1"
                value={valor1}
                onChangeText={(text) => setValor1(text)}
            />
            <TextInput
                placeholder="Digite o valor 2"
                value={valor2}
                onChangeText={(text) => setValor2(text)}
            />
            <Button title="Inserir Dados" onPress={handleInsertData} />
        </View>
    )
}