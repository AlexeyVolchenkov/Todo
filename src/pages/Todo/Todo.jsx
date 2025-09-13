import './Todo.scss'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext
} from "react";
import plusSvg from '../../assets/icons/plus.svg'
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import TaskList from "../../components/TaskList";
import FormAddTask from "../../components/FormAddTask";
import {ThemeContext} from "@/App";
import Slider from "@/components/Slider";

export const TaskContext = createContext(null)


const Todo = () => {

  let sortedTasksList = []

  const { theme, switchTheme } = useContext(ThemeContext)

  const modalAddTask = useRef(null)
  const refInputTask = useRef(null);

  const [selectedSort, setSelectedSort] = useState('')
  const [searchSort, setSearchSort] = useState('')
  const [idTask, setIdTask] = useState(1)
  const [taskList, setTaskList] = useState(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks && tasks?.length > 0) {
      tasks.map((task) => ({...task, editting: false}))
      setIdTask(tasks[tasks.length - 1].id + 1)
      return tasks.map((task) => ({...task, editting: false}))
    }

    return []
  })

  const selectOptions= [
    {
      id: 1,
      value: "",
      name: "Все",
    },
    {
      id: 2,
      value: "description",
      name: "По названию",
    },
  ]

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList))
  }, [taskList]);

  const editTask = (taskId, edit) => {
    setTaskList(taskList.map((task) => {
      if (taskId === task.id) {
        return {...task, editting: !task.editting, description: edit}
      }
      return task
    }))
  }

  const removeTask = (taskId) => {
    setTaskList(taskList.filter((task) => task.id !== taskId))
  }

  const sortTasks = (sort) => {
    setSelectedSort(sort)
  }

  sortedTasksList = useMemo(() => {
    if (selectedSort) {
      return [...taskList].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return taskList
  }, [selectedSort, taskList]);

  sortedTasksList = useMemo(() => {
    return sortedTasksList?.filter(({ description }) => description.includes(searchSort))
  }, [searchSort, sortedTasksList]);

  const openModalAddTask = () => {
    modalAddTask.current.showModal()
    refInputTask.current.focus()
  }

  const closeModal = () => {
    modalAddTask.current.close()
  }

  const propagationCloseModal = (event) => {
    if (event.target === modalAddTask.current) {
      modalAddTask.current.close()
    }
  }

  const addTask = (newTask) => {
    const addItem = {
      id: idTask,
      description: newTask,
      done: false,
      editting: false,
    }
    setIdTask(idTask + 1)
    setTaskList([...taskList, addItem])
    closeModal()
  }

  return (
    <div className="todo container">
      <div className="todo__inner">
        <h1 className="todo__title">Todo list</h1>
        <div className="todo__actions">
          <Input
            id="search"
            placeholder="Найдите задачу..."
            value={searchSort}
            onChange={setSearchSort}
            type="text"
            icon="find"
          />
          <Select
            id="select-filter"
            options={selectOptions}
            value={selectedSort}
            onChange={sortTasks}
          />
          <Button
            clickHandler={switchTheme}
            backgroundColor="dark-blue"
          >
            {theme.toLowerCase() === 'light' ? (<span>Dark</span>) : (<span>Light</span>)}
          </Button>
        </div>
        <TaskContext.Provider value={{ taskList, setTaskList, removeTask, editTask, addTask }}>
          <TaskList
            tasks={sortedTasksList}
          />
          {/*<Slider />*/}
        </TaskContext.Provider>
      </div>
      <button
        className="todo__add-button"
        onClick={openModalAddTask}
      >
        <img
          src={plusSvg}
          alt="plus"
          width={44}
          height={44}
        />
      </button>
      <dialog
        className="todo__modal"
        ref={modalAddTask}
        onClick={() => propagationCloseModal(event)}
      >
        <FormAddTask
          closeModal={closeModal}
          addTask={addTask}
          ref={refInputTask}
        />
      </dialog>
    </div>
  );
};

export default Todo;