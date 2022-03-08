import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';


const App : FC = () => {
    return(
        <View>
            <Text style={styles.container}>Dashboard Screen</Text>
        </View>
    )
}

export default App;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
