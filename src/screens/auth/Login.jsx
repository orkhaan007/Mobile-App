import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import Input from './components/Input';
import {useMMKVString} from 'react-native-mmkv';
import Alien from "../../../Assets/icons/alien.svg";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useMMKVString('token');

  const login = async () => {
    try {
      const response = await fetch(
        'http://185.233.181.166:5001/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Alien/>
      
      <Text style={styles.title}>Login</Text>

      <Input
        name="email"
        setFormData={setFormData}
        value={formData?.email}
        placeholder="Enter email"
      />

      <Input
        name="password"
        setFormData={setFormData}
        value={formData?.password}
        placeholder="Enter password"
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 32,
    fontFamily: "Montserrat-Italic"
  },
  button: {
    marginTop: 16,
    width: '100%',
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#111827',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});

export default Login;