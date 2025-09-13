import './SliderCard.scss'
import Button from "@/components/Button";
import {useContext} from "react";
import {TaskContext} from "@/pages/Todo/Todo";

const SliderCard = (props) => {
  const {
    description,
  } = props

  const { addTask } = useContext(TaskContext)

  return (
    <div className="slider-card">
      <div className="slider-card__inner">
        <div className="slider-card__description">
          <p>{description}</p>
        </div>
        <Button
          className="slider-card__button"
          backgroundColor="transparent"
          clickHandler={() => {addTask(description)}}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default SliderCard;