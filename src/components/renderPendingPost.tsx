import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from '.';

const {width, height} = Dimensions.get('screen');

interface Props {
  msg: string;
  approved: string;
  timeStamp: number;
  onApprove: () => void;
  onReject: () => void;
}

const formatTime = (timeStamp: number): any => {
  const calculatedTime = Date.now() - timeStamp;
  if (calculatedTime > 1000) return `${calculatedTime / 1000} s`;
  if (calculatedTime / 1000 > 60) return `${calculatedTime / 1000 / 60} min`;
  if (calculatedTime / 1000 / 60 > 60)
    return `${calculatedTime / 1000 / 60 / 60} hours`;
  else `${calculatedTime / 1000 / 60 / 60 / 24}d`;
};

const App: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{width: '60%'}}>{props.msg}</Text>
        <Text>{formatTime(props.timeStamp)}</Text>
      </View>
      <View>
        <Button
          title="Approve"
          onPress={() => {
            props.onApprove;
          }}
        />
        <Button
          title="Reject"
          onPress={() => {
            props.onReject;
          }}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: width / 1.1,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
