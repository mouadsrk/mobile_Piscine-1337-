import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {

    const [buttontitle, setButtontitle] = useState('Press the button below');

    const handlePress = () => {
    console.log('Button pressed');
        if (buttontitle === "Press the button below")
            setButtontitle("Hello World!")
        else
        setButtontitle("Press the button below")
    };

  return (
   <View  style={style.container} >
    <Text style={style.text} >{buttontitle}</Text>
    <Button onPress={handlePress} title="Click me" />
   </View>
  );
}


const style = StyleSheet.create(
  {
    container : {
      flex : 1,
      justifyContent : "center",
      alignItems : "center",
      backgroundColor : "#fff"
    },
    text : {
      fontSize: 18,
      marginBottom: 20,
    }
  }
)


