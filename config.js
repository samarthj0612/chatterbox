import { Platform } from 'react-native';

var hosts = require('./configHosts');

const config = {
  useSecure: hosts.useSecure,
  host: hosts.host,
  wsHost: hosts.wsHost,
  siteUrl: hosts.siteUrl,
  imgLab: hosts.imgLab,
  source: Platform.OS.toLowerCase(),
  // userAgent: user,
  // uuid: uniqueId,
  // mob_model: model,
  // mob_brand: brand,
  // mob_os_version: systemVersion,
  // build: buildNumber,
  // deviceId: deviceId,
};

module.exports = config;
