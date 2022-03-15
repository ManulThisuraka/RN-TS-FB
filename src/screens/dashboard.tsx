import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Alert} from 'react-native';
import {ApprovalRender} from '../components';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App: FC = () => {
  const [posts, setPosts] = useState<any>(null);

  const fetchPendingPost = async () => {
    const posts = await firestore()
      .collection('posts')
      .where('approved', '==', false)
      .get();
    setPosts([...posts.docs]);
  };

  const onApprove = (id: string) => {
    Alert.alert(`Item of ID ${id} will be approved`);
  };

  const onReject = (id: string) => {
    Alert.alert(`Item of ID ${id} will be rejected`);
  };

  useEffect(() => {
    fetchPendingPost();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <View style={{height: '50%'}}>
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <ApprovalRender
              msg={item.data().msg}
              timeStamp={item.data().timeStamp}
              approved={item.data().approved}
              onApprove={() => onApprove(item.id)}
              onReject={() => onReject(item.id)}
            />
          )}
        />
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
