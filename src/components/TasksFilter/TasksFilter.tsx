import { useState } from 'react';
import './TasksFilter.css';
import { TasksFilterProps } from '../../types/types';

export const TasksFilter: React.FC<TasksFilterProps> = ({
  filterActive,
  filterAll,
  filterComplete,
}) => {
  const [activeButton, setActiveButton] = useState<string>('All');

  const onClickSelected = (buttonId: string = '') => {
    setActiveButton(buttonId);
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeButton === 'All' ? 'selected' : ''}
          onClick={() => {
            filterAll();
            onClickSelected('All');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButton === 'Active' ? 'selected' : ''}
          onClick={() => {
            filterActive();
            onClickSelected('Active');
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButton === 'Completed' ? 'selected' : ''}
          onClick={() => {
            filterComplete();
            onClickSelected('Completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
