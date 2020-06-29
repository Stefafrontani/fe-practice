import React from 'react';
import Stepper from '../../components/Stepper';
import { DoublyLinkedList, Node } from '../../dataStructure/DoublyLinkedList';

const DemoComponents: React.FC = () => {
  const list = new DoublyLinkedList<string>();
  list.push('A');
  list.push('B');
  list.push('C');
  list.push('D');
  list.push('F');
  list.push('G');
  list.push('H');
  list.push('I');

  const handleBeforeClickBack = (currentNode: Node<string>) => {
    console.log('doBeforeClickBack example');
    return currentNode.value === 'F' ? false : true;
  };

  const handleAfterClickBack = () => {
    console.log('doAfterClickBack example');
  };

  const handleAfterClickNext = (currentNode: Node<string>) => {
    if (!currentNode.next) {
      console.log('This is the last');
    }
  };

  return (
    <Stepper<string>
      list={list}
      backLabel='Go back'
      nextLabel='Go next'
      endLabel='Finish'
      doBeforeClickBack={handleBeforeClickBack}
      doAfterClickBack={handleAfterClickBack}
      doAfterClickNext={handleAfterClickNext}
    >
      {(currentNode) => (
        <div>
          <h1>The letter is: {currentNode.value}</h1>
          <p>This is an example</p>
          <p>You can create your own way to display your info</p>
          <br />
          <p>Note: You can't go back if the letter is F</p>
        </div>
      )}
    </Stepper>
  );
};

export default DemoComponents;
