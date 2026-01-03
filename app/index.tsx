import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRef, useState, useEffect } from "react";
export default function Index() {
  const [value, setvalue] = useState(0);
  const [running, setrunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startgame = () => {
    if (running) return;
    setvalue(0);
    setrunning(true);
    intervalRef.current = setInterval(() => {
      setvalue((prev => prev + 1));
    }, 25);
  }
  const stopgame = () => {
    if (!running) return;
    setrunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  return (
    <View style={[harry.container]}>
      <Text style={[harry.title]}>NumberGuesser</Text>
      <View style={[harry.game]}>
        <Text style={[harry.number]}>{value}</Text>
      </View>
      <View style={[harry.buttons]}>
        <Pressable style={[harry.button, {backgroundColor: "#59a76c"}]} onPress={startgame}>
          <Text>Start</Text>
        </Pressable>
        <Pressable style={[harry.button, {backgroundColor: "#d9534f"}]} onPress={stopgame}>
          <Text>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const harry = StyleSheet.create({
  container: {flex: 1, alignItems: "center", padding: 24},
  title: {fontSize: 32, fontWeight: "600", marginTop: 20, marginBottom: 40},
  game: {borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  number: {fontSize: 20, fontWeight: "500"},
  buttons: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resultcontainer: {
    height: 140,
    marginTop: 10
  },
  result: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    width: "100%",
    maxWidth: 250,
    alignItems: "center",
    
  },
  resultText: {
    fontSize: 18,
    marginVertical: 2,
  },
  close: {
    color: "#e99e1cff",
    fontWeight: "500"
  },
  perfect: {
    marginTop: 8,
    fontWeight: "700",
    color: "#59a76c",
  },
})