import { Text, View, StyleSheet } from "react-native";
import { useState } from "react"; 

type Props = {
  activityTitle: string;
  start: string;
  end: string;
};

export default function Activity({activityTitle, start, end}: Props) {
    return (
        <View style={styles.container}> 
            <Text style={styles.activityTitle}> {activityTitle} </Text>
            <View style={styles.textbox}>
                <Text> {start} </Text>
                <Text> {end} </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    textbox: {
        padding: 15,
        alignContent: 'center', 
        justifyContent: 'center'
    }, 

    container: {
        flexDirection: 'row', 
        borderWidth: 1,
        alignContent: 'center', 
        borderLeftWidth: 0, 
        borderRightWidth: 0, 
        borderTopWidth: 0
    }, 
    activityTitle: {
        flex: 1, 
        alignContent: 'center', 
        alignSelf: 'center'
    }
});

