import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const UserDetails = () => {
  const route = useRoute();
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        <Text style={styles.userAddress}>
          {user.address.street}, {user.address.city}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EFEFEF',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  userEmail: {
    fontSize: 18,
    color: '#444',
    marginBottom: 8,
  },
  userPhone: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  userAddress: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default UserDetails;