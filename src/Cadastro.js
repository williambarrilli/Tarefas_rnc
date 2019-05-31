import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Button } from 'react-native-elements';
import firebase from 'firebase'

export default class Cadastro extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            senha: ""
        };
    };
    sucess(){
        alert("Cadastrado com sucesso")
        this.props.navigation.navigate('Home')
    }
    erro(err) {
        alert(err)
    }
    cadastraUser() {
        const email = this.state.email
        const senha = this.state.senha
        email.toString()
        console.log(email)
        firebase.auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(retorno => this.sucess())
            .catch(err => this.erro(err))

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>  Criar Cadastro </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={email => {
                        this.setState({ email })
                    }}
                    placeholder={"digite o email"}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.senha}
                    onChangeText={senha => {
                        this.setState({ senha })
                    }}
                    placeholder={"digite a senha"}
                />
                <Button
                    style={styles.buttonCadastrar}
                    title="Cadastrar"
                    onPress={() => {
                        this.cadastraUser()
                    }} />
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