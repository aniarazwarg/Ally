import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";


export function Pets({ navigation, route }) {

    const [nome, setNome] = useState('')
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

    


    function getPets() {
        fetch(`http://192.168.26.94/api/pets/${cd_cliente}`)
            // fetch('http://192.168.0.11/api/usuarios')
            .then((response) => response.json())
            .then((json) => setPets(json))
    }

    function pet() {
        pets.forEach(pet => {
            if (pet.cd_cliente == cd_cliente) {
                setNome(pet.nm_cao)
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
    if (nome == '') {
        pet();
        
    }
    console.log(pets)
    useEffect(() => {
        getPets();
    }, [,])

    return (
        <View style={styles.container}>
            {pets.map((pet) => (
                <View key={pet.cd_cao}>
                    <Text>{nome}</Text>
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