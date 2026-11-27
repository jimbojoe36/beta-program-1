// app/day/[date].tsx
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Activity from "../components/activity";
import BackButton from "../components/backButton";
import { useEvents } from "@/store/events";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Alert from "react-native";
import { buildRecommendations } from "../utils/recommendations";


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
  ];
  const generate = () => {
    todaysEvents.filter((e) => e.recommended).forEach((e) => deleteEvent(e.id));
    buildRecommendations(todaysEvents, date).forEach((rec) => addEvent(rec));
};

  const events = useEvents((s) => s.events);
  const todaysEvents = events
    .filter((e) => e.date === date)
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

  const addEvent = useEvents((s) => s.addEvent);
  const deleteEvent = useEvents((s) => s.deleteEvent);
  const updateEvent = useEvents((s) => s.updateEvent);

  const acceptRecommendation = (id: string) => updateEvent(id, {recommended: false});
  const declineRecommendation = (id: string) => deleteEvent(id); 

  const dayName = days[dateIndex];
  const [visible, setVisible] = useState(false); 

  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.date}>
                {shortDate}
                </Text>

                <BackButton/> 

                


            </View>

        <View style={styles.listArea}>
            <View style={styles.daySubHeader}>
                <Text style={styles.dayName}> 
                    {dayName}
                </Text>
            </View>

            <FlatList
                data={todaysEvents}
                contentContainerStyle={styles.activityList}
                keyExtractor={(e) => e.id}
                renderItem={({ item }) => 
                {
                const row = (<Activity
                        activityTitle={item.title}
                        start={item.start}
                        end={item.end}
                        recommended={item.recommended}
                        activityType={item.activityType}
                        allDay={item.allDay}
                        onEdit={() => router.push({ pathname: "/edit-event", params: { id: item.id } })}
                        onDelete={() => deleteEvent(item.id)}
                        onPress={() => router.push({ pathname: "/show-event", params: { id: item.id } })}
                    />
                )

                if (!item.recommended) {
                    return row;
                } else {
                    return (
                        <ReanimatedSwipeable
                        renderLeftActions={() => (
                            <View style={[styles.swipeAction, styles.acceptAction]}>
                                <Text style={styles.swipeText}>Accept</Text>
                            </View>
                        )}
                        renderRightActions={() => (
                            <View style={[styles.swipeAction, styles.declineAction]}>
                                <Text style={styles.swipeText}>Decline</Text>
                            </View>
                        )}
                        onSwipeableOpen={(direction) => {
                            if (direction === "right") {
                                acceptRecommendation(item.id);
                            } else {
                                declineRecommendation(item.id);
                            }
                        }}>
                            {row}
                        </ReanimatedSwipeable>
                    );
                }
                }}
                ListEmptyComponent={
                    <Text
                    style={styles.emptyList}> No activities scheduled! </Text>
                }
                showsVerticalScrollIndicator={false}
            >
            </FlatList>
        </View>

        <View style={styles.buttonsView}> 
            <Pressable 
            style={styles.generateButton}
            onPress={generate}
            >
                <Text style={styles.recText}>
                    Press to generate recommendations
                </Text>
            </Pressable>
            <Pressable 
            style={styles.button}
            onPress={() => router.push({ pathname: "/add-event", params: { date } })}>
                <Text style={styles.plusSymbol}> + </Text>
            </Pressable> 
        </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        // gap: 30, 
        justifyContent: 'space-between',
        backgroundColor: "#5C7457", 
        paddingTop: 50, 
        paddingBottom: 15,
        paddingHorizontal: 25, 
    }, 
    buttonsView: {
        alignContent: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        gap: 10, 
        paddingHorizontal: 25, 
        paddingBottom: 25
    },
    listArea: {
        flex: 1,
        paddingHorizontal: 25,
        
    },
    date: {
        fontSize: 36, 
        fontWeight: 'bold',
        color: "white"
    }, 
    container: {
        justifyContent: 'space-between', 
        gap: 20, 
        height: '100%',  
        backgroundColor: "#F9EBE0", 
        flex: 1
    }, 
    dayName: {
        fontSize: 24
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
    generateButton: {
        backgroundColor: 'lightblue', 
        borderRadius: 15, 
        padding: 15, 
        alignSelf: 'flex-start', 
        height: 60, 
        alignItems: "center", 
        justifyContent: "center"
    }, 
    emptyList: {
        paddingTop: 15, 
        fontWeight: "bold", 
        color: "red"
    }, 
    activityList: {
        gap: 5
    }, 
    daySubHeader: {
        marginBottom: 10
    }, 
    recText: {
        fontSize: 14
    }, 
    swipeAction: {
        justifyContent: "center", 
        padding: 20,
        borderRadius: 6
    },
    acceptAction: {
        backgroundColor: "green", 
    },
    declineAction: {
        backgroundColor: "red", 
    },
    swipeText: {
        fontWeight: "bold", 
        color: "white"
    }
    
})
