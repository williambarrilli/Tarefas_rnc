import React, { Component } from 'react'
import { Text, View, TextInput, CheckBox, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

import firebase from 'firebase'

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            senha: "",
            check: false,
            checkLog: false,
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
    erro(err) {
        alert(err)
    }

    async componentDidMount() {
        let email = await AsyncStorage.getItem("email")
        if (email != null) {
            this.setState({
                email
            })
        }
    }

    armazenaStorage(key, value) {
        AsyncStorage.setItem(key, value)
    }

    checkBoxChange() {
        this.setState({
            check: !this.state.check
        })
        this.armazenaStorage('email', this.state.email)
    }

    checkBoxChangeLog() {
        if (this.state.senha.length !== 0) {
            console.log("entro ali")
            this.setState({
                checkLog: !this.state.checkLog
            })
            this.armazenaStorage('email', this.state.email)
            this.armazenaStorage('senha', this.state.senha)

        } else {
            console.log(this.state.email)
            console.log(this.state.senha)            
            this.setState({
                checkLog: false
            })
            alert("Preencha os todos os campos!")
        }
    }
    autoLogin() {
        if (this.state.senha) {
            console.log("chamo o valid")

            this.validateLogin()
        }
    }
    validateLogin() {
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email.trim(), this.state.senha)
            .then(retorno => {
                this.props.navigation.navigate('Home')
            })
            .catch(erro => {
                this.erro(erro)
            })
    };

    createNewUser() {
        this.props.navigation.navigate('Cadastro')
    }
    componentWillMount() {
        this.autoLogin()

    }
    render() {
        return (
            <View>
                <Text style={styles.text}> LOGIN FIREBASE </Text>
                <TextInput style={styles.input}
                    value={this.state.email}
                    onChangeText={email => {
                        this.setState({ email })
                    }}
                    placeholder={"digite o email"}
                />
                <TextInput style={styles.input}
                    value={this.state.senha}
                    onChangeText={senha => {
                        this.setState({ senha })
                    }}

                />
                <View style={styles.button}>
                    <CheckBox
                        value={this.state.check}
                        onChange={() => this.checkBoxChange()}
                    /><Text>Lembrar-me</Text>
                    <CheckBox
                        value={this.state.checkLog}
                        onChange={() => this.checkBoxChangeLog()}
                    /><Text>Manter-me conectado</Text>
                </View>
                <View
                    style={styles.button}>
                    <Button
                        title="Login"
                        onPress={() => {
                            this.validateLogin()
                        }} />
                    <Button
                        title="Cadastrar"
                        onPress={() => {
                            this.createNewUser()
                        }} />
                </View>
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
    button: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
        flexDirection: "row"
    },
    text: {
        margin: 20,
        marginTop: 15,
        marginVertical: 5,
    }
});