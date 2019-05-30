import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ListItem, CheckBox } from 'react-native-elements';
import firebase from 'firebase'


export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            tarefa: "",
            tarefas: []
        }
    }

    deletTask(tarefa) {
        let tarefaId = tarefa.id
        let currentUser = firebase.auth().currentUser
        firebase.database()
        .ref(`/users/${currentUser.uid}/tasks/${tarefaId}`)
        .remove()
    }

    newTask() {
        let currentUser = firebase.auth().currentUser;
        let tarefa = { tarefa: this.state.tarefa, realizado: false }

        firebase.database()
            .ref(`/users/${currentUser.uid}/tasks`)
            .push(tarefa)
    }
    updateTask(tarefa) {
        let tarefaId = tarefa.id
        let newTarefa = { tarefa: tarefa.tarefaTitulo, realizado: true }
        let currentUser = firebase.auth().currentUser
        firebase.database()
        .ref(`/users/${currentUser.uid}/tasks/${tarefaId}`)
        .set(newTarefa)
    }
    readTasks() {
        let currentUser = firebase.auth().currentUser;
        firebase.database()
            .ref(`/users/${currentUser.uid}/tasks/`)
            .on('value', snapchot => {
                let data = snapchot.val()

                let tarefas = []
                for (tarefa in data) {
                    const idTarefa = tarefa
                    const tarefaTitulo = data[tarefa].tarefa
                    const tarefaStatus = data[tarefa].realizado

                    tarefas.push({
                        id: idTarefa,
                        tarefaTitulo,
                        tarefaStatus
                    })
                }
                this.setState({
                    tarefas
                })
            })

    }

    tarefasRow() {
        let tarefas = this.state.tarefas;
        tarefas = Object.values(tarefas)
        return tarefas.map(tarefa => (
            <View>
                <View>
                    <Text >
                        tarefa: {tarefa.tarefaTitulo}
                    </Text>
                </View>
                <View>
                    <Text>
                        Status: {tarefa.tarefaStatus === false? "A fazer": "Realizado" }
                    </Text>
                    <Button
                        title={"V"}
                        color='rgb(0, 170, 0)'
                        onPress={() => {
                            this.updateTask(tarefa)
                        }} />
                    <Button
                        title={"X"}
                        color='rgb(255, 0, 0)'
                        onPress={() => {
                            this.deletTask(tarefa)
                        }} />
                </View>
            </View>
        ))
    }


    componentDidMount() {
        this.readTasks();
    }

    render() {
        const tarefasRow = this.tarefasRow();
        return (
            <View>
                <TextInput
                    value={this.state.tarefa}
                    onChangeText={tarefa => {
                        this.setState({ tarefa })
                    }}
                    placeholder={"digite a tarefa"}
                />
                <Button
                    title="Adicionar Tarefa"
                    onPress={() => {
                        if (this.state.tarefa !== ""){
                            this.newTask()
                        }else{
                            alert("preencha os campos ")
                        }
                    }}
                />
                <ScrollView>
                    {tarefasRow}
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    circleShapeView: {
        width: 70,
        height: 70,
        borderRadius: 150 / 2,
        backgroundColor: '#00BCD4',
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 15
    },
    tarefas: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        margin: 10,
        flex: 1
    },
    conteinerCheck: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
    },
    conteinerTitulo: {
        textAlign: "left",
        display: "flex",
        flexDirection: "row",
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    semTarefa: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    }
});