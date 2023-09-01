import React from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';

export function Passeio({navigation}){
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder="Passeio"
            />

            <Image style={styles.logo} source={require('../assets/Img_Passeio.png')} />

            <TextInput
                style={styles.input}
                placeholder="Sobre: Contrate Passeadores para levar seus cães para dar uma volta."
            />
            <View>
                
                <TextInput
                    style={styles.text1}
                    
                    placeholder="Para realizar o agendamento deste serviço entre em contato com o whatsapp:
                    (13)000000000"
                    
                />
            </View>
            {/* <View
                style={{
                flexDirection: 'row',
                height: 100,
                padding: 20,
                }}>
                <View style={{backgroundColor: 'blue', flex: 0.3}} />
                <View style={{backgroundColor: 'red', flex: 0.5}} />
                <Text>Hello World!</Text>
            </View> */}
            <Image style={styles.logo2} source={require('../assets/ally.png')} />
        </View>
    );
}
 
const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        fontSize:25,
        marginTop:30,
    },

    text1:{
        flexDirection:'row',
        textAlign:'center',
        fontSize:15,
        marginTop:30,
    },

    input:{
        flexDirection:'row',
        textAlign:'center',
        fontSize:15,
        marginTop:40,
        backgroundColor:'grey',
        color:'black',
        padding:40,
        marginLeft:20,
        marginRight:20,
      },

      logo:{
      height:200,
      width:400,
      marginTop:40,
      },
      
      logo2:{
        height:90,
        width:90,
        marginTop:300,
        },
});
