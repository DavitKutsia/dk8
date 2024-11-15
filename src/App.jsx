import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// Global styles applied to the entire app
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  body {
    max-width: 100%;
    height: calc(100dvh - 40px);
    margin: 20px auto;
    padding: 20px;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    box-shadow: 0 8px 16px ${(props) => props.theme.shadow};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
  }
`;

// Light and dark theme definitions
const lightTheme = {
  background: 'linear-gradient(135deg, #f9f9f9, #e6eaf1)',
  color: 'gray',
  taskBackground: 'white',
  buttonBackground: 'blue',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
  background: 'linear-gradient(135deg, #2c2c2c, #1e1e1e)',
  color: 'black',
  taskBackground: 'white',
  buttonBackground: 'blue',
  shadow: 'rgba(255, 255, 255, 0.1)',
};

// Styled components for buttons, input, and tasks
const HeaderButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px ${(props) => props.theme.shadow};
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.05);
  }
`;

// Button for toggling themes
const ChangeButton = styled.button`
  width: 700px;
  height: 70px;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 22px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: white;
  border: none;
  border-radius: 22px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px ${(props) => props.theme.shadow};
  transition: background-color 0.3s ease, transform 0.2s;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.01);
  }
`;

// Input field for adding tasks
const Input = styled.input`
  width: 90%;
  height: 60px;
  padding: 12px;
  font-size: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: inset 0 2px 4px ${(props) => props.theme.shadow};
  outline: none;
  &:focus {
    border-color: #aaa;
    box-shadow: inset 0 2px 6px ${(props) => props.theme.shadow};
  }
`;

// Button for adding tasks
const AddButton = styled(HeaderButton)`
  width: 500px;
  height: 50px;
  font-size: 16px;
  padding: 12px;
  margin-top: 20px;
`;

// List container for tasks
const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// Individual task item
const TaskItem = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: ${(props) => props.theme.taskBackground};
  border-radius: 12px;
  box-shadow: 0 2px 4px ${(props) => props.theme.shadow};
  margin-bottom: 8px;
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  &:hover {
    transform: scale(1.005);
  }
`;

// Delete button for removing tasks
const DeleteButton = styled(HeaderButton)`
  background-color: #dc3545;
  padding: 6px 14px;
  font-size: 14px;
  box-shadow: 0 2px 6px ${(props) => props.theme.shadow};
  &:hover {
    background-color: #c82333;
  }
`;

function App() {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [input, setInput] = useState(''); // State to track input field
  const [theme, setTheme] = useState(lightTheme); // State to manage theme

  // Function to add a task
  const handleAddTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  // Function to delete a task
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Function to toggle task completion
  const handleToggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {/* Theme toggle button */}
      <ChangeButton onClick={() => setTheme(theme === lightTheme ? darkTheme : lightTheme)}>
        Toggle Theme
      </ChangeButton>
      <br />

      {/* Input field for new tasks */}
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <br />

      {/* Button to add a task */}
      <AddButton onClick={handleAddTask}>Add</AddButton>

      {/* List of tasks */}
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index} completed={task.completed}>
            {/* Clicking task toggles completion */}
            <span onClick={() => handleToggleComplete(index)}>{task.text}</span>

            {/* Delete button for the task */}
            <DeleteButton onClick={() => handleDeleteTask(index)}>Delete</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </ThemeProvider>
  );
}

export default App;
