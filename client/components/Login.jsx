import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token)
    } catch (err) {
      console.log(err)
    }
  }
  const saveIDUser = async (IDUser) => {
    try {
      await AsyncStorage.setItem("IDUser", IDUser)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogUser = () => {
    axios
      .post("http://192.168.108.223:3002/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.idUser)
        saveToken(response.data.token)
        saveIDUser(response.data.idUser)
        navigation.navigate("Home", { idUser: response.data.idUser })
      })
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
      />
      <TextInput
        value={password}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry={true}
      />

      <Pressable style={styles.SubmitButton} onPress={handleLogUser}>
        <Text>Conexion</Text>
      </Pressable>
      <Text
        onPress={() => navigation.navigate("Register")}
        style={styles.navigation}
      >
        Tu veux te créer un compte ?
      </Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
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
  navigation: {
    color: "white",
  },
})
