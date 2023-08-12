import React from 'react';
import {View} from 'react-native';
import DragAnim from './DragAnim';
import SwipeGame from './SwipeGame';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <GestureHandlerRootView>
        {/* <DragAnim /> */}
        <SwipeGame />
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
