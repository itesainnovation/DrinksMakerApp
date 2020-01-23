import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import { StackActions, NavigationActions } from 'react-navigation';

class SuccessScreenDrink extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
        }).start();
        setTimeout( () => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'NewDrink' })],
            });
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate('Home');
        },5000);
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    render() {
        return (<View style={styles.container}>
            <LottieView source={require('./animations/success')} progress={this.state.progress} />
        </View>);
    }
}

export default SuccessScreenDrink;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center',
    },
});