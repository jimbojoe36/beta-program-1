 import { router } from "expo-router";
import { useState } from "react";
import { useEvents } from "@/store/events";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar as ReactCalendar } from "react-native-calendars";
import Activity from "../components/activity";
import { useLocalSearchParams } from "expo-router";
import TabHeader from "../components/tabheader";

export default function Calendar() {
    const todaysDate = new Date().toLocaleDateString("en-CA");    
    const deleteEvent = useEvents((s) => s.deleteEvent);
    const updateEvent = useEvents((s) => s.updateEvent);
    const events = useEvents((s) => s.events);
    const todaysEvents = events
    .filter((e) => e.date === todaysDate && !e.recommended)
    .sort((a,b) => {
        if (a.allDay !== b.allDay) {
            if (a.allDay) {
                return -1; 
            } else {
                return 1;
            }

        }
            return a.start.localeCompare(b.start);
    });


  return (
    <View style={styles.screen}>
      <TabHeader/>
      <ReactCalendar
        onDayPress={(day) => {
        router.push({
          pathname: "/day/[date]",
          params: { date: day.dateString },
        });
      }}
        theme={{}}
      />
      <View style={styles.container}>
        <Text style={styles.title}> Today's Events </Text>
        <FlatList
          data={todaysEvents}
          keyExtractor={(e) => e.id}
          contentContainerStyle={styles.activityList}
          renderItem={({ item }) => (
            <Activity
              activityTitle={item.title}
              start={item.start}
              end={item.end}
              recommended={item.recommended}
              activityType={item.activityType}
              allDay={item.allDay}
              onEdit={() => router.push({ pathname: "/edit-event", params: { id: item.id } })}
              onDelete={() => deleteEvent(item.id)}
              onPress={() => {}}
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
  activityList: {
    gap: 5
  }, 

});
