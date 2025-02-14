import React from 'react'
import Routing from './Utils/Routing';
import Navbars from './Components/Navbar/Navbars';
function App() {
  return (
    <div className='bg-[#0C0C0C] w-full overflow-hidden'>
      <Navbars/>
      <Routing/>
    </div>
  )
}

export default App