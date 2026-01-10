import { Text, View, StyleSheet, Pressable, TextInput, ScrollView, Animated } from "react-native";
import { useRef, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
export default function Index() {
  const [value, setvalue] = useState(0);
  const [running, setrunning] = useState(false);
  const [targettemp, settargettemp] = useState('')
  const [target, settarget] = useState(100)
  const [currentroundtarget, setcurrentroundtarget] = useState(target);
  const [tries, settries] = useState(0);
  const [currentroundtries, setcurrentroundtries] = useState(0);
  const [targetchange, settargetchange] = useState(false);
  const [validtarget, setvalidtarget] = useState(true);
  const [shaaahor, setshaaahor] = useState(false);
  const ThemeKey = "@ThemeKey";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const startgame = () => {
    if (running) return;
    setvalidtarget(true);
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
  };
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
  };
  const settargethandler = () => {
    const parsed = Number(targettemp);
    settargettemp('')
    if (isNaN(parsed) || parsed <= 0 || parsed >= 999999) {
      setvalidtarget(false);
      return;
    }
    if (parsed !== currentroundtarget) {
      settarget(parsed);
      settries(0);
      settargetchange(true);
    }
    setvalidtarget(true);
  };
  const themeanimation = useRef(new Animated.Value(shaaahor ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(themeanimation, {
      toValue: shaaahor ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [shaaahor]);
  useEffect(() => {
    const loadtheme = async () => {
    try {
      const savedtheme = await AsyncStorage.getItem(ThemeKey);
      if (savedtheme !== null) {
        setshaaahor(savedtheme === "dark");
      }
    } catch (e) {
      console.log("Theme loading failed. ", e);
    }
  };
loadtheme();}, [])
useEffect(() => {
  const savetheme = async () => {
    try { 
      await AsyncStorage.setItem(ThemeKey, shaaahor ? "dark" : "light");
    } catch (e) {
      console.log("Save theme failed. " ,e)
    }
  };
  savetheme();}, [shaaahor])
  const target_value_difference = Math.abs(currentroundtarget - value);
  const light = {
    background: "#f8fafc",
    card: "#ffffff",
    text: "#0f172a",
  };  
  const dark = {
    background: "#020617",
    card: "#020617",
    text: "#e5e7eb",
  };
  const backgroundColor = themeanimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f8fafc", "#020617"]
  });
  const textcolor = themeanimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#0f172a", "#e5e7eb"]
  });
  const inputbackgroundcolor = themeanimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["#ffffff", "#020617"],
});

const inputtextcolor = themeanimation.interpolate({
  inputRange: [0, 1],
  outputRange: ["#0f172a", "#e5e7eb"],
});
  if (value === 1000000) stopgame();
  //<Stack.Screen options={{headerStyle: { backgroundColor: shaaahor ? "#020617" : "#f8fafc"}, headerTintColor: shaaahor ? "#e5e7eb" : "#0f172a", headerTitleStyle: {fontWeight: "600"}, title: "NumberMatcher"}} />
  return (
    <>
    <Stack.Screen options={{headerShown: false}} />
    <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={harry.container} style={{ backgroundColor }}>
      <Pressable onPress={() => setshaaahor(prev => !prev)} style={harry.themetoggle}><Text style={{ fontSize: 22 }}>{shaaahor ? "☀️" : "🌙"}</Text></Pressable>
      <Animated.Text style={[harry.title, {color: textcolor}]}>NumberMatcher</Animated.Text>
      <Animated.View style={[harry.game, {borderColor: textcolor}]}>
        <Animated.Text style={[harry.number, {color: textcolor}]}>Target:
          <Animated.View style={{backgroundColor: inputbackgroundcolor, borderRadius: 6, marginLeft: 10}}>
            <AnimatedTextInput keyboardType="numeric" onChangeText={settargettemp} value={targettemp} placeholder={String(target)} placeholderTextColor={"#9ca3af"} style={[harry.number, {maxWidth: 100, marginLeft: 10, padding: 4, color: inputtextcolor}]}></AnimatedTextInput>
          </Animated.View> 
        </Animated.Text>
        <Pressable style={[harry.button, {backgroundColor: "#3849d0ff", marginTop:10}]} onPress={settargethandler}><Animated.Text style={[harry.buttonText, {color: textcolor}]}>{ validtarget ? targetchange ? "Target set!" : "Set target" : "Invalid target" }</Animated.Text></Pressable>
      </Animated.View>
      <Animated.View style={[harry.game, {borderColor: textcolor}]}>
        <Animated.Text style={[harry.number, {color: textcolor}]}>Count: {value}</Animated.Text>
      </Animated.View>
      <View style={[harry.buttons]}>
        <Pressable style={[harry.button, {backgroundColor: "#59a76c"}]} onPress={startgame}>
          <Animated.Text style={[harry.buttonText, {color:textcolor}]}>Start</Animated.Text>
        </Pressable>
        <Pressable style={[harry.button, {backgroundColor: "#d9534f"}]} onPress={stopgame}>
          <Animated.Text style={[harry.buttonText, {color: textcolor}]}>Stop</Animated.Text>
        </Pressable>
      </View>
      {!running && value !== 0 && (
        <Animated.View style={[harry.game, {borderColor: textcolor}]}>
          <Animated.Text style={[harry.number, {color: textcolor}]}>You got: {value}</Animated.Text>
          <Animated.Text style={[harry.number, {color: textcolor}]}>Difference: {target_value_difference}</Animated.Text>
          <Animated.Text style={[harry.number, {color: textcolor}]}>Tries: {currentroundtries}</Animated.Text>
          {target_value_difference <= 5 && target_value_difference != 0 && (
            <Text style={[harry.number, {color: "#dc8a16ff"}]}>So close!</Text>
          )}
          {target_value_difference === 0 && (
            <Text style={[harry.number, {color: "#ee30d1ff", alignSelf: "center"}]}>Success!</Text>
          )}
        </Animated.View>
      )}
    </Animated.ScrollView>
    </>
  );
  
}

const harry = StyleSheet.create({
  container: {flex: 1, alignItems: "center", padding: 24},
  themetoggle: {
  position: "absolute",
  top: 16,
  right: 16,
  padding: 10,
  borderRadius: 20,
  zIndex: 10,
},

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