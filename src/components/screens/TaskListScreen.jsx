import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskListScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);

  //loading tasks from AsyncStorage
  const loadTasks = async () => {
    const tasksJson = await AsyncStorage.getItem('tasks');
    const loadedTasks = tasksJson ? JSON.parse(tasksJson) : [];
    setTasks(loadedTasks);
  };

  // Ensures task list updates every time we open this screen
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  //Editing text in a task list
  const updateTaskText = async (id, newText) => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return {...task, text: newText};
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error during updating text in the task: ', error);
    }
  };

  //Deleting a task from our TaskList
  const deleteTask = async taskId => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error during deleting: ', error);
    }
  };

  //checking or unchecking task in a task list
  const toggleTaskCompletion = async taskId => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      let tasks = tasksJson ? JSON.parse(tasksJson) : [];
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return {...task, completed: !task.completed};
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error during changing status of the task: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskContainer}>
            <CheckBox
              value={task.completed}
              onValueChange={() => toggleTaskCompletion(task.id)}
            />
            <TextInput
              value={task.text}
              onChangeText={newText => updateTaskText(task.id, newText)}
              style={{
                textDecorationLine: task.completed ? 'line-through' : 'none',
                ...styles.textInput,
              }}
            />

            <TouchableOpacity
              onPress={() => deleteTask(task.id)}
              style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask')}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007bff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
  deleteButton: {
    width: 25,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default TaskListScreen;
