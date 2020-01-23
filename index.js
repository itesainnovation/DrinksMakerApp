/**
 * @format
 */

import {AppRegistry} from 'react-native';
import BottomBar from './BottomBar';
import {name as appName} from './app.json';
import App from './App';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
