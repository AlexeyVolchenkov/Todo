import './TaskList.scss'
import TaskItem from "@/components/TaskItem";

const TaskList = (props) => {
  const {
    tasks,
  } = props

  return (
    <>
      {tasks?.length > 0 ? (
        <ul className="task-list">
        {tasks.map(({ id, done, editting, description }) => (
          <li key={id} className="task-list__item">
            <TaskItem
              id={id}
              done={done}
              editting={editting}
              description={description}
            />
          </li>
        ))}
      </ul>
      )
      : <h1 className="task-list__output">Tasks list is empty</h1>
      }
    </>

  );
};

export default TaskList;