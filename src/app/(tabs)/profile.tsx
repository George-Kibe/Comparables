import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useUserContext } from '../../context/UserContext';

export default function ProfileScreen() {
  const {authuser, dbUser} = useUserContext();
  // console.log(" DB User: ", dbUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dbUser.user.email}</Text>
      <Text style={styles.title}>{dbUser.user.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
