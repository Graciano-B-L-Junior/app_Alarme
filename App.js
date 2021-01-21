import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Alarme from './Alarme';
import {Audio} from 'expo-av';

export default function App() {

  console.disableYellowBox = true;

  const [estado, setEstado] = useState('leitura')
  const [segundos, setSegundos] = useState(1)
  const [minutos, setMinutos] = useState(0)
  const [alarme, setAlarme] = useState([
    {
      id: 1,
      nome: 'alarme 1',
      file: require('./assets/alarme1.mp3')
      ,
      selecionado: true
    },
    {
      id: 2,
      nome: 'alarme 2',
      file: require('./assets/alarme2.mp3'),
      selecionado: false
    },
    {
      id: 3,
      nome: 'alarme 3',
      file: require('./assets/alarme3.mp3'),
      selecionado: false
    }
  ])

  var preenchePicker = []

  for (let i = 1; i < 60; i++) {
    preenchePicker.push(i);
  }

  function ativarAlarme(identidade) {
    var novoAlarme = []
    novoAlarme = alarme.map((val) => {
      if (val.id == identidade) {
        val.selecionado = true;
      } else {
        val.selecionado = false;
      }
      return val;
    });
    setAlarme(novoAlarme);
  }

  if (estado == 'leitura') {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgb(255, 68, 0)', 'rgb(146, 39, 0)']}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></LinearGradient>
        <Text style={styles.textoCentral}>Seleciona o horário</Text>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={styles.textoPicker}>Min:</Text>
          <Picker
            selectedValue={minutos}
            onValueChange={(itemValue,itemIdex)=>setMinutos(itemValue)}
            style={{ height: 50, width: 100, color: 'white' }}
          >
            <Picker.Item label="0" value="0"></Picker.Item>
            {
              preenchePicker.map(function (val) {
                return (<Picker.Item label={val.toString()} value={val.toString()}></Picker.Item>)
              })
            }
          </Picker>
          <Text style={styles.textoPicker}>Seg:</Text>
          <Picker
            selectedValue={segundos}
            onValueChange={(itemValue,itemIdex)=>setSegundos(itemValue)}
            style={{ height: 50, width: 100, color: 'white' }}
          >
            {
              preenchePicker.map((val) => {
                return (<Picker.Item label={val.toString()} value={val.toString()}></Picker.Item>)
              })
            }
          </Picker>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {
            alarme.map((val) => {
              if (val.selecionado) {
                return (<TouchableOpacity onPress={() => ativarAlarme(val.id)} style={styles.btnAlarme2}>
                  <Text style={{ color: 'white' }}>{val.nome}</Text>
                </TouchableOpacity>)
              } else {
                return (<TouchableOpacity onPress={() => ativarAlarme(val.id)} style={styles.btnAlarme}>
                  <Text style={{ color: 'white' }}>{val.nome}</Text>
                </TouchableOpacity>)
              }
            })
          }
        </View>

        <View>
          <TouchableOpacity onPress={()=>setEstado('Timer')} style={styles.btnStartReset}><
            Text style={styles.textoBtn}>Iniciar</Text>
          </TouchableOpacity>
        </View>

        <StatusBar hidden />
      </View>
    );
  } else if (estado == 'Timer') {
    return (
      <Alarme som={alarme} estado={setEstado} segundos={segundos} minutos={minutos} setSegundos={setSegundos} setMinutos={setMinutos}></Alarme>
    )

  }
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
  }
});
