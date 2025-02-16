import { useState } from 'react';
import './NewTaskForm.css';
import { NewTaskFormProps } from '../../types/types';

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ addTaskInput }) => {
  const [label, setLabel] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit(e);
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    let min = minutes;
    let sec = seconds;
    if (min === '' && sec === '') {
      min = '30';
      sec = '0';
    }
    if (isNaN(parseInt(sec)) || isNaN(parseInt(min))) return;
    if (!label.trim()) return;

    addTaskInput(label, parseInt(min), parseInt(sec));
    setLabel('');
    setMinutes('');
    setSeconds('');
  };
  const inputError = (time: string) => {
    if (time.trim() === '') return;
    if (isNaN(parseInt(time.trim()))) {
      return 'error';
    }
  };
  return (
    <form className="new-todo-form" onSubmit={(e) => onSubmit(e)}>
      <input
        name="label"
        className={`new-todo ${label.trim() ? ' ' : 'error'} `}
        placeholder="Task"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        name="minutes"
        className={`new-todo-form__timer ${inputError(minutes)}`}
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Min"
        onKeyDown={handleKeyDown}
      />
      <input
        name="seconds"
        className={`new-todo-form__timer ${inputError(seconds)}`}
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        placeholder="Sec"
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};
