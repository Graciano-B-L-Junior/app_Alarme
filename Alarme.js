import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Alarme(props) {

    var concluido = false;
    useEffect(() => {
        var alarme = setInterval(function () {
            if (props.minutos > 0) {
                if (props.segundos == 0) {
                    let minutos = props.minutos - 1;
                    props.minutos(minutos)
                    props.setSegundos(59)
                } else {
                    let segundos = props.segundos - 1;
                    props.setSegundos(segundos)
                }

            } else if (props.minutos == 0 && concluido == false) {
                if (props.segundos == 0) {
                    concluido = true;
                    props.setMinutos(0)
                    props.setSegundos(0)
                    props.estado('leitura')
                    playSound()

                } else {
                    let segundos = props.segundos - 1;
                    props.setSegundos(segundos)
                }
            }
        }, 1000)

        return () => clearInterval(alarme)
    })

    function alteraValor(numero) {
        if (numero < 10) {
            return numero = "0" + numero
        } else {
            return numero
        }
    }

    async function playSound() {
        const sound = new Audio.Sound();
        try {
            let somAlarme;
            props.som.map(function (val) {
                if (val.selecionado) {
                    somAlarme = val.file;
                }
            })
            await sound.loadAsync(somAlarme)
            await sound.playAsync();
            // Your sound is playing!

            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
            setTimeout(async () => {
                await sound.unloadAsync();
            }, 1000)



        } catch (error) {
            // An error occurred!
        }
    }



    var seg = alteraValor(props.segundos)
    var min = alteraValor(props.minutos)
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgb(255, 68, 0)', 'rgb(146, 39, 0)']}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></LinearGradient>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <Text style={styles.alarmeText}>{min}</Text>
                <Text style={styles.alarmeText}>:</Text>
                <Text style={styles.alarmeText}>{seg}</Text>
            </View>

            <View>
                <TouchableOpacity onPress={() => props.estado('leitura')} style={styles.btnStartReset}><
                    Text style={styles.textoBtn}>Resetar</Text>
                </TouchableOpacity>
            </View>

            <StatusBar hidden />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoCentral: {
        fontSize: 30,
        color: 'white'
    },
    textoPicker: {
        color: 'white',
        fontSize: 18,
        paddingTop: 10
    },
    btnStartReset: {
        backgroundColor: '#31263E',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#221E22',
        marginTop: 10
    },
    textoBtn: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 33,
        color: 'white'
    }, btnAlarme: {
        padding: 15,
        backgroundColor: '#44355B',
        margin: 2,
        borderWidth: 2,
        borderColor: 'white'
    },
    btnAlarme2: {
        padding: 15,
        backgroundColor: '#271E33',
        margin: 2,
        borderWidth: 2,
        borderColor: 'white'
    },
    alarmeText: {
        color: 'white',
        fontSize: 32,
        margin: 5
    }
});