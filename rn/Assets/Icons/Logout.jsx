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
      fill={props.color}
      d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Zm2-7h7v2H6v3l-5-4 5-4v3Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as Logout };
