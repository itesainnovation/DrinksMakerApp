import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Provider, DefaultTheme, Button, IconButton} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Buffer } from 'buffer';
import LinearGradient from "react-native-linear-gradient";
global.Buffer = Buffer;
const iconv = require('iconv-lite');

class CleanSettings extends React.Component {
    static navigationOptions = {
        title: 'Limpieza',
        headerStyle: {
            backgroundColor: '#303030',
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            /*textAlign: 'center',
            alignSelf: 'center',*/
            fontFamily: 'Poppins-Bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            isCleaning: false,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }
    write (message) {
        BluetoothSerial.write(message)
            .then((res) => {
                console.log('Successfuly wrote to device');
                this.setState({ connected: true });
            })
            .catch((err) => console.log(err.message));
    }
    onClean = () =>{

        if (this.props.screenProps.connectedToMachine){
            let command = {limpieza: 10000};
            let commandString = JSON.stringify(command);
            commandString = commandString + '|';
            this.write(commandString);
            this.setState({
                isCleaning: true,
            });
            setTimeout(() =>{
                Animated.timing(this.state.progress, {
                    toValue: 1,
                    duration: 10000,
                    easing: Easing.linear,
                }).start(()=>{
                    this.props.navigation.navigate('Settings');
                });
            },50);
        }
    };

    render() {
        const theme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#7a08fa',
                accent: '#f1c40f',
            },
            fonts: {
                ...DefaultTheme.fonts,
                regular: 'Poppins',
                medium: 'Poppins-Medium',
                light: 'Poppins-Light',
                thin: 'Poppins-ExtraLight',
            },
        };
        return (
            <Provider theme={theme}>
                <View style={styles.container}>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        fontFamily: 'Poppins-Bold',
                        marginTop: 5,
                        color: '#fff',
                        opacity: this.state.isCleaning ? 0 : 1,
                    }}>Por favor coloque agua {"\n"}caliente en los contenedores {"\n"}provistos y una vez colocados {"\n"}toque el botón limpiar
                    </Text>

                    <Button style={{
                        marginLeft: 24,
                        marginTop: 20,
                        marginBottom: 0,
                        marginRight: 24,
                        bottom:20,
                        left: 0,
                        right: 0,
                        position: 'absolute',
                        fontFamily: 'Poppins',
                        opacity: this.state.isCleaning ? 0 : 1,
                    }}  disabled={this.state.isCleaning} labelStyle={{fontFamily: 'Poppins'}} mode="contained" onPress={this.onClean}>
                        LIMPIAR
                    </Button>
                    <LottieView style={{height:300, textAlign: 'center', alignSelf: 'center',}}  source={require('./animations/clean')} progress={this.state.progress} />
                </View>
            </Provider>
        );
    }
}

export default CleanSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        /*alignItems: 'flex-start',*/
        flexDirection: 'column',
    },
});