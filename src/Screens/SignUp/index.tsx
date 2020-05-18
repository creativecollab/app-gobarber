import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/Feather';

import * as Yup from 'yup';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import GetValidateError from '../../Utils/GetValidateError';

import brand from '../../assets/logo.png';
import {
  Container,
  Logo,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

interface SignUpFormDate {
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const handleSingUp = useCallback(async (data: SignUpFormDate) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O Campo Nome é Obrigatório'),
        email: Yup.string()
          .required('O Campo Email é Obrigatório')
          .email('Email Inválido'),
        password: Yup.string().min(8, 'No minimo 8 Digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await Api.post('/users', data);

      // addToast({
      //   type: 'success',
      //   title: 'Cadastrado',
      //   description: 'Usuario registrado com Sucesso',
      // });

      // history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = GetValidateError(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Erro ao Cadastrar', 'Erro ao registrar o Usuario');

      // addToast({
      //   type: 'error',
      //   title: 'Erro ao Cadastrar',
      //   description: 'Erro ao registrar o Usuario',
      // });
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Logo source={brand} />

            <View>
              <Title>Crie uma Conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSingUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Seu Nome Completo"
                placeholderTextColor="#666360"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}
              />

              <Input
                name="email"
                icon="mail"
                placeholder="Seu E-mail"
                placeholderTextColor="#666360"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />

              <Input
                ref={passwordRef}
                name="password"
                icon="lock"
                placeholder="Sua Senha"
                placeholderTextColor="#666360"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn
        onPress={() => {
          return navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={24} color="#FFF" />
        <BackToSignInText>Entrar na Conta </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SingUp;
