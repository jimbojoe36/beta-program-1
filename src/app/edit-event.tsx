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

export default function EditEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { date } = useLocalSearchParams<{ date: string }>();
  const event = useEvents((s) => s.events.find((e) => e.id === id));
  const updateEvent = useEvents((s) => s.updateEvent);

  const toDate = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const toHHmm = (d: Date) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  const [title, setTitle] = useState(event?.title ?? "");
  const [activityType, setActivityType] = useState(event?.activityType ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [startTime, setStartTime] = useState(toDate(event?.start ?? "09:00"));
  const [endTime, setEndTime] = useState(toDate(event?.end ?? "10:00"));
  const addEvent = useEvents((s) => s.addEvent);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [allDay, setAllDay] = useState(event?.allDay ?? false);

  const handleSave = () => {
    if (!event || !title.trim()) {
      return;
    }

    if (!allDay && startTime.getTime() > endTime.getTime()) {
      Alert.alert("End time must be after the start time");
      return;
    }
    updateEvent(event.id, {
      title: title.trim(),
      location,
      activityType,
      description,
      start: allDay ? "00:00" : toHHmm(startTime),
      end: allDay ? "23:59" : toHHmm(endTime),
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
        <Text style={styles.eventHeader}> Edit Event</Text>
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
            <View style={styles.clock}>
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

            <View style={styles.clock}>
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
    // padding: 15,
    // paddingTop: 50,
    flex: 1,
    backgroundColor: "white",
    // height: '100%',
    // width: '100%',
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
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
    // borderRadius: 10
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
  // dateTimePicker: {
  //     height: 100
  // },
  clocks: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginTop: 20,
  },
  clock: {
    // height: 40,
    // width: 70,
    // backgroundColor: "darkgrey",
    // borderWidth: 1,
    // borderRadius: 15,
    // fontWeight: "bold"
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
    // alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 20,
  },
});
