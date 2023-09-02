import { View, StyleSheet, Text } from "react-native"


const Home = () => {
    return (
        <View style={styles.container}>
            <Text>
                Welcome to Home Page 
            </Text>
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 20,
    }
})