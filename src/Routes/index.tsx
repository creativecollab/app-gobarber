import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../Hooks/Auth';

import AuthRoute from './Auth';
import AppRoute from './App';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#c20300" />
      </View>
    );
  }
  return user ? <AppRoute /> : <AuthRoute />;
};

export default Routes;
