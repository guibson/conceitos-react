import React, { useState, useEffect } from 'react';

import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepo] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepo(response.data);
    });
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const data = {
      title: 'Repository',
      url: 'github',
      techs: ['node.js', 'python'],
    };
    const response = await api.post('repositories', data);
    const repository = response.data;
    setRepo([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);
    setRepo(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
