import React, { useEffect } from 'react'
import './App.css'; 
 
import { useRoutes,useLocation } from 'react-router-dom'; 

import { routers, onRouteBefore } from './router'
import { transformRoutes, setRouteBefore } from './router/RouterGuard/fn'

function App() {    
  setRouteBefore(onRouteBefore)
  console.log(useLocation().pathname)  
  const elements = useRoutes(transformRoutes(routers)) 
  return elements
} 


export default App;
