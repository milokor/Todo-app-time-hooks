export interface TodoList {
  name: string;
  id: number;
  completed: boolean;
  change: boolean;
  min: number;
  sec: number;
  timer: boolean;
  flagInterval: boolean;
}
export interface TaskListProps {
  todoList: TodoList[];
  onDeletedTask: (id: number) => void;
  onStatusClick: (id: number) => void;
  onChangeTask: (id: number) => void;
  changeTask: (label: string) => void;
  onTimerOn: (id: number) => void;
  onTimerOff: (id: number) => void;
}
export interface TaskProps {
  name: string;
  id: number;
  completed: boolean;
  change: boolean;
  key?: number;
  min: number;
  sec: number;
  onTimerOn: (id: number) => void;
  onTimerOff: (id: number) => void;
  onStatusClick: (id: number) => void;
  onChangeTask: (id: number) => void;
  onDeletedTask: (id: number) => void;
  changeTask: (label: string) => void;
}
export interface NewTaskFormProps {
  addTaskInput: (label: string, min: number, sec: number) => void;
}

export interface FooterProps {
  todoListOriginal: TodoList[];
  onClearComplete: () => void;
  filterActive: () => void;
  filterAll: () => void;
  filterComplete: () => void;
}

export interface TasksFilterProps {
  filterActive: () => void;
  filterAll: () => void;
  filterComplete: () => void;
}
