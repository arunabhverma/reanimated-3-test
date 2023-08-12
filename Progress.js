import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Progress = ({
  data,
  labelStyle,
  progressHeight = 20,
  progressTextHeight = 20,
  anchorLocation,
}) => {
  const MAX_HEIGHT = progressHeight + progressTextHeight;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={[styles.container, {maxHeight: MAX_HEIGHT}]}>
        <View style={[styles.invisibleTape, {height: progressHeight}]}>
          <View style={styles.row}>
            <View style={[styles.flexOne, {maxWidth: anchorLocation}]} />
            <View
              style={[
                styles.anchor,
                {
                  left: -progressHeight / 2,
                  top: -8,
                  borderBottomWidth: progressHeight,
                  borderTopWidth: progressHeight,
                  borderLeftWidth: progressHeight,
                  borderRightWidth: progressHeight,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.progressContainer}>
          {data.map((item, index, arr) => {
            return (
              <View
                key={index.toString()}
                style={[
                  arr.length - 1 === index ? {flex: 1} : {width: item.width},
                ]}>
                <View
                  style={[
                    styles.progress,
                    {maxHeight: progressHeight, backgroundColor: item.color},
                  ]}
                />
                <View style={[styles.flexOne, {maxHeight: progressTextHeight}]}>
                  <Text style={{textAlign: 'right', ...labelStyle}}>
                    {item.label}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  invisibleTape: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'flex-start',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  anchor: {
    borderBottomColor: 'transparent',
    borderTopColor: 'black',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  progressContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 5,
  },
  progress: {
    flex: 1,
    borderRadius: 20,
  },
  flexOne: {
    flex: 1,
  },
});

export default Progress;
