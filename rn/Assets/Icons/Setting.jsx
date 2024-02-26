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
    <Path d="m12 1 9.5 5.5v11L12 23l-9.5-5.5v-11L12 1Zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as Setting };