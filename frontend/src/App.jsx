import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ShowBook from './pages/ShowBook'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import Delete from './pages/Delete'

const App = () =>
{
  return (
    // <div className='bg-red-400 text-white'>App</div>
    <Routes>
      <Route path ='/' element = {<Home />} />
      <Route path ='/books/create' element = {<CreateBook />} />
      <Route path ='/books/details/:id' element = {<ShowBook />} />
      <Route path ='/books/edit/:id' element = {<EditBook />} />
      <Route path ='/books/delete/:id' element = {<Delete />} />
    </Routes>
  )
}

export default App