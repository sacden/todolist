import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({navigation}) => {
  const [text, setText] = useState('');

  const handleAddTask = async taskText => {
    const newTask = {
      id: Date.now(), // Generating unique ID
      text: taskText,
      completed: false,
    };

    try {
      // Getting task list
      const tasksJson = await AsyncStorage.getItem('tasks');
      const tasks = tasksJson ? JSON.parse(tasksJson) : [];

      // Add new task
      tasks.push(newTask);

      // Saving updated task list
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      // Back to previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error during adding a task: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Enter task"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => handleAddTask(text)}
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
  input: {
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
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
});

export default AddTaskScreen;
