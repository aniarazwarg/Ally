import react from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity,  } from "react-native";

export function Perfil({navigation}) {
    return(
        <View style={styles.container}>
            <View style={{marginTop: 30}}>
                <Image style={styles.logoUser} source={require('../assets/icon_usuario.png')}></Image>
            </View>
            <View style={{alignItems:'center', width: '85%', marginTop: 20}}>
                <TextInput 
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor={'#273A73'}
                />
                <TextInput 
                style={styles.input}
                placeholder="Raça"
                placeholderTextColor={'#273A73'}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Porte"
                    placeholderTextColor={'#273A73'}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Cor"
                    placeholderTextColor={'#273A73'}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Peso"
                    placeholderTextColor={'#273A73'}
                />
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <TextInput 
                        style={styles.input2}
                        placeholder="Vacinas"
                        placeholderTextColor={'#273A73'}
                    />
                    <TextInput 
                        style={styles.input2}
                        placeholder="Foto"
                        placeholderTextColor={'#273A73'}
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'#F2EAD0',
    },
    logoUser: {
        width: 200,
        height: 200
    },
    input:{
        textAlign:'center',
        fontSize:15,
        borderWidth: 2,
        borderColor: '#273A73',
        color:'#273A73',
        marginTop:15,
        padding:10,
        borderRadius:20,
        backgroundColor:'#F3EEDB',
        width: '100%'
      },
    input2:{
        textAlign:'center',
        fontSize:15,
        borderWidth: 2,
        borderColor: '#273A73',
        color:'#273A73',
        marginTop:15,
        padding:10,
        borderRadius:20,
        width:'47%',
        backgroundColor:'#F3EEDB',
      },
      button:{
        marginTop: 25,
        borderRadius:20,
        alignItems:'center',
        backgroundColor: '#6FAA9C',
        padding:12,
        width: '50%',
        marginTop: 60
      },
      textButton: {
        color:'white',
        fontSize:15,
      },
});