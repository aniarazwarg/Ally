import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { Modal, Portal, PaperProvider } from 'react-native-paper';

export function Cliente({ navigation, route }) {

    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nasc, setNasc] = useState('');
    const [nascBanco, setNascBanco] = useState('')
    const [users, setUsers] = useState([]);
    const [nomePet, setNomePet] = useState('')
    const [pelagem, setPelagem] = useState('')
    const [raca, setRaca] = useState('')
    const [porte, setPorte] = useState('')
    const [peso, setPeso] = useState('')
    const [v8, setV8] = useState('')
    const [antirrabica, setAntirrabica] = useState('')
    const [gripe, setGripe] = useState('')
    const [giardia, setGiardia] = useState('')
    const [pets, setPets] = useState([])
    const { cd_cliente } = route.params || { cd_cliente: null };

    const [visibleTel, setVisibleTel] = useState(false);
    const showModalTel = () => setVisibleTel(true);
    const hideModalTel = () => setVisibleTel(false);

    const [visibleEmail, setVisibleEmail] = useState(false);
    const showModalEmail = () => setVisibleEmail(true);
    const hideModalEmail = () => setVisibleEmail(false);

    const [visibleCpf, setVisibleCpf] = useState(false);
    const showModalCpf = () => setVisibleCpf(true);
    const hideModalCpf = () => setVisibleCpf(false);

    const [visibleNasc, setVisibleNasc] = useState(false);
    const showModalNasc = () => setVisibleNasc(true);
    const hideModalNasc = () => setVisibleNasc(false);
    
    const [visiblePet, setVisiblePet] = useState(false);
    const showModalPet = () => setVisiblePet(true);
    const hideModalPet = () => setVisiblePet(false);

    const handleTelefoneChange = (text) => {
        setTelefone(text);
    };
    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handleCpfChange = (text) => {
        setCpf(text);
    };
    const handleNascChange = (text) => {
        const formatado = formatDateString(text);
        setNasc(formatado);
        setNascBanco(formatado.split('/').reverse().join('-'))
    };
    const handlePetChange = (text) => {
        setNomePet(text);
    };

    // Formata data

    const formatDateString = (text) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 2) {
            return cleaned;
        }
        if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        }
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    };

    function getUsers() {
        fetch('http://192.168.0.11/api/usuarios')
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

    function getPets() {
        fetch(`http://192.168.0.11/api/pets/${cd_cliente}`)
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setPets(json))
    }

    function pet() {
        pets.forEach(pet => {
            if (pet.cd_cliente == cd_cliente) {
                setNomePet(pet.nm_cao)
                setPelagem(pet.ds_pelagem)
                setRaca(pet.nm_raca)
                setPorte(pet.ds_porte)
                setPeso(pet.ds_peso)
                setV8(pet.ic_v8_v10)
                setAntirrabica(pet.ic_antirrabica)
                setGripe(pet.ic_gripo)
                setGiardia(pet.ic_giardia)
            }
        });
    }
    if (nomePet == '') {
        pet();
    };

    const updateCliente = async (cd_cliente, newData) => {
        try {
            const response = await fetch(`http://192.168.0.11/api/atualizaCadastro/${cd_cliente}`, {
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

    const updatePet = async (cd_cliente, newData) => {
        try {
            const response = await fetch(`http://192.168.0.11/api/atualizaPets/${cd_cliente}`, {
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


    function salvar() {
        updateCliente(cd_cliente, {nome, nascBanco, email, cpf, telefone})
        updatePet(cd_cliente, {nomePet, pelagem, raca, peso, antirrabica, v8, gripe, giardia})
    }

useEffect(() => {
    getUsers();
    getPets();
    console.log(cd_cliente)
    usuario();
    pet();
    console.log(pets)
}, [,])

return (
    <PaperProvider>
        <Portal>
            <Modal visible={visibleTel} onDismiss={hideModalTel} contentContainerStyle={containerStyle}>
                <TextInput
                    value={telefone}
                    placeholder="Telefone"
                    style={{ textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 20, marginBottom: 10, }}
                    onChangeText={handleTelefoneChange}
                />
                <TouchableOpacity style={styles.botaoEditar} onPress={hideModalTel}>
                    <Text style={styles.textoBotao}>Concluir</Text>
                </TouchableOpacity>
            </Modal>
            <Modal visible={visibleEmail} onDismiss={hideModalEmail} contentContainerStyle={containerStyle}>
                <TextInput
                    value={email}
                    placeholder="Email"
                    style={{ textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 20, marginBottom: 10 }}
                    onChangeText={handleEmailChange} />
                <TouchableOpacity style={styles.botaoEditar} onPress={hideModalEmail}>
                    <Text style={styles.textoBotao}>Concluir</Text>
                </TouchableOpacity>
            </Modal>
            <Modal visible={visibleCpf} onDismiss={hideModalCpf} contentContainerStyle={containerStyle}>
                <TextInput
                    value={cpf}
                    placeholder="CPF"
                    style={{ textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 20, marginBottom: 10 }}
                    onChangeText={handleCpfChange} />
                <TouchableOpacity style={styles.botaoEditar} onPress={hideModalCpf}>
                    <Text style={styles.textoBotao}>Concluir</Text>
                </TouchableOpacity>
            </Modal>
            <Modal visible={visibleNasc} onDismiss={hideModalNasc} contentContainerStyle={containerStyle}>
                <TextInput
                    value={nasc.split('-').reverse().join('/')}
                    placeholder="Data de nascimento"
                    style={{ textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 20, marginBottom: 10 }}
                    onChangeText={handleNascChange} />
                <TouchableOpacity style={styles.botaoEditar} onPress={hideModalNasc}>
                    <Text style={styles.textoBotao}>Concluir</Text>
                </TouchableOpacity>
            </Modal>
            <Modal visible={visiblePet} onDismiss={hideModalPet} contentContainerStyle={containerStyle}>
                <TextInput
                    value={nomePet}
                    placeholder="Nome do pet"
                    style={{ textAlign: 'center', borderWidth: 1, padding: 10, borderRadius: 20, marginBottom: 10 }}
                    onChangeText={handlePetChange} />
                <TouchableOpacity style={styles.botaoEditar} onPress={hideModalPet}>
                    <Text style={styles.textoBotao}>Concluir</Text>
                </TouchableOpacity>
            </Modal>
        </Portal>

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
                    <TouchableOpacity style={styles.botaoEditar} onPress={showModalEmail}>
                        <Text style={{ color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dados}>
                    <Text style={styles.textDados}>{telefone}</Text>
                    <TouchableOpacity style={styles.botaoEditar} onPress={showModalTel}>
                        <Text style={{ color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dados}>
                    <Text style={styles.textDados}>{cpf}</Text>
                    <TouchableOpacity style={styles.botaoEditar} onPress={showModalCpf}>
                        <Text style={{ color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dados}>
                    <Text style={styles.textDados}>{nasc.split('-').reverse().join('/')}</Text>
                    <TouchableOpacity style={styles.botaoEditar} onPress={showModalNasc}>
                        <Text style={{ color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View><Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 10, fontWeight: 'bold' }}>Pets</Text></View>
                <View style={styles.dados}>
                    <Text style={styles.textDados}>{nomePet}</Text>
                    <TouchableOpacity style={styles.botaoEditar} onPress={showModalPet}>
                        <Text style={{ color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botaoVoltar}>
                        <Text style={{ color: 'white' }}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => salvar()} style={styles.botaoVoltar}>
                        <Text style={{ color: 'white' }}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </PaperProvider>
)
}

const containerStyle = { backgroundColor: 'white', padding: 20, paddingVertical: 50, borderRadius: 40, width: '90%', alignSelf: 'center' };
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
        alignItems: 'center',
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
        marginRight: 2,
        alignItems: 'center'
    },
    botaoPet: {
        justifyContent: 'center',
        backgroundColor: '#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2,
        alignItems: 'center',
        width: '100%',
    },
    botaoVoltar: {
        justifyContent: 'center',
        backgroundColor: '#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2,
        alignItems: 'center',
        width: '40%',
    },
    textoBotao: {
        color: 'white',
    },
})
