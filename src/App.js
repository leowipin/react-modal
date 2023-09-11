import './App.css';
import IconModal from './IconModal';
import React, { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleOpenModal}>Subir imagen</button>
      </header>

      {isModalOpen && <IconModal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
