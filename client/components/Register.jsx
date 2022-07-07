import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import axios from "axios"

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleAddUser = () => {
    axios
      .post("http://192.168.108.223:3002/auth/create_users", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        setRegisterError(response.data.message)
      })
      .catch((err) => console.log(err))
  }
  return (
    <View style={styles.registernPage}>
      <Text>Register</Text>

      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.input}
        placeholder="Prénom"
      />
      <TextInput
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.input}
        placeholder="Nom"
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="mot de passe"
        secureTextEntry={true}
      />

      <Text>{registerError}</Text>

      <Pressable style={styles.SubmitButton} onPress={handleAddUser}>
        <Text>Inscription</Text>
      </Pressable>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  registernPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "grey",
    height: 50,
    width: "50%",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  SubmitButton: {
    width: "50%",
    height: 50,
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
})
