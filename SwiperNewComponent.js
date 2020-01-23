import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import { Surface } from 'react-native-paper';
import blue from './images/pinacolada.png';
import cubaLibre from './images/cubaLibre.png';
import gintonic from './images/gintonic.png';
import { withNavigation } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function isOdd(num) { return num % 2;}
class SwiperNewComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            drinks: [
                {name: 'Cuba Libre', color: '#7a08fa', image: cubaLibre, ingredients: [{name: 'ron', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Fernetcola', color: '#a82ffc', image: cubaLibre, ingredients: [{name: 'fernet', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Gin Tonic', color: '#c264fe', image: gintonic, ingredients: [{name: 'gin', percentage: 30},{name: 'tonica', percentage: 70}]}],
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

    onClick = (name, image, ingredients) =>{
        this.props.navigation.navigate('Serve', {name: name, image: image, ingredients: ingredients});
    };

    _renderItem ({item, index}) {
        let colors1 = ['#F1930F', '#F08805', '#E63D16'];
        let colors2 =  ['#EB6399', '#E35995', '#982355'];
        return (
            <TouchableOpacity activeOpacity={0.7}
                              onPress={() =>{this.onClick(item.name, item.image, item.ingredients)}}
                              style={styles.slide1}>
                <LinearGradient colors={isOdd(index) ? colors2: colors1  }
                                style={{flex: 1, alignSelf: 'stretch', borderRadius:20,}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <View style={{textAlign: 'flex-end', flexDirection: 'row',  alignSelf: 'stretch', marginRight: 10}}>
                        <Image
                            style={{width: 100, height: 100 , resizeMode: 'contain', alignSelf: 'flex-end', marginLeft: 'auto' }}
                            source={item.image}
                        />
                    </View>
                </LinearGradient>

            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.drinks}
                renderItem={this._renderItem.bind(this)}
                itemWidth={350}
                activeSlideAlignment={'start'}
                sliderWidth={Dimensions.get('window').width}
            />

               /* <Swiper loop={false} automaticallyAdjustContentInsets={false} showsPagination={false} bounces={false} style={styles.wrapper} showsButtons={false}>

                    <TouchableOpacity activeOpacity={0.7}
                                      onPress={() =>{this.props.navigation.navigate('Serve', {name: 'Cuba Libre', image: cubaLibre, ingredients: [{name: 'Ron', percentage: 30},{name: 'CocaCola', percentage: 70}]});}}
                                      style={styles.slide1}>
                        <Text style={styles.text}>Cuba Libre</Text>
                        <View style={{textAlign: 'flex-end', flexDirection: 'row',  alignSelf: 'stretch', marginRight: 10}}>
                            <Image
                                style={{width: 100, height: 100 , resizeMode: 'contain', alignSelf: 'flex-end', marginLeft: 'auto' }}
                                source={cubaLibre}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}
                                      onPress={() =>{this.props.navigation.navigate('Serve', {name: 'FernetCola', image: cubaLibre, ingredients: [{name: 'Fernet', percentage: 30},{name: 'CocaCola', percentage: 70}]});}}
                                      style={styles.slide2}>
                        <Text style={styles.text}>FernetCola</Text>
                        <View style={{textAlign: 'flex-end', flexDirection: 'row',  alignSelf: 'stretch', marginRight: 10}}>
                            <Image
                                style={{width: 100, height: 100 , resizeMode: 'contain', alignSelf: 'flex-end', marginLeft: 'auto' }}
                                source={cubaLibre}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}
                                      onPress={() =>{this.props.navigation.navigate('Serve', {name: 'Gin Tonic', image: gintonic, ingredients: [{name: 'Gin', percentage: 30},{name: 'Tonica', percentage: 70}]});}}
                                      style={styles.slide3}>
                        <Text style={styles.text}>Gin Tonic</Text>
                        <View style={{textAlign: 'flex-end', flexDirection: 'row',  alignSelf: 'stretch', marginRight: 10}}>
                            <Image
                                style={{width: 100, height: 100 , resizeMode: 'contain', alignSelf: 'flex-end', marginLeft: 'auto' }}
                                source={gintonic}
                            />
                        </View>
                    </TouchableOpacity>
                </Swiper>*/
        );
    }
}

export default  withNavigation(SwiperNewComponent);

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
    },
    slide1: {
        elevation: 2,
        marginLeft: 10,
        borderRadius:20,
        height: 200,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F1930F',
    },
    slide2: {
        elevation: 2,
        marginLeft: 10,
        borderRadius:20,
        height: 200,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#a82ffc',
    },
    slide3: {
        elevation: 2,
        marginLeft: 10,
        borderRadius:20,
        height: 200,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#c264fe',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20,
        fontFamily: 'Poppins-Bold',
    }
});
