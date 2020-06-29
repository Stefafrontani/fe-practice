import React, { useState, useEffect } from 'react';
import './stepper.css';
import { DoublyLinkedList, Node } from './../../dataStructure/DoublyLinkedList';

interface StepperProps<T> {
  list: DoublyLinkedList<T>;
  backLabel: string;
  nextLabel: string;
  endLabel: string;
  children: (currentNode: Node<T>) => JSX.Element;
  doBeforeClickBack?: (currentNode: Node<T>) => boolean;
  doAfterClickBack?: (currentNode: Node<T>) => void;
  doBeforeClickNext?: (currentNode: Node<T>) => boolean;
  doAfterClickNext?: (currentNode: Node<T>) => void;
}

function Stepper<T>(props: StepperProps<T>) {
  const {
    list,
    backLabel,
    nextLabel,
    endLabel,
    children,
    doBeforeClickBack,
    doAfterClickBack,
    doBeforeClickNext,
    doAfterClickNext,
  } = props;

  const [currentNode, setCurrentNode] = useState<Node<T>>();

  useEffect(() => {
    setCurrentNode(list.head as Node<T>);
  }, [list]);

  const handleBack = () => {
    if (
      (doBeforeClickBack && doBeforeClickBack(currentNode as Node<T>)) ||
      !doBeforeClickBack
    ) {
      setCurrentNode((node) => (node && node.previous ? node.previous : node));
      if (doAfterClickBack) {
        doAfterClickBack(currentNode as Node<T>);
      }
    }
  };

  const handleNext = () => {
    if (
      (doBeforeClickNext && doBeforeClickNext(currentNode as Node<T>)) ||
      !doBeforeClickNext
    ) {
      setCurrentNode((node) => (node && node.next ? node.next : node));
      if (doAfterClickNext) {
        doAfterClickNext(currentNode as Node<T>);
      }
    }
  };

  return (
    <div className='Stepper__container'>
      <div className='Stepper__content'>
        {currentNode && children(currentNode)}
      </div>
      <div className='Stepper__buttons'>
        <button type='button' onClick={handleBack}>
          {currentNode && currentNode.previous && backLabel}
        </button>
        <button type='button' onClick={handleNext}>
          {currentNode ? (currentNode.next ? nextLabel : endLabel) : null}
        </button>
      </div>
    </div>
  );
}

export default Stepper;
