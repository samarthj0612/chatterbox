import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={'#FFFCED'}
    width={24}
    height={24}
    {...props}>
    <Path d="M12 13H4v-2h8V4l8 8-8 8v-7Z" />
  </Svg>
);

const Memo = memo(SvgComponent);
export {Memo as RightArrow};
