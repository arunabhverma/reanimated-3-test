import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Draggable from './Draggable';

const DATA = new Array(25).fill(1).map((_, i) => i.toString());

const renderItem = ({item, index, width}) => {
  const isEven = index % 2 === 0;
  return (
    <Draggable key={item} index={index}>
      <View
        style={[
          styles.container,
          isEven && {backgroundColor: 'white'},
          {width: width / 5, aspectRatio: 1},
        ]}>
        <Text>{item}</Text>
      </View>
    </Draggable>
  );
};

const SwipeGame = () => {
  const {width} = useWindowDimensions('window');
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {DATA.map((item, index) => renderItem({item, index, width}))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default SwipeGame;
