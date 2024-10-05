import React, { useState } from 'react';
import Modal from './Modal';

export default function Filters({ open, onClose, onSelect,dataFilter  }) {
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [selectedGlass, setSelectedGlass] = useState('any');



  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSelectGlass = (event) => {
    setSelectedGlass(event.target.value);
  };

  const handleSubmit = () => {
    onSelect(selectedCategory, selectedGlass);
    onClose();
  };

  return (
    <Modal open={open} className="filters">
      <h2>Filters</h2>
      
     

      <h3>choose category:</h3>
      <form>
          <div>
              <label>
                      <input
                            type="radio"
                            name="category"
                            value="any"
                            checked={selectedCategory === 'any'}
                            onChange={handleSelectCategory}
                      />
                    Any
            </label>
        </div>
        {dataFilter.category.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="category"
                value={option}
                checked={selectedCategory === option}
                onChange={handleSelectCategory}
              />
              {option}
            </label>
          </div>
        ))}
       
       <h3>choose glass:</h3>
       <div>
            <label>
                  <input
                        type="radio"
                        name="glass"
                        value="any"
                        checked={selectedGlass === 'any'}
                        onChange={handleSelectGlass}
                  />
                  Any
              </label>
      </div>
        {dataFilter.glass.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="glass"
                value={option}
                checked={selectedGlass === option}
                onChange={handleSelectGlass}
              />
              {option}
            </label>
          </div>
        ))}




        <button type="button" onClick={handleSubmit} disabled={!selectedCategory || !selectedGlass}>
          Submit
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </Modal>
  );
}


