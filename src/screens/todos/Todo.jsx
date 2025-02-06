import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../auth/components/Input';

const Todo = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const API_URL = 'http://185.233.181.166:5002/cards';

  const getTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (response.ok) {
        getTodos();
        setTodo({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async id => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>

      <Input
        name="title"
        setFormData={setTodo}
        value={todo?.title}
        placeholder="Enter title"
      />

      <Input
        name="description"
        setFormData={setTodo}
        value={todo?.description}
        placeholder="Enter description"
      />

      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <FlatList
        ListHeaderComponent={() => <Text style={styles.subtitle}>Todos</Text>}
        contentContainerStyle={styles.listContainer}
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.todoCard}>
            <View style={styles.todoTextContainer}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item._id)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    alignSelf: 'center',
    paddingTop: 32,
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1E3A8A',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 18,
    paddingBottom: 24,
  },
  todoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1E293B',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  todoDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#991B1B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default Todo;