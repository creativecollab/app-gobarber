import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../Services/Api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredetials {
  email: string;
  password: string;
}

interface AuthContextI {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredetials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/session', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  /**
   *METODO SIGNOUT
   */
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextI {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Error Auth');
  }

  return context;
}

export { AuthProvider, useAuth };
