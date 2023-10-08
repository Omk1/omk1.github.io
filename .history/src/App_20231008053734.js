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

  // const [title, setTitle] = useState("");
  // //const [tag, setTag] = useState("");
  // const [time, setTime] = useState("");
  // const [loc, setLoc] = useState("");

  
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({title:"", time:"", loc:""});

  const [titles, setTitles] = useState([]);
  //const [tag, setTag] = useState("");
  const [times, setTimes] = useState([]);
  const [locs, setLocs] = useState([]);

  useEffect(() => {
    onValue(ref(db), snapshot =>{
      setTitles([]); setTimes([]); setLocs([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((title, time, loc) => {
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
      <form>
        <label>Title: </label>
        <input type="text" value={group.title} onChange={(e) => setGroup({ ...group, title: e.target.value })}></input>
        <label>Time: </label>
        <input type="text" value={group.time} onChange={(e) => setGroup({ ...group, time: e.target.value })}></input>
        <label>Location: </label>
        <input type="text" value={group.loc} onChange={(e) => setGroup({ ...group, loc: e.target.value })}></input>
        <label>Subject: </label>
        <button onClick={()=>writeToDatabase(group, setGroup)}>Submit</button>
      </form>
      {titles.map((title) => (
        <>
          <h1>{title.title}</h1>
        </>
      ))}
      {times.map((time) => (
        <>
          <h1>{time.time}</h1>
        </>
      ))}
      {locs.map((loc) => (
        <>
          <h1>{loc.loc}</h1>
        </>
      ))}

      <Table data={search(Users)}/>
    </div>
  );
}

export default App;