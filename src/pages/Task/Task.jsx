import './Task.scss'
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Header from "@/layouts/Header";

const Task = () => {
  const { id} = useParams()
  const refParentInput = useRef(null);
  const [task, setTask] = useState({})

  useEffect(() => {
    const taskFromArray = JSON.parse(localStorage.getItem('tasks')).find((task) => task.id === parseInt(id))

    setTask(taskFromArray)
  }, []);

  const editTask = () => {
    setTask({...task, editting: !task.editting})
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    const newTasks = tasks.map((taskLocalStorage) => {
      return taskLocalStorage.id === parseInt(id) ? {...taskLocalStorage, editting: !taskLocalStorage.editting, description: task.description} : taskLocalStorage
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    const input = refParentInput.current.querySelector('.task__description-input')
  }

  const checkTask = () => {
    setTask({...task, done: !task.done})
  }

  return (
    <>
      <Header />
      <div className="task container">
        <div className="task__inner">
          <h1 className="task__title">Задача №{id}</h1>
          <div className="task__status">
            <p>
              Статус: {task.done
              ? 'завершено'
              : 'в процессе'
            }
            </p>
          </div>
          <p className="task__description"
             ref={refParentInput}
          >Описание: {task.editting
            ? <Input
              className="task__description-input"
              id="input-change-value"
              value={task.description}
              type="text"
              onChange={(value) => setTask({...task, description: value})}
            />
            : task.description
          }</p>
          <div className="task__actions">
            <Button
              className="task__actions-button"
              clickHandler={editTask}
            >
              {task.editting
                ? "Сохранить"
                : "Изменить"
              }
            </Button>
            <Button
              className="task__actions-button"
              clickHandler={checkTask}
            >
              {task.done
                ? "Возобновить"
                : "Завершить"
              }
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;