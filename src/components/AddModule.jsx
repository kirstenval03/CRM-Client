import React, { useState } from 'react';
import { useModuleContext } from '../context/module.context';

function AddModule({ closeModal }) {
  const { createModule } = useModuleContext();
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the createModule function from the context to create the module
    try {
      await createModule({ name: moduleName });
      closeModal(); // Close the modal after successfully creating the module
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Module</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Module Name:
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create</button>
        </form>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default AddModule;
