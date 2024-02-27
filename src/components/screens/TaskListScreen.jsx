import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TaskList = ({navigation}) => {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Task 1', completed: false},
    {id: 2, text: 'Task 2', completed: true},
  ]);

  const deleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskText = (id, newText) => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return {...task, text: newText};
        }
        return task;
      }),
    );
  };

  const toggleTaskCompletion = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
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
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
  },
});

export default TaskList;
