import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
const checkIcon = <Icon name="check" size={30} color="#DBDBDB" />

const Note = ({ navigation, route }) => {
  const [title, setTitle] = useState("Title")
  const [note, setNote] = useState("Note...")

  useEffect(() => {}, [])
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?._id) {
        axios
          .get(`http://192.168.108.223:3002/task/Add_task/${route.params._id}`)
          .then((response) => {
            setTitle(response.data.title)
            setNote(response.data.items[0])
          })
          .catch((err) => console.log(err))
      }
    }, [])
  )

  const handleValidateNote = (item) => {
    if (!item._id) {
      axios
        .post(`http://192.168.108.223:3002/task/Add_task`, {
          title: title,
          items: note,
          taskType: route.params.taskType,
        })
        .then((response) => navigation.navigate("Task", response.data))
        .catch((err) => console.log(err))
    } else {
      axios
        .patch(`http://192.168.108.223:3002/task/Add_task/${item._id}`, {
          title: title,
          items: note,
          taskType: route.params.taskType,
        })
        .then((response) => navigation.navigate("Task", response.data))
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    // if (route.params) {
    //   setTitle(route.params.title)
    //   setNote(route.params.items)
    // }
  }, [route.params])

  return (
    <View style={styles.template}>
      <Text style={styles.templateTitle}>Note</Text>
      <View style={styles.addProjectValidation}>
        <Text onPress={() => handleValidateNote(route?.params)}>
          {checkIcon}
        </Text>
      </View>
      <TextInput
        style={styles.inputTitle}
        placeholder={"Entrez un titre"}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.inputNote}
        multiline={true}
        value={note}
        onChangeText={(note) => setNote(note)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  template: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#2D2D2D",
  },
  addProjectValidation: {
    alignItems: "flex-end",
    marginVertical: 12,
  },
  templateTitle: {
    color: "white",
    textAlign: "center",
  },
  inputTitle: {
    borderBottomWidth: 1,
    borderColor: "grey",
    color: "#fff",
    height: 50,
    marginBottom: 20,
    fontSize: 25,
  },
  inputNote: {
    color: "#fff",
  },
})

export default Note
