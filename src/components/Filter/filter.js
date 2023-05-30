import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function DataFilter({ filterOption, setFilterOption, setDataRange }) {
<<<<<<< HEAD
    const handleFilterOptionChange = (option) => {
      setFilterOption(option);
    };
  
    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" data-testid="dropdown-toggle">
        </Dropdown.Toggle>
        <Dropdown.Menu variant='dark'>
          <Dropdown.Item
            href="#/action-1"
            active={filterOption === 'realtime'}
            onClick={() => handleFilterOptionChange('realtime')}
          >
            Real time
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            href="#/action-2"
            active={filterOption === 'daily'}
            onClick={() => handleFilterOptionChange('daily')}
          >
            Daily
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            active={filterOption === 'weekly'}
            onClick={() => handleFilterOptionChange('weekly')}
          >
            Weekly
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-4"
            active={filterOption === 'monthly'}
            onClick={() => handleFilterOptionChange('monthly')}
          >
            Monthly
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
=======
  const handleFilterOptionChange = (option) => {
    setFilterOption(option);
    setDataRange(getInitialDataRange(option));
  };

  const getInitialDataRange = (filterOption) => {
    if (filterOption === 'realtime') {
      return 10;
    } else if (filterOption === 'daily') {
      return 24;
    } else if (filterOption === 'weekly') {
      return 168;
    }

    return 10; // Default to 10 if filterOption is not recognized
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        {filterOption}
      </Dropdown.Toggle>
      <Dropdown.Menu variant='dark'>
        <Dropdown.Item
          href="#/action-1"
          active={filterOption === 'realtime'}
          onClick={() => handleFilterOptionChange('realtime')}
        >
          Real time
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="#/action-2"
          active={filterOption === 'daily'}
          onClick={() => handleFilterOptionChange('daily')}
        >
          Daily
        </Dropdown.Item>
        <Dropdown.Item
          href="#/action-3"
          active={filterOption === 'weekly'}
          onClick={() => handleFilterOptionChange('weekly')}
        >
          Weekly
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
>>>>>>> main
