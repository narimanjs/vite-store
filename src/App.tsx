/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
  const [counter, setCounter] = useState();

  const addCounter = (e: MouseEvent) => {
    console.log(e);
  };
  return (
    <>
      <Button onClick={addCounter}>Button</Button>
      <Button
        appearence='big'
        onClick={addCounter}
      >
        Button
      </Button>
      <Input placeholder='Email' />
    </>
  );
}
export default App;
