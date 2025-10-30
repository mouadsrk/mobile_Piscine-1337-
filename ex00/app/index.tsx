import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const handlePress = () => {
    console.log('Button pressed');
  };

  return (
   <View  style={style.container} >
    <Text style={style.text} >Press the button below</Text>
    <Button onPress={handlePress} title='Click me' />
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


