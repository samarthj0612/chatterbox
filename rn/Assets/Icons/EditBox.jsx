import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}>
    <Path
      fill="rgba(70,146,221,1)"
      d="m16.757 2.997-7.466 7.466.008 4.247 4.238-.008L21 7.24v12.758a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1h12.757Zm3.728-.9L21.9 3.511l-9.193 9.193-1.412.002-.002-1.416 9.192-9.193Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as EditBox };
