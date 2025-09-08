import './Todo.scss'
import plusSvg from '../../assets/icons/plus.svg'
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import {useEffect, useMemo, useRef, useState} from "react";
import TaskList from "../../components/TaskList";
import FormAddTask from "../../components/FormAddTask";


const Todo = (props) => {
  const {
    theme,
    setTheme,
  } = props

  let sortedTasksList = []

  const modalAddTask = useRef(null)
  const [selectedSort, setSelectedSort] = useState('')
  const [searchSort, setSearchSort] = useState('')
  const [edit, setEdit] = useState('')
  const [taskList, setTaskList] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks'))
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

  const editTask = (taskId) => {
    setTaskList(taskList.map((task) => {
      if (taskId === task.id) {
        setEdit(task.description)
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
  }

  const closeModal = () => {
    modalAddTask.current.close()
  }

  const addTask = (newTask) => {
    if (taskList) {
      const addItem = {
        id: taskList.length + 1,
        description: newTask,
        done: false,
        editting: false,
      }

      setTaskList([...taskList, addItem])
    } else {
      const addItem = {
        id: 0,
        description: newTask,
        done: false,
        editting: false,
      }

      setTaskList([addItem])
    }
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
          />
          <Select
            id="select-filter"
            options={selectOptions}
            value={selectedSort}
            onChange={sortTasks}
          />
          <Button
            setTheme={setTheme}
          >
            {theme.toLowerCase() === 'light' ? (<span>Dark</span>) : (<span>Light</span>)}
          </Button>
        </div>
          <TaskList
            tasks={sortedTasksList}
            setTaskList={setTaskList}
            remove={removeTask}
            edit={edit}
            setEdit={setEdit}
            editSwitch={editTask}
          />
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
      >
        <FormAddTask
          closeModal={closeModal}
          addTask={addTask}
        />
      </dialog>
    </div>
  );
};

export default Todo;