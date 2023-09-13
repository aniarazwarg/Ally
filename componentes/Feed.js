import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image,Button, AlertButton, Alert } from "react-native";
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
                <TouchableOpacity style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/hotel.png')}
                    style={{width: 80, height: 80,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Hotel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/passeio.png')}
                    style={{width: 80, height: 80,borderRadius: 30}}
                    />
                    <Text style={styles.text4}>Passeio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/adestrar.png')}
                    style={{width: 80, height: 80,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Adestramento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/agility.png')}
                    style={{width: 80, height: 80,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Agility</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.comentarios}>
              <View style={styles.comentarioCard}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image 
                            source={require('../assets/icon_usuario.png')}
                            style={{width: 30, height: 30}}
                        />
                        <Text style={styles.nomeUsuario}>Maria</Text>
                    </View>
                    <Image 
                        source={require('../assets/avaliacao.png')}
                        style={{width: 50, height: 20}}
                    />
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.textoComentario}>Adorei a experiência que o Bob Marley teve com vocês!</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
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
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 10}}>
                    <View style={{ backgroundColor: '#fffff0', width:'40%', padding:10, borderRadius: 10}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
                            <Image 
                                source={require('../assets/Img_Passeio.png')}
                                style={{width: 30, height: 30}}/>
                            <Text style={styles.text3}>Maria</Text>
                            <Image 
                                source={require('../assets/avaliacao.png')}
                                style={{width: 50, height: 30}}/>
                        </View>
                        <View style={{alignItems:'center', margin: 10, height:80 }}>
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
                    <View style={{ backgroundColor: '#f5fffa', width:'40%', padding:10, borderRadius: 10}}>
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
                <View style={{alignItems:'center'}}>
                    <Text style={styles.textoComentario}>Adestradores nota 10!!!</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
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
        </View>
        </View>
        
          // digita comentario:
          <View style={styles.digiteComentario}>
            <Text style={styles.textTopicos}>Envie sua mensagem:</Text>
            <TextInput
                placeholder="Digite o comentário"
                style={styles.inputComentario}
            />
            <TextInput
                placeholder="Informe seu email ou whatsapp"
                style={styles.inputComentario}
            />
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
      backgroundColor:'#F2EAD0'
      },
      logoBrothers:{
        height:150,
        width:'90%',
      },
      servicos:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginHorizontal: 20,
      },
      servico: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        borderColor: '#C0C0C0',
      },
      logoServicos:{
        height:80,
        width:80,
      },
      textServicos: {
        fontSize: 10,
        textAlign:'center',
      },
      
      //Noticias
      noticias: {
        marginLeft: 20,
        marginTop: 15,
      },
      noticia: {
        flexDirection:'row',
        alignItems:'center',
        marginTop: 10,
        backgroundColor: '#FCF6D7',
        padding: 6,
        borderRadius: 10,
        marginRight: 20
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

      //Comentários
      comentariosHeader: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
      leiaMais: {
        marginRight: 20,
        borderWidth: 1,
        padding: 3,
        paddingHorizontal: 15,
        borderRadius: 10
      },
      comentarios: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 10,
        marginHorizontal: 20
      },
      comentarioCard: {
        backgroundColor: '#FCF6D7',
        width:'45%',
        padding:10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        height: 150,
        justifyContent:'space-between'
      },
      nomeUsuario: {
        marginLeft: 10,
      },
      textoComentario: {
        fontSize: 13
      },

      //Cria comentários
      digiteComentario: {
        marginLeft:20,
        marginTop: 10
      },
      textTopicos: {
        color: '#60452F',
        fontWeight: 'bold'        
      },
      inputComentario: {
        backgroundColor:'#FCF6D7',
        height: 40,
        marginRight: 30,
        borderRadius: 20,
        paddingLeft: 30,
        marginTop: 10
      }
});