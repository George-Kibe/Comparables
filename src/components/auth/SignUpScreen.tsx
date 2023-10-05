import * as React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
 
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={{width: "100%"}}>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
              style={styles.registerInput}
            />
          </View>
 
          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.registerInput}
            />
          </View>
 
          <TouchableOpacity onPress={onSignUpPress} style={styles.registerButton} >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View style={{width: "80%"}}>
            <Text style={{fontSize:16, marginBottom:20}}>
                Please check your email for the verification code.
            </Text>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
              style={styles.verifyInput}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} style={styles.verifyButton}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      justifyContent:'center',
      alignItems:'center', 
      padding:30
    },
    registerInput: {
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
    },
    registerButton: {
      backgroundColor: "royalblue",
      padding: 10,
      borderRadius: 5,
      width: "100%",
      marginBottom: 10,
    },
    verifyInput: {
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
    },
    verifyButton: {
      backgroundColor: "royalblue",
      padding: 10,
      borderRadius: 5,
      width: "100%",
      marginBottom: 10,
    }
})