import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogUser = () => {
    axios
      .post("http://192.168.108.223:3002/auth/login", {
        email,
        password,
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err))
  }
  return (
    <View style={styles.loginPage}>
      <Text>Login</Text>

      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        // onSubmitEditing={handleSubmitEditting}
        // onBlur={handleSubmitEditting}
      />
      <TextInput
        value={password}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry={true}
        // onSubmitEditing={handleSubmitEditting}
        // onBlur={handleSubmitEditting}
      />

      <Pressable style={styles.SubmitButton} onPress={handleLogUser}>
        <Text>Conexion</Text>
      </Pressable>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginPage: {
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
