import React from 'react';

import {View, Modal, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';

export const Loader = ({color = 'grey'}) => {
  return (
    <Modal statusBarTranslucent transparent={true}>
      <View style={styles.modal}>
        <Spinner size={40} color={color} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 5,
  },
});
