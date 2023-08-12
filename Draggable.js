import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Draggable = ({children, index}) => {
  const drag = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const isDrag = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isDrag.value = true;
    })
    .onUpdate(e => {
      drag.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(e => {
      drag.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
      start.value = {
        x: drag.value.x,
        y: drag.value.y,
      };
    })
    .onFinalize(() => {
      isDrag.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: drag.value.x,
        },
        {
          translateY: drag.value.y,
        },
        {
          scale: withTiming(isDrag.value ? 1.2 : 1),
        },
      ],
      zIndex: isDrag.value ? 1 : 0,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyles}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default Draggable;
