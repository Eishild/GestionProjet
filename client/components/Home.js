import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useIsFocused, useFocusEffect } from "@react-navigation/native"

//PERMET LA COMMUNICATION AVEC LE BDD
import axios from "axios"

// IMPORT DES COMPOSANTS
import ProjectCard from "./ProjectCard"

//IMPORT DES ICONS
import Icon from "react-native-vector-icons/AntDesign"
const myIcon = <Icon name="plus" size={30} color="#DBDBDB" />

// PERMET D'AVOIR LES DIMENSIONS(largeur) DE L'HARDWARE
const width = Dimensions.get("window").width
// NOMBRE DE COLONE POUR L'AFFICHAGE
const numColumns = 2

// DEBUT DU COMPOSANT DE LA PAGE HOME AVEC TOUT LES PROJETS
const Home = ({ navigation, route }) => {
  //STATE AVEC LA LISTE DES PROJETS
  const [project, setProject] = useState([])

  //RECUPERER LES DONNEES DE LA BDD AVEC UNE METHODE GET

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get("http://192.168.108.223:3002/project/Home")
        .then((response) => {
          const data = response.data
          setProject(data)
        })
        .catch((e) => console.log(e))
    }, [])
  )

  // FONCTION QUI PERMET DE NAVIGUER ET PASSER LES DONNEES VERS ET AU COMPOSANT TASK
  const handleAddproject = (item) => {
    navigation.navigate("Task", item)
  }

  //FUNCTION QUI PERMET DE SUPPRIMER UN PROJET
  const handleDeletproject = (item, index) => {
    const idProject = item._id
    axios
      .delete(`http://192.168.108.223:3002/project/Home/${idProject}`)
      .then(() => {
        // console.log(response.data)
        let projectCopy = [...project]
        projectCopy.splice(index, 1)
        setProject(projectCopy)
      })
      .catch((e) => console.log(e))
  }

  const handleSelectedCard = (item) => {
    handleAddproject(item)
  }

  return (
    <View style={styles.cardComponent}>
      <FlatList
        data={project}
        numColumns={2}
        columnWrapperStyle={2}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer} key={index}>
            <ProjectCard
              item={item}
              index={index}
              handleDeletCard={handleDeletproject}
              handleSelectedCard={handleSelectedCard}
            />
          </View>
        )}
        keyExtractor={(_, index) => index}
      />
      <TouchableOpacity
        style={styles.addCard}
        onPress={() => handleAddproject({ title: "Titre", tasks: [] })}
      >
        <Text style={styles.plusButton}>{myIcon}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  cardComponent: {
    flex: 1,
    // marron claire
    // backgroundColor: "#F1E4D3",
    backgroundColor: "#2D2D2D",
  },

  cardContainer: {
    flex: 1,
    height: width / numColumns,
  },
  addCard: {
    position: "absolute",
    bottom: 20,
    right: 20,
    // borderWidth: 1,
    borderRadius: 100,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#525259",
  },
})

export default Home
