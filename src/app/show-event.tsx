import { useEvents } from "@/store/events";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import BackButton from "./components/backButton";

export default function ShowEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = useEvents((s) => s.events.find((e) => e.id === id));

  if (!event) {
    return (
      <View style={styles.screen}>
        <BackButton />
        <Text style={styles.heading}>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.heading}>Event Details</Text>
        <BackButton />
      </View>

      <View style={styles.details}>
        <Image
          source={require("../../assets/images/elementor-placeholder-image.png")}
          style={styles.placeHolderImage}
        />
        <Text>Title: {event.title}</Text>
        {event.activityType && <Text>Activity Type: {event.activityType}</Text>}
        <Text>
          Time: {event.allDay ? "All day" : `${event.start} - ${event.end}`}
        </Text>
        {event.location && <Text>Location: {event.location}</Text>}
        {event.description && <Text>Description: {event.description}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  details: {
    gap: 8,
    marginTop: 30,
    backgroundColor: "lightgrey",
    height: "85%",
    borderRadius: 15,
    padding: 25,
  },
  placeHolderImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
    borderWidth: 0.5,
  },
});
