import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput, StatusBar } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export function MenuAdmin({ navigation, route }) {

    const [noticia, setNoticia] = useState('')
    const [imagem, setImagem] = useState(null)
    const [noticias, setNoticias] = useState([])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            console.log(result.assets[0].uri)
            setImagem(result.assets[0].uri);
        }
    };


    const inserirNoticias = () => {
        // fetch('http://192.168.26.94/api/cadastro', {
        fetch('http://192.168.26.94/api/inserirNoticias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                noticia: noticia,
                imagem: imagem,

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setNoticia('');
                setImagem('');
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    };


    function getNoticias() {
        fetch('http://192.168.26.94/api/noticias')
            // fetch('http://192.168.26.94/api/usuarios')
            .then((response) => response.json())
            .then((json) => setNoticias(json))
    }

    useEffect(() => {
        getNoticias()
    }, [,]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerConteudo}>

                    <View>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>

                            <Image source={require('../assets/menu-bar.png')}
                                style={styles.logosHeader}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Postagem de notícias</Text>

                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Feed' })}>
                            <Text style={{ fontWeight: 'bold', borderWidth: 2, borderRadius: 10, padding: 5, borderColor: 'black', }}>Sair</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
            <View style={styles.inserir}>
                <TextInput style={{
                    textAlign: 'center',
                    marginVertical: 20,
                    padding: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 40,
                    width: '90%',
                }} placeholder="Insira a notícia" value={noticia} onChangeText={(text) => setNoticia(text)} />
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#6f9baa',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    marginRight: 2
                }} onPress={pickImage}>
                    <Text style={{ color: 'white' }}>Selecionar arquivo</Text>
                </TouchableOpacity>
                <Image source={{ uri: imagem }} style={{ width: 200, height: 200, margin: 15 }} />
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#6FAA9C',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    marginRight: 2,
                    marginTop: 10,
                    marginBottom: 10
                }} onPress={inserirNoticias}>
                    <Text style={{ color: 'white' }}>Enviar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', alignItems: 'center' }}>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#6FAA9C',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    marginRight: 2,
                    marginTop: 10,
                    marginBottom: 10,
                    width: '100%'
                }} onPress={() => navigation.navigate('Clientes')}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    justifyContent: 'center',
                    backgroundColor: '#6f9baa',
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    marginRight: 2,
                    marginBottom: 10,
                    width: '100%'
                }} onPress={() => navigation.navigate('Reservas')}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Agendamentos</Text>
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
        paddingTop: StatusBar.currentHeight,
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
    inserir: {
        width: '90%',
        backgroundColor: '#FCF6D7',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputInserir: {
        width: '90%',
        backgroundColor: '#FCF6D7',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5
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
    logosHeader: {
        width: 40,
        height: 40
      },
})

