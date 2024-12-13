import { StyleSheet, Text, View, Image, ImageBackground } from "react-native"

export default function Box({ children, style }) {
    return (
        <View style={[styles.box, style]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundcolor: 'blue',
        padding: 20,
    },
    text: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    }
});
