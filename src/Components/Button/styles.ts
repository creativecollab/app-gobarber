import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background-color: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const BtnText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  font-weight: 700;
  color: #312e38;
`;
