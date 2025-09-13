import './Slider.scss';
import SliderCard from "@/components/SliderCard";
import {useEffect, useRef, useState} from "react";

const Slider = () => {
  const sliderRef = useRef(null)
  const [sliderIndex, setSliderIndex] = useState(0)
  const columnGap = 20;

  useEffect(() => {
    sliderRef.current.style.translate = `${sliderIndex * 100 / 3}%`
  }, [sliderIndex]);

  const translateSlider = (action) => {
    console.log(action)
    action === "+"
      ? setSliderIndex(sliderIndex - 1)
      : setSliderIndex(sliderIndex + 1)
  }

  return (
    <div className="slider">
      <div
        className="slider__inner"
        ref={sliderRef}
        style={{
        }}
      >
        <SliderCard
          description="1"
        />
        <SliderCard
          description="2"
        />
        <SliderCard
          description="3"
        />
        <SliderCard
          description="4"
        />
        <SliderCard
          description="5"
        />
      </div>
      <button onClick={() => translateSlider('-')}>Влево</button>
      <button onClick={() => translateSlider('+')}>Вправо</button>
    </div>
  );
};

export default Slider;