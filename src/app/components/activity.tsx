import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useState } from "react"; 
import { router } from "expo-router";


type Props = {
    activityTitle: string;
    start: string;
    end: string;
    recommended?: boolean;
    activityType?: string;
    allDay?: boolean;
    onPress: () => void; 
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function Activity({activityTitle, start, end, recommended=false, activityType, allDay=false, onPress, onEdit, onDelete}: Props) {
    
    const [deleteEditVisibility, setDeleteEditVisibility] = useState(false);

    return (
        <Pressable onPress={() => onPress()} disabled={recommended}>
        <View style={[styles.container, recommended && styles.recommended]}>
            <View style={styles.lhs}>
                {recommended && (
                    <Text style={styles.recommendedSubtitle}> Recommended - swipe to respond</Text>
                )}
                <Text style={styles.activityTitle}> {activityTitle} </Text>
                {!!activityType && <Text> {activityType} </Text>}
            </View> 
            <View style={styles.rhs}>
                <View style={styles.textbox}>
                {allDay ? (
                    <Text> All Day </Text>
                    ) : (
                    <>
                    <Text> {start} </Text>
                    <Text> {end} </Text> 
                </>
            )}
                </View>
            
            {!recommended && 
            <Pressable
            onPress={() => {
                if (deleteEditVisibility) {
                    setDeleteEditVisibility(false);
                } else {
                    setDeleteEditVisibility(true)}
                }}>
            <Image
                source={require("../../../assets/images/more_vert_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}            
                style={styles.icon}
                hitSlop={10}
                />    
            </Pressable>
            }

            {deleteEditVisibility && (
                <View style={styles.menu}>
                    <Pressable
                        onPress={() => {
                            setDeleteEditVisibility(false);
                            onEdit?.();
                        }}
                    >
                        <Text>Edit</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            setDeleteEditVisibility(false);
                            onDelete?.();
                        }}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                </View>
            )}

            </View>
        </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    textbox: {
        padding: 15,
        alignContent: 'center', 
        justifyContent: 'center'
    }, 

    container: {
        flexDirection: 'row', 
        borderWidth: 1,
        alignContent: 'center', 
        borderRadius: 5, 
        justifyContent: "space-between", 
        padding: 5, 
        backgroundColor: "white"
        // borderLeftWidth: 0, 
        // borderRightWidth: 0, 
        // borderTopWidth: 0, 
        
    }, 
    activityTitle: {
        // flex: 1, 
        alignContent: 'center', 
        // alignSelf: 'center', 
        fontWeight: "bold",
        fontSize: 20 
    }, 
    recommendedSubtitle: {
        color: "blue"
    }, 
    recommended: {
        backgroundColor: "#d6f8ff",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "dodgerblue",
    },
    Text: {
        fontFamily: "Inter-Regular"
    }, 
    lhs: {
        gap: 5, 
        justifyContent: 'center'
    }, 
    icon: {
        height: 20, 
        width: 20
    }, 
    rhs: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    menu: {
    // flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 2,
    },
    deleteText: {
        color: "red"
    }

});

