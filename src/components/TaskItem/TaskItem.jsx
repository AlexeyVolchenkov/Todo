import Input from "@/components/Input";
import { BsPencil } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TaskContext} from "@/pages/Todo/Todo";

const TaskItem = (props) => {
  const {
    id,
    done,
    editting,
    description,
  } = props

  const navigate = useNavigate()
  const {
    taskList,
    setTaskList,
    removeTask,
    editTask
  } = useContext(TaskContext)

  const [edit, setEdit] = useState('')

  const onChangeCheckboxHandler = (event, id) => {
    const isChecked = event.target.checked

    setTaskList(taskList.map((task) => {
      return task.id === id ? {...task, done: isChecked}: task
    }))
  }

  const editChange = (id) => {
    setEdit(description)
    editTask(id, edit)
  }

  return (
    <>
      <div className="task-list__item-inner">
        <label htmlFor={`checkbox-id-${id}`}>
          <input
            type="checkbox"
            className="task-list__checkbox"
            id={`checkbox-id-${id}`}
            onChange={() => onChangeCheckboxHandler(event, id)}
            checked={done}
          />
        </label>
        {editting
          ? <label htmlFor={`input-id-${id}`}>
            <Input
              id={`input-id-${id}`}
              type="text"
              placeholder="Walk with..."
              value={edit}
              onChange={(value) => setEdit(value)}
            />
          </label>
          : (<p
            onDoubleClick={() => editChange(id)}
            className="task-list__item-description"
          >
            {description}
          </p>)}
      </div>
      <div className="task-list__actions">
        <button className="task-list__button-detail" onClick={() => navigate(`/todo/${id}`)}>
          <IoEyeOutline className="task-list__button-detail-icon"/>
        </button>
        {editting
          ? <button className="task-list__button-confirm" onClick={() => editChange(id)}>Сохранить</button>
          : <button className="task-list__button-update" onClick={() => editChange(id)}>
            <BsPencil
              className="task-list__button-update-icon"
            />
          </button>
        }
        <button className="task-list__button-remove" onClick={() => removeTask(id)}></button>
      </div>
    </>
  );
};

export default TaskItem;