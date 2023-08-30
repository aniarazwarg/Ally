import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export function Feed({navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('/assets/Logo_Brothers.png')}
                style={styles.logo}/>
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
        alignSelf:'center',
      height:'200px',
      width:'400px',
      },
      logo2:{
    
        alignSelf:'end',
      height:'90px',
      width:'90px',
      },
});