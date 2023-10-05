import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SignInScreen from './SignInScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpScreen from './SignUpScreen'
import SignInWithOAuth from './SignInWithOAuth'

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState('sign-in')
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => setActiveTab('sign-in')}>
          <Text style={[styles.text, {color: activeTab === 'sign-in' ? 'royalblue' : 'grey'}]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('sign-up')}>
          <Text style={[styles.text, {color: activeTab === 'sign-up' ? 'royalblue' : 'grey'}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {
        activeTab === 'sign-in' ? <SignInScreen /> : <SignUpScreen />
      }
      <View style={styles.authView}>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    touchContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
    },
    authView: {
      padding: 30,
      borderRadius: 5,
    }
})