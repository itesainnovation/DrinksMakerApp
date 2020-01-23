import React from 'react';
import ReactNative from 'react-native';
import {View, StyleSheet, TouchableOpacity, Text, Picker, ScrollView, Image} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, Provider, DefaultTheme, Button, IconButton, Surface} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import defineEnumerableProperties from "@babel/runtime/helpers/esm/defineEnumerableProperties";
const AnimatableKASV = Animatable.createAnimatableComponent(KeyboardAwareScrollView);
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import placeholder from './images/image.png';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const options = {
    title: 'Seleccionar imagen',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const { uuid } = require('uuidv4');

class NewDrink extends React.Component {
    static navigationOptions = {
        title: 'Nuevo Trago',
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
        this.state = {
            name: '',
            language: '',
            progress: new Animated.Value(0),
            ingredients: [{ingredient: ''}],
            volumes: [{volume: ''}],
            fillValue: 0.2,
            scrollHeight: 0,
            sourceDisplay: placeholder,
            source: '',
            submit: false,
        };
    }

    handleIngredientChange = (idx, theIngredient) => {
        this.setState({error: false});
        const newIngredients = this.state.ingredients.map((ingredients, sidx) => {
            if (idx !== sidx) return ingredients;
            return { ...ingredients, ingredient: theIngredient };
        });
        this.setState({ ingredients: newIngredients });

    };

    handleVolumeChange = (idx, theVolume) => {
        this.setState({error: false});
        const newVolumes = this.state.volumes.map((volumes, sidx) => {
            if (idx !== sidx) return volumes;
            return { ...volumes, volume: theVolume };
        });
        this.setState({ volumes: newVolumes });

    };

    onAddPhrase = () => {
        if (this.state.ingredients.length < 5){
            Animated.timing(this.state.progress, {
                toValue: this.state.fillValue + 0.2,
                duration: 1000,
                easing: Easing.linear,
            }).start();
            this.setState({
                ingredients: this.state.ingredients.concat([{ingredient: ''}]),
                volumes: this.state.volumes.concat([{volume: ''}]),
                fillValue: this.state.fillValue + 0.2,
            });

            setTimeout(() => {
                this.scrollInner.scrollToEnd({ animated: true });
                let num = this.state.ingredients.length - 1;
                this['ingredient' + num].bounce(500);
            }, 50);
        }
    };

    componentWillMount() {
    }

    componentDidMount() {
        this.typesView.bounce(1000);
        this.scroll.fadeIn(2000);
        Animated.timing(this.state.progress, {
            toValue: 0.1,
            duration: 1000,
            easing: Easing.linear,
        }).start();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    reanimate = () => {

        Animated.timing(this.state.progress, {
            toValue: 0,
            duration: 5000,
            easing: Easing.linear,
        }).start();
    };

    _scrollToInput (reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode);
    };

    onCreateDrink = () =>{

        if (this.state.ingredients.length > 0 && this.state.name && this.state.uri && !this.state.submit){
            this.setState({
                submit: true,
            });
            let ingredients = [];

            for (let i = 0; i < this.state.ingredients.length; i++){
                let ingredient = {name: this.state.ingredients[i].ingredient, percentage: parseFloat(this.state.volumes[i].volume)};
                ingredients.push(ingredient);
            }


            console.log(this.state.imageUri);

            const ext = this.state.imageUri.split('.').pop(); // Extract image extension
            const filename = `${uuid()}.${ext}`; // Generate unique name

            var db = firestore();
            var storageRef = storage().ref();
            var imagesRef = storageRef.child('images');

            /*var fileName = this.state.name + new Date().getTime() + '.' + ext;*/
            var fileRef = imagesRef.child(filename);
            console.log(filename);
            fileRef.putFile(this.state.imageUri).then(snapshot => {
                fileRef.getDownloadURL().then(url => {
                    let drink = {
                        name: this.state.name,
                        ingredients: ingredients,
                        image: url,
                    };
                    db.collection('drinks').add(drink).then(doc => {
                        this.setState({
                            submit: false,
                        });
                        this.props.navigation.navigate('SuccessScreenDrink');
                    });
                });
            });


        }
    };

    onImage = () =>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                const sourceDisplay = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    source: source,
                    uri: source.uri,
                    sourceDisplay: sourceDisplay,
                    imageUri: response.path,
                });
            }
        });
    };

    render() {
        const theme = {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#E63D16',
                accent: '#FFCBF3',
                text: '#fff',
                placeholder : '#fff'
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
            <Provider style={{backgroundColor: '#000'}} theme={theme}>
                <View style={{ flex: 1,
                    backgroundColor: '#303030',}}>
                    <LinearGradient  colors={['#F1930F', '#F08805', '#E63D16']} style={{
                        elevation: 1,
                        borderRadius: 20,
                        margin: 24,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        backgroundColor:'#7a08fa',
                        height: 210,
                    }}>
                        <TouchableOpacity onPress={this.onImage} style={{flex: 1, alignSelf: 'center',}}>

                            <Image style={{width: 200, height: 210, opacity: 0.3}} resizeMode={'contain'} source={this.state.sourceDisplay}/>
                        </TouchableOpacity>
                        {/*<LottieView  style={{height:210, textAlign: 'center', alignSelf: 'center',}} source={require('./animations/fillWhite')} progress={this.state.progress} />*/}
                    </LinearGradient>


                    <AnimatableKASV  ref={ref => {
                        this.scroll = ref}} innerRef={ref => {
                        this.scrollInner = ref}} onLayout={(event) => {
                        var {x, y, width, height} = event.nativeEvent.layout;
                        this.setState({scrollHeight: height});
                    }} contentContainerStyle={styles.container} >
                        <Text style={{
                            fontSize: 16,
                            marginBottom: 6,
                            marginLeft: 24,
                            fontFamily: 'Poppins-Bold',
                            marginTop: 0,
                            color: '#fff'
                        }}>
                            Nombre
                        </Text>
                        <RNTextInput
                            placeholder=""
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                            // Calling the custom TextInputStyleClass.
                            style={stylesPicker.inputRounded}/>

                        {/*<TextInput
                            style={{
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                marginLeft: 24,
                                marginTop: 20,
                                marginRight: 24,
                                alignSelf: 'stretch',
                                backgroundColor: '#303030',
                            }}
                            label='Nombre'
                            mode={'outlined'}
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                        />*/}
                        <View style={
                            {
                                alignItems:'flex-start',
                                flexDirection: 'row',
                                marginLeft: 24,
                                marginTop: 20,
                                marginRight: 24,
                                alignSelf: 'stretch',
                                backgroundColor: '#303030',
                            }
                        }>
                            <Text style={{
                                flex: 1,
                                fontSize: 16,
                                marginBottom: 0,
                                marginLeft: 0,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 0,
                                color: '#fff'
                            }}>
                                Tipo
                            </Text>
                         {/*   <Text style={{
                                flex: 1,
                                fontSize: 16,
                                marginBottom: 0,
                                marginLeft: 0,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 0,
                                color: '#fff'
                            }}>
                                Tipo
                            </Text>*/}
                        </View>
                        <Animatable.View ref={ref => {
                            this.typesView = ref}} style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            marginLeft: 24,
                            marginTop: 6,
                            marginRight: 24,
                            alignSelf: 'stretch',
                            backgroundColor: '#303030',
                        }}>
                            {/*<TextInput
                        style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: '#ffffff',
                            marginRight: 8,
                        }}
                        label='Nombre'
                        mode={'outlined'}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />*/}

                            <View style={{
                                alignItems:'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                marginTop: 6,
                                marginRight: 8,
                                borderColor: '#fff',
                                borderWidth: 0,
                                height: 57,
                                borderRadius: 20,
                                backgroundColor : "#505050"
                            }}>
                                <RNPickerSelect
                                    style={stylesPicker}
                                    placeholder={{ label: '', value: '' }}
                                    onValueChange={(value) => {console.log(value)}}
                                    items={[
                                        { label: 'Cocktail', value: 'cocktail' },
                                        { label: 'Trago', value: 'trago' },
                                        { label: 'Shot', value: 'shot' },
                                    ]}
                                />
                            </View>
                            {/*<View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                marginTop: 6,
                                marginRight: 8,
                                borderColor: '#fff',
                                borderWidth: 0,
                                height: 57,
                                borderRadius: 20,
                                backgroundColor : "#505050"
                            }}>
                                <RNPickerSelect
                                    style={stylesPicker}
                                    placeholder={{ label: '', value: '' }}
                                    onValueChange={(value) => {console.log(value)}}
                                    items={[
                                        { label: 'Cocktail', value: 'cocktail' },
                                        { label: 'Trago', value: 'trago' },
                                        { label: 'Shot', value: 'shot' },
                                    ]}
                                />
                            </View>*/}

                        </Animatable.View>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 24,
                            fontFamily: 'Poppins',
                            marginTop: 25,
                            color: '#fff'
                        }}>
                            Ingredientes
                        </Text>
                        {this.state.ingredients.map((ingredient, idx) => (
                            <Animatable.View
                                ref={ref => {
                                    this['ingredient' + idx] = ref}}>
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
                                        marginRight: 0,
                                        fontSize: 16,
                                        marginBottom: 0,
                                        marginLeft: 0,
                                        fontFamily: 'Poppins-Bold',
                                        marginTop: 0,
                                        color: '#fff'
                                    }}>
                                        Volumen %
                                    </Text>
                                </View>
                                <Animatable.View
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
                                            onValueChange={(value) => {this.handleIngredientChange(idx, value)}}
                                            items={[
                                                { label: 'Ron', value: 'ron' },
                                                { label: 'Gin', value: 'gin' },
                                                { label: 'Fernet', value: 'fernet' },
                                                { label: 'Coca Cola', value: 'cocacola' },
                                                { label: 'Tonica', value: 'tonica' },
                                            ]}
                                        />
                                    </View>
                                    <RNTextInput
                                        style={{
                                            alignItems:'flex-start',
                                            flexDirection: 'row',
                                            flex: 1,
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

                                        label='Volumen %'
                                        mode={'outlined'}
                                        value={this.state.volumes[idx].volume}
                                        onChangeText={theVolume => {this.handleVolumeChange(idx, theVolume);}}
                                    />
                                </Animatable.View>
                            </Animatable.View>

                        ))}
                        <View  style={{
                            alignItems:'flex-start',
                            flexDirection: 'row',
                            marginLeft: 24,
                            marginTop: 20,
                            marginRight: 24,
                            alignSelf: 'stretch',
                            backgroundColor: '#303030',
                            justifyContent: 'flex-end',
                        }}>
                            <IconButton color={'#F1930F'}  onPress={() => this.onAddPhrase()} mode="contained" icon={({ size, color }) => (
                                <Icon size={size} name="plus" style={{ color: color }} />
                            )}>
                            </IconButton>
                        </View>
                        <Button style={{
                            marginLeft: 24,
                            marginTop: 20,
                            marginBottom: 20,
                            marginRight: 24,
                            fontFamily: 'Poppins',
                        }} loading={this.state.submit} labelStyle={{fontFamily: 'Poppins'}} mode="contained" onPress={this.onCreateDrink}>
                            CREAR
                        </Button>
                    </AnimatableKASV>
                </View>

            </Provider>
                );
    }
}

export default withNavigation(NewDrink);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
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