import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {AppNavigator} from './navigation/projectNavigator'
import {createAppContainer} from "react-navigation";
const AppContainer = createAppContainer(AppNavigator)
export default function App() {
  return (
      //check
      <AppContainer style={styles.container}/>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
