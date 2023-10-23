import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import EditPost from './EditPost';
import { DataProvider } from './Context/DataContext';

function App() {
  return (
    <div className="wrapper">
    <DataProvider>
        <Header title='HDTube SocialMedia World'/>
        <Nav />

        <Routes>
          <Route path='/' element={<Home />} />
      
          <Route path='Post'>
            <Route index element={<NewPost />} />

          <Route path=':id' element={<PostPage />}/>
          </Route>
        
          <Route path='/edit/:id' element={<EditPost />}/>

        <Route path='About' element ={<About />} />
        <Route path='*' element ={<Missing />} />
      
        </Routes>

        <Footer/>
    </DataProvider>
  </div>
  );
}

export default App;
