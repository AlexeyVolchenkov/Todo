import './FormAddTask.scss'
import {useState} from "react";
import Input from "@/components/Input";

const FormAddTask = (props) => {
  const {
    closeModal,
    addTask,
  } = props

  const [inputTask, setInputTask] = useState('')

  const onClickHandler = (inputTask) => {
    addTask(inputTask)
    setInputTask('')
  }

  const onCloseHandler = () => {
    closeModal()
    setInputTask('')
  }

  return (
    <div>
      <form
        className="add-form"
      >
        <button
          className="add-form__modal-button-close"
          type="button"
          onClick={() => onCloseHandler()}
        >
        </button>
        <Input
          id="input-add-task"
          type="text"
          placeholder="Walk with..."
          value={inputTask}
          onChange={(value) => setInputTask(value)}
        />
        <button
          className="add-form__modal-button-add"
          type="button"
          onClick={() => onClickHandler(inputTask)}
        >Add</button>
      </form>
    </div>
  );
};

export default FormAddTask;