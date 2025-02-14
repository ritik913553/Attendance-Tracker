import React from 'react'
import Routing from './Utils/Routing';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className=' w-full relative h-full'>
      <Routing/>
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  )
}

export default App