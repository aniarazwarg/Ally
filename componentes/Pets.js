import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";


export function Pets({ navigation, route }) {

    const [nome, setNome] = useState([])
    const [pets, setPets] = useState([])
    const { cd_cliente } = route.params || { cd_cliente: null };


    function getPets() {
        fetch(`http://localhost/api/pets/${cd_cliente}`)
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setPets(json))
    }

    function pet() {
        pets.forEach(pet => {;
            nome.push({
                id: 
                nome : pet.nm_cao
            })
        });
    }
    if (nome == '') {
        pet();
        if (pets.length > 1) {
            console.log(pets)
        }
    }
    console.log(nome)
    useEffect(() => {
        getPets();
    }, [,])

    return (
        <View style={styles.container}>
            {pets.map((pet) => (
                <View key={pet.cd_cao}>
                    <Text>{pet.nm_cao}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2EAD0',
    },
})