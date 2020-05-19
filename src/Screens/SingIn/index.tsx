import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

import brand from '../../assets/logo.png';
import GetValidateError from '../../Utils/GetValidateError';

import { useAuth } from '../../Hooks/Auth';
import {
  Container,
  Logo,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const { signIn, user } = useAuth();

  const handleLogin = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('O Campo Email é Obrigatório')
            .email('Email Inválido'),
          password: Yup.string().required('O Campo Senha é Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        console.log(user);

        // history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = GetValidateError(error);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Error na Autenticar',
          'Ocorreu um erro ao fazer Login, Cheque suas Credenciais',
        );

        // addToast({
        //   type: 'error',
        //   title: 'Error na Autenticar',
        //   description:
        //     'Ocorreu um erro ao fazer Login, Cheque suas Credenciais',
        // });
      }
    },
    [user, SingIn],
  );

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
              <Title>Faça seu Logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleLogin}>
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
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Sua Senha"
                placeholderTextColor="#666360"
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

            <ForgotPassword
              onPress={() => {
                console.log('ok');
              }}
            >
              <ForgotPasswordText>Esqueci minha Senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount
        onPress={() => {
          return navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={24} color="#FF9000" />
        <CreateAccountText> Criar Conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SingIn;
