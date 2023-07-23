import React, {useEffect, useState} from 'react';
import {Button, TextInput, useTheme} from "react-native-paper";
import * as Crypto from 'expo-crypto';
import {collection, getDocs, getFirestore, query, where, addDoc} from "firebase/firestore";
import {Alert, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import AppScreen from "../AppScreen";
import {isValidEmail} from "../../utils/utils";
import {addPet} from "../../servers/pets";

const SignUpScreen = ({navigation}) => {

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setDisabled(!(username.trim() !== '' && password !== '' && email !== '' && confirmPassword !== ''));
    }, [username, password, email, confirmPassword]);

    const handleLinkPress = () => {
        navigation.navigate("SignInScreen");
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            if(!isValidEmail(email)) {
                Alert.alert('Email Format Valid', 'The email address is valid.');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('The password is different from the confirm password!');
                return;
            }

            const db = getFirestore();
            const collectionRef = collection(db, 'users');


            const q = query(collectionRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                Alert.alert("The username already exists");
            } else {
                const id = Crypto.randomUUID();

                const dataToAdd = {
                    id,
                    username,
                    email,
                    password,
                    created_at: Date.now(),
                };

                await addDoc(collectionRef, dataToAdd);

                await addPet(id);

                Alert.alert('Register successfully!');

                navigation.navigate("SignInScreen");
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
                                        label="Email"
                                        value={email}
                                        onChangeText={setEmail}
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
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        secureTextEntry
                                        mode="outlined"
                                        label="Confirm Password"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
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
                                <Text style={styles.tipsText}>Have An Account?</Text>
                                <TouchableHighlight onPress={handleLinkPress} underlayColor="transparent">
                                    <Text style={styles.linkText}>Sign In Here!</Text>
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
        height: '60%',
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

export default SignUpScreen;
