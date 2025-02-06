import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import UserCard from './components/UserCard';

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Todos')}>
          <Text style={styles.buttonText}>Go to Todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={() => <Text style={styles.title}>Users</Text>}
        contentContainerStyle={styles.listContainer}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserCard user={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Found</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    gap: 20,
    paddingTop: 80,
    paddingBottom: 25,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
  },
});

export default Users;