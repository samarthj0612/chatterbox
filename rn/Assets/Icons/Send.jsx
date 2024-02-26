import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}>
    <Path d="M3.5 1.346a.5.5 0 0 1 .241.062l18.462 10.154a.5.5 0 0 1 0 .876L3.741 22.593A.5.5 0 0 1 3 22.154V1.846a.5.5 0 0 1 .5-.5ZM5 4.383V11h5v2H5v6.617L18.85 12 5 4.383Z" />
  </Svg>
);
const Memo = memo(SvgComponent);
export {Memo as Send};
