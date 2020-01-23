import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import BottomBar from './BottomBar';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Buffer } from 'buffer';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Cache } from 'react-native-cache';
import {AsyncStorage} from 'react-native';

var cache = new Cache({
    namespace: 'myapp',
    policy: {
        maxEntries: 50000
    },
});
async function requestAll() {
    const cameraStatus = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    const contactsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return {cameraStatus, contactsStatus};
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            finished: false,
            connectedToMachine: false,
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
            size: '',
        };
    }

    componentWillMount() {
    }

    componentDidMount() {

        AsyncStorage.getItem('pump1').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump1: value});
            }
        });
        AsyncStorage.getItem('pump2').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump2: value});
            }
        });
        AsyncStorage.getItem('pump3').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump3: value});
            }
        });
        AsyncStorage.getItem('pump4').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump4: value});
            }
        });
        AsyncStorage.getItem('pump5').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump5: value});
            }
        });
        AsyncStorage.getItem('pump6').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump6: value});
            }
        });
        AsyncStorage.getItem('pump7').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump7: value});
            }
        });
        AsyncStorage.getItem('pump8').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump8: value});
            }
        });
        AsyncStorage.getItem('pump9').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump9: value});
            }
        });

        AsyncStorage.getItem('pump10').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump10: value});
            }
        });

        AsyncStorage.getItem('pump1Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump1Volume: value});
            }
        });
        AsyncStorage.getItem('pump2Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump2Volume: value});
            }
        });
        AsyncStorage.getItem('pump3Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump3Volume: value});
            }
        });

        AsyncStorage.getItem('pump4Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump4Volume: value});
            }
        });
        AsyncStorage.getItem('pump5Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump5Volume: value});
            }
        });
        AsyncStorage.getItem('pump6Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump6Volume: value});
            }
        });
        AsyncStorage.getItem('pump7Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump7Volume: value});
            }
        });
        AsyncStorage.getItem('pump8Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump8Volume: value});
            }
        });
        AsyncStorage.getItem('pump9Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump9Volume: value});
            }
        });
        AsyncStorage.getItem('pump10Volume').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({pump10Volume: value});
            }
        });
        AsyncStorage.getItem('size').then(value => {
            if (value !== null) {
                console.log(value);
                this.setState({size: value});
            }
        });


        /*cache.getAll((err, entries) => {
            // {
            //     "key1": { "value": 42 }
            //     "key2": { "value": 2 }
            //     ...
            // }
            let settings = entries;
            console.log(settings.pump1, 'aca')
            this.setState({
                pump1: settings.pump1 ? settings.pump1.value : '' ,
                pump1Volume: settings.pump1Volume ? settings.pump1Volume.value : '',
                pump2: settings.pump2 ? settings.pump2.value : '',
                pump2Volume: settings.pump2Volume ? settings.pump2Volume.value : '',
                pump3: settings.pump3 ? settings.pump3.value : '',
                pump3Volume: settings.pump4Volume ? settings.pump4Volume.value : '',
                pump4: settings.pump4 ? settings.pump4.value : '',
                pump4Volume: settings.pump4Volume ? settings.pump4Volume.value : '',
                pump5: settings.pump5 ? settings.pump5.value : '',
                pump5Volume: settings.pump5Volume ? settings.pump5Volume.value : '',
                pump6: settings.pump6 ? settings.pump6.value : '',
                pump6Volume: settings.pump6Volume ? settings.pump6Volume.value : '',
                pump7: settings.pump7 ? settings.pump7.value : '',
                pump7Volume: settings.pump7Volume ? settings.pump7Volume.value : '',
                pump8: settings.pump8 ? settings.pump8.value : '',
                pump8Volume: settings.pump8Volume ? settings.pump8Volume.value : '',
                pump9: settings.pump9 ? settings.pump9.value : '',
                pump9Volume: settings.pump9Volume ? settings.pump9Volume.value : '',
                pump10: settings.pump10 ? settings.pump10.value : '',
                pump10Volume: settings.pump10Volume ? settings.pump10Volume.value : '',
                size: settings.size ? settings.size.value : '',
            });
        });*/

        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
        }).start(() => {
            //
            this.setState({
                finished: true,
            });

            Promise.all([
                check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION),
                check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
                // …
            ]).then(([corseStatus, fineStatus /* … */]) => {
                console.log({corseStatus, fineStatus});
                if (corseStatus === 'denied' || fineStatus === 'denied'){
                    requestAll().then(statuses => console.log(statuses));
                }
            });

            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list(),
            ])
                .then((values) => {
                    const [ isEnabled, devices ] = values;
                    console.log(devices);
                    console.log(isEnabled);
                    this.setState({ isEnabled, devices });
                    this.setup();
                });

            BluetoothSerial.on('bluetoothEnabled', () => console.log('Bluetooth enabled'));
            BluetoothSerial.on('bluetoothDisabled', () => console.log('Bluetooth disabled'));
           /* BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));*/
            BluetoothSerial.on('connectionLost', () => {
                if (this.state.device) {
                    console.log(`Connection to device ${this.state.device.name} has been lost`);
                }
                showMessage({
                    message: "Maquina desconectada",
                    description: "Vuelvase a conectar",
                    type: "default",
                    backgroundColor: "#fa0b0f", // background color
                    color: "#ffffff", // text color
                });
                this.setState({ connected: false, connectedToMachine: false });
            });


        });
    }

    setup = () =>{
        this.setState({connecting: true});
        showMessage({
            message: "Conectando",
            type: "default",
            backgroundColor: "#7a08fa", // background color
            color: "#ffffff", // text color
        });
        BluetoothSerial.isConnected().then((connected)=>{
            if (connected){
                BluetoothSerial.disconnect().then(()=>{
                    let machine = this.state.devices.find(x => x.name === 'KIDSMAKER');
                    console.log(machine);
                    if (machine){
                        BluetoothSerial.connect(machine.id).then(()=>{
                            this.setState({connectedToMachine: true, connecting: false});
                            showMessage({
                                message: "Conectado",
                                type: "default",
                                backgroundColor: "#04fa2f", // background color
                                color: "#ffffff", // text color
                            });
                            setTimeout(()=>{
                                hideMessage();
                            },1850);
                        }).catch((err) => {
                            showMessage({
                                message: "Maquina no conectada",
                                description: "Verifique que la maquina este encendida",
                                type: "default",
                                backgroundColor: "#fa0b0f", // background color
                                color: "#ffffff", // text color
                                onPress: () => {
                                   this.setup();
                                },
                            });
                            this.setState({connecting: false});
                        });
                    }
                    else {
                        BluetoothSerial.discoverUnpairedDevices().then((unpairedDevices)=>{
                            let machine = unpairedDevices.find(x => x.name === 'KIDSMAKER');
                            if (machine){
                                BluetoothSerial.connect(machine.id).then(()=>{
                                    this.setState({connectedToMachine: true});
                                    showMessage({
                                        message: "Conectado",
                                        type: "default",
                                        backgroundColor: "#04fa2f", // background color
                                        color: "#ffffff", // text color
                                    });
                                    setTimeout(()=>{
                                        hideMessage();
                                    },1850);
                                }).catch((err) => {
                                    console.log(err.message);
                                    showMessage({
                                        message: "Maquina no conectada",
                                        description: "Verifique que la maquina este encendida",
                                        type: "default",
                                        backgroundColor: "#fa0b0f", // background color
                                        color: "#ffffff", // text color
                                        onPress: () => {
                                            this.setup();
                                        },
                                    });
                                    this.setState({connecting: false});
                                });
                            }
                            else {

                            }
                        }).catch((err) => {
                            console.log(err.message);
                            showMessage({
                                message: "Maquina no conectada",
                                description: "Verifique que la maquina este encendida",
                                type: "default",
                                backgroundColor: "#fa0b0f", // background color
                                color: "#ffffff", // text color
                                onPress: () => {
                                    this.setup();
                                },
                            });
                            this.setState({connecting: false});
                        });
                    }
                });
            }
            else {
                let machine = this.state.devices.find(x => x.name === 'KIDSMAKER');
                console.log(machine);

                if (machine){
                    BluetoothSerial.connect(machine.id).then(()=>{
                        this.setState({connectedToMachine: true, connecting: false});
                        showMessage({
                            message: "Conectado",
                            type: "default",
                            backgroundColor: "#04fa2f", // background color
                            color: "#ffffff", // text color
                        });
                        setTimeout(()=>{
                            hideMessage();
                        },1850);
                    }).catch((err) => {
                        console.log(err);
                        showMessage({
                            message: "Maquina no conectada",
                            description: "Verifique que la maquina este encendida",
                            type: "default",
                            backgroundColor: "#fa0b0f", // background color
                            color: "#ffffff", // text color
                            onPress: () => {
                                this.setup();
                            },
                        });
                        this.setState({connecting: false});
                    });
                }
                else {
                    BluetoothSerial.discoverUnpairedDevices().then((unpairedDevices)=>{
                        let machine = unpairedDevices.find(x => x.name === 'KIDSMAKER');
                        if (machine){
                            BluetoothSerial.connect(machine.id).then(()=>{
                                this.setState({connectedToMachine: true});
                                showMessage({
                                    message: "Conectado",
                                    type: "default",
                                    backgroundColor: "#04fa2f", // background color
                                    color: "#ffffff", // text color
                                });
                                setTimeout(()=>{
                                    hideMessage();
                                },1850);
                            }).catch((err) => {
                                console.log(err.message);
                                showMessage({
                                    message: "Maquina no conectada",
                                    description: "Verifique que la maquina este encendida",
                                    type: "default",
                                    backgroundColor: "#fa0b0f", // background color
                                    color: "#ffffff", // text color
                                    onPress: () => {
                                        this.setup();
                                    },
                                });
                                this.setState({connecting: false});
                            });
                        }
                        else {

                        }
                    }).catch((err) => {
                        console.log(err.message);
                        showMessage({
                            message: "Maquina no conectada",
                            description: "Verifique que la maquina este encendida",
                            type: "default",
                            backgroundColor: "#fa0b0f", // background color
                            color: "#ffffff", // text color
                            onPress: () => {
                                this.setup();
                            },
                        });
                        this.setState({connecting: false});
                    });
                }
            }
        }).catch((err) => {
            console.log(err.message);
            showMessage({
                message: "Maquina no conectada",
                description: "Verifique que la maquina este encendida",
                type: "default",
                backgroundColor: "#fa0b0f", // background color
                color: "#ffffff", // text color
                onPress: () => {
                    this.setup();
                },
            });
            this.setState({connecting: false});
        });
    };

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    setPumps = (settings)=> {
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

        AsyncStorage.setItem('pump1', settings.pump1).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump2', settings.pump2).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump3', settings.pump3).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump4', settings.pump4).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump5', settings.pump5).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump6', settings.pump6).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump7', settings.pump7).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump8', settings.pump8).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump9', settings.pump9).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump10', settings.pump10).then(function (err) {
            console.log(err);
        });

        AsyncStorage.setItem('pump1Volume', settings.pump1Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump2Volume', settings.pump2Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump3Volume', settings.pump3Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump4Volume', settings.pump4Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump5Volume', settings.pump5Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump6Volume', settings.pump6Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump7Volume', settings.pump7Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump8Volume', settings.pump8Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump9Volume', settings.pump9Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('pump10Volume', settings.pump10Volume).then(function (err) {
            console.log(err);
        });
        AsyncStorage.setItem('size', settings.size).then(function (err) {
            console.log(err);
        });
    };


    render() {
        const settings = this.state;
        if (this.state.finished){
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#000'
                }}>
                    <BottomBar
                        screenProps={{
                            connectedToMachine: this.state.connectedToMachine,
                            setPumps: this.setPumps,
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
                        }}/>
                    <FlashMessage hideOnPress={false} autoHide={false} position="top" />
                </View>

            );
        }
        else {
            return (
                <View  style={styles.container}>
                    <LottieView style={{ flex: 1, height: 600,alignSelf: 'center'}} loop={false} source={require('./animations/thirstyBlack')} progress={this.state.progress} />
                </View>
            );
        }
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
});
