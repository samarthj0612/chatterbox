import React, { useEffect, useState } from 'react';
import { Headline, List } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import CONFIG from '../../../config';
import { getAllUsers, deleteUser } from 'rn/API';

import { BinIcon } from 'assets/Icons';
import ImageViewer from 'atoms/ImageViewer';

import styleheet from './style';
const styles = styleheet();

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllUsers((err, data) => {
      if (err) {
        ToastAndroid.show(err, 2);
        setIsLoading(false);
        return;
      }
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const deleteAccount = username => {
    setIsLoading(true);
    deleteUser(username, (err, data) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        setUsers(oldState => {
          let newArray = oldState.filter(user => user.eml !== data.eml);
          return newArray;
        });
        ToastAndroid.show(`${data.eml} successfully deleted`, 2);
      }
      setIsLoading(false);
    });
  };

  const deleteUserHandler = username => {
    Alert.alert(
      'Warning!!',
      `Are you sure you want to delete account for ${username}?`,
      [
        {
          text: 'No',
          onPress: () => ToastAndroid.show('Operation cancelled', 2),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => deleteAccount(username) },
      ],
    );
  };

  const getDeleteIcon = user => {
    return (
      <TouchableOpacity onPress={() => deleteUserHandler(user.eml)}>
        <BinIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <Headline style={styles.heading}>All Users</Headline>

      {users && users.length
        ? users.map((user, idx) => {
            return (
              <List.Item
                key={idx}
                title={user.nm}
                description={user.eml}
                left={() => GetAvatarPath(user.avatar)}
                right={() => getDeleteIcon(user)}
                style={styles.row}
              />
            );
          })
        : null}
    </View>
  );
};

const GetAvatarPath = avatar => {
  const [showImgViewer, setShowImgViewer] = useState(false);

  let path = `http://${CONFIG.imgLab}/`;
  if (avatar) {
    path += avatar;
  } else {
    path += 'user.png';
  }

  return (
    <>
      <ImageViewer
        imgPath={path}
        visible={showImgViewer}
        onClose={() => setShowImgViewer(false)}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          avatar && setShowImgViewer(true);
        }}>
        <Image source={{ uri: path }} height={60} width={60} />
      </TouchableOpacity>
    </>
  );
};

export default AllUsers;
