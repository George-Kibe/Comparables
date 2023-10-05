import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '../Themed'
import { useUserContext } from '../../context/UserContext';
import generateReferralCode from '../../utils/generateReferralCode';


const SetupProfileScreen = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const { authUser, password, setDbUser } = useUserContext();
  const clerkUserId = authUser.id;
  const email = authUser.primaryEmailAddress.emailAddress
  const referralCode = generateReferralCode();

  const saveProfile = async() => {
    // save the user data to a custom database
    const body = { username:name, bio:about, email, password, clerkUserId, referralCode };
    console.log("Body: ", body)
    try {
      const response = await fetch("https://realhive.vercel.app/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      });

      if (response.status === 201) {
        // refresh state to reflect DB user
        try {
          const response = await fetch(`https://realhive.vercel.app/api/users/${email}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
          },
          );
        const userData = await response.json();
        setDbUser(userData)
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Setup Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={3}
        textAlignVertical='top'
        placeholder="e.g. I am a valuer..."
        value={about}
        onChangeText={setAbout}
      />
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text>{'Save'}</Text>      
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default SetupProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        width:"100%",
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
    backgroundColor: "royalblue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    },
})