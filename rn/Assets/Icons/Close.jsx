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
      d="m12 10.586 4.95-4.95 1.415 1.415-4.95 4.95 4.95 4.95-1.415 1.414-4.95-4.95-4.95 4.95-1.413-1.415 4.95-4.95-4.95-4.95L7.05 5.638l4.95 4.95Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as Close };
