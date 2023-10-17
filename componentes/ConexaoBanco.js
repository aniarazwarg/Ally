import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, Button, Touchable } from "react-native";

export function ConexaoBanco({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [valor1, setValor1] = useState('');
    const [saveId, setSaveId] = useState('');
    const [nome, setNome] = useState('');

    const handleInsertData = () => {
        fetch('http://localhost/api/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                valor1: valor1,
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

    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost/api/deletar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log('Registro excluído com sucesso.');
            } else {
                console.error('Erro ao excluir registro.');
            }
        } catch (error) {
            console.error('Erro de rede: ', error);
        }
    };

    const updateRecord = async (id, newData) => {
        try {
            const response = await fetch(`http://localhost/api/alterar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData), // Os dados de atualização
            });

            if (response.status === 200) {
                console.log('Registro atualizado com sucesso.');
            } else {
                console.error('Erro ao atualizar registro.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    function data() {
        fetch('http://localhost/api/produtos')
            .then((response) => response.json())
            .then((json) => setProdutos(json))
    }

    data();
    
    useEffect(() => {
    }, []);

    return (
            <View>
                <View>
                    <View>
                        {produtos.map((produto) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5, alignItems: 'center', marginTop: 20 }} key={produto.ID}>
                                <Text>{produto.NOME}</Text>
                                <TouchableOpacity onPress={() => deleteRecord(produto.ID)} style={{ backgroundColor: 'blue', borderRadius: 20, padding: 10 }}>
                                    <Text style={{ color: 'white' }}>Deletar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setSaveId(produto.ID); setNome(produto.NOME)}} style={{ backgroundColor: 'blue', borderRadius: 20, padding: 10 }}>
                                    <Text style={{ color: 'white' }}>Alterar</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <TextInput
                        placeholder="Digite o valor 1"
                        value={valor1}
                        onChangeText={(text) => setValor1(text)}
                    />
                    <Button title="Inserir Dados" onPress={handleInsertData} />
                    <TextInput value={nome} onChangeText={(text) => setNome(text)}/>
                    <TouchableOpacity onPress={()=> updateRecord(saveId, {nome})}>
                        <Text>Alterar</Text>
                    </TouchableOpacity>
                </View>

            </View>
    )
}