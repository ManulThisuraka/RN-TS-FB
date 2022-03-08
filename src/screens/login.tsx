import React, {FC, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Input, Button} from '../components';
import firebase from 'firebase/compat';

const App: FC = props => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    if (email && password) {
      const {user} = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } else {
      Alert.alert(`Missing Fields`);
    }
  };

  return (
    <View>
      <Text style={styles.container}>Login Screen</Text>
      <Input placeholder="Email" onChangeText={text => setEmail(text)} />
      <Input placeholder="Password" onChangeText={text => setPassword(text)} />
      <Button title="Login" onPress={login} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Don't have an Account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('signup')}
          style={{marginHorizontal: 5}}>
          <Text style={{color: 'rgba(81,135,200,1)'}}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
});
