import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, StatusBar } from "react-native";

export function Comentarios({ navigation }) {
    const [comentarios, setComentarios] = useState([]);
    const [curtidas, setCurtidas] = useState(null);
    const [descurtidas, setDescurtidas] = useState(null);
    const [ok, setOk] = useState(0);
    const [id, setId] = useState(null);


    function dataComentarios() {
        fetch('http://localhost/api/comentarios')
            .then((response) => response.json())
            .then((json) => setComentarios(json))
    }

    const updateCurtidas = async (id, newData) => {
        try {
            const response = await fetch(`http://localhost/api/curtidas/${id}`, {
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

    

    useEffect(() => {
        dataComentarios();
        comentarios.forEach((comentario) => {
            if (id !== null && comentario.ok == 0 && id == comentario.id) {
                updateCurtidas(id, { curtidas, descurtidas, ok });
            } 
            if (id !== null & comentario.ok == 1 & id == comentario.id) {
                updateCurtidas(id, { curtidas, descurtidas, ok });
            }
        });
    }, [,]);


    return (
        <View style={styles.container}>
            <ScrollView stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll>
                <View style={styles.header}>
                    <View style={styles.headerConteudo}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image source={require('../assets/icon-back.png')}
                                    style={styles.logosHeader}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.headerText}>Comentários</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.comentarios}>
                    {comentarios.map((comentario) => (
                        <View key={comentario.id}>
                             
                            <View style={styles.comentarioCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={require('../assets/icon_usuario.png')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                        <Text style={styles.nomeUsuario}>{comentario.nome}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={styles.textoComentario}>{comentario.comentario}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
             
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2EAD0',
        paddingTop: StatusBar.currentHeight,
    },
    header: {
        zIndex: 1,
        backgroundColor: '#F2EAD0',
        width: '100%',
        padding: 10
    },
    headerConteudo: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 5,
        alignItems: "center",
    },
    logosHeader: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    headerText: {
        fontSize: 25,
    },
    comentarioCard: {
        backgroundColor: '#FCF6D7',
        width: 300,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        height: 150,
        justifyContent: 'space-between',
        marginBottom: 20
    },
    nomeUsuario: {
        marginLeft: 10,
        fontSize: 14,

    },
    textoComentario: {
        fontSize: 17,
        textAlign: 'start',
        width: "100%"
    },
    comentarios: {
        alignItems: 'center'
    }

});