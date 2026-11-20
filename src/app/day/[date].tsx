// app/day/[date].tsx
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import Activity from "../components/activity";
import { Modal } from "react-native";
// import AddEventModal from "../components/addEventModal";


const EVENTS = [
  { id: "1", title: "Breakfast", start: "8:00am", end: "9:00am" },
  { id: "2", title: "Gym", start: "11:30am", end: "1:00pm" },
  { id: "3", title: "Groceries", start: "2:30pm", end: "4:00pm" },
  { id: "4", title: "Uni", start: "4:00pm", end: "6:00pm" },
];

export default function DayScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const dateString = new Date(date + "T00:00:00")
  const dateIndex = dateString.getDay();
  const shortDate = dateString.toLocaleDateString('en-AU', {
    month: 'short', 
    day: 'numeric'
  }); 

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayName = days[dateIndex];
  const [visible, setVisible] = useState(false); 

  return (
    <View style={styles.container}>
        <View>
            <View style={styles.header}>
                <Text style={styles.date}>
                {shortDate}
                </Text>

                <Pressable
                onPress={() => router.back()}
                style={styles.closeButton}>
                    <Text style={styles.closeButtonText}> X </Text>
                </Pressable>


            </View>

            <View>
                <Text style={styles.dayName}> 
                    {dayName}
                </Text>
            </View>

            <FlatList
                data={EVENTS}
                keyExtractor={(e) => e.id}
                renderItem={({ item }) => (
                <Activity
                    activityTitle={item.title}
                    start={item.start}
                    end={item.end}
                />
                )}
                ListEmptyComponent={<Text> No activities scheduled! </Text>}
            >
            </FlatList>
        </View>

        <View style={styles.buttonsView}> 
            <Pressable style={styles.generateButton}>
                <Text>
                    Press to generate recommendations
                </Text>
            </Pressable>
            <Pressable 
            style={styles.button}
            onPress={() => {
                setVisible(true);
            }}>
                <Text style={styles.plusSymbol}> + </Text>
            </Pressable> 
        </View>

        {/* <AddEventModal
            visibility={visible}
            onClose = {() => setVisible(false)}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        gap: 30, 
        justifyContent: 'space-between',
    }, 
    buttonsView: {
        alignContent: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        gap: 10
    },
    date: {
        fontSize: 36, 
        fontWeight: 'bold'
    }, 
    container: {
        padding: 25,
        justifyContent: 'space-between', 
        gap: 100, 
        height: '100%', 
        paddingTop: 50
    }, 
    dayName: {
        fontSize: 24
    },
    closeButton: {
        width: 50, height: 50,
        backgroundColor: 'grey', 
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 30
    },
    button: {
        width: 60, height: 60,
        backgroundColor: 'dodgerblue', 
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 30, 
        alignSelf: 'flex-end'

    }, 
    plusSymbol: {
        fontSize: 30,
        color: 'white'
    },
    closeButtonText: {
        fontSize: 24, 
        color: 'white'
    }, 
    generateButton: {
        backgroundColor: 'lightblue', 
        borderRadius: 15, 
        padding: 15, 
        alignSelf: 'flex-start'
    }
    
})
