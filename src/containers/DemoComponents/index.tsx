import React from 'react';
import './demo.css';
import Stepper from '../../components/Stepper';

const DemoComponents: React.FC = () => {
  const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  const handleBeforeClickBack = (value: string) => {
    return value === 'F' ? false : true;
  };

  const handleAfterClickBack = (value: string, isFirst: boolean) => {
    console.log('doAfterClickBack', value, isFirst);
  };

  const handleAfterClickNext = (value: string, isLast: boolean) => {
    console.log('doAfterClickNext', value, isLast);
  };

  return (
    <Stepper<string>
      source={alphabet}
      backLabel="Go back"
      nextLabel="Go next"
      endLabel="Finish"
      doBeforeClickBack={handleBeforeClickBack}
      doAfterClickBack={handleAfterClickBack}
      doAfterClickNext={handleAfterClickNext}
      className="Stepper"
    >
      {(value) => (
        <div>
          <h1>The letter is: {value}</h1>
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
