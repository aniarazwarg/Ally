import react, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export function MenuAdmin({ navigation, route }) {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
                    <Text>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
                    <Text>Agendamentos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    botaoVer: {
        backgroundColor: '#6FAA9C',
        padding: 5,
        alignItems: 'center',
        borderRadius: 20,
        marginRight: 2,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2EAD0',
    },
    header: {
        zIndex: 1,
        backgroundColor: '#F2EAD0',
        width: '100%'
      },
      headerConteudo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 5,
        alignItems: 'center'
      },
})

