import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  List,
  Snackbar,
  Switch,
} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ToastAndroid, ScrollView, TouchableOpacity } from 'react-native';

import CONFIG from '../../../config';
import { useAuth } from 'rn/contexts/AuthContext';
import { logout, updateProfilePicture, removeProfilePicture } from 'rn/API';

import { Background } from 'assets/Images';

import ChangePwdModal from 'components/Modals/changePwd';
import EditProfileModal from 'components/Modals/editProfile';

import Icon from 'atoms/Icon';
import PopupModal from 'atoms/PopupModal';
import ImageViewer from 'atoms/ImageViewer';
import DividerWithLabel from 'atoms/DividerWithLabel';

import styleheet from './style';
const styles = styleheet();

const Settings = ({ navigation }) => {
  const { state, dispatch } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [isChngePwdModalVisible, setisChngePwdModalVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isDeveloperOn, setIsDeveloperOn] = useState(false);

  const logoutHandler = async () => {
    logout(async err => {
      if (err) {
        ToastAndroid.show(err, 2);
        return;
      }
      await AsyncStorage.removeItem('user-token');
      dispatch({ type: 'LOGOUT' });
    });
  };

  const closeModalHandler = () => {
    setisChngePwdModalVisible(!isChngePwdModalVisible);
  };

  const editProfileModalCloseHandler = () => {
    setIsEditProfileVisible(!isEditProfileVisible);
  };

  const ImagePicker = async () => {
    setIsSnackbarVisible(!isSnackbarVisible);
    try {
      const [result] = await DocumentPicker.pick({
        type: ['image/jpeg', 'image/jpg', 'image/png'],
        allowMultiSelection: false,
      });
      const data = new FormData();
      data.append('image', {
        name: result.name,
        type: result.type,
        uri: result.uri,
      });
      setIsLoading(true);
      updateProfilePicture(data, state.user.eml, (err, res) => {
        if (err) {
          ToastAndroid.show(err, 2);
        } else {
          ToastAndroid.show(res.message, 2);
          dispatch({ type: 'UPDATE_AVATAR', payload: res.data });
        }
        setIsLoading(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        ToastAndroid.show('Operation cancelled', 2);
      } else {
        ToastAndroid.show(err.message || 'Something went wrong', 2);
      }
    }
  };

  const getProfilePic = () => {
    if (state.user.avatar) {
      return { uri: `http://${CONFIG.imgLab}/${state.user.avatar}` };
    } else {
      return require('assets/Images/user.png');
    }
  };

  const imagePreviewHandler = () => {
    if (state.user.avatar) {
      setIsImageViewerVisible(true);
    }
  };

  const imageViewerCloseHandler = () => {
    setIsImageViewerVisible(false);
  };

  const scrollHandler = () => {
    if (isSnackbarVisible) {
      setIsSnackbarVisible(false);
    }
  };

  const deleteProfilePhotoHandler = () => {
    let data = {
      eml: state.user.eml,
      avatar: state.user.avatar,
    };
    removeProfilePicture(data, (err, resp) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        dispatch({ type: 'REMOVE_AVATAR' });
        setIsSnackbarVisible(false);
        ToastAndroid.show(resp.message, 2);
      }
    });
  };

  const getDeveloperToggle = () => {
    return (
      <Switch
        value={isDeveloperOn}
        onValueChange={() => {
          dispatch({ type: 'DEVELOPER_MODE', payload: !isDeveloperOn });
          setIsDeveloperOn(!isDeveloperOn);
        }}
      />
    );
  };

  return (
    <FastImage source={Background} style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <ImageViewer
        visible={isImageViewerVisible}
        isDownloadable={true}
        imgPath={`http://${CONFIG.imgLab}/${state.user.avatar}`}
        onClose={imageViewerCloseHandler}
      />

      <ScrollView style={styles.container} onScroll={scrollHandler}>
        <View style={styles.topCont}>
          <TouchableOpacity
            onPress={imagePreviewHandler}
            style={styles.profileImgWrapper}
            activeOpacity={0.8}>
            <Avatar.Image
              style={styles.profileImg}
              size={160}
              source={getProfilePic()}
            />
            <TouchableOpacity
              onPress={() => setIsSnackbarVisible(!isSnackbarVisible)}>
              <Icon name={'editBox'} style={styles.editBoxIcon} />
            </TouchableOpacity>
          </TouchableOpacity>

          <List.Item
            title="Name"
            description={state.user.nm}
            left={() => getIcon('user')}
          />
          <List.Item
            title="Email"
            description={state.user.eml}
            left={() => getIcon('email')}
          />
          <List.Item
            title="Contact"
            description={state.user.mob}
            left={() => getIcon('contact')}
          />

          <>
            <DividerWithLabel title={'Account Settings'} />
            <List.Item
              title="Edit Profile"
              description="Tap here to edit profile"
              left={() => getIcon('edit')}
              onPress={() => setIsEditProfileVisible(!isEditProfileVisible)}
            />
            <List.Item
              title="Change Password"
              description="Tap here to change password"
              left={() => getIcon('key')}
              onPress={() => setisChngePwdModalVisible(!isChngePwdModalVisible)}
            />
          </>

          {state.user.admin && (
            <>
              <DividerWithLabel title={'Admin Panel'} />
              <List.Item
                title="All Users"
                description="See All Registered Users"
                left={() => getIcon('multiUser')}
                onPress={() => navigation.navigate('allusers')}
              />
              <List.Item
                title="Developer mode"
                left={() => getIcon('debug')}
                right={getDeveloperToggle}
              />
            </>
          )}
        </View>

        <Divider />

        <Button
          mode="contained"
          style={styles.logoutBtn}
          icon={() => getIcon('logout', 'white')}
          onPress={logoutHandler}
          buttonColor="red">
          Logout
        </Button>

        <PopupModal
          visible={isChngePwdModalVisible}
          onClose={closeModalHandler}>
          <ChangePwdModal close={setisChngePwdModalVisible} />
        </PopupModal>

        <PopupModal
          visible={isEditProfileVisible}
          onClose={editProfileModalCloseHandler}>
          <EditProfileModal close={setIsEditProfileVisible} />
        </PopupModal>
      </ScrollView>

      <Snackbar
        visible={isSnackbarVisible}
        style={styles.snackbar}
        onDismiss={() => {
          setIsSnackbarVisible(!isSnackbarVisible);
        }}>
        <View>
          <List.Item
            title="Edit Profile Photo"
            left={() => getIcon('edit')}
            onPress={ImagePicker}
          />
          <List.Item
            title="Remove Photo"
            left={() => getIcon('bin')}
            onPress={deleteProfilePhotoHandler}
            disabled={!state.user.avatar}
          />
        </View>
      </Snackbar>
    </FastImage>
  );
};

const getIcon = (icon, color) => {
  return <Icon name={icon} color={color} />;
};

export default Settings;
