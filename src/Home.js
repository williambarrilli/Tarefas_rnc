import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Button, ScrollView, Text } from 'react-native'
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
        let newTarefa = { tarefa: tarefa.nome, realizado: true }
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
                    const id = tarefa
                    const nome = data[tarefa].tarefa
                    const status = data[tarefa].realizado

                    tarefas.push({
                        id,
                        nome,
                        status
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
                    <Text style={styles.text} >
                        tarefa: {tarefa.nome}
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.text}
                            style={{ color: `${tarefa.status ? 'rgb(0, 170, 0)' : 'rgb(255, 0, 0)'}` }}>
                            Status: {tarefa.status === false ? "A fazer" : "Realizada"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Button style={styles.text}
                            title={"Realizar"}
                            color='rgb(0, 170, 0)'
                            onPress={() => {
                                this.updateTask(tarefa)
                            }} />
                        <Button
                            title={"Deletar"}
                            color='rgb(255, 0, 0)'
                            onPress={() => {
                                this.deletTask(tarefa)
                            }} />
                    </View>
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
                        if (this.state.tarefa !== "") {
                            this.newTask()
                        } else {
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
        height: '100%',
    },
    input: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
        borderWidth: 0.5
    },
    text: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
    }
});