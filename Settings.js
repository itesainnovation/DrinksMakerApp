import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bluetoothIcon from './images/bluetooth.png';


class Settings extends React.Component {
    static navigationOptions = {
        /*headerTitle: <Text style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
        }}>Configuración</Text>,*/
        title: 'Configuración',
        headerStyle: {
            backgroundColor: '#303030',
            elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'Poppins-Bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<View style={styles.container}>
         {/*   <TouchableOpacity
                onPress={() =>{this.props.navigation.navigate('Bluetooth');}}
                activeOpacity={0.1}
                style={{
                    alignItems:'flex-start',
                    flexDirection: 'row',
                    marginLeft: 24,
                    marginTop: 20,
                    alignSelf: 'stretch',

                }}
            >
                <Image
                    style={{width: 40, height: 40 , resizeMode: 'contain'}}
                    source={bluetoothIcon}
                />
              <Text style={{
                  fontSize: 20,
                  marginLeft: 24,
                  fontFamily: 'Poppins-Bold',
                  marginTop: 5,
              }}>Bluetooth</Text>

            </TouchableOpacity>*/}
            <TouchableOpacity
                onPress={() =>{this.props.navigation.navigate('Set');}}
                activeOpacity={0.1}
                style={{
                    alignItems:'flex-start',
                    flexDirection: 'row',
                    marginLeft: 24,
                    marginTop: 20,
                    alignSelf: 'stretch',
                }}
            >
                <Icon size={40} name="remote" style={{
                    color: '#fff',
                }} />
                <Text style={{
                    fontSize: 20,
                    marginLeft: 24,
                    marginTop: 5,
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                }}>Seteo de bombas</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>{this.props.navigation.navigate('Clean');}}
                activeOpacity={0.1}
                style={{
                    alignItems:'flex-start',
                    flexDirection: 'row',
                    marginLeft: 24,
                    marginTop: 20,
                    alignSelf: 'stretch',
                }}
            >
                <Icon size={40} name="spray-bottle" style={{
                    color: '#fff',
                }} />
                <Text style={{
                    fontSize: 20,
                    marginLeft: 24,
                    marginTop: 5,
                    color: '#fff',
                    fontFamily: 'Poppins-Bold',
                }}>Limpieza</Text>

            </TouchableOpacity>
        </View>);
    }
}

export default withNavigation(Settings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
});