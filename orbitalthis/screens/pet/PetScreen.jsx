import {useContext, useEffect, useRef, useState} from "react";
import {
    ImageBackground,
    StyleSheet,
    StatusBar,
    View,
    Image,
    TouchableOpacity, Alert
} from "react-native";
import Bone from "../../components/Bone";
import AppScreen from "../AppScreen";
import ProgressBar from "../../components/ProgressBar";
import DataContext from "../../DataContext";
import getTodayTimestamps from "../../utils/getTodayTimestamps";

const PetScreen = ({navigation}) => {

    const {petInfo, editExpirationTime, increaseEmotions, decreaseEmotions, decreaseBone} = useContext(DataContext);
    const [dogAction, setDogAction] = useState('default');
    const timeoutRef = useRef();

    useEffect(() => {
        const {startOfDay: timestamps, current } = getTodayTimestamps();
        if(petInfo.expirationTime < timestamps) {
            decreaseEmotions(10);
            editExpirationTime(current);
        }
    }, []);

    const handleTaskABath = () => {
        handleDogAction('bath', 5, 1);
    }
    const handleFeeding = () => {
        handleDogAction('eat', 5, 1);
    }

    const handleTaskAWalk = () => {
        handleDogAction('happy', 5, 1);
    }

    const handleDogAction = (action, motions, bone) => {
        if (petInfo.bones <= 0) {
            Alert.alert('No bones');
            return;
        }
        setDogAction(action);
        increaseEmotions(motions);
        decreaseBone(bone);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDogAction('default');
        }, 2600);
    }

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                hidden={true}
            />
            <ImageBackground
                source={require('../../assets/images/pet_background.png')}
                style={styles.backgroundImage}
                resizeMode='cover'>
                <AppScreen>
                    <Bone backward={true}/>
                    <View style={styles.container}>
                        <ProgressBar/>
                        <View style={styles.animation}>
                            {dogAction === 'default' && (
                                <Image
                                    source={require("../../assets/animations/dogsit.gif")}
                                    style={styles.dogSitImage}
                                    resizeMode="contain"
                                />
                            )}
                            {dogAction === 'eat' && (
                                <Image
                                    source={require("../../assets/animations/dogeat.gif")}
                                    style={styles.dogEatImage}
                                    resizeMode="contain"
                                />
                            )}
                            {dogAction === 'happy' && (
                                <Image
                                    source={require("../../assets/animations/doghappy.gif")}
                                    style={styles.dogHappyImage}
                                    resizeMode="contain"
                                />
                            )}
                            {dogAction === 'bath' && (
                                <Image
                                    source={require("../../assets/animations/dogBath.gif")}
                                    style={styles.dogBathImage}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                        <View style={styles.interactiveButtons}>
                            <TouchableOpacity onPress={handleTaskABath}>
                                <Image
                                    source={require("../../assets/icons/bathtub.png")}
                                    style={styles.interactiveButtonIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleFeeding}>
                                <Image
                                    source={require("../../assets/icons/dog_dish.png")}
                                    style={styles.interactiveButtonIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleTaskAWalk}>
                                <Image
                                    source={require("../../assets/icons/doggy.png")}
                                    style={styles.interactiveButtonIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </AppScreen>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 26,
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    interactiveButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        position: 'absolute',
        left: 0,
        bottom: 20,
        right: 0
    },
    interactiveButtonIcon: {
        width: 80,
        height: 80
    },
    animation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationImage: {
        width: 230,
        marginLeft: -90,
        marginTop: 70
    },
    dogSitImage: {
        width: 210,
        marginLeft: -90,
        marginTop: 170
    },
    dogEatImage: {
        width: 230,
        marginLeft: -60,
        marginTop: 130
    },
    dogHappyImage: {
        width: 280,
        marginLeft: -80,
        marginTop: 120
    },
    dogBathImage: {
        width: 220,
        marginLeft: -80,
        marginTop: 140
    }
});

export default PetScreen;
