import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export function Cliente({ navigation, route }) {

    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nasc, setNasc] = useState('');
    const [users, setUsers] = useState([]);
    const { cd_cliente } = route.params || { cd_cliente: null };

    function getUsers() {
        fetch('http://localhost/api/usuarios')
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setUsers(json))
    }

    function usuario() {
        users.forEach(user => {
            if (user.cd_cliente == cd_cliente) {
                setNome(user.nm_cliente)
                setCpf(user.cpf)
                setEmail(user.email)
                setTelefone(user.telefone)
                setNasc(user.dt_nasc_cliente)
                setFotoPerfil(user.fotoPerfil)
            }
        });
    }

    if (nome == "") {
        usuario();
    }

    useEffect(() => {
        getUsers();
        console.log(cd_cliente)
        usuario();
    }, [cd_cliente,])

    return (
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
            <View style={{ width: '80%', marginTop: 5 }}>
                <View style={styles.dados}>
                    <Text style={styles.textDados}>{email}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={{color:'white'}}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{telefone}</Text>
                </View>
                <View>
                    <Text>{cpf}</Text>
                </View>
                <View>
                    <Text>{nasc}</Text>
                </View>
            </View>
        </View>
    )
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
    dados: {
        padding: 5,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    textDados: {
        fontSize: 20
    },
    botaoEditar: {
        justifyContent: 'center',
        backgroundColor: '#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2
    },
})
