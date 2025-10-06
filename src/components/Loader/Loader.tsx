import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Loader() {

    return (
        <View style={styles.overlay}>
            <View style={styles.loaderBox}>
                <LottieView
                    source={require("../../../assets/loader.json")}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(30,41,59,0.85)",
        justifyContent: "center",
        alignItems: "center",
    },
    loaderBox: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.08)",
    },
});
