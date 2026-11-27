 import { router } from "expo-router";
import { useState } from "react";
import { useEvents } from "@/store/events";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import Activity from "../components/activity";
import { useLocalSearchParams } from "expo-router";
import TabHeader from "../components/tabheader";

export default function ToDoList() {
    return (
        <View style={style.container}>
            <TabHeader/>
            <Text> To do list </Text>
        </View>
    );
}




const style = StyleSheet.create({
    container: {
        flex: 1
    }
})