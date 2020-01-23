import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { NavigationEvents } from 'react-navigation';
import {Searchbar, Surface} from 'react-native-paper';
import CleanSettings from './CleanSettings';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import SwiperNewComponent from "./SwiperNewComponent";
import GridList from 'react-native-grid-list';
import blue from './images/pinacolada.png';
import cubaLibre from './images/cubaLibre.png';
import gintonic from './images/gintonic.png';
import {set} from "react-native-reanimated";
import SwiperPopularComponent from "./SwiperPopularComponent";
import firestore from '@react-native-firebase/firestore';
class Home extends React.Component {
   /* static navigationOptions = {
        title: 'DrinksMaker',
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
    };*/

   /* static navigationOptions = {
        header: null,
    };*/
    static navigationOptions = {
        headerTitle: (
            <Image style={{alignSelf: 'center', height: 50, width: 300}} resizeMode={'contain'} source={require('./images/aguiladetrueno.png')}/>
        ),
        headerStyle: {
            backgroundColor: '#303030',
            elevation: 0,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            query: '',
            i:0,
            drinks: [
                {name: 'Cuba Libre', color: '#E63D16', image: cubaLibre, ingredients: [{name: 'ron', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Fernetcola', color: '#F1930F', image: cubaLibre, ingredients: [{name: 'fernet', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Gin Tonic', color: '#982355', image: gintonic, ingredients: [{name: 'Gin', percentage: 30},{name: 'Tonica', percentage: 70}]}],
            drinksFiltered:  [
                {name: 'Cuba Libre', color: '#E63D16', image: cubaLibre, ingredients: [{name: 'ron', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Fernetcola', color: '#F1930F', image: cubaLibre, ingredients: [{name: 'fernet', percentage: 30},{name: 'cocacola', percentage: 70}]},
                {name: 'Gin Tonic', color: '#982355', image: gintonic, ingredients: [{name: 'gin', percentage: 30},{name: 'tonica', percentage: 70}]}],
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        console.log(this.props.screenProps.connectedToMachine, 'holas');
        var db = firestore();

        db.collection('drinks').onSnapshot(snap => {
            let arr = [];
            snap.forEach((doc, idx) => {
                let color = '';
               if (idx % 3 === 0){
                   color = '#982355';
               }
               else if (idx % 3 === 1){
                   color = '#F1930F';
               }
               else if (idx % 3 === 2){
                   color = '#E63D16';
               }
               let drink = {
                   name: doc.data().name,
                   color: color,
                   ingredients: doc.data().ingredients,
                   image: doc.data().image,
               };
               console.log(drink)
               arr.push(drink);
            });

            this.setState({
                drinks: arr,
                drinksFiltered: arr,
            });
        });

       /* this.setState({
            drinks: [
                {name: 'Cuba Libre', color: '#7a08fa', image: cubaLibre},
                {name: 'Fernetcola', color: '#a82ffc', image: cubaLibre},
                {name: 'Gin Tonic', color: '#c264fe', image: gintonic},
            ],
        });*/
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }



    onWillFocus = (payload) =>{

    };
    setSearch = (query) =>{
        let drinks = [];
        let queryLW = query.toLowerCase();
        for (let i = 0; i < this.state.drinks.length; i++){
            let drink = this.state.drinks[i];
            if (drink.name.toLowerCase().includes(queryLW)){
                drinks.push(drink);
            }
        }
        this.setState({ query: query, drinksFiltered: drinks });


    };

    onChangeTab = (i,ref) =>{
        this.setState({i:i});
    };

    renderItem = ({ item, index }) => {

        var style = {
           /* elevation: 2,*/
            marginLeft: 10,
            marginRight: 10,
            marginTop:10,
            /*borderRadius:10,*/
            height: 80,
            justifyContent: 'flex-start',
            /*backgroundColor: item.color,*/
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#fff',
        };

        return (
            <Surface style={style}>
                <Surface style={{backgroundColor: item.color, borderRadius: 5, padding: 10, elevation: 2 }}>
                    <Image
                        style={{width: 40, height: 40 , resizeMode: 'contain',  }}
                        source={item.image}
                    />
                </Surface>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.description}>{'Descripcion del trago'}</Text>
                </View>

               {/* <View style={{textAlign: 'flex-end', flexDirection: 'row', alignItems: 'stretch', marginRight: 10, }}>
                    <Image
                        style={{width: 40, height: 40 , resizeMode: 'contain', alignSelf: 'flex-end', marginLeft: 'auto' }}
                        source={blue}
                    />
                </View>*/}
            </Surface>
        )

    };

    render() {
        return (
            <ScrollView  style={styles.container}>
                <NavigationEvents
                    onWillFocus={payload => {this.onWillFocus(payload)}}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
                <Searchbar
                    style={{margin: 20, marginTop:0, elevation: 1}}
                    placeholder="Buscar tragos"
                    onChangeText={query => { this.setSearch(query) }}
                    value={this.state.query}
                />
                {!this.state.query &&
                <View>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        fontFamily: 'Poppins-Bold',
                        marginBottom: 10,
                        color: '#fff'
                    }}>
                        Nuevos
                    </Text>
                    <SwiperNewComponent/>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        fontFamily: 'Poppins-Bold',
                        marginBottom: 0,
                        marginTop: 20,
                        color: '#fff'
                    }}>
                        Populares
                    </Text>
                    <SwiperPopularComponent/>
                    <Text style={{
                        fontSize: 20,
                        marginLeft: 24,
                        fontFamily: 'Poppins-Bold',
                        marginBottom: 0,
                        marginTop: 20,
                        color: '#fff'
                    }}>
                        Todos
                    </Text>
                </View>
                }


                <View style={{flex: 3}}>
                        {this.state.drinksFiltered.map((item, idx)=>{
                            var style = {
                                /* elevation: 2,*/
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop:10,
                                /*borderRadius:10,*/
                                height: 80,
                                justifyContent: 'flex-start',
                                /*backgroundColor: item.color,*/
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#303030',
                            };
                            return (
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={() =>{this.props.navigation.navigate('Serve', {name: item.name, ingredients: item.ingredients, image: item.image});}}
                                                  style={style} >
                                    <Surface style={{backgroundColor: item.color, borderRadius: 5, padding: 10, elevation: 2 }}>
                                        <Image
                                            style={{width: 40, height: 40 , resizeMode: 'contain' }}
                                            source={{uri: item.image.toString()}}
                                        />
                                    </Surface>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text style={styles.description}>{'Descripcion del trago'}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    {/*</GridList>*/}
                </View>

            </ScrollView>
        );
    }
}

export default withNavigation(Home);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        /*alignItems: 'flex-start',*/
        /*alignItems: 'flex-start',*/
        /*flexDirection: 'column',*/
        /*flex:1,*/
    },
    text: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Poppins-Bold',
    },
    description: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Poppins-Light',
    },
    slide1: {
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop:10,
        borderRadius:20,
        height: 150,
        justifyContent: 'center',
        backgroundColor: '#007FD8',
        alignItems: 'stretch',
    },
    slide2: {
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop:10,
        borderRadius:20,
        height: 150,
        justifyContent: 'center',
        backgroundColor: '#8BEBCD',
        alignItems: 'stretch',
    },
    slide3: {
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop:10,
        borderRadius:20,
        height: 150,
        justifyContent: 'center',
        backgroundColor: '#944A95',
        alignItems: 'stretch',
    },
});