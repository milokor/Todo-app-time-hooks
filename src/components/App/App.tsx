import { useEffect, useState } from 'react';
import './App.css';
import { TaskList } from '../TaskList/TaskList';
import { Footer } from '../Footer/Footer';
import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import type { TodoList } from '../../types/types';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [todoListOriginal, setTodoListOriginal] = useState<TodoList[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [idTaskEdit, setIdTaskEdit] = useState<number | null>(0);
  const [intervalActive, setIntervalActive] = useState<ReturnType<
    typeof setInterval
  > | null>();

  const filterList = (list: TodoList[] = []) => {
    if (filter === 'active') return list.filter((task) => !task.completed);
    if (filter === 'completed') return list.filter((task) => task.completed);
    return list;
  };

  const onDeletedTask = (id: number = 0): void => {
    const updatedList = todoListOriginal.filter((task) => task.id !== id);
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
  };

  const onStatusClick = (id: number = 0): void => {
    const updatedList = todoListOriginal.map((task: TodoList) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
  };

  const addTaskInput = (
    label: string,
    minutes: number,
    seconds: number,
  ): void => {
    let min = minutes;
    let sec = seconds;
    if (seconds > 59) {
      min += Math.floor(seconds / 60);
      sec = seconds % 60;
    }
    const id = Math.floor(Math.random() * 9999);
    const newTask = {
      name: label,
      id,
      completed: false,
      change: false,
      min: min,
      sec: sec,
      timer: false,
      flagInterval: false,
    };
    const updatedList = [...todoListOriginal, newTask];
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
  };

  const onClearComplete = (): void => {
    const updatedList = todoListOriginal.filter((task) => !task.completed);
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
  };

  const filterActive = () => {
    const updatedFilterActive = todoListOriginal.filter(
      (task) => !task.completed,
    );
    setTodoList(updatedFilterActive);
    setFilter('active');
  };

  const filterComplete = () => {
    const updatedFilterComplete = todoListOriginal.filter(
      (task) => task.completed,
    );
    setTodoList(updatedFilterComplete);
    setFilter('completed');
  };

  const filterAll = () => {
    setTodoList([...todoListOriginal]);
    setFilter('all');
  };

  const onChangeTask = (id: number = 0): void => {
    const updatedList = todoListOriginal.map((task) =>
      task.id === id ? { ...task, change: !task.change } : task,
    );
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
    setIdTaskEdit(id);
  };

  const changeTask = (label: string = ''): void => {
    const updatedListName = todoListOriginal.map((task) =>
      idTaskEdit === task.id
        ? { ...task, name: label, change: !task.change }
        : task,
    );
    setTodoList(filterList(updatedListName));
    setTodoListOriginal(updatedListName);
    setIdTaskEdit(null);
  };

  const onTimerOn = (id: number = 0) => {
    if (intervalActive) {
      clearInterval(intervalActive);
      setIntervalActive(null);
    }

    const updatedList = todoListOriginal.map((task) =>
      task.id === id
        ? { ...task, timer: !task.timer, flagInterval: false }
        : task,
    );
    setTodoListOriginal(updatedList);
    setTodoList(filterList(updatedList));

    const targetTask = updatedList.find((task) => task.id === id);

    if (
      targetTask &&
      targetTask.timer &&
      !targetTask.flagInterval &&
      !targetTask.completed &&
      !targetTask.change
    ) {
      const intervalId = setInterval(() => {
        setTodoListOriginal((prevList) => {
          const updatedList = prevList.map((task) => {
            if (task.id === id) {
              if (task.sec > 0) {
                return { ...task, sec: task.sec - 1, flagInterval: true };
              } else if (task.min > 0) {
                return {
                  ...task,
                  sec: 59,
                  min: task.min - 1,
                  flagInterval: true,
                };
              } else {
                clearInterval(intervalId);
                return { ...task, timer: false, flagInterval: false };
              }
            }
            return task;
          });

          setTodoList(filterList(updatedList));
          return updatedList;
        });
      }, 1000);

      setIntervalActive(intervalId);
    }
  };
  useEffect(() => {
    return () => {
      if (intervalActive) {
        clearInterval(intervalActive);
      }
    };
  }, []);

  const onTimerOff = (id: number) => {
    if (intervalActive) {
      clearInterval(intervalActive);
      setIntervalActive(null);
    }
    const updatedList = todoListOriginal.map((task) =>
      task.id === id
        ? { ...task, timer: !task.timer, flagInterval: false }
        : task,
    );
    setTodoList(filterList(updatedList));
    setTodoListOriginal(updatedList);
    setIntervalActive(null);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTaskInput={addTaskInput} />
      </header>
      <section className="main">
        <TaskList
          onDeletedTask={onDeletedTask}
          todoList={todoList}
          onStatusClick={onStatusClick}
          onChangeTask={onChangeTask}
          changeTask={changeTask}
          onTimerOn={onTimerOn}
          onTimerOff={onTimerOff}
        />
        <Footer
          todoListOriginal={todoListOriginal}
          onClearComplete={onClearComplete}
          filterAll={filterAll}
          filterComplete={filterComplete}
          filterActive={filterActive}
        />
      </section>
    </section>
  );
};
