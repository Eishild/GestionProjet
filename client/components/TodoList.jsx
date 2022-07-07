import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import React, { useState } from "react"
import AntIcon from "react-native-vector-icons/AntDesign"

import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
const backIcon = <AntIcon name="arrowleft" size={30} color="#DBDBDB" />

const checkIcon = <AntIcon name="check" size={30} color="#DBDBDB" />

const TodoList = ({ navigation, route }) => {
  const [title, setTitle] = useState("Title")
  const [todoItems, setTodoItems] = useState([])
  const [addTodo, setAddTodo] = useState("")
  const [edditTodo, setEdditTodo] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isEdditing, setIsEdditing] = useState(false)
  const [isTitleEdditing, setIsTitleEdditing] = useState(false)

  //Récupération des données dans la bdd
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.item?._id) {
        axios
          .get(
            `http://192.168.108.223:3002/task/Add_task/${route.params.item._id}`
          )
          .then((response) => {
            setTitle(response.data.title)
            setTodoItems(response.data.items)
          })
          .catch((err) => console.log(err))
      }
    }, [])
  )

  // Action validation
  const handleValidateTodos = (item) => {
    // Créer la todoliste dans la bdd
    if (!item?.item) {
      axios
        .post(`http://192.168.108.223:3002/task/Add_task`, {
          title: title,
          items: todoItems,
          taskType: route.params.taskType,
        })
        .then((response) => {
          navigation.navigate("Task", {
            _id: route.params._id,
            data: response.data,
          })
        })
        .catch((err) => console.log(err))
    } else {
      // Update la todoliste dans la bdd

      axios
        .patch(`http://192.168.108.223:3002/task/Add_task/${item.item._id}`, {
          title: title,
          items: todoItems,
          taskType: route.params.taskType,
        })
        .then((response) =>
          navigation.navigate("Task", {
            _id: route.params._id,
            data: response.data,
          })
        )
        .catch((err) => console.log(err))
    }
  }

  //Ajout des todos
  const handleAddTodo = () => {
    setTodoItems([...todoItems, { items: addTodo }])
    setAddTodo("")
  }

  //Ajout des todos
  const handleEdditTodo = (index) => {
    setSelectedIndex(index)
    setEdditTodo(todoItems[index].items)
    setIsEdditing(true)
  }

  const handleAddEdditTodo = (text) => {
    let arr = [...todoItems]
    const newArr = arr[selectedIndex]
    console.log(newArr)
    setSelectedIndex(-1)
    setIsEdditing(false)
  }

  const handleDeleteTodo = (index) => {
    let todoCopy = [...todoItems]
    todoCopy.splice(index, 1)
    setTodoItems(todoCopy)
  }

  return (
    <View style={styles.template}>
      <Text style={styles.templateTitle}>Todolist</Text>

      <View style={styles.addTodoValidation}>
        <Text onPress={() => navigation.goBack()}>{backIcon}</Text>
        <Text onPress={() => handleValidateTodos(route?.params)}>
          {checkIcon}
        </Text>
      </View>
      {isTitleEdditing ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.inputTitle}
            placeholder={"Entrez un titre"}
            autoFocus
            value={title}
            onChangeText={(text) => setTitle(text)}
            onSubmitEditing={() => setIsTitleEdditing(false)}
          />
        </KeyboardAvoidingView>
      ) : (
        <Pressable onPress={() => setIsTitleEdditing(true)}>
          <Text style={styles.inputTitle}>{title}</Text>
        </Pressable>
      )}
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
              <Pressable
                style={styles.todo}
                onLongPress={() => handleDeleteTodo(index)}
              >
                <Text>{item.items}</Text>
                <View style={styles.circulare}></View>
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
  todo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  addTodoValidation: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
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
