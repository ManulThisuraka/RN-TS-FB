import React, {FC, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input} from '../components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const App: FC = () => {
  const [msg, setMsg] = useState<string | null>(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const post = async () => {
    if (msg) {
      const data = {
        msg,
        timeStamp: Date.now(),
        approved: false,
      };

      try {
        await firebase.firestore().collection('posts').add(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert(`Missing Fields`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
      <View>
        <Input
          placeholder="Write something here"
          onChangeText={text => setMsg(text)}
        />
        <Button title="Post" onPress={post} />
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
});
