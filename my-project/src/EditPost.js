import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from './Context/DataContext';

const EditPost = () => {
    const {posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody} = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString()===id);
    useEffect(()=>{
        if (post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    },[post, setEditTitle, setEditBody])
  return (
     <main className=''>
        <article className='editpost'>
        {editTitle &&
        <>
        <h3>Edit Post</h3>
        <form action="" className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text" className='postDate'
            id='postTitle'
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}/>
            <br />
            <label htmlFor="postBody">Post:</label>
            <textarea name="postBody" id="postBody" className='postBody'
            required
            value={editBody}
            onChange={(e) =>setEditBody(e.target.value)}></textarea>
             <br />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
        </form>
        </>}
        </article>
     </main>
  )
}

export default EditPost