import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"

const ProjectCard = ({ item, index, handleDeletCard, handleSelectedCard }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => handleDeletCard(item, index)}
      onPress={() => {
        handleSelectedCard(item)
      }}
    >
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{`${item.title}`}</Text>
        <Text style={styles.cardText}>Info sur le contenu</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    // vert
    // backgroundColor: "#F0FFF0",
    // marron claire
    // backgroundColor: "#E6C8B9",
    backgroundColor: "#525259",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    // Marron
    // color: "#422D09",
    color: "#fff",
    marginBottom: 10,
  },
  cardText: {
    // Marron
    // color: "#422D09",
    color: "#fff",
  },
})

export default ProjectCard
