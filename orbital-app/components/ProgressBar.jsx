import {Image, StyleSheet, View} from 'react-native';
import {Text} from "react-native-paper";
import {useContext} from "react";
import DataContext from "../DataContext";

const progressBarWidth = 168;

const ProgressBar = () => {
    const { petInfo } = useContext(DataContext);

    return (
        <View style={styles.container}>
            <View style={styles.lovingHeart}>
                <Image
                    source={require("../assets/icons/loving_heart.png")}
                    resizeMode='contain'
                    style={styles.lovingHeartImage}
                />
                <Text style={styles.lovingHeartText}>{petInfo.emotions}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={[
                    styles.progressBarImageContainer,
                    {
                        width: progressBarWidth * (petInfo.emotions / 100),
                    }
                ]}>
                    <Image
                        source={require("../assets/icons/progress_bar.png")}
                        resizeMode='contain'
                        style={styles.progressBarImage}
                    />
                </View>
                <Image
                    source={require("../assets/icons/progress_bar_border.png")}
                    resizeMode='contain'
                    style={styles.progressBarBorderImage}
                />
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        height: 43,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'flex-end'
    },
    lovingHeart: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lovingHeartImage: {
        position: 'absolute',
        zIndex: 0,
        height: 43,
        width: 58,
    },
    lovingHeartText: {
        fontWeight: 700,
        color: '#952D2E',
        marginBottom: 4
    },
    progressBarContainer: {
        position: 'relative',
        height: 24,
        width: progressBarWidth,
    },
    progressBarImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: "hidden"
    },
    progressBarImage: {
        height: 24,
        width: progressBarWidth,
    },
    progressBarBorderImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 24,
        width: progressBarWidth,
    },
});

export default ProgressBar;
