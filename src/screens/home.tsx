import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Button, Input} from '../components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const App: FC = props => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const user = await firebase.firestore().collection('users').doc(uid).get();
    setUser({id: user.id, ...user.data()});
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
      {user ? (
        user.isAdmin ? (
          <View>
            <Button
              title="Dashboard"
              onPress={() => props.navigation.navigate('dashboard')}
            />
          </View>
        ) : null
      ) : null}
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
