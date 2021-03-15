import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';

const AppStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={styles.statusBar}>
            <StatusBar backgroundColor={backgroundColor} {...props} />
        </View>
    );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: BAR_HEIGHT
    },
});

export default AppStatusBar;