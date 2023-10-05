import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";


 
WebBrowser.maybeCompleteAuthSession();
 
const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
export default SignInWithOAuth;

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#DD4D44",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 20
    
    },
    text : {
        color: "#FAE9EA"
    
    }
})