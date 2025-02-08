import { FooterProps } from '../../types/types';
import { TasksFilter } from '../TasksFilter/TasksFilter';

import './Footer.css';

export const Footer: React.FC<FooterProps> = ({
  todoListOriginal,
  onClearComplete,
  filterActive,
  filterAll,
  filterComplete,
}) => {
  const todoCount = todoListOriginal.filter((item) => !item.completed).length;
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter
        filterActive={filterActive}
        filterAll={filterAll}
        filterComplete={filterComplete}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={onClearComplete}
      >
        Clear completed
      </button>
    </footer>
  );
};
