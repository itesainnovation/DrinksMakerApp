import React from 'react';
import ReactNative, {Image} from 'react-native';
import {View, StyleSheet, TouchableOpacity, Text, Picker, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Provider, DefaultTheme, Button, IconButton, Surface} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Animated, Easing } from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import leftPump from './images/pump.png';
import checkPump from './images/checkPump.png';
import machine from './images/machine.png';
import bluetoothIcon from "./images/bluetooth.png";
import * as Animatable from "react-native-animatable";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const AnimatableKASV = Animatable.createAnimatableComponent(KeyboardAwareScrollView);

class SetMachine extends React.Component {
    static navigationOptions = {
        title: 'Seteo de Maquina',
        headerStyle: {
            backgroundColor: '#303030',
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'left',
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            pump1: '',
            pump1Volume: '',
            pump2: '',
            pump2Volume: '',
            pump3: '',
            pump3Volume: '',
            pump4: '',
            pump4Volume: '',
            pump5: '',
            pump5Volume: '',
            pump6: '',
            pump6Volume: '',
            pump7: '',
            pump7Volume: '',
            pump8: '',
            pump8Volume: '',
            pump9: '',
            pump9Volume: '',
            pump10: '',
            pump10Volume: '',
            pumpSelected: 'pump1',
            size: '',
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        const settings = this.props.screenProps;
        this.setState({
            pump1: settings.pump1,
            pump1Volume: settings.pump1Volume,
            pump2: settings.pump2,
            pump2Volume: settings.pump2Volume,
            pump3: settings.pump3,
            pump3Volume: settings.pump3Volume,
            pump4: settings.pump4,
            pump4Volume: settings.pump4Volume,
            pump5: settings.pump5,
            pump5Volume: settings.pump5Volume,
            pump6: settings.pump6,
            pump6Volume: settings.pump6Volume,
            pump7: settings.pump7,
            pump7Volume: settings.pump7Volume,
            pump8: settings.pump8,
            pump8Volume: settings.pump8Volume,
            pump9: settings.pump9,
            pump9Volume: settings.pump9Volume,
            pump10: settings.pump10,
            pump10Volume: settings.pump10Volume,
            size: settings.size,
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }
    setPumps = () =>{
        const settings = this.state;
        this.props.screenProps.setPumps({
            pump1: settings.pump1,
            pump1Volume: settings.pump1Volume,
            pump2: settings.pump2,
            pump2Volume: settings.pump2Volume,
            pump3: settings.pump3,
            pump3Volume: settings.pump3Volume,
            pump4: settings.pump4,
            pump4Volume: settings.pump4Volume,
            pump5: settings.pump5,
            pump5Volume: settings.pump5Volume,
            pump6: settings.pump6,
            pump6Volume: settings.pump6Volume,
            pump7: settings.pump7,
            pump7Volume: settings.pump7Volume,
            pump8: settings.pump8,
            pump8Volume: settings.pump8Volume,
            pump9: settings.pump9,
            pump9Volume: settings.pump9Volume,
            pump10: settings.pump10,
            pump10Volume: settings.pump10Volume,
            size: settings.size,
        });
        this.props.navigation.navigate('Settings');
    };

    onChangeVolume = (volume) => {
        let stateVolume = this.state.pumpSelected + 'Volume';
        this.setState({
            [stateVolume]: volume,
        });
    };

    render() {
        const theme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#7a08fa',
                accent: '#FFCBF3',
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
                <View style={{flex:1,  backgroundColor: '#303030',}}>
                    <AnimatableKASV contentContainerStyle={styles.container}>
                        {/*     <Text style={{
                        alignSelf: 'stretch',
                        fontSize: 16,
                        marginBottom: 0,
                        marginLeft: 24,
                        fontFamily: 'Poppins-Bold',
                        marginTop: 24,
                        color: '#fff'
                    }}>
                        Tamaño
                    </Text>
                    <RNTextInput
                        style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            alignSelf: 'stretch',
                            marginLeft: 24,
                            marginRight: 24,
                            marginTop: 6,
                            paddingLeft: 20,
                            textAlign: 'left',
                            fontFamily:'Poppins',
                            height: 60,
                            borderWidth: 0,
                            borderColor: '#FF5722',
                            borderRadius: 20 ,
                            color: '#fff',
                            backgroundColor : '#505050',
                        }}
                        label='Tamaño del vaso (ml)'
                        mode={'outlined'}
                        value={this.state.size}
                        onChangeText={name => this.setState({ size: name })}
                    />*/}
                        <View style={styles.machineContainer}>
                            <View style={styles.leftPumpsContainer}>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump9'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump9 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump7'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump7 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump5'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump5 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump3'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump3 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump1'})}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 25 , resizeMode: 'contain'}}
                                        source={this.state.pump1 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Image
                                style={{width: 220, height: 500, marginTop: 10 , marginLeft: 20, marginRight: 20, resizeMode: 'contain'}}
                                source={machine}
                            />
                            <View style={styles.leftPumpsContainer}>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump10'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump10 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump8'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump8 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump6'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump6 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump4'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 10 , resizeMode: 'contain'}}
                                        source={this.state.pump4 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity  activeOpacity={0.4}
                                                   onPress={()=>{this.setState({pumpSelected: 'pump2'});}}
                                >
                                    <Image
                                        style={{width: 80, height: 80, marginTop: 25 , resizeMode: 'contain'}}
                                        source={this.state.pump2 ? checkPump : leftPump}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                marginLeft: 24,
                                marginTop: 10,
                                marginRight: 24,
                                alignSelf: 'stretch',
                                backgroundColor: '#303030',
                            }}>
                            <Text style={{
                                flex: 2,
                                fontSize: 20,
                                marginBottom: 0,
                                marginLeft: 0,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 0,
                                color: '#fff'
                            }}>
                                {'Bomba ' + this.state.pumpSelected.match(/\d+/)[0]}
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                marginLeft: 24,
                                marginTop: 10,
                                marginRight: 24,
                                alignSelf: 'stretch',
                                backgroundColor: '#303030',
                            }}>
                            <Text style={{
                                flex: 2,
                                fontSize: 16,
                                marginBottom: 0,
                                marginLeft: 0,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 0,
                                color: '#fff'
                            }}>
                                Ingrediente
                            </Text>
                            <Text style={{
                                flex: 1,
                                fontSize: 16,
                                marginBottom: 0,
                                marginLeft: 0,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 0,
                                color: '#fff'
                            }}>
                                Volumen en ml
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                marginLeft: 24,
                                marginTop: 10,
                                marginRight: 24,
                                alignSelf: 'stretch',
                                backgroundColor: '#303030',
                            }}>
                            <View style={{
                                alignItems:'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 2,
                                marginRight: 8,
                                borderColor: '#fff',
                                borderWidth: 0,
                                height: 60,
                                borderRadius: 20,
                                backgroundColor : "#505050"
                            }}>
                                <RNPickerSelect
                                    style={stylesPicker}
                                    placeholder={{ label: 'Seleccione uno', value: '' }}
                                    value={this.state[this.state.pumpSelected]}
                                    onValueChange={name => this.setState({ [this.state.pumpSelected]: name })}
                                    items={[
                                        { label: 'Ron', value: 'ron' },
                                        { label: 'Gin', value: 'gin' },
                                        { label: 'Fernet', value: 'fernet' },
                                        { label: 'Coca Cola', value: 'cocacola' },
                                        { label: 'Tonica', value: 'tonica' },
                                    ]}
                                />
                            </View>
                            {/*<RNTextInput
                            style={{
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                flex: 2,
                                marginRight: 8,
                                paddingLeft: 20,
                                textAlign: 'left',
                                fontFamily:'Poppins',
                                height: 60,
                                borderWidth: 0,
                                borderColor: '#FF5722',
                                borderRadius: 20 ,
                                color: '#fff',
                                backgroundColor : '#505050',
                            }}

                            label='Ingrediente'
                            mode={'outlined'}
                            value={this.state[this.state.pumpSelected]}
                            onChangeText={name => this.setState({ [this.state.pumpSelected]: name })}
                        />*/}
                            <RNTextInput
                                style={{
                                    alignItems:'flex-start',
                                    flexDirection: 'row',
                                    flex: 1,
                                    marginLeft: 8,
                                    paddingLeft: 20,
                                    textAlign: 'left',
                                    fontFamily:'Poppins',
                                    height: 60,
                                    borderWidth: 0,
                                    borderColor: '#FF5722',
                                    borderRadius: 20 ,
                                    color: '#fff',
                                    backgroundColor : '#505050',
                                }}

                                label='Volumen'
                                mode={'outlined'}
                                value={this.state[this.state.pumpSelected + 'Volume']}
                                onChangeText={(volume) => {this.onChangeVolume(volume)}}
                            />
                        </View>
                        <Button style={{
                            marginLeft: 24,
                            marginTop: 40,
                            marginBottom: 20,
                            marginRight: 24,
                            fontFamily: 'Poppins',
                            alignSelf: 'stretch',
                        }}  labelStyle={{fontFamily: 'Poppins'}} mode="contained" onPress={() => {this.setPumps()}}>
                            SETEAR
                        </Button>
                    </AnimatableKASV>
                </View>

            </Provider>

        );
    }
}

export default SetMachine;

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        backgroundColor: '#303030',

        /*justifyContent: 'center',*/
    },
    machineContainer: {
        /*alignItems: 'flex-start',*/
        flexDirection: 'row',
        marginTop: 10,
    },
    leftPumpsContainer: {
        /*alignItems: 'flex-start',*/
        flexDirection: 'column',
    },
});


const stylesPicker = StyleSheet.create({

    inputIOS: {

        paddingLeft: 16,
        paddingRight: 16,
    },
    inputAndroid: {
        paddingLeft: 16,
        paddingRight: 16,
        height: 64,
        width: 180,
        alignSelf: 'stretch',
        borderWidth: 1,
        flex: 1,
        color:'#fff',
        fontFamily: 'Poppins',

    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
    },
    inputRounded: {
        marginLeft: 24,
        marginRight: 24,
        paddingLeft: 20,
        textAlign: 'left',
        fontFamily:'Poppins',
        height: 58,
        borderWidth: 0,
        borderColor: '#FF5722',
        borderRadius: 20 ,
        color: '#fff',
        backgroundColor : '#505050',
    }
});