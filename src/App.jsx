
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MembersList from './Pages/MembersList'
import History from './Pages/History'



function App() {
 

  return (
    <>
    <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/history' element={<History/>}/>
      <Route  path='/memberList' element={<MembersList/>} />
     </Routes>
     <Footer/>
    </>
  )
}

export default App
