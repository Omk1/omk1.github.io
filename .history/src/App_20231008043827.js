import './App.css';
import Table from './Table';
import {Users} from "./users";
import { useEffect, useState } from 'react';
import {db} from './firebase';
import {set, ref, onValue} from "firebase/database";
import {writeToDatabase, handleToChange} from './fireWrite';

function App() {
  const [query, setQuery] = useState("");
  const keys = ["title", "tag", "loc"];

  const [title, setTitle] = useState("");
  //const [tag, setTag] = useState("");
  const [time, setTime] = useState("");
  const [loc, setLoc] = useState("");

  const [titles, setTitles] = useState("");
  //const [tag, setTag] = useState("");
  const [times, setTimes] = useState("");
  const [locs, setLocs] = useState("");

  useEffect(() => {
    onValue(ref(db), snapshot =>{
      setTitles([]); setTimes([]); setLocs([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((title, time, loc) =>{
          setTitles(oldArray => [...oldArray, titles, times, locs])
        });
      }
    });
  }, [])

  const search = (data) => {
    return data.filter((item) => 
      keys.some(key => item[key] && item[key].toLowerCase().includes(query))
    )
  }

  return (
    <div className="app">
      <input type="text" 
      placeholder="Search..." 
      className="search" 
      onChange={e=> setQuery(e.target.value.toLowerCase())}/>

      {/* <input type="text" value={title} onChange={(e) => handleToChange(e, setTitle)}></input>
      <input type="text" value={time} onChange={(e) => handleToChange(e, setTime)}></input>
      <input type="text" value={loc} onChange={(e) => handleToChange(e, setLoc)}></input> */}
      <form>
        <label>Title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label>Time: </label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)}></input>
        <label>Location: </label>
        <input type="text" value={loc} onChange={(e) => setLoc(e.target.value)}></input>
        <label>Subject: </label>
        <button onClick={()=>writeToDatabase(title, time, loc, setTitle, setTime, setLoc)}>Submit</button>
      </form>
      {titles.map((title) => (
        <>
          <h1>{title.title}</h1>
        </>
      ))}
      {times.map((time) => (
        <>
          <h1>{times.times}</h1>
        </>
      ))}
      {locs.map((loc) => (
        <>
          <h1>{locs.locs}</h1>
        </>
      ))}

      <Table data={search(Users)}/>
    </div>
  );
}

export default App;