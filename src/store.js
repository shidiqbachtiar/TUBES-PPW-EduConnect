import { useState, useEffect } from 'react';
import { initialNews, initialUsers, initialTasks } from './data/mockData';
const KEY='educonnect_demo_v2';
const seededUsers=[{id:'admin',name:'Administrator',username:'admin',password:'admin123',role:'admin',className:'Admin Sekolah'},...initialUsers.map((u,i)=>({...u,username:u.name.toLowerCase().replace(/\s+/g,'.'),password:u.role==='Guru'?'guru123':'murid123',role:u.role.toLowerCase()}))];
const seed={users:seededUsers,news:initialNews,tasks:initialTasks.map(t=>({...t,status:'Belum dikumpulkan',grade:'',teacher:'Budi Santoso'})),submissions:[],attendance:[]};
export function readStore(){try{const raw=localStorage.getItem(KEY);if(raw)return JSON.parse(raw)}catch{} return seed}
export function writeStore(data){localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new Event('educonnect-change'))}
export function useStore(){const [data,setData]=useState(()=>readStore());useEffect(()=>{const update=()=>setData(readStore());window.addEventListener('educonnect-change',update);window.addEventListener('storage',update);return()=>{window.removeEventListener('educonnect-change',update);window.removeEventListener('storage',update)}},[]);const mutate=(fn)=>{const next=readStore();fn(next);writeStore(next)};return [data,mutate]}
export function resetStore(){localStorage.removeItem(KEY);writeStore(seed)}
