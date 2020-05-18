import React from 'react';

import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, BtnText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <BtnText>{children}</BtnText>
    </Container>
  );
};

export default Button;
