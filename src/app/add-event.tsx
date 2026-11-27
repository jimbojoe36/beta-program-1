import { useEvents } from "@/store/events";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import BackButton from "./components/backButton";

export default function addEvent() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const addEvent = useEvents((s) => s.addEvent);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [allDay, setAllDay] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    if (!allDay && startTime.getTime() > endTime.getTime()) {
      Alert.alert("End time must be after the start time");
      return;
    }
    addEvent({
      date,
      title: title.trim(),
      location,
      activityType,
      description,
      start: startTime.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      end: endTime.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      allDay: allDay,
    });
    router.back();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerView}>
        <Pressable onPress={handleSave}>
          <Text style={styles.saveButton}> Save </Text>
        </Pressable>
        <Text style={styles.eventHeader}> Add Event</Text>
        <BackButton />
      </View>
      <View style={styles.body}>
        <View style={styles.textBox}>
          <Image
            source={require("../../assets/images/title_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
            style={styles.icon}
          />
          <TextInput
            style={styles.titleBox}
            placeholder="Add Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.textBox}>
          <Image
            source={require("../../assets/images/bolt_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
            style={styles.icon}
          />

          <TextInput
            style={styles.titleBox}
            placeholder="Activity Type"
            value={activityType}
            onChangeText={setActivityType}
          />
        </View>

        <View style={styles.textBox}>
          <Image
            source={require("../../assets/images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
            style={styles.icon}
          />

          <TextInput
            style={styles.titleBox}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.descriptionTextBox}>
          <Image
            source={require("../../assets/images/edit_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
            style={styles.icon}
          />

          <TextInput
            style={styles.descriptionBox}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
        </View>

        {/* </View> */}

        <View style={styles.allDayRow}>
          <Image
            source={require("../../assets/images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
            style={styles.icon}
          />
          <Text> All Day Activity </Text>
          <Switch value={allDay} onValueChange={setAllDay} />
        </View>

        {!allDay && (
          <View style={styles.clocks}>
            <View>
              <Pressable
                onPress={() => setShowStart(true)}
                style={styles.clockPressable}
              >
                <Text> Start time</Text>
                <Text>
                  {" "}
                  {startTime.toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                </Text>
              </Pressable>
            </View>

            <Image
              source={require("../../assets/images/arrow_forward_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
              style={styles.icon}
            />

            <View>
              <Pressable
                onPress={() => setShowEnd(true)}
                style={styles.clockPressable}
              >
                <Text> End time</Text>
                <Text>
                  {" "}
                  {endTime.toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                </Text>
              </Pressable>
            </View>

            {showStart && (
              <DateTimePicker
                value={startTime}
                mode="time"
                // presentation="modal"
                onValueChange={(event, selectedTime) => {
                  if (selectedTime) setStartTime(selectedTime);
                  setShowStart(false);
                }}
                onDismiss={() => setShowStart(false)}
              />
            )}

            {showEnd && (
              <DateTimePicker
                value={endTime}
                mode="time"
                // presentation="inline"
                onValueChange={(event, selectedTime) => {
                  if (selectedTime) setEndTime(selectedTime);
                  setShowEnd(false);
                }}
                onDismiss={() => setShowEnd(false)}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#5C7457",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  eventHeader: {
    fontSize: 36,
    fontWeight: "bold",
    paddingBottom: 10,
    gap: 20,
    color: "white",
  },
  titleBox: {
    borderBottomWidth: 1,
    borderColor: "grey",
    padding: 10,
    width: "95%",
  },
  saveButton: {
    width: 50,
    color: "white",
  },
  BackButton: {
    width: 50,
  },
  body: {
    height: "70%",
    width: "80%",
    borderRadius: 10,
    backgroundColor: "lightgrey",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionTextBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionBox: {
    borderBottomWidth: 1,
    borderColor: "grey",
    padding: 10,
    width: "95%",
    minHeight: 100,
  },
  clocks: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginTop: 20,
  },
  clockPressable: {
    padding: 15,
  },
  TextInput: {
    fontSize: 36,
  },
  allDayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 20,
  },
});
