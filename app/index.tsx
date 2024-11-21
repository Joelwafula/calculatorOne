import { Text, View,Switch,StyleSheet } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import { myColors } from "@/constants/Colors";
import Button from "@/components/Button";

export default function Index() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>

    <View
      style={theme === 'light'? styles.container :[styles.container,{backgroundColor:'#000', }]}
    >
    <Switch
    value ={theme === 'light'}
    onValueChange={()=> setTheme(theme === 'light' ? 'dark' : 'light')}
    />
    <Button title="3" onPress={()=>{}}/>
    </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.light,
  },
});