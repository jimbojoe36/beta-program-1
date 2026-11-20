import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import Activity from "../components/activity";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const EVENTS = [
    { id: "1", title: "Uni", start: "4:00pm", end: "6:00pm" },
    { id: "2", title: "Meeting", start: "5:00pm", end: "6:00pm" },
    { id: "3", title: "Dinner", start: "7:00pm", end: "8:00pm" },
    { id: "4", title: "Dinner", start: "8:00pm", end: "9:00pm" },
    { id: "5", title: "Dinner", start: "9;00pm", end: "10:00pm" },
  ];

  return (
    <View style={styles.screen}>
      <ReactCalendar
        onDayPress={(day) => {
          console.log("pressed", day.dateString);
          router.push(`/day/${day.dateString}`);
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}> Upcoming Events </Text>
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
          showsVerticalScrollIndicator={false}
          ListEmptyComponent=<Text> No upcoming activities! </Text>
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  screen: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    paddingBottom: 10,
  },

  Text: {
    fontFamily: "ui-monospace",
  },
  ReactCalendar: {
    fontFamily: "ui-monospace",
  },
});
