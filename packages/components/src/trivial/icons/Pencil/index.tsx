import React from 'react';
import PropTypes from 'prop-types';
import * as rnSvg from 'react-native-svg';

import { BaseIcon, BaseIconProps } from '../BaseIcon';

export const PencilIcon: React.FC<BaseIconProps> = (props): JSX.Element => {
  const { Path } = rnSvg;
  const { color, height, style } = props;

  const width = props.width ?? 24;
  const viewbox = props.viewBox ?? '0 0 24 24';

  return (
    <BaseIcon color={color} width={width} height={height} style={style} viewBox={viewbox}>
      <Path
        fillRule="evenodd"
        d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></Path>
    </BaseIcon>
  );
};

PencilIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  style: PropTypes.object
};
