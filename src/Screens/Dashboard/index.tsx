import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// import { Container } from './styles';

import { useAuth } from '../../Hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
