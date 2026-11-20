// import { Text, View, StyleSheet, TextInput } from "react-native";
// import { useState } from "react"; 
// import { Modal } from "react-native";
// import { Background } from "expo-router/build/react-navigation/index.js";

// type Props = {
//     visibility: boolean;
//     onClose: () => void;
// }


// export default function addEventModal({visibility, onClose}: Props) { 
//     return (
//         <Modal
//         transparent={true}
//         visible={visibility}
//         onRequestClose={onClose}
//         >
//             <View style={styles.greyBackground}>
//                 <View style={styles.whiteBackground}>
//                     <Text style={styles.eventHeader}> Add Event</Text>
//                     <TextInput
//                     style={styles.titleBox}
//                     placeholder="Add Title"/>
                    
//                 </View>
//             </View>
//         </Modal>
//     );
// }



// const styles = {
//     container: { 
//         padding: 40, 
//         color: 'white'
//     }, 
//     whiteBackground: {
//         padding: 15, 
//         backgroundColor: 'white', 
//         height: '70%', 
//         width: '80%', 
//         alignSelf: 'center',
//         // alignItems: 'center', 
//         // justifyContent: 'center', 
//         // flexDirection: 'row',

//     }, 
//     greyBackground: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center', 
//         alignContent: 'center'
//     }, 
//     eventHeader: {
//         fontWeight: 'bold', 
//         fontSize: 24, 
//         paddingBottom: 10
//     }, 
//     titleBox: {
//         borderWidth: 1,
//         borderColor: 'black',
//         padding: 10, 
//         borderRadius: 10,
//         borderOpacity: 0.5
//     }
// }