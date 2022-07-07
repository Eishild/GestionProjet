import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
} from "react-native"
import React, { useEffect, useState } from "react"
import AntIcon from "react-native-vector-icons/AntDesign"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
const checkIcon = <AntIcon name="check" size={30} color="#DBDBDB" />
const backIcon = <AntIcon name="arrowleft" size={30} color="#DBDBDB" />

const Note = ({ navigation, route }) => {
  const [title, setTitle] = useState("Title")
  const [note, setNote] = useState("Note...")
  const [isTitleEdditing, setIsTitleEdditing] = useState(false)
  const [isNoteEdditing, setIsNoteEdditing] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.item?._id) {
        axios
          .get(
            `http://192.168.108.223:3002/task/Add_task/${route.params.item._id}`
          )
          .then((response) => {
            setTitle(response.data.title)
            setNote(response.data.items[0])
          })
          .catch((err) => console.log(err))
      }
    }, [])
  )

  const handleValidateNote = (item) => {
    if (!item?.item) {
      axios
        .post(`http://192.168.108.223:3002/task/Add_task`, {
          title: title,
          items: note,
          taskType: route.params.taskType,
        })
        .then((response) =>
          navigation.navigate("Task", {
            _id: route.params._id,
            data: response.data,
          })
        )
        .catch((err) => console.log(err))
    } else {
      axios
        .patch(`http://192.168.108.223:3002/task/Add_task/${item.item._id}`, {
          title: title,
          items: note,
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

  useEffect(() => {
    // if (route.params) {
    //   setTitle(route.params.title)
    //   setNote(route.params.items)
    // }
  }, [route.params])

  return (
    <View style={styles.template}>
      <Text style={styles.templateTitle}>Note</Text>
      <View style={styles.addNoteValidation}>
        <Text onPress={() => navigation.goBack()}>{backIcon}</Text>

        <Text onPress={() => handleValidateNote(route?.params)}>
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
            autoFocus={true}
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
      {isNoteEdditing ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.inputNote}
            multiline={true}
            autoFocus={true}
            value={note}
            onChangeText={(note) => setNote(note)}
            onSubmitEditing={() => setIsNoteEdditing(true)}
          />
        </KeyboardAvoidingView>
      ) : (
        <Pressable onPress={() => setIsNoteEdditing(true)}>
          <Text style={styles.inputNote}>{note}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  template: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#2D2D2D",
  },
  addNoteValidation: {
    alignItems: "flex-end",
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
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
