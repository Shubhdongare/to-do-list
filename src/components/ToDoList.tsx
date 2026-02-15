import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


const TodoList =  ({ darkMode, setDarkMode }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((data: Todo[]) => setTodos(data));
  }, []);

  const [newTodo, setNewTodo] = useState("");

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const newItem: Todo = {
      userId: 1,
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos((prev) => [newItem, ...prev]);
    setNewTodo("");
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

 return (
  <Container maxWidth="sm" sx={{ mt: 5 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography variant="h4">Todo App</Typography>
      <IconButton onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Stack>

    <Stack direction="row" spacing={2} mb={2}>
      <TextField
        fullWidth
        label="Add new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddTodo} disabled={!newTodo.trim()}>
        Add
      </Button>
    </Stack>

    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={(_, value) => value && setFilter(value)}
      sx={{ mb: 2 }}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
      <ToggleButton value="pending">Pending</ToggleButton>
    </ToggleButtonGroup>

    <List>
      {filteredTodos.length === 0 ? (
  <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
    No todos found.
  </Typography>
) : (
      filteredTodos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <ListItemText
            primary={todo.title}
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          />
        </ListItem>
      ))
    )}
    </List>
  </Container>
);

};

export default TodoList;
