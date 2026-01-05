import { Text, View, StyleSheet, Pressable, TextInput, ScrollView } from "react-native";
import { useRef, useState, useEffect } from "react";
export default function Index() {
  const [value, setvalue] = useState(0);
  const [running, setrunning] = useState(false);
  const [targettemp, settargettemp] = useState('')
  const [target, settarget] = useState(20)
  const [currentroundtarget, setcurrentroundtarget] = useState(target);
  const [tries, settries] = useState(0);
  const [currentroundtries, setcurrentroundtries] = useState(0);
  const [targetchange, settargetchange] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startgame = () => {
    if (running) return;
    settargetchange(false);
    setvalue(0);
    setrunning(true);
    settries(prev => {
      const newtries = prev + 1;
      setcurrentroundtries(newtries);
      return newtries;
    });
    setcurrentroundtarget(target);
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
    if (value === currentroundtarget) {
      settries(0);
    }
  }
  const settargethandler = () => {
    const parsed = Number(targettemp);
    settargettemp('')
    if (isNaN(parsed) || parsed <= 0) return;
    settarget(parsed);
    settries(0);
    if (parsed !== currentroundtarget) {
    settargetchange(true);
    }
  }
  const target_value_difference = Math.abs(currentroundtarget - value);
  const shaaahor = true;
  const light = {
    title: "#0f172a",
  }  
  const dark = {
    title: "#e5e7eb",
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[harry.container]}>
      <Text style={[harry.title, {color: shaaahor ? light.title : dark.title}]}>NumberMatcher</Text>
      <View style={[harry.game]}>
        <Text style={[harry.number]}>Target: 
          <TextInput keyboardType="numeric" onChangeText={settargettemp} value={targettemp} placeholder={String(target)} style={[harry.number, {maxWidth: 100, marginLeft: 10, padding: 4}]}></TextInput>
        </Text>
        <Pressable style={[harry.button, {backgroundColor: "#3849d0ff", marginTop:10}]} onPress={settargethandler}><Text style={[harry.buttonText]}>{targetchange ? "Changed!" : "Set target"}</Text></Pressable>
      </View>
      <View style={[harry.game]}>
        <Text style={[harry.number]}>Count: {value}</Text>
      </View>
      <View style={[harry.buttons]}>
        <Pressable style={[harry.button, {backgroundColor: "#59a76c"}]} onPress={startgame}>
          <Text style={[harry.buttonText]}>Start</Text>
        </Pressable>
        <Pressable style={[harry.button, {backgroundColor: "#d9534f"}]} onPress={stopgame}>
          <Text style={[harry.buttonText]}>Stop</Text>
        </Pressable>
      </View>
      {!running && value !== 0 && (
        <View style={[harry.game]}>
          <Text style={[harry.number]}>You got: {value}</Text>
          <Text style={[harry.number]}>Difference: {target_value_difference}</Text>
          <Text style={[harry.number]}>Tries: {currentroundtries}</Text>
          {target_value_difference <= 5 && target_value_difference != 0 && (
            <Text style={[harry.number, {color: "#dc8a16ff"}]}>So close!</Text>
          )}
          {target_value_difference === 0 && (
            <Text style={[harry.number, {color: "#ee30d1ff"}]}>Success!</Text>
          )}
        </View>
      )}
    </ScrollView>
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
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    padding: 5
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