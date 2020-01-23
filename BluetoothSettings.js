import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Provider, DefaultTheme, Button, IconButton} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { Buffer } from 'buffer';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';


global.Buffer = Buffer;
const iconv = require('iconv-lite');

async function requestAll() {
    const cameraStatus = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    const contactsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return {cameraStatus, contactsStatus};
}

class BluetoothSettings extends React.Component {
    static navigationOptions = {
        title: 'Bluetooth',
        headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
        },
        headerTintColor: '#000',
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
            isEnabled: false,
            discovering: false,
            devices: [],
            unpairedDevices: [],
            connected: false,
            section: 0,
            isPaired: false,
            connectedToMachine: false,
            connecting: false
        };
    }

    componentDidMount() {
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
            BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
            BluetoothSerial.on('connectionLost', () => {
            if (this.state.device) {
                console.log(`Connection to device ${this.state.device.name} has been lost`);
            }
                this.setState({ connected: false });
            });
    }


    setup = () =>{
        this.setState({connecting: true});
        BluetoothSerial.isConnected().then((connected)=>{
            if (connected){
                BluetoothSerial.disconnect().then(()=>{
                    let machine = this.state.devices.find(x => x.name === 'KIDSMAKER');
                    console.log(machine);
                    if (machine){
                        BluetoothSerial.connect(machine.id).then(()=>{
                            this.setState({connectedToMachine: true, connecting: false});
                        }).catch((err) => {
                            console.log(err.message);
                            this.setState({connecting: false});
                        });
                    }
                    else {
                        BluetoothSerial.discoverUnpairedDevices().then((unpairedDevices)=>{
                            let machine = unpairedDevices.find(x => x.name === 'KIDSMAKER');
                            if (machine){
                                BluetoothSerial.connect(machine.id).then(()=>{
                                    this.setState({connectedToMachine: true});
                                }).catch((err) => {
                                    console.log(err.message);
                                    this.setState({connecting: false});
                                });
                            }
                            else {

                            }
                        }).catch((err) => {
                            console.log(err.message);
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
                    }).catch((err) => {
                        console.log(err.message);
                        this.setState({connecting: false});
                    });
                }
                else {
                    BluetoothSerial.discoverUnpairedDevices().then((unpairedDevices)=>{
                        let machine = unpairedDevices.find(x => x.name === 'KIDSMAKER');
                        if (machine){
                            BluetoothSerial.connect(machine.id).then(()=>{
                                this.setState({connectedToMachine: true});
                            }).catch((err) => {
                                console.log(err.message);
                                this.setState({connecting: false});
                            });
                        }
                        else {

                        }
                    }).catch((err) => {
                        console.log(err.message);
                        this.setState({connecting: false});
                    });
                }
            }
        }).catch((err) => {
            console.log(err.message);
            this.setState({connecting: false});
        });
    };


    /**
     * [android]
     * request enable of bluetooth from user
     */
    requestEnable () {
        BluetoothSerial.requestEnable()
            .then((res) => this.setState({ isEnabled: true }))
            .catch((err) => console.log(err.message))
    }

    /**
     * [android]
     * enable bluetooth on device
     */
    enable () {
        BluetoothSerial.enable()
            .then((res) => this.setState({ isEnabled: true }))
            .catch((err) => console.log(err.message))
    }

    /**
     * [android]
     * disable bluetooth on device
     */
    disable () {
        BluetoothSerial.disable()
            .then((res) => this.setState({ isEnabled: false }))
            .catch((err) => console.log(err.message))
    }

    /**
     * [android]
     * toggle bluetooth
     */
    toggleBluetooth (value) {
        if (value === true) {
            this.enable()
        } else {
            this.disable()
        }
    }

    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    discoverUnpaired () {
        if (this.state.discovering) {
            console.log('discovering');
            return false;
        } else {
            this.setState({ discovering: true });
            BluetoothSerial.discoverUnpairedDevices()
                .then((unpairedDevices) => {
                    console.log(unpairedDevices)
                    this.setState({ unpairedDevices, discovering: false })
                })
                .catch((err) => console.log(err.message))
        }
    }

    /**
     * [android]
     * Discover unpaired devices, works only in android
     */
    cancelDiscovery () {
        if (this.state.discovering) {
            BluetoothSerial.cancelDiscovery()
                .then(() => {
                    this.setState({ discovering: false });
                })
                .catch((err) => console.log(err.message));
        }
    }

    /**
     * [android]
     * Pair device
     */
    pairDevice (device) {
        BluetoothSerial.pairDevice(device.id)
            .then((paired) => {
                if (paired) {
                    console.log(`Device ${device.name} paired successfully`);
                    const devices = this.state.devices;
                    devices.push(device);
                    this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
                } else {
                    console.log(`Device ${device.name} pairing failed`)
                }
            })
            .catch((err) => console.log(err.message))
    }

    /**
     * Connect to bluetooth device by id
     * @param  {Object} device
     */
    connect (device) {
        this.setState({ connecting: true })
        BluetoothSerial.connect(device.id)
            .then((res) => {
                console.log(`Connected to device ${device.name}`);
                this.setState({ device, connected: true, connecting: false })
            })
            .catch((err) => console.log(err.message));
    }



    /**
     * Disconnect from bluetooth device
     */
    disconnect () {
        BluetoothSerial.disconnect()
            .then(() => this.setState({ connected: false }))
            .catch((err) => console.log(err.message))
    }

    /**
     * Toggle connection when we have active device
     * @param  {Boolean} value
     */
    toggleConnect (value) {
        if (value === true && this.state.device) {
            this.connect(this.state.device)
        } else {
            this.disconnect()
        }
    }

    /**
     * Write message to device
     * @param  {String} message
     */
    write (message) {
        if (!this.state.connectedToMachine) {
            console.log('You must connect to device first');
        }else {
            BluetoothSerial.write(message)
                .then((res) => {
                    console.log('Successfuly wrote to device');
                    this.setState({ connected: true });
                })
                .catch((err) => console.log(err.message));
        }
    }

    onDevicePress (device) {
        if (this.state.section === 0) {
            this.connect(device)
        } else {
            this.pairDevice(device)
        }
    }

    writePackets (message, packetSize = 64) {
        const toWrite = iconv.encode(message, 'cp852')
        const writePromises = []
        const packetCount = Math.ceil(toWrite.length / packetSize)

        for (var i = 0; i < packetCount; i++) {
            const packet = new Buffer(packetSize)
            packet.fill(' ')
            toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize)
            writePromises.push(BluetoothSerial.write(packet))
        }

        Promise.all(writePromises)
            .then((result) => {
            })
    }


    render() {
        const theme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#007FD8',
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
                        fontFamily: 'Poppins',
                        marginTop: 5,
                    }}>Por favor conéctese a la
                        {"\n"}DrinksMaker
                    </Text>


                    <View
                        style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            marginLeft: 24,
                            marginTop: 20,
                            alignSelf: 'stretch',
                        }}
                    >
                        <Icon size={40} name="remote" style={{
                            color: '#007FD8',
                        }} />
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 24,
                            marginTop: 5,
                            fontFamily: 'Poppins-Bold',
                        }}>DrinksMaker</Text>
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
                    }}  labelStyle={{fontFamily: 'Poppins'}} disabled={!this.state.connectedToMachine} mode="contained" onPress={() => {this.write("{\"bomba1\":66000,\"bomba2\":12500,\"bomba3\":4170}|")}}>
                        CONECTAR
                    </Button>
                    <LottieView style={{height:300, textAlign: 'center', alignSelf: 'center',}}  source={require('./animations/bluetooth')} autoPlay loop />
                </View>
            </Provider>
           );
    }
}

export default BluetoothSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        /*alignItems: 'flex-start',*/
        flexDirection: 'column',
    },
});