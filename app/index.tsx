import { Text, View,Switch,StyleSheet, SafeAreaView } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import { myColors } from "@/constants/Colors";
import Button from "@/components/Button";
import MyKeyboard from "@/components/MyKeyboard";

export default function Index() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>

    <SafeAreaView
      style={theme === 'light'? styles.container :[styles.container,{backgroundColor:'#000', }]}
    >
      {
        theme === 'light'
        ?  <Text>Switch to dark mode</Text>
        : <Text style={{color:'white'}}>Switch to light mode</Text>
      }
     
    <Switch
    value ={theme === 'light'}
    onValueChange={()=> setTheme(theme === 'light' ? 'dark' : 'light')}
    />
   
      <MyKeyboard/>
    </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myColors.light,
  },
});