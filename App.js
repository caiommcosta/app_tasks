import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
          StyleSheet, Text, View, ImageBackground, TouchableOpacity,
          TextInput, TouchableHighlight, Modal, ScrollView
        } from 'react-native';

import Constants from 'expo-constants';

export default function App() {
  console.disableYellowBox = true;

  const image = require('./resources/bg.jpg');

  const [tasks, setTasks] = useState([]);

  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let taskList = await AsyncStorage.getItem('tasks');
        if (taskList == null)
          setTasks([]);
        else
          setTasks(JSON.parse(taskList));
      } catch (error) {

      }
    })();
  }, [])










  function deleteTask(id) {
    alert('Tarefa ' + id + ' deletada')

    let taskList = tasks.filter(function (val) {
      return val.id != id;
    });

    setTasks(taskList);

    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(newTask));
      } catch (error) {

      }
    })();

  }

  function addTask() {
    setModal(!modal);

    let id = 0;
    if (tasks.length > 0) {
      id = tasks[tasks.length - 1].id + 1;
    }
    let task = { id: id, task: newTask };
    setTasks([...tasks, task]);

    (async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, task]));
      } catch (error) {

      }
    })();
  }


  return (
    <ScrollView>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setNewTask(text)} autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTask()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Minha lista de tarefas.</Text>
        </View>
      </ImageBackground>

      {
        tasks.map(function (val) {
          return (
            <View style={styles.singleTask}>
              <View style={{ flex: 1, width: '100%', padding: 10 }}>
                <Text>{val.task}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', flex: 1, padding: 10 }}>
                <TouchableOpacity onPress={() => deleteTask(val.id)}><AntDesign name="minuscircleo" size={24} color="black" /></TouchableOpacity>
              </View>
            </View>
          );
        })
      }

      <TouchableOpacity style={styles.btnAddTask} onPress={() => setModal(true)}><Text style={styles.textAddTask}>Adicionar Tarefa</Text></TouchableOpacity>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  },

  coverView: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  textHeader: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: Constants.statusBarHeight,
  },

  singleTask: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    flexDirection: 'row',
    paddingBottom: 10
  },
  //Estilos para nossa modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  // fim modal

  textAddTask: {
    textAlign: 'center',
    color: 'white'
  },
  btnAddTask: {
    padding: 8,
    width: 200,
    backgroundColor: '#28a4fc',
    marginTop: 20
  }
});
