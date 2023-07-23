import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function AppScreen({children, style}) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.screen, style]}>
                <View style={styles.paddingView}>
                    {children}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    paddingView: {
        flex: 1,
    }
})

export default AppScreen;
