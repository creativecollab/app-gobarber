import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 26px;
  color: #f4ede8;

  margin-top: 32px;
  margin-bottom: 32px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: #312e38;
  border-top-width: 1px;

  border-color: #232129;

  padding-top: 16px;
  padding-bottom: ${10 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;
  margin-left: 10px;
`;
