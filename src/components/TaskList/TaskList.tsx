import { Task } from '../Task/Task';
import type { TaskListProps } from '../../types/types';
import './TaskList.css';

export const TaskList: React.FC<TaskListProps> = ({
  todoList,
  onDeletedTask,
  onStatusClick,
  onChangeTask,
  changeTask,
  onTimerOn,
  onTimerOff,
}) => {
  const taskParse = todoList.map(
    ({ id, name, completed, change, min, sec }) => {
      return (
        <Task
          key={id}
          id={id}
          name={name}
          onDeletedTask={() => onDeletedTask(id)}
          onStatusClick={() => onStatusClick(id)}
          completed={completed}
          change={change}
          onChangeTask={() => onChangeTask(id)}
          changeTask={changeTask}
          min={min}
          sec={sec}
          onTimerOn={() => onTimerOn(id)}
          onTimerOff={() => onTimerOff(id)}
        />
      );
    },
  );
  return <ul className="todo-list">{taskParse}</ul>;
};
