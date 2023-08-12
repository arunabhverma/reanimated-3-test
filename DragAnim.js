import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Progress from './Progress';

const {width, height} = Dimensions.get('window');
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_RADIUS = BOX_WIDTH / 2;

const MID_BOX_WIDTH = BOX_WIDTH / 2;
const MID_BOX_HEIGHT = BOX_HEIGHT / 2;

const MID_WIDTH = width / 2;
const MID_HEIGHT = height / 2;

const MAIN_WIDTH = width - BOX_WIDTH;

const DragAnim = () => {
  const {top, bottom} = useSafeAreaInsets();
  const MAIN_HEIGHT = height - BOX_HEIGHT - top - bottom;

  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});
  const scaleVal = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value.x,
        },
        {
          translateY: offset.value.y,
        },
        {
          scale: scaleVal.value,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
      scaleVal.value = withTiming(1.5);
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      scaleVal.value = withTiming(1);
    })
    .onFinalize(() => {
      let END_WIDTH = 0;
      let END_HEIGHT = 0;

      if (offset.value.x + MID_BOX_WIDTH < MID_WIDTH) {
        END_WIDTH = 1;
      } else {
        END_WIDTH = MAIN_WIDTH;
      }

      if (offset.value.y + MID_BOX_HEIGHT < MID_HEIGHT) {
        END_HEIGHT = 0;
      } else {
        END_HEIGHT = MAIN_HEIGHT;
      }

      offset.value = withTiming({
        x: END_WIDTH,
        y: END_HEIGHT,
      });
      start.value = withTiming({
        x: END_WIDTH,
        y: END_HEIGHT,
      });
    });

  let data = [
    {
      color: 'red',
      width: '23%',
      label: '10',
    },
    {
      color: 'green',
      width: '33%',
      label: '20',
      isAnchor: true,
    },
    {
      color: 'blue',
      width: '33%',
      label: '30',
    },
  ];

  return (
    <SafeAreaView>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  testContainer: {
    alignSelf: 'center',
    position: 'absolute',
    flex: 1,
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    backgroundColor: 'red',
    borderRadius: BOX_RADIUS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default DragAnim;
