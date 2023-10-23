import React, { useContext } from 'react'
import DataContext from './Context/DataContext'

const NewPost = () => {
  const {handleSubmit, postTitle, setPostTitle, postBody, setPostBody}= useContext(DataContext)
  return (
    <main className='NewPost'>
      <h3>New Post</h3>
      <form action="" className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTile" >Title:</label>
        <input type="text"
        id='postTitle'
        required
        value={postTitle}
        onChange={(e) => setPostTitle (e.target.value)} />
        <br />
        <label htmlFor="postBody">Post:</label>
        <textarea id="postBody" 
        required
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}>
        </textarea>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost