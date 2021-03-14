import { size } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import {useNavigation} from "@react-navigation/native"


import { validateEmail } from "../../utils/helpers";
import {registerUser} from "../../utils/actions"
import Loading from "../Loading";



export default function RegisterForm() {
 
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultsFormValue());
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirm, setErrorConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
    
  };

  const registeUser = async() =>{
    if(!validateData()){
         return;
    }
    setLoading(true)
    const result = await registerUser(formData.email, formData.password)
    setLoading(false)
    if(!result.statusResponse){
      setErrorEmail(result.error)
      return;
    }

    navigation.navigate("account")
  }

  const validateData = () =>{
       setErrorConfirm("")
       setErrorEmail("")
       setErrorPassword("")

       let isValid = true

       if(!validateEmail(formData.email)){
          setErrorEmail("Debes de ingresar un email válido.")
          isValid = false
       }
    
       if(size(formData.password) < 6){
         setErrorPassword("Debes ingresar una contraseña de almenos 6 caráteres.")
         isValid = false
       }

       if(size(formData.confirm) < 6){
        setErrorConfirm("Debes ingresar una confirmación de contraseña de almenos 6 caráteres.")
        isValid = false
      }

      if(formData.password !== formData.confirm){
        setErrorConfirm("La contraseña y la confimación no son iguales.")
        setErrorPassword("La contraseña y la confimación no son iguales.")
        isValid = false
      }

       return isValid;
  }

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email..."
        keyboardType= "email-address"
        onChange={(e) => onChange(e, "email")}
        errorMessage = {errorEmail}
        defaultValue ={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage = {errorPassword}
        defaultValue ={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            inconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        placeholder="Confirma tu contraseña..."
        password={true}
        onChange={(e) => onChange(e, "confirm")}
        secureTextEntry={!showPassword}
        errorMessage = {errorConfirm}
        defaultValue ={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            inconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Registrar Nuevo Usuario"
        buttonStyle={styles.button}
        containerStyle={styles.btnContainer}
        onPress={() => registeUser()}
      />
      <Loading isVisible={loading} text="Creando cuenta..."/>
    </View>
  );
}

const defaultsFormValue = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  button: {
    backgroundColor: "#442484",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
  },
  icon: {
    color: "#c1c1c1",
  },
});
