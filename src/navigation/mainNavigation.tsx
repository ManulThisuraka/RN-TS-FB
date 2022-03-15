import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import AppStack from './appStack';
import AuthStack from './authStack';

const MainNav: FC = () => {
  const [user, setUser] = useState<any>(null);

  const bootstrap = () => {
    auth().onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user);
      }
    });
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <NavigationContainer>
      {user !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNav;
