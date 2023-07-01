import {StyleSheet, Image, Animated} from 'react-native';
import {FAB as FABPaper} from 'react-native-paper';
import * as React from "react";

const FAB = ({onPress}) => (
    <FABPaper
        rippleColor={'transparent'}
        customSize={102}
        style={styles.fab}
        icon={({size}) => (
            <Image
                source={require("../assets/icons/plus.png")}
                style={[
                    styles.icon,
                    {
                        width: size,
                        height: size,
                    }
                ]}
            />
        )}
        onPress={onPress}
    />
);

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        elevation: 0,
        borderRadius: '50%',
        margin: 16,
        width: 51,
        height: 51,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    icon: {
        resizeMode: 'contain',
    },
});

export default FAB;
