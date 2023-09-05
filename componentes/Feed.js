import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Feed({navigation}) {
    return (
        <View style={styles.container}>
            {/* Logo Brothers */}
            <View>
                <Image source={require('../assets/Logo_Brothers.png')}
                style={styles.logo}/>
            </View>
            {/* Logo serviços */}
            <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal: 20}}>
                <TouchableOpacity style={{borderWidth:0.5}}>
                    <Image source={require('../assets/Img_Passeio.png')}
                    style={{width: 80, height: 80}}
                    />
                    <Text style={styles.text4}>Hotel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5}}>
                    <Image source={require('../assets/Img_Passeio.png')}
                    style={{width: 80, height: 80}}
                    />
                    <Text style={styles.text4}>Passeio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5}}>
                    <Image source={require('../assets/Img_Passeio.png')}
                    style={{width: 80, height: 80}}
                    />
                    <Text style={styles.text4}>Adestramento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5}}>
                    <Image source={require('../assets/Img_Passeio.png')}
                    style={{width: 80, height: 80}}
                    />
                    <Text style={styles.text4}>Agility</Text>
                </TouchableOpacity>
            </View>
            {/* Noticias */}
            <View style={{marginLeft: 20, marginTop: 20}}>
                <Text style={styles.text}>Notícias:</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10}}>
                    <TouchableOpacity style={{}}>
                        <Image source={require('../assets/Img_Passeio.png')}
                    style={styles.logo3}/>
                    </TouchableOpacity>
                    
                    <Text style={styles.text2}>Vagas para o feriado!</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10}}>
                    <TouchableOpacity style={{}}>
                        <Image source={require('../assets/Img_Passeio.png')}
                    style={styles.logo3}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.text2}>Live no Instagram</Text>
                        <Text style={styles.text3}>Novidades pra vocês!</Text>
                    </View>
                    
                </View>
            </View>
            {/* Comentários */}
            <View>
                <View  style={{marginLeft: 20, marginTop: 20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.text}>Comentários</Text>
                    <TouchableOpacity style={{marginRight: 20, borderWidth: 1, padding: 3}}>
                        <Text>Leia mais {'>'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 10}}>
                    <View style={{ backgroundColor: '#CCFFFF', width:'40%', padding:10, borderRadius: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                            <Image 
                                source={require('../assets/Img_Passeio.png')}
                                style={{width: 30, height: 30}}/>
                            <Text style={styles.text3}>Maria</Text>
                            <Image 
                                source={require('../assets/avaliacao.png')}
                                style={{width: 50, height: 30}}/>
                        </View>
                        <View style={{alignItems:'center', margin: 10, height:80}}>
                            <Text>Adorei a experiência que o Bob Marley teve com vocês!</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <TouchableOpacity>
                                <Image
                                 source={require('../assets/like.png')}
                                 style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                 source={require('../assets/dislike.png')}
                                 style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#CCFFFF', width:'40%', padding:10, borderRadius: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                            <Image 
                                source={require('../assets/Img_Passeio.png')}
                                style={{width: 30, height: 30}}/>
                            <Text style={styles.text3}>Jorge</Text>
                            <Image 
                                source={require('../assets/avaliacao.png')}
                                style={{width: 50, height: 30}}/>
                        </View>
                        <View style={{alignItems:'center', margin: 10, height: 80}}>
                            <Text>Adestradores nota 10!!!</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <TouchableOpacity>
                                <Image
                                 source={require('../assets/like.png')}
                                 style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                 source={require('../assets/dislike.png')}
                                 style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft:20, marginTop: 10}}>
                    <Text style={styles.text}>Envie sua mensagem!</Text>
                    <TextInput
                        placeholder="Digite o comentário"
                    />
                    <TextInput
                        placeholder="Informe seu email ou whatsapp"/>
                </View>
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
    
      height:90,
      width:90,
      },
      logo3: {
        height: 50,
        width: 50,

      },
      text: {
        color: '#60452F',
        fontWeight: 'bold'        
      },
      text2: {
        color: "#273A73",
        marginLeft: 20
      },
      text3: {
        color: "grey",
        marginLeft: 20,
        fontSize: 10
      },
      text4: {
        fontSize: 10,
        textAlign:'center',
      }
});