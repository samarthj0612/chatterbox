import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from './Icon';

const PopupModal = ({ children, visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade">
      <TouchableOpacity style={styles.modalCloseIcon} onPress={onClose}>
        <Icon name={'close'} />
      </TouchableOpacity>
      <View style={styles.modalContainer}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#11111199',
  },

  modalCloseIcon: {
    position: 'absolute',
    right: 0,
    margin: 24,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    zIndex: 99,
  },
});

export default PopupModal;
