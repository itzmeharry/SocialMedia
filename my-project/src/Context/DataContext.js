import { createContext } from "react";
import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import api from "../api/posts";
import useWindoeSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts,setPosts] = useState([])
    const [search, setSearch] =useState('')
    const [searchResults,setSearchResults]=useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody] =useState('')
    const navigate = useNavigate();
    const [editTitle,setEditTitle]=useState('')
    const [editBody,setEditBody] =useState('')
    const {width} = useWindoeSize();
    // useAxiosFetch hook ah ipdi dhan use pannanum
    const { data, fetchError, isLoding} = useAxiosFetch('http://localhost:3500/posts');
  
  
    // useEffect(()=>{
    //   const fetchPosts =async () => {
    //     try{
    //       const response = await api.get('/posts');
    //       setPosts(response.data);
    //     }catch(err){
    //       if(err.response){
    //         //Not in the 200 response range
    //       }else{
    //         console.log(`Error : ${err.response}`);
    //       }           
    //     }
    //   }
    //   fetchPosts();
    // }, [])
  
  useEffect(() =>{
    setPosts(data);
  },[data])
  
    useEffect(() => {
      const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toUpperCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    }, [posts, search])
    
  
  
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const id = posts.length ? posts [posts.length -1].id + 1 :1;
      const datetime =format(new Date(), 'MMMM dd, yyyy pp');
      try{
      const newPost = {id , title: postTitle, datetime , body: postBody};
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts, response.data];
      setPostBody('');
      setPosts(allPosts);
      setPostTitle('');
      navigate('/')
      }catch(err){
          console.log(`Error : ${err.response}`);        
      }
    }
  
  const handleEdit = async (id) =>{
    const datetime =format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id , title: editTitle, datetime , body: editBody};
    try{
       const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/')
    }catch(err){
      console.log(`Error : ${err.response}`);       
    }
  }
  
  
  const handledelete = async(id) =>{
    try{
      await api.delete(`posts/${id}`)
    const postsList = posts.filter(post => post.id !== id);
     setPosts(postsList);
    //  navigate hoohs ah use panni home page ku pogavekuran
     navigate('/')
    }catch(err){
  
    }
  }
    return (
        <DataContext.Provider value={{
         width,
         search, setSearch,
         searchResults, fetchError, isLoding,
         handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
         posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody,
         handledelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;