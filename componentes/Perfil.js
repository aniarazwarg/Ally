import react, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export function Perfil({navigation}) {

    const [telefone, setTelefone] = useState('(13) 99779-7442')
    const [email, setEmail] = useState('exemplo@exemplo.com.br')
    const [endereco, setEndereco] = useState('Rua Exemplo, 999')
    return(
        <View style={styles.container}>
            <View style={{marginTop: 20}}>
                <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
                <Text style={styles.nomeText}>Nome da pessoa</Text>
            </View>
            <View style={{width:'100%', alignItems:'center', marginTop: 20}}>
                <View style={styles.campo}>
                    <Text style={styles.informacao}>Telefone: {telefone}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.informacao}>Email: {email}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.informacao}>Endereço: {endereco}</Text>
                    <TouchableOpacity style={styles.botaoEditar}>
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.campoPets}>
                <Text style={styles.nomeText}>Meus pets</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'85%', alignItems:'center'}}>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')}/>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet')} style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')}/>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet')}  style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.pet}>
                            <Image style={styles.iconPet} source={require('../assets/icon_pet.png')}/>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AdicionarPet')}  style={styles.botaoAdicionar}>
                            <Text style={styles.textoBotao}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width: '80%', alignItems:'center', justifyContent:'center', marginTop: 20}}>
                <TouchableOpacity style={{width: '100%', backgroundColor:'#6FAA9C', padding: 10, alignSelf:'center', borderRadius: 20,alignItems:'center', justifyContent:'center'}} onPress={() => navigation.navigate('Feed')}>
                    <Text style={{color: 'white'}}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#F2EAD0',
    },
    logoUser: {
        width: 200,
        height: 200
    },
    nomeText: {
        textAlign:'center',
        marginTop: 10,
        fontSize: 18,
        fontWeight:'bold',
    },
    campo: {
        flexDirection:'row',
        width:'90%',
        backgroundColor: '#FCF6D7',
        borderRadius: 20,
        marginTop: 10,
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 5
    },
    informacao: {
        fontSize: 14,
        marginLeft: 15,
        textAlign:'center'
    },
    botaoEditar: {
        justifyContent:'center',
        backgroundColor:'#6FAA9C',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 2
    },
    textoBotao: {
        color:'white',
    },
    campoPets: {
        marginTop: 20,
        alignItems:'center',
        width:'100%',
    },
    iconPet: {
        width: 50,
        height: 50,
    },
    pet: {
        borderRadius: 200,
        borderWidth: 1,
        padding: 20,
        marginTop: 20
    },
    botaoAdicionar: {
        backgroundColor:'#6FAA9C',
        padding: 10,
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
});