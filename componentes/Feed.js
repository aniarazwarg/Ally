
 import * as React from 'react';
 import { View } from 'react-native';
 import { StyleSheet } from 'react-native';
 import { TouchableOpacity, TextInput, Image } from 'react-native';
  import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

  
export function Feed({navigation}) {
       
      const [visible, setVisible] = React.useState(false);
    
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      const containerStyle = {backgroundColor: 'white', padding: 20};
    
      return (
        <PaperProvider>
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text>Tela não imprementada</Text>
            </Modal>
          </Portal>
      
        <View style={styles.container}>
            {/* Logo Brothers */}
            <View>
                <Image source={require('../assets/Logo_Brothers.png')}
                style={styles.logo}/>
            </View>
            {/* Logo serviços */}
            <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('Hotel')} style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/hotel.png')}
                 style={{width: 90, height:90,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Hotel</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={showModal} style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/passeio.png')}
                    style={{width: 90, height:90,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Passeio</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={showModal} style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/adestrar.png')}
                       style={{width: 90, height:90,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Adestramento</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={showModal} style={{borderWidth:0.5,borderRadius: 10}}>
                    <Image source={require('../assets/agility.png')}
                      style={{width: 90, height:90,borderRadius:30}}
                    />
                    <Text style={styles.text4}>Agility</Text>
                </TouchableOpacity>
            </View>
            {/* Noticias */}
            <View style={{marginTop: 10}}>
                <Text style={{marginLeft: 20, marginTop: 20, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 10,   color: '#60452F',fontWeight: 'bold'}}>Notícias</Text>
                <TouchableOpacity style={{backgroundColor: '#fffff0', margin:5, borderRadius: 10}}>
                <View style={{flexDirection:'row', alignItems:'center', margin: 10}}>
                    
                        <Image source={require('../assets/Img_Passeio.png')}
                    style={styles.logo3}/>
                    
                    <Text style={styles.text2}>Vagas para o feriado!</Text>
                </View>
                </TouchableOpacity>
                 <TouchableOpacity style={{backgroundColor: '#fffff0', margin:5, borderRadius: 10}}>
                <View style={{flexDirection:'row', alignItems:'center', margin: 10}}>  
                    <Image source={require('../assets/Img_Passeio.png')}
                    style={styles.logo3}/>
                    <View>
                        <Text style={styles.text2}>Live no Instagram</Text>
                        <Text style={styles.text3}>Novidades pra vocês!</Text>
                    </View>
                </View>
                </TouchableOpacity>
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
        </PaperProvider>
      
      
      
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:'#F2EAD0',
          },
        logo:{
          alignSelf:'center',
          height:"40vw",
          width:'90vw',
          backgroundColor:'#F2EAD0'
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
            fontSize: 12,
            textAlign:'center',
          }
    });