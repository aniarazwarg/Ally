import React from "react";

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

 

export function Feed({navigation}) {

    return (

        <View style={styles.container}>

            <View>

                <Image source={require('../assets/Logo_Brothers.png')}

                style={styles.logo}/>

            </View>

            <View style={styles.touchable}>

                <TouchableOpacity>

                    <Image style={styles.logo2} source={require('../assets/Logo_Brothers.png')}/>
                   <Text> Hotel</Text>
                </TouchableOpacity>

                <TouchableOpacity>

                    <Image style={styles.logo2} source={require('../assets/Logo_Brothers.png')}/>
                    <Text> Passeio</Text>
                </TouchableOpacity>

                <TouchableOpacity>

                    <Image style={styles.logo2} source={require('../assets/Logo_Brothers.png')}/>
                    <Text> Adestramento</Text>
                </TouchableOpacity>

                <TouchableOpacity>

                    <Image style={styles.logo2} source={require('../assets/Logo_Brothers.png')}/>
                    <Text> Agility</Text>
                </TouchableOpacity>

            </View>
                <br/>
            <View>

                <Text><b>Notícias:</b></Text>
<br />
            </View>

            <View style={styles.noticias}>

                <Image style={styles.logo2} source={require('../assets/favicon.png')}/>

                <Text>Vagas para o feriado</Text>

            </View>

            <View>

                <View style={styles.noticias}>

                    <Image style={styles.logo2} source={require('../assets/favicon.png')}/>

                    <Text>Live no instagram</Text>

                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', margin:20,}}>

                    <Text>Comentarios</Text>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}><Text>Leia Mais... </Text></TouchableOpacity>

                </View>

            </View>

            <View>

                {/* area de comentarios */}

            </View>

         

        </View>

    );

}

 

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor:'#F2EAD0',

      },

    logo:{

      height:200,

      width:400,

      },

    logo2:{

      height:65,

      width:65,

      },

    touchable:{

        flexDirection:"row",

        justifyContent:"space-around",

 

   

    },

    noticias:{

        flexDirection:"row",

 

    },

 

    button:{

        flexDirection: 'row',

        textAlign: 'center',

        justifyContent:'center',

        width: '26%',

        padding: 1,

        borderWidth:2,

        borderRadius:5,

        borderLeftWidth:2,

    }

});