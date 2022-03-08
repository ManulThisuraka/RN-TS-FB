import React, {FC, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Input, Button} from '../components';

import firebase from 'firebase/compat';

const App: FC = props => {
  const [name, setName] = useState<String | null>(null);
  const [email, setEmail] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);

  const signup = async () => {
    if (name && password) {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user) {
          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set({name, email, password});
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(`Error`, `Missing Fields`);
    }
  };

  return (
    <ImageBackground
      blurRadius={5}
      style={styles.image}
      source={require('../../assests/image.jpg')}>
      <View style={styles.container}>
        <Text>Sign up Screen</Text>
        <Input placeholder="Name" onChangeText={text => setName(text)} />
        <Input placeholder="Email" onChangeText={text => setEmail(text)} />
        <Input
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button title="Sign Up" onPress={signup} />
        <View style={styles.loginText}>
          <Text style={{marginHorizontal: 5}}>Already have an Account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('login')}
            style={{marginHorizontal: 5}}>
            <Text style={{color: 'rgba(81,135,200,1)'}}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;
function alert(arg0: string): void {
  throw new Error('Function not implemented.');
}
