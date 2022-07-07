import { StatusBar } from "expo-status-bar"
import axios from "axios"
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import React, { useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

// IMPORT DES ICONS POUR LES PROJETS

import AntIcon from "react-native-vector-icons/AntDesign"
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons"

// ATTRIBUTION DES ICON

const checkIcon = <AntIcon name="check" size={30} color="#DBDBDB" />
const plusIcon = <AntIcon name="plus" size={30} color="#DBDBDB" />
const backIcon = <AntIcon name="arrowleft" size={30} color="#DBDBDB" />
const listIcon = <AntIcon name="bars" size={20} color="#000" />
const noteIcon = <MCIcon name="note-edit-outline" size={20} color="#000" />

const Task = ({ navigation, route }) => {
  //DEFINITION DES STATES

  const [title, setTitle] = useState("Titre")
  const [task, setTask] = useState([])
  const [taskType, setTaskType] = useState("")
  const [inputTitle, setInputTitle] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editItems, setEditItems] = useState({})
  const [projectId, setProjectId] = useState([])
  const [valideProject, setValideProject] = useState(false)
  const [data, setData] = useState({})

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?._id) {
        axios
          .get(`http://192.168.108.223:3002/project/Home/${route.params._id}`)
          .then((res) => {
            setTask(res.data.tasks)
            setValideProject(true)
            setTitle(res.data.title)
            setData(res.data)
            setTaskType("")
          })
          .catch((err) => console.log(err))
      }
    }, [])
  )

  // MODIFICATION DE L'ITEM DANS LA BDD POUR CHAQUE CHANGEMENT DE "EDITITEMS" SI SA LONGUEUR EST NON NULL
  useEffect(() => {
    if (route?.params?.data?.taskType) {
      setEditItems({ _id: data._id, title, tasks: projectId })
    }
  }, [projectId])

  useEffect(() => {
    if (Object.keys(editItems).length !== 0) {
      axios
        .patch(
          `http://192.168.108.223:3002/project/Add_projects/${route.params?._id}`,
          editItems
        )
        .catch((e) => console.log(e))
    }
  }, [editItems])

  // FONCTION QUI AJOUTE LE PROJET A LA BDD
  const handleAddProject = (item) => {
    if (!item._id) {
      axios
        .post("http://192.168.108.223:3002/project/Add_projects", {
          title: title,
          Tasks: projectId,
        })
        .then((response) => {
          setData(response.data)
          if (!isModalVisible) {
            navigation.navigate("Home", response.data)
          }
        })
    } else {
      axios
        .patch(`http://192.168.108.223:3002/project/Add_projects/${data._id}`, {
          title,
          Tasks: projectId,
        })
        .then((response) => navigation.navigate("Home", response.data))
        .catch((e) => console.log(e))
    }
  }

  const handleDeleteTask = (item, index) => {
    axios
      .delete(`http://192.168.108.223:3002/task/Add_task/${item._id}`)
      .then(() => {
        let taskCopy = [...task]
        taskCopy.splice(index, 1)
        setTask(taskCopy)
      })
  }

  useEffect(() => {
    if (route?.params?.data?._id) {
      const filterId = projectId.filter((el) => el === route?.params?.data?._id)
      if (filterId.length === 0) {
        setProjectId([...projectId, route.params.data._id])
      }
    }
  }, [route?.params])

  const handleCreateTask = (type) => {
    setTaskType(type)
    setIsModalVisible(false)
  }
  useEffect(() => {
    if (taskType !== "") {
      navigation.navigate(taskType, { _id: data._id, taskType: taskType })
    }
  }, [taskType])

  const handleNavigateToTask = (item) => {
    if (item?.taskType) {
      navigation.navigate(item.taskType, { item: item, _id: data._id })
    }
  }

  const handleModal = () => {
    setIsModalVisible(true)
  }
  return (
    <View style={styles.taskComponent}>
      <View style={styles.addProjectValidation}>
        <Text onPress={() => navigation.goBack()}>{backIcon}</Text>
        <Text onPress={() => handleAddProject(route?.params)}>{checkIcon}</Text>
      </View>
      {inputTitle ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.titleProject}
        >
          <TextInput
            style={styles.input}
            placeholderTextColor={"#fff"}
            placeholder={"Entrez un titre"}
            autoFocus
            value={title}
            onChangeText={(text) => setTitle(text)}
            onSubmitEditing={() => setInputTitle(false)}
            onBlur={() => setInputTitle(false)}
          />
        </KeyboardAvoidingView>
      ) : (
        <TouchableOpacity style={styles.titleProject}>
          <Text style={styles.testText} onPress={() => setInputTitle(true)}>
            {title}
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={task}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.displayTask}
            onPress={() => handleNavigateToTask(item)}
            onLongPress={() => handleDeleteTask(item, index)}
          >
            <Text style={styles.typeIcon}>
              {item.taskType === "Todolist" ? listIcon : noteIcon}
            </Text>
            <Text>{item?.title}</Text>
          </Pressable>
        )}
        keyExtractor={(_, index) => index}
      />
      <View style={styles.addTaskTypeZone}>
        <TouchableOpacity style={styles.addTaskType} onPress={handleModal}>
          <Text style={styles.plusButton}>{plusIcon}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.modalContainer}> */}
      <Modal
        visible={isModalVisible && valideProject}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => {
          setIsModalVisible(false)
        }}
      >
        <View style={styles.modalZone}>
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => handleCreateTask("Todolist")}
          >
            <Text>Todolist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => handleCreateTask("Note")}
          >
            <Text>Note</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => setIsModalVisible(false)}
            style={styles.closeModale}
          >
            <Text>Annulé</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        visible={isModalVisible && !valideProject}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => {
          setValideProject(false)
        }}
      >
        <View style={styles.modalZone}>
          <Text style={styles.modaleValidationText}>
            Voulez-vous crée votre projet ?
          </Text>
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => {
              handleAddProject(route?.params), setValideProject(true)
            }}
          >
            <Text>Oui</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              setIsModalVisible(false)
            }}
            style={styles.closeModale}
          >
            <Text>Retour</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
    // </View>
  )
}

export default Task

const styles = StyleSheet.create({
  taskComponent: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#2D2D2D",
  },

  addTaskTypeZone: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addTaskType: {
    borderRadius: 100,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#525259",
  },
  titleProject: {
    marginBottom: 20,
  },

  testText: {
    color: "#fff",
  },
  addProjectValidation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  typeIcon: {
    marginRight: 5,
  },
  title: {
    maxWidth: "80%",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  displayTask: {
    // width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 15,
    marginVertical: 7,
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    height: 50,
    fontSize: 24,
    color: "#DBDBDB",
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "grey",
    color: "#fff",
  },
  modalContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalZone: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 200,
    // height: 500,
    backgroundColor: "#3D3D3D",
    borderRadius: 20,
    // padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModale: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E1",
    borderRadius: 12,
    width: "35%",
    bottom: 30,
    height: 30,
  },
  taskButton: {
    marginVertical: 10,
    width: "50%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  modaleValidationText: {
    color: "#fff",
  },
  modalContainer: {
    height: "70%",
    width: "80%",
  },
})
