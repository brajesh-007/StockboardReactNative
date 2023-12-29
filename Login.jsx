import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity } from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Replace this with your actual authentication logic
    // For simplicity, we'll just check if the email and password match a hardcoded value
    if (email === 'user' && password === 'password') {
      // Authentication successful
      navigation.navigate('Dashboard');
      // alert('Login successful!');
      // You may also navigate to another screen or update the state accordingly
    } else {
      // Authentication failed
      setError('Invalid email or password');
    }
  };
  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button style={styles.input} title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.registerButton}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginTop:10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  registerButton: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login;
