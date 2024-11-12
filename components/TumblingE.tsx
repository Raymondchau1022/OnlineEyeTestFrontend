import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

type Direction = 'Top' | 'Left' | 'Right' | 'Bottom';

interface TumblingEProps {
  direction: Direction;
  size: number;
}

const tumblingEImage = require('../assets/images/tumblingE.png');

const TumblingE: React.FC<TumblingEProps> = ({ direction, size }) => {

  const getTransform = () => {
    switch (direction) {
      case 'Top':
        return [{ rotate: '0deg' }];
      case 'Right':
        return [{ rotate: '90deg' }];
      case 'Bottom':
        return [{ rotate: '180deg' }];
      case 'Left':
        return [{ rotate: '-90deg' }];
      default:
        return [{ rotate: '0deg' }];
    }
  };

  return (
    <View style={[styles.container]}>
      <Image source={tumblingEImage} style={[styles.image, {width: size, height: size, transform: getTransform() }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 200,
    // height:200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain', 
},
});

export default TumblingE;
