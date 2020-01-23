import React from 'react';
import ReactNative from 'react-native';
import {View, StyleSheet, TouchableOpacity, Text, Picker, ScrollView, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Provider, DefaultTheme, Button, IconButton, Surface} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import defineEnumerableProperties from "@babel/runtime/helpers/esm/defineEnumerableProperties";
import cubaLibre from './images/cubaLibre.png';
const AnimatableKASV = Animatable.createAnimatableComponent(KeyboardAwareScrollView);
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Buffer } from 'buffer';
import LinearGradient from "react-native-linear-gradient";
global.Buffer = Buffer;
const iconv = require('iconv-lite');

function getLonger(commands){
    let longer = 0;
    for (var key in commands) {
        if (commands.hasOwnProperty(key)) {
            if (commands[key] > longer){
               longer = commands[key];
            }
        }
    }
    return longer;
}

function getPumpVolume(object, pumpName) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if(key.includes(pumpName) && key !== pumpName){
                return object[key];
            }
        }
    }
}

function getPump(object, ingredient) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if(object[key] === ingredient.name){
                let pump = {};
                pump.name = key;
                pump.ingredient = object[key];
                pump.volume = getPumpVolume(object, key);
                console.log(pump);
                return pump;
            }
        }
    }
    return false;
}
function getPumps(object, ingredient) {
    let pumps = [];
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if(object[key] === ingredient.name){
                let pump = {};
                pump.name = key;
                pump.ingredient = object[key];
                pump.volume = getPumpVolume(object, key)
                pumps.push(pump);
            }
        }
    }
    console.log(pumps);
    return pumps;
}

function getIngredientPumpAndVolume(settings, ingredient) {
    var pumpsValues = Object.values(settings);
    var pumpsKeys = Object.keys(settings);
    let pumpValue = pumpsValues.find(x => x === ingredient.name);
    console.log(pumpValue);
    if (pumpValue){
        let pumpKey = pumpsKeys.find(x => x === ingredient.name);
        return pumpValue;
    }
    else {
        return false;
    }
}


class ServeComponent extends React.Component {
    static navigationOptions = {
        title: 'Servir',
        headerStyle: {
            backgroundColor: '#303030',
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
        /*    textAlign: 'center',
            alignSelf: 'center',*/
            fontFamily: 'Poppins-Bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            language: '',
            progress: new Animated.Value(0),
            ingredients: [{}],
            volumes: [{volume: ''}],
            fillValue: 0.2,
            scrollHeight: 0,
            isServing: false,
            size: 200,
        };
    }





    componentWillMount() {
    }

    componentDidMount() {
        let ingredients = this.props.navigation.getParam('ingredients');
        console.log(ingredients);
        this.setState({ingredients: ingredients});
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

    onServe = () => {

        if (this.props.screenProps.connectedToMachine){
            if (!this.state.isServing){
                let command = {};
                let size = parseFloat(this.state.size);
                for (let i = 0; i < this.state.ingredients.length; i++){
                    let ingredient = this.state.ingredients[i];
                    let pumps = getPumps(this.props.screenProps, ingredient);
                    let percentage = parseFloat(ingredient.percentage);
                    for (let j = 0; j < pumps.length; j++){
                        let pump = pumps[j];
                        let ingVolume = (((size * percentage) / 100) / pumps.length).toFixed(2);
                        let seconds = (ingVolume * 0.15).toFixed(0);
                        let millis = seconds * 1000;
                        command[pump.name] = millis;
                    }
                }
                let commandString = JSON.stringify(command);
                commandString = commandString + '|';
                /*commandString = "{\"bomba1\":66000,\"bomba2\":12500,\"bomba3\":4170}|";*/
                this.write(commandString);
                this.setState({
                    isServing: true,
                });
                setTimeout(() =>{
                    Animated.timing(this.state.progress, {
                        toValue: 1,
                        duration: getLonger(command),
                        easing: Easing.linear,
                    }).start(()=>{
                        this.props.navigation.navigate('SuccessServeScreen');
                    });
                },50);
            }
            else {
                let command = {cancel: 1000};
                let commandString = JSON.stringify(command);
                commandString = commandString + '|';
                /*commandString = "{\"bomba1\":66000,\"bomba2\":12500,\"bomba3\":4170}|";*/
                this.write('*');
                this.setState({
                    isServing: false,
                });
            }
        }
    };

    render() {
        const theme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#E63D16',
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
                <View style={{ flex: 1,
                    backgroundColor: '#303030',}}>
                    <LinearGradient colors={['#F1930F', '#F08805', '#E63D16']} style={{
                        elevation: 1,
                        borderRadius: 20,
                        backgroundColor:'#7a08fa',
                        height: 260,
                        margin: 24,
                    }}>
                        {!this.state.isServing &&
                        <Image style={{height: 250, alignSelf: 'center'}} resizeMode={'contain'} source={this.props.navigation.getParam('image')}/>
                        }
                        {this.state.isServing &&
                        <LottieView  style={{height:250, textAlign: 'center', alignSelf: 'center',}} source={require('./animations/fillWhite')} progress={this.state.progress} />
                        }

                    </LinearGradient>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        marginTop: 20,
                        fontFamily: 'Poppins-Bold',
                        marginBottom: 5,
                        color: '#fff',
                    }}>
                        {this.props.navigation.getParam('name')}
                    </Text>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        marginTop: 5,
                        fontFamily: 'Poppins',
                        color: '#fff',
                        marginBottom: 5,
                    }}>
                        Ingredientes:
                    </Text>
                    {this.state.ingredients.map((ingredient, idx)=>{

                        let pump = getPump(this.props.screenProps, ingredient);

                        return (
                            <View >
                                <Text style={{
                                    fontSize: 20,
                                    marginLeft: 24,
                                    marginTop: 5,
                                    marginRight: 10,
                                    fontFamily: 'Poppins-Bold',
                                    marginBottom: 5,
                                    color: '#fff',
                                    textTransform: 'capitalize',
                                }}>
                                    {ingredient.name + ': ' + ingredient.percentage + '%   '}
                                    <Text style={{color: '#ff1621', textTransform: 'none', paddingLeft: 24}}>
                                        {!pump && <Icon size={20}  name="alert" style={{ color: '#ff1621', paddingLeft: 20 }} />}
                                    </Text>
                                </Text>

                            </View>

                        );
                    })}
                    <View
                        style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            marginLeft: 24,
                            marginTop: 20,
                            marginRight: 24,
                            alignSelf: 'stretch',
                            backgroundColor: '#303030',
                        }}>
                        <TouchableOpacity activeOpacity={0.7}
                                          onPress={()=> {this.setState({size: 200})}}
                                          style={{
                                              height: 100,
                                              width: 100,
                                          }}>
                                            <LinearGradient colors={this.state.size === 200 ? ['#F1930F', '#F08805', '#E63D16'] : ['#949494', '#949494', '#949494'] }
                                                            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 100, width: 100,borderRadius:20, flexDirection: 'row'}}>

                                                <Text style={{flex: 1, alignItems: 'center', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff'}}>{'200ML'}</Text>
                                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7}
                                          onPress={()=> {this.setState({size: 500})}}
                                          style={{
                                              height: 100,
                                              width: 100,
                                              marginLeft: 50
                                          }}>
                            <LinearGradient colors={this.state.size === 500 ? ['#F1930F', '#F08805', '#E63D16'] : ['#949494', '#949494', '#949494'] }
                                            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 100, width: 100,borderRadius:20, flexDirection: 'row'}}>

                                <Text style={{flex: 1, alignItems: 'center', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff'}}>
                                    {'500ML'}
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7}
                                          onPress={()=> {this.setState({size: 750})}}
                                          style={{
                                              height: 100,
                                              width: 100,
                                              marginLeft: 50
                                          }}>
                            <LinearGradient colors={this.state.size === 750 ? ['#F1930F', '#F08805', '#E63D16'] : ['#949494', '#949494', '#949494'] }
                                            style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 100, width: 100,borderRadius:20, flexDirection: 'row'}}>

                                <Text style={{flex: 1, alignItems: 'center', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff'}}>
                                    {'750ML'}
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

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
                    }}  color={this.state.isServing ? '#e60023' : '#E63D16'} labelStyle={{fontFamily: 'Poppins'}} mode="contained" onPress={this.onServe}>
                        {this.state.isServing ? 'CANCELAR' : 'SERVIR' }
                    </Button>
                </View>
            </Provider>
        );
    }
}

export default withNavigation(ServeComponent);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
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
        color:'#000000',
        fontFamily: 'Poppins',

    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
    }
});