import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Feed({navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../assets/Logo_Brothers.png')}
                style={styles.logo}/>
                <Text>Av.Conselheiro Rodrigues Alves, 198 - Macuco,npm install --save moment</Text>
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
});