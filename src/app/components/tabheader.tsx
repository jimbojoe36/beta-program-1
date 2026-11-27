import { FlatList, StyleSheet, Text, View } from "react-native";


export default function TabHeader() {
    return (
        <View style={styles.header}>
        <Text style={styles.logo}> re:Claim </Text>
        </View>
    )
}


const styles = StyleSheet.create({
header: {
    padding: 20,
    height: "12%", 
    backgroundColor: "#5C7457"
  },
logo: {
    color: "#F9EBE0", 
    fontSize: 36, 
    alignSelf: "center", 
    fontWeight: 600
  }

})