import React, {Component} from 'react';
import { StyleSheet, TextInput, Image, Text, View , Button } from 'react-native';

export function Passeio({navigation}){
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                placeholder="Passeio"
            />

            <Image style={styles.logo} source={require('/assets/Img_Passeio.png')} />

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
            <Image style={styles.logo2} source={require('/assets/ally.png')} />
        </View>
    );
}
 
const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        fontSize:'25px',
        marginTop:'30px',
    },

    text1:{
        flexDirection:'row',
        textAlign:'center',
        fontSize:'15px',
        marginTop:'30px',
    },

    input:{
        flexDirection:'row',
        textAlign:'center',
        fontSize:'15px',
        marginTop:'40px',
        backgroundColor:'grey',
        color:'#black',
        padding:'40px',
        marginLeft:'20px',
        marginRight:'20px',
      },

      logo:{
        alignSelf:'center',
      height:'200px',
      width:'400px',
      marginTop:'40px',
      },
      
      logo2:{
        alignSelf:'end',
        height:'90px',
        width:'90px',
        marginTop:'300px',
        },
});
