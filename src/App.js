import React from "react";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories',{
      title: `Novo repository ${Date.now()}`,
      owner: "Edson",
      techs: ["C++", "Java"]
    });

    const repo = response.data;

    setRepos([ ... repos, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const newRepos = repos.filter(repo => repo.id !== id);

    setRepos(newRepos);
  }

  async function handleLikeRepository(id) {
    // TODO
    const response = await api.post(`/repositories/${id}/like`);

    const newRepo = repos.map(repo => {
      if(repo.id === id) return response.data;
      return repo;
    })

    setRepos(newRepo);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repos.map(repo => 
          <li key={repo.id}>
            <h1>{repo.title}</h1>
            <br></br>
            <ul>
              {repo.techs.map(tech => 
                <li key={tech}>{tech}</li>
              )}  
            </ul>
            {repo.likes} curtidas
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            <button onClick={() => handleLikeRepository(repo.id)}>Curtir</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
