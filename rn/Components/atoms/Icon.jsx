import React from 'react';
import {
  CloseIcon,
  ContactIcon,
  EditIcon,
  EmailIcon,
  KeyIcon,
  LogoutIcon,
  MultiUserIcon,
  UserIcon,
  EditBoxIcon,
  DownloadIcon,
  OfflineIcon,
  DebugIcon,
  SettingIcon,
  ChatIcon,
  BackspaceIcon,
  PhoneFillIcon,
  PhoneIcon,
  RightArrowIcon,
  EyeIcon,
  BinIcon,
  SearchIcon,
} from 'assets/Icons';
import { View } from 'react-native';

const iconMap = {
  bin: BinIcon,
  close: CloseIcon,
  contact: ContactIcon,
  edit: EditIcon,
  email: EmailIcon,
  key: KeyIcon,
  logout: LogoutIcon,
  multiUser: MultiUserIcon,
  user: UserIcon,
  editBox: EditBoxIcon,
  download: DownloadIcon,
  offline: OfflineIcon,
  debug: DebugIcon,
  setting: SettingIcon,
  chat: ChatIcon,
  rightArrow: RightArrowIcon,
  phone: PhoneIcon,
  backspace: BackspaceIcon,
  phoneFill: PhoneFillIcon,
  eye: EyeIcon,
  search: SearchIcon,
};

const Icon = ({ name, size = 24, color = 'black', style }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <View style={style}>
      <IconComponent width={size} height={size} color={color} />
    </View>
  );
};

export default Icon;
