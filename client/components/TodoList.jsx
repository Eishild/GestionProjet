import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
const checkIcon = <Icon name="check" size={30} color="#DBDBDB" />

const TodoList = ({ navigation, route }) => {
  const [title, setTitle] = useState("Title")
  const [todoItems, setTodoItems] = useState([])
  const [addTodo, setAddTodo] = useState("")
  const [edditTodo, setEdditTodo] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isEdditing, setIsEdditing] = useState(false)

  // useEffect(() => {
  //   if (route?.params?._id) {
  //     axios
  //       .get(`http://192.168.108.223:3002/task/Add_task/${route.params._id}`)
  //       .then((response) => {
  //         console.log(response.data)
  //         setTitle(response.data.title)
  //         setTodoItems(response.data.items)
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?._id) {
        axios
          .get(`http://192.168.108.223:3002/task/Add_task/${route.params._id}`)
          .then((response) => {
            // console.log("data", response.data)
            setTitle(response.data.title)
            setTodoItems(response.data.items)
          })
          .catch((err) => console.log(err))
      }
    }, [])
  )
  const handleValidateTodos = (item) => {
    if (!item._id) {
      axios
        .post(`http://192.168.108.223:3002/task/Add_task`, {
          title: title,
          items: todoItems,
          taskType: route.params.taskType,
        })
        .then((response) => navigation.navigate("Task", response.data))
        .catch((err) => console.log(err))
    } else {
      axios
        .patch(`http://192.168.108.223:3002/task/Add_task/${item._id}`, {
          title: title,
          items: todoItems,
          taskType: route.params.taskType,
        })
        .then((response) => navigation.navigate("Task", response.data))
        .catch((err) => console.log(err))
    }
  }

  const handleAddTodo = () => {
    setTodoItems([...todoItems, { items: addTodo }])
    setAddTodo("")
  }

  const handleEdditTodo = (index) => {
    setSelectedIndex(index)
    setEdditTodo(todoItems[index].items)
    setIsEdditing(true)
  }

  const handleAddEdditTodo = () => {
    let arr = [...todoItems]
    const newArr = arr[selectedIndex]
    setSelectedIndex(-1)
    setIsEdditing(false)
  }
  return (
    <View style={styles.template}>
      <Text style={styles.templateTitle}>Todolist</Text>

      <View style={styles.addProjectValidation}>
        <Text onPress={() => handleValidateTodos(route?.params)}>
          {checkIcon}
        </Text>
      </View>
      <TextInput
        style={styles.inputTitle}
        placeholder={"Entrez un titre"}
        // autoFocus
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <FlatList
        data={todoItems}
        style={styles.flatList}
        renderItem={({ item, index }) => (
          <View>
            {selectedIndex === index ? (
              <TextInput
                style={styles.input}
                autoFocus
                value={edditTodo}
                onChangeText={(text) => setEdditTodo(text)}
                onSubmitEditing={(text) => handleAddEdditTodo(text)}
                onBlur={(text) => handleAddEdditTodo(text)}
                placeholderTextColor="#fff"
              />
            ) : (
              <Pressable style={styles.item} on={() => handleEdditTodo(index)}>
                <Text>{item.items}</Text>
              </Pressable>
            )}
          </View>
        )}
        keyExtractor={(_, index) => index}
      />
      {!isEdditing && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            value={addTodo}
            onChangeText={(text) => setAddTodo(text)}
            onSubmitEditing={(text) => handleAddTodo(text)}
            placeholderTextColor="#fff"
            placeholder="Entrez une tâche"
          />
        </KeyboardAvoidingView>
      )}
    </View>
  )
}

export default TodoList

const styles = StyleSheet.create({
  template: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#2D2D2D",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    marginBottom: 20,
  },
  inputTitle: {
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "grey",
    height: 50,
    marginBottom: 20,
    fontSize: 25,
  },
  templateTitle: {
    color: "white",
    textAlign: "center",
  },
  addProjectValidation: {
    alignItems: "flex-end",
    marginVertical: 15,
  },
  inputEddit: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  flatList: {
    flexGrow: 0,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "50%",
    color: "#fff",
  },
  leftComponents: {
    flexDirection: "row",
    alignItems: "center",
  },
  square: {
    backgroundColor: "#55BCF6",
    opacity: 0.5,
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
  },
  circulare: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#55BCF6",
  },
  circulareValidate: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "green",
  },
  writeTaskWrapper: {
    alignItems: "center",
  },
})
