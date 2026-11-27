 import { router , useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useEvents } from "@/store/events";
import { FlatList, StyleSheet, Text, View , ScrollView } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import Activity from "../components/activity";


import TabHeader from "../components/tabheader";

const history = [
    { id: "1", title: "Running", duration: "30 minutes" },
    { id: "2", title: "Skateboarding", duration: "1 hour" },
    { id: "3", title: "Hiking", duration: "2 hours" },
    { id: "4", title: "Bird Watching", duration: "1 hour" },
    { id: "5", title: "Gaming", duration: "1 hr 30 mins" },
    { id: "6", title: "Meditating", duration: "30 minutes" },
    { id: "7", title: "Swimming", duration: "1 hour" },
    { id: "8", title: "Bike riding", duration: "2 hours" },
];

export default function Progress() {
    return (
        <View style={styles.container}> 
        <TabHeader/>
            <Text style={styles.headerText}> 
                Progress 
            </Text>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>  
                    <Text style={styles.cardTitle}>
                        Activities Completed:
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.subtitleText}> 
                            Today:
                            <Text style={styles.boldText}>
                                2
                            </Text>  
                        </Text>

                        <Text style={styles.subtitleText}> 1 hour <Text style={styles.boldText}>
                            reclaimed
                            </Text> 
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.subtitleText}> Time reclaimed last week </Text>
                        <Text style={styles.boldText}> 4 hours 45 minutes </Text>        
                    </View>    
                </View>


                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Activity History    
                    </Text>    


                    {history.map((item) => (
                        <View key={item.id} style={styles.historyRow}>
                            <Text style={styles.historyText}>{item.title}</Text>
                            <Text style={styles.historyText}>{item.duration}</Text>
                        </View>
                    ))}
                </View> 
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F9EBE0"
    },
    headerText: {
        marginTop: 10,
        fontSize: 36,
        fontWeight: "bold",
        paddingBottom: 10,
        paddingHorizontal: 20
    }, 
    card: {
        padding: 16,
        backgroundColor: "white",
        borderWidth: 1,
        gap: 20, 
        borderRadius: 10

    }, 
    cardTitle: {
        fontSize: 18,
    }, 
    row: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
    }, 
    subtitleText: {
        fontSize: 16
    }, 
    boldText: {
        fontSize: 16, 
        fontWeight: 'bold'
    }, 
    content: {
        gap: 20, 
        padding: 20
    }, 
    historyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 14,
    }, 
    historyText: {
        fontSize: 15
    }



})