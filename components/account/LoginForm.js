import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { loginWithEmailAndPassword } from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";
import Loading from "../Loading";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultsFormValue());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doLogin = async()=>{
    if(!validateData()){
        return;
   }

   setLoading(true)
   const result = await loginWithEmailAndPassword(formData.email, formData.password)
   setLoading(false)
   if(!result.statusResponse){
     setErrorEmail(result.error)
     setErrorPassword(result.error)
     return;
   }

   navigation.navigate("account")
   
  }


  const validateData = () =>{
    setErrorEmail("")
    setErrorPassword("")

    let isValid = true

    if(!validateEmail(formData.email)){
       setErrorEmail("Debes de ingresar un email válido.")
       isValid = false
    }

    if(isEmpty(formData.password)){
        setErrorPassword("Debes de ingresar tu contraseña.")
        isValid = false
    }
    return isValid;
}

  return (
    <View styles={styles.container}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email..."
        keyboardType="email-address"
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
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
        title="Iniciar Sesión"
        buttonStyle={styles.button}
        containerStyle={styles.btnContainer}
        onPress={() => doLogin()}
      />
      <Loading isVisible={loading} text="Iniciando Sesión..." />
    </View>
  );
}

const defaultsFormValue = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
