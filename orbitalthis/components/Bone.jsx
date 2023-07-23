import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {useContext} from "react";
import DataContext from "../DataContext";

const Bone = ({backward = false}) => {
    const navigation = useNavigation();
    const { petInfo } = useContext(DataContext);
    return (
        <View style={styles.container}>
            {backward ? (
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.back}
                        source={require('../assets/icons/back.png')}
                        resizeMode="contain"
                    />
                </TouchableWithoutFeedback>
            ) : (
                <View/>
            )}
            <View style={styles.bone}>
                <Image
                    style={styles.boneImage}
                    source={require('../assets/icons/bone.png')}
                    resizeMode="contain"
                />
                <View style={[styles.boneTotal, styles.shadow]}>
                    <Text style={styles.boneTotalText}>{petInfo.bones}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 43,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back: {
        width: 33,
        height: 43,
    },
    bone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boneImage: {
        width: 43,
        height: 43,
    },
    boneTotal: {
        height: 28,
        minWidth: 82,
        borderWidth: 1,
        borderColor: '#C28F0B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: -20,
        marginTop: -6,
        position: 'relative',
        zIndex: -1,
        backgroundColor: '#FFFDE6'
    },
    boneTotalText: {
        fontSize: 15,
        fontWeight: 700
    },
    shadow: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default Bone;
