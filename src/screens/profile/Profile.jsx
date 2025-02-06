import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {storage} from '../../store/store';

const Profile = () => {
  const signOut = () => {
    storage.delete('token');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Log Out</Text>
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
  },
  button: {
    marginTop: 16,
    width: '100%',
    height: 50,
    backgroundColor: '#DC2626',
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

export default Profile;