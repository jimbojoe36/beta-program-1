import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
    backBehavior="history"
    screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
>
      <Tabs.Screen
        name="todo"
        options={{ 
          title: "Todo", 
          tabBarIcon: ({size}) => (
            <MaterialIcons name="checklist" size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="calendar-month" size={size}/>
          ),
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ size }) => (
            <MaterialIcons name="trending-up" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}