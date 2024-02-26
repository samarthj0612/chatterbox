import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import Icon from './Icon';

const ImageViewer = ({
  visible,
  onClose,
  imgPath,
  isDownloadable,
  downloadBtn = 'Download',
  downloadBtnStyle,
  downloadedImgName = 'image',
}) => {
  const downloadImage = async () => {
    try {
      // Fetch the image data
      const response = await fetch(imgPath);
      const blob = await response.blob();

      // Create a URL object for the blob
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = downloadedImgName;

      a.click();
    } catch (error) {
      console.error('Something went wrong : Invalid Image path');
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade">
      <TouchableOpacity style={styles.modalCloseIcon} onPress={onClose}>
        <Icon name={'close'} color="#ffffff80" />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <View style={styles.imageWapper}>
          <Image
            resizeMode="contain"
            source={{ uri: imgPath }}
            width={320}
            style={styles.image}
          />
        </View>
        {isDownloadable ? (
          <TouchableOpacity
            onPress={downloadImage}
            activeOpacity={0.6}
            style={{ ...styles.downloadBtn, ...downloadBtnStyle }}>
            <Icon name={'download'} color="#fff" />
            <Text style={styles.downloadBtnText}>{downloadBtn}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },

  modalCloseIcon: {
    position: 'absolute',
    right: 0,
    margin: 24,
    borderWidth: 2,
    borderColor: '#ffffff80',
    borderRadius: 50,
    zIndex: 99,
  },

  imageWapper: {
    maxHeight: '80%',
    maxWidth: '95%',
  },

  image: { height: '100%' },

  downloadBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
    backgroundColor: '#44AD71',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },

  downloadBtnText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ImageViewer;
