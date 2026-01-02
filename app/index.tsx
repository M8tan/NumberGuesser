import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={[harry.container]}>
      <Text style={[harry.title]}>NumberGuesser</Text>
    </View>
  );
}

const harry = StyleSheet.create({
  container: {flex: 1, alignItems: "center", padding: 24},
  title: {fontSize: 26, fontWeight: "600", marginTop: 20},
})