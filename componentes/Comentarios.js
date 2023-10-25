// import react, { useState, useEffect } from "react";
// import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, StatusBar } from "react-native";

// export function Comentarios({ navigation }) {

//     const [comentarios, setComentarios] = useState([]);

//     function dataComentarios() {
//         fetch('http://localhost/api/comentarios')
//             .then((response) => response.json())
//             .then((json) => setComentarios(json))
//     }

//     useEffect(() => {
//         dataComentarios();
//     }, []);

//     return (
//         <View style={styles.container}>

//             <ScrollView style={styles.header} stickyHeaderIndices={[0]}
//                 stickyHeaderHiddenOnScroll>
//                 <View >
//                     <View style={styles.headerConteudo}>

//                         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//                             <Image source={require('../assets/menu-bar.png')}
//                                 style={styles.logosHeader}
//                             />
//                         </TouchableOpacity>
                        
//                         <Text style={styles.headerText}>Comentários</Text>
//                     </View>
//                 </View>

//                 <View style={styles.comentarios}>
//                     {comentarios.map((comentario) => (
//                         <View key={comentario.id}>
//                             <View style={styles.comentarioCard}>
//                                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <Image
//                                             source={require('../assets/icon_usuario.png')}
//                                             style={{ width: 30, height: 30 }}
//                                         />
//                                         <Text style={styles.nomeUsuario}>{comentario.nome}</Text>
//                                     </View>
//                                 </View>
//                                 <View style={{ alignItems: 'center', }}>
//                                     <Text style={styles.textoComentario}>{comentario.comentario}</Text>
//                                 </View>
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
//                                     <TouchableOpacity>
//                                         <Image
//                                             source={require('../assets/like.png')}
//                                             style={{ width: 20, height: 20 }} />
//                                     </TouchableOpacity>
//                                     <TouchableOpacity>
//                                         <Image
//                                             source={require('../assets/dislike.png')}
//                                             style={{ width: 20, height: 20 }} />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     ))}
//                 </View>

//             </ScrollView >
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#F2EAD0',
//         paddingTop: StatusBar.currentHeight,
//     },
//     header: {
//         zIndex: 1,
//         backgroundColor: '#F2EAD0',
//         width: '100%'
//     },
//     headerConteudo: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         backgroundColor: 'red',
//         width: '100%',
//     },
//     logosHeader: {
//         width: 40,
//         height: 40
//     },
//     header: {
//         marginTop: 25,
//         marginBottom: 20
//     },
//     headerText: {
//         fontSize: 25,
//     },
//     comentarioCard: {
//         backgroundColor: '#FCF6D7',
//         width: 300,
//         padding: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#C0C0C0',
//         height: 180,
//         justifyContent: 'space-between',
//         marginBottom: 20
//     },
//     nomeUsuario: {
//         marginLeft: 10,
//     },
//     textoComentario: {
//         fontSize: 13,
//         textAlign: 'justify',
//         width: "100%"
//     },
//     comentarios: {

//     }

// });






import react, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { Text } from 'react-native-paper';






export function Comentarios({ navigation }) {



    const [comentarios, setComentarios] = useState([]);

    function dataComentarios() {
        fetch('http://localhost/api/comentarios')
            .then((response) => response.json())
            .then((json) => setComentarios(json))
    }

    useEffect(() => {
        dataComentarios();
    }, []);


  return (

    


      <View style={styles.container}>
        <ScrollView style={styles.scrollView}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerConteudo}>
           
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image source={require('../assets/menu-bar.png')}
                    style={styles.logosHeader}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>Comentários</Text>
            </View>
          </View>

          {/* Resto */}
                         <View style={styles.comentarios}>
                    {comentarios.map((comentario) => (
                         <View key={comentario.id}>
                            <View style={styles.comentarioCard}>
                                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={require('../assets/icon_usuario.png')}
                                            style={{ width: 30, height: 30 }}
                                        />
                                        <Text style={styles.nomeUsuario}>{comentario.nome}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', }}>
                                    <Text style={styles.textoComentario}>{comentario.comentario}</Text>
                                 </View>
                                 <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                     <TouchableOpacity>
                                         <Image
                                             source={require('../assets/like.png')}
                                             style={{ width: 20, height: 20 }} />
                                     </TouchableOpacity>
                                     <TouchableOpacity>
                                         <Image
                                             source={require('../assets/dislike.png')}
                                             style={{ width: 20, height: 20 }} />
                                     </TouchableOpacity>
                                 </View>
                             </View>
                         </View>
                     ))}
                 </View>


        </ScrollView>
      </View>





  );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,         
            backgroundColor: '#F2EAD0',
        
        },
        header: {
            zIndex: 1,
            backgroundColor: '#F2EAD0',
            
        },
        headerConteudo: {
            flexDirection: 'row',
            justifyContent:'space-evenly',
            backgroundColor: '#F2EAD0',
            width: '100%',
        },
        logosHeader: {
            width: 40,
            height: 40
        },
        header: {
            marginBottom: 30
        },
        headerText: {
            fontSize: 25,
            alignSelf:'center',
            
        },
        comentarioCard: { 
            alignSelf: 'center',
            backgroundColor: '#FCF6D7',
            width: 300,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#C0C0C0',
            height: 180,
            justifyContent: 'space-between',
            marginBottom: 20
        },
        nomeUsuario: {
            marginLeft: 10,
        },
        textoComentario: {
            fontSize: 13,
            textAlign: 'justify',
            width: "100%"
        },

        comentarios: {
    
        }
    })