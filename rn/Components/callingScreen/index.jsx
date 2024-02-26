// import RNBeep from 'react-native-a-beep';
import { Button, List } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  ScrollView,
  Image,
} from 'react-native';

import Icon from 'atoms/Icon';
import ImageViewer from 'atoms/ImageViewer';

import CONFIG from '../../../config';
import { getAllContacts } from 'rn/API';

import stylesheet from './style';
const styles = stylesheet();

const CallingScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [inp, setInp] = useState('');
  const [fontSize, setFontSize] = useState(() => 36);
  const [pressInterval, setPressInterval] = useState();

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  let keySet = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const getAllContactsHandler = () => {
    setIsLoading(true);
    getAllContacts((err, data) => {
      if (err) {
        ToastAndroid.show(err, 2);
      } else {
        ToastAndroid.show(data.message, 2);
        setContacts(data.contacts);
        setFilteredContacts([...data.contacts]);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllContactsHandler();
  }, []);

  useEffect(() => {
    if (!inp) {
      setFilteredContacts([...contacts]);
      return;
    }
    let temp = contacts.filter(contact => {
      return contact.mob.includes(inp);
    });
    setFilteredContacts([...temp]);
  }, [inp, contacts]);

  const dialPadHandler = txt => {
    setInp(old => old + txt);
    if (inp.length > 11) {
      setFontSize(360 / inp.length);
    }
    // RNBeep.beep();
  };

  const backspaceHandler = () => {
    setInp(old => old.substring(0, inp.length - 1));
    if (inp.length > 11) {
      setFontSize(360 / inp.length);
    } else {
      setFontSize(36);
    }
  };

  const backspaceHandlePressIn = () => {
    const intervalId = setInterval(() => {
      setInp(prev => {
        if (inp.length > 11) {
          setFontSize(360 / inp.length);
        } else {
          setFontSize(36);
        }
        return prev.substring(0, prev.length - 1);
      });
    }, 100);

    setPressInterval(intervalId);
  };

  const backspaceHandlePressOut = () => {
    clearInterval(pressInterval);
  };

  const callHandler = mob => {
    if (typeof mob === 'string') {
      Linking.openURL(`tel:${mob}`);
    } else {
      Linking.openURL(`tel:${inp}`);
    }
  };

  const getCallBtn = mob => {
    return (
      <TouchableOpacity onPress={() => callHandler(mob)}>
        <Icon name={'phone'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contactView}>
        {isLoading && <Button loading={true}>Refresh</Button>}
        <ScrollView>
          {filteredContacts.length
            ? filteredContacts.map((contact, idx) => {
                return (
                  <List.Item
                    key={idx}
                    title={contact.nm}
                    description={contact.mob}
                    left={() => GetAvatarPath(contact.avatar)}
                    right={() => getCallBtn(contact.mob)}
                    style={styles.row}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>

      {inp && (
        <View style={styles.inpBox}>
          <View style={styles.inpBoxTextWrapper}>
            <Text style={{ ...styles.inpBoxText, fontSize: fontSize }}>
              {inp}
            </Text>
          </View>

          <TouchableOpacity
            onPress={backspaceHandler}
            onPressIn={backspaceHandlePressIn}
            onPressOut={backspaceHandlePressOut}>
            <Icon name={'backspace'} size={30} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.dialPad}>
        {keySet.map((key, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={styles.key}
              onPress={() => dialPadHandler(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.callBtn} onPress={callHandler}>
        <Icon name={'phoneFill'} color="white" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const GetAvatarPath = avatar => {
  const [showImgViewer, setShowImgViewer] = useState(false);
  let path = `http://${CONFIG.imgLab}/${avatar ? avatar : 'user.png'}`;

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
        <Image source={{ uri: path }} height={40} width={40} />
      </TouchableOpacity>
    </>
  );
};

export default CallingScreen;
