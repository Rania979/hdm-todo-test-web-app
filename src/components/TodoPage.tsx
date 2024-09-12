/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [updatedTasks, setUpdatedTasks] = useState<number[]>([]);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
    setUpdatedTasks(updatedTasks.filter((el) => el !== id));
  };

  const handleChange = (id: number, name: string) => {
    setTasks(
      tasks.map((taskEl) => {
        if (taskEl.id === id) {
          return ({ ...taskEl, name });
        }
        return taskEl;
      }),
    );

    if (!updatedTasks.includes(id)) updatedTasks.push(id);
  };

  const handleSave = async (task: Task | null) => {
    if (task) {
      const updated = await api.patch(`/tasks/${task.id}`, {
        name: task.name,
        id: task.id,
      });

      setUpdatedTasks(updatedTasks.filter((el) => el !== task.id));

      return setTasks(
        tasks.map((taskEl) => {
          if (taskEl.id === updated.id) {
            return updated;
          }

          return taskEl;
        }),
      );
    }

    const created = await api.post('/tasks', {
      name: `DRAFT-${new Date().toISOString()}`,
      id: null,
    });

    return setTasks([ ...tasks, created ]);
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              onChange={(event) => handleChange(task.id, event.target.value)}
            />
            <Box>
              <IconButton
                color="success"
                disabled={!updatedTasks.includes(task.id)}
                onClick={() => {
                  handleSave(task);
                }}
              >
                <Check />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  handleDelete(task.id as number);
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              handleSave(null);
            }}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
