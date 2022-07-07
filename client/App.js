import { StatusBar } from "expo-status-bar"
import { StyleSheet, Dimensions, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Task from "./components/Task"
import Home from "./components/Home"
import TodoList from "./components/TodoList"
import Note from "./components/Note"
import Login from "./components/Login"
import Register from "./components/Register"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} backgroundColor={"#2D2D2D"} />
      {/* <Login /> */}
      {/* <Register /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Task"
            component={Task}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Todolist"
            component={TodoList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Note"
            component={Note}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#2D2D2D",
  },
  tasksWrapper: {
    flex: 1, //A delet pour le test
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  addWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2D2D2D",
    borderWidth: 1,
    borderRadius: 100,
  },
})
