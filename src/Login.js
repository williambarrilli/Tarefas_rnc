import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import { Button, CheckBox } from 'react-native-elements';

import firebase from 'firebase'

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "felip.ew@hotmail.com",
            senha: "12345678"
        };
        const config = {
            apiKey: "AIzaSyDnubM1S21GtFmvbR5f2PQnnddglL17jIM",
            authDomain: "tarefas-97c0e.firebaseapp.com",
            databaseURL: "https://tarefas-97c0e.firebaseio.com",
            projectId: "tarefas-97c0e",
            storageBucket: "tarefas-97c0e.appspot.com",
            messagingSenderId: "703540494002",
            appId: "1:703540494002:web:b41deb095a0898ce"
        };
        firebase.initializeApp(config);
    };
    validateLogin() {
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email.trim(), this.state.senha)
            .then(retorno => {
                this.props.navigation.navigate('Home')
            })
            .catch(erro => {
                console.log(erro)
            })
    };
    render() {
        return (
            <View>
                <Text> LOGIN FIREBASE </Text>
                <TextInput
                    value={this.state.email}
                    onChange={email => {
                        this.setState({ email })
                    }}
                    placeholder={"digite o email"}
                />
                <TextInput
                    value={this.state.senha}
                    onChange={senha => {
                        this.setState({ senha })
                    }}
                    placeholder={"digite a senha"}
                />
                <Button
                    title="Login"
                    onPress={() => {
                        this.validateLogin()
                    }}
                />
                <CheckBox
                    title='Salvar email'
                    checked={this.state.checked}
                />
                <CheckBox
                    title='Manter-me conectado'
                    checked={this.state.checked}
                />

            </View>
        )
    }
}
