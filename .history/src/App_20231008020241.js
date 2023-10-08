import './App.css';
import Table from './Table';
import {Users} from "./users";
import { useState, useEffect } from 'react';
import {db} from './firebase';
import {set, ref} from "firebase/database"
import {uid} from './uid';

function App() {
  const [query, setQuery] = useState("");
  const [bro, setBro] = useState("");
  const keys = ["first_name", "last_name", "email"];

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, '/${uuid}'), {
      bro,
      uuid,
    });
  }

  const handleToChange = (e) => {
    setBro(e.target.value);
  }

  const search = (data) => {
    return data.filter((item) => 
      keys.some(key => item[key].toLowerCase().includes(query))
    )
  }

  console.log(Users.filter(user=>user.first_name.toLowerCase().includes("fe")));
  return (
    <div className="app">
      <input type="text" 
      placeholder="Search..." 
      className="search" 
      onChange={e=> setQuery(e.target.value.toLowerCase())}/>

      <input type="text" value={bro} onChange={handleToChange}></input>
      <button onClick={writeToDatabase}>submit</button>

      <Table data={search(Users)}/>
    </div>
  );
}

export default App;