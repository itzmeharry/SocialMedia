import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './Context/DataContext'

const Home = () => {
  const {searchResults, fetchError, isLoding } = useContext(DataContext);
  return (
<main className='Home'>
  {isLoding && <p className='statusMsg'>Loding Posts......</p>}
  {!isLoding && fetchError && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
  {!isLoding && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className='statusMsg'>No posts to dispaly</p>)}
  </main>
  )
}

export default Home
