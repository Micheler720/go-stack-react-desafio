import React, { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories]= useState([]);
  useEffect(()=>{
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Teste',
      url: 'www.teste.com.br',
      techs: 'ashdaksdfaks'
    });
    const repositorie = response.data;
    setRepositories([...repositories, repositorie ]);
  }

  async function handleRemoveRepository(id) {
    const indexRepositorie = repositories.findIndex( repositorie => repositorie.id === id);
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204){
      let newRepositories = repositories;
      newRepositories.splice(indexRepositorie,1);
      setRepositories([ ...newRepositories ]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( item => {
          return(
            <li key={item.id}>         
              {item.title}
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          )
        } )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
