import React, { useState, useEffect } from 'react';
import './stepper.css';

interface StepperProps<T> {
  source: Array<T>;
  backLabel: string;
  nextLabel: string;
  endLabel: string;
  children: (current: T) => JSX.Element;
  doBeforeClickBack?: (current: T) => boolean;
  doAfterClickBack?: (current: T, isFirst: boolean) => void;
  doBeforeClickNext?: (current: T) => boolean;
  doAfterClickNext?: (current: T, isLast: boolean) => void;
  className?: string;
}

function Stepper<T>(props: StepperProps<T>) {
  const {
    source,
    backLabel,
    nextLabel,
    endLabel,
    children,
    doBeforeClickBack,
    doAfterClickBack,
    doBeforeClickNext,
    doAfterClickNext,
    className,
  } = props;

  const [elements, setElements] = useState<Array<T>>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setElements(source);
    setIndex(0);
  }, [source]);

  const updateSetIndex = (
    beforeClick: any,
    afterClick: any,
    calculateIndex: (currentIndex: number) => number,
    isEdge: (currentIndex: number) => boolean
  ) => {
    if (!beforeClick || beforeClick(elements[index])) {
      setIndex((currentIndex) => {
        const newIndex = calculateIndex(currentIndex);
        if (afterClick) {
          setTimeout(() => {
            afterClick(elements[newIndex], isEdge(currentIndex));
          }, 0);
        }
        return newIndex;
      });
    }
  };

  const handleBack = () => {
    updateSetIndex(
      doBeforeClickBack,
      doAfterClickBack,
      (currentIndex) => (!currentIndex ? 0 : --currentIndex),
      (currentIndex) => !--currentIndex
    );
  };

  const handleNext = () => {
    updateSetIndex(
      doBeforeClickNext,
      doAfterClickNext,
      (currentIndex) =>
        currentIndex + 1 < elements.length ? ++currentIndex : currentIndex,
      (currentIndex) => currentIndex + 1 === elements.length
    );
  };

  return (
    <div className={`Stepper__container ${className}`}>
      <div className="Stepper__content">
        {!!elements.length && children(elements[index])}
      </div>
      <div className="Stepper__buttons">
        {!!index && (
          <button type="button" onClick={handleBack}>
            {backLabel}
          </button>
        )}
        {index < elements.length && (
          <button type="button" onClick={handleNext}>
            {index + 1 === elements.length ? endLabel : nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default Stepper;
