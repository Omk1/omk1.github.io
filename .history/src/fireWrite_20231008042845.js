import {uid} from "uid";
import {db} from './firebase';
import {set, ref} from "firebase/database"
import { useState, useEffect } from 'react';
import {bro, setBro} from './App'

export const writeToDatabase = (titleVal, timeVal, locVal, setTitle, setTime, setLoc) => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      title: titleVal, 
      time: timeVal, 
      loc: locVal,
      uuid,
    });

    setTitle(""); setTime(""); setLoc("");
}


export const handleToChange = (e, setBro) => {
    setBro(e.target.value);
}
