const modes = {
  isRelease: 1,
  isStaging: 2,
  isDebug: 3,
};

// Modify mode to Connect to Different Servers
let mode = null;
mode = modes.isRelease;
mode = modes.isStaging;
mode = modes.isDebug;

// Modify this line when Connecting to Local Servers
// const localIp = '10.10.10.25'; // Office Ip
const localIp = '192.168.29.165'; // Home Ip

const portMap = {
  host: '6062',
  wsHost: '6063',
  siteUrl: '6064',
  imgLab: '6065',
};

const hosts = {
  useSecure: !(mode === modes.isDebug),
  host: 'chatterhost.com',
  wsHost: 'chattersocket.com',
  siteUrl: 'chatterbox.com',
};

if (mode === modes.isStaging) {
  hosts.host = 'foo.chatterhost.com';
  hosts.wsHost = 'foo.chattersocket.com';
  hosts.siteUrl = 'foo.chatterbox.com';
}

if (mode === modes.isDebug) {
  Object.keys(portMap).forEach(name => {
    hosts[name] = `${localIp}:${portMap[name]}`;
  });
}

module.exports = hosts;
