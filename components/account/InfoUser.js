import React, { useState } from 'react'
import { Alert } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateProfile, uploadImage } from '../../utils/actions';
import { loadImageFromGallery } from '../../utils/helpers';

export default function InfoUser({user, setLoading, setLoadingText}) {
     const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async() =>{
        const result = await loadImageFromGallery([1, 1])
        if(!result.status){
            return
        }

        setLoadingText("Actualizando imagen...")
        setLoading(true)

        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if(!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil")
        return
        }

        const resulUpdateProfile = await updateProfile({ photoURL: resultUploadImage.url})
        setLoading(false)

        if(resulUpdateProfile.statusResponse){
             setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil")
        }

    }

    return (
        <View style= {styles.container}>
            <Avatar 
               rounded
               size="large"
               onPress = {changePhoto}
               containerStyle={styles.avatar}
               source={
                   user.photoURL ? {uri: photoUrl} : require("../../assets/avatar-default.jpg")
               }
             />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anónimo"
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})
