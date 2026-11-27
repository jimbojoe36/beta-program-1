import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Onboarding() { 

<View>

    <Text>
            Welcome to re:Claim!
            Join us to reclaim the time you lose to doomscrolling and procrastination! 
    </Text>

    <Pressable style={styles.welcomeButton}> 
        <Text>
            Get Started!
        </Text>

    </Pressable>
</View>

}







const styles = StyleSheet.create({
    welcomeButton: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
    }
})