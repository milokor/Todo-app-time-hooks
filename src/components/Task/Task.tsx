import { useEffect, useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';
import type { TaskProps } from '../../types/types';
export const Task: React.FC<TaskProps> = ({
  name,
  id,
  onDeletedTask,
  onStatusClick,
  completed,
  change,
  onChangeTask,
  changeTask,
  min,
  sec,
  onTimerOn,
  onTimerOff,
}) => {
  const [label, setLabel] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLabel(name);
  }, [name]);

  const handleEscPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && change) {
      onChangeTask(id);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      change &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      onChangeTask(id);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onChangeTaskEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (label.trim()) {
      changeTask(label);
      setLabel(name);
    }
  };

  const statusTask = completed ? 'completed' : change ? 'editing' : '';

  return (
    <li className={statusTask} id={id.toString()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onStatusClick(id)}
        />
        <label>
          <span className="title" onClick={() => onStatusClick(id)}>
            {name}
          </span>
          <span className="description">
            <button
              type="button"
              className="icon icon-play"
              onClick={() => onTimerOn(id)}
            ></button>
            <button
              className="icon icon-pause"
              type="button"
              onClick={() => onTimerOff(id)}
            ></button>
            {min}:{sec}
          </span>
          <span className="description">
            {formatDistanceToNow(new Date(), { includeSeconds: true })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={() => onChangeTask(id)} />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => onDeletedTask(id)}
        />
      </div>

      {change && (
        <form onSubmit={onChangeTaskEvent}>
          <input
            type="text"
            className="edit"
            value={label}
            onChange={onNewTaskChange}
            ref={inputRef}
            onKeyDown={(e) => handleEscPress(e)}
          />
        </form>
      )}
    </li>
  );
};
