import React, {useContext, useEffect, useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import AppScreen from "../AppScreen";
import {Button, TextInput, useTheme} from "react-native-paper";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import DataContext from "../../DataContext";
import TodoScreen from "../todo/TodoScreen";
import {getUser} from "../../servers/users";
import {getPet} from "../../servers/pets";

const SignInScreen = ({navigation}) => {

    const theme = useTheme();
    const {setUserInfo} = useContext(DataContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDisabled(!(username.trim() !== '' && password !== ''));
    }, [username, password]);


    const handleLinkPress = () => {
        navigation.navigate("SignUpScreen");
    };

    const onSubmit = async () => {
        setLoading(true);
        try{
            const userInfo = await getUser(username);
            if (userInfo) {
                if(userInfo.password !== password) {
                    Alert.alert('The username or password are incorrect!');
                    return;
                }
                setUserInfo(userInfo);
                navigation.navigate('Tab', {screen: 'TodoScreen'});
            } else {
                Alert.alert('The username or password are incorrect!');
            }

        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ImageBackground
                source={require('../../assets/images/auth_background.png')}
                style={styles.backgroundImage}
                resizeMode='cover'
            >
                <AppScreen>
                    <View style={styles.container}>
                        <View style={styles.warp}>
                            <View style={styles.form}>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label="Username"
                                        value={username}
                                        onChangeText={setUsername}
                                        style={styles.textInput}
                                        placeholder="Enter your username"
                                        placeholderTextColor={theme.colors.secondary}
                                        underlineColor="transparent"
                                        activeUnderlineColor="transparent"
                                        textColor={theme.colors.primary}
                                        selectionColor={theme.colors.primary}
                                        outlineStyle={styles.textInputOutlineStyle}
                                    />
                                </View>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        secureTextEntry
                                        mode="outlined"
                                        label="Password"
                                        value={password}
                                        onChangeText={setPassword}
                                        style={styles.textInput}
                                        placeholder="Enter your Password"
                                        placeholderTextColor={theme.colors.secondary}
                                        underlineColor="transparent"
                                        activeUnderlineColor="transparent"
                                        textColor={theme.colors.primary}
                                        selectionColor={theme.colors.primary}
                                        outlineStyle={styles.textInputOutlineStyle}
                                    />
                                </View>
                                <Button
                                    onPress={onSubmit}
                                    disabled={disabled}
                                    loading={loading}
                                    mode="contained"
                                    style={[
                                        styles.button,
                                        !disabled && {backgroundColor: '#966404'},
                                    ]}
                                    labelStyle={[
                                        styles.buttonLabel,
                                        !disabled && {color: 'white'},
                                    ]}
                                >Confirm</Button>
                            </View>
                            <View style={styles.tips}>
                               <Text style={styles.tipsText}>Don't Have An Account?</Text>
                                <TouchableHighlight onPress={handleLinkPress} underlayColor="transparent">
                                    <Text style={styles.linkText}>Sign Up Now!</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </AppScreen>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
    },
    warp: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 16,
        paddingTop: 0,
    },
    textInputContainer: {},
    textInput: {
        height: 46,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#F5DEB3',
    },
    textInputOutlineStyle: {
        borderWidth: 0,
    },
    form: {
        flexDirection: 'column',
        width: '80%',
        gap: 20,
    },
    tips: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        gap: 10,
    },
    tipsText: {
        color: '#966404',
        fontSize: 12,
    },
    linkText: {
        color: '#966404',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    button: {
        borderRadius: 4,
    },
    buttonLabel: {
        paddingHorizontal: 8,
    }
});


export default SignInScreen;
