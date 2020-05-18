import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerPros {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerPros>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #232129;
  margin-bottom: 10px;
  border-radius: 10px;

  border: 2px solid #232129;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  flex-direction: row;
  align-items: center;
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 18px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
