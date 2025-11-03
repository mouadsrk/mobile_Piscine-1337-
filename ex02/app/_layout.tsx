import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: styles.container.backgroundColor,
        },
        headerTintColor: '#D3DAD9', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign : 'center'
      }}
      >
        <Stack.Screen
          name="index"
          options={() => ({
            title : "CALCULATOR"
          })}
        />

        

      </Stack>

  

  )
}

const styles = StyleSheet.create(
  {
    container : {
      backgroundColor : "#37353E"

    }
  }
)
