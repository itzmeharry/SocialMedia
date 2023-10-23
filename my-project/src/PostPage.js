import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from './Context/DataContext';


const PostPage = () => {
  const {posts, handledelete} = useContext(DataContext)
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className='PostPage'>
       <article className='deletepost'>
        {post && 
        <>
        <h3>{post.title}</h3>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <Link to={`/edit/${post.id}`}>
        <button className="editbutton">Edit Post</button>
        </Link>
        <button className="deletebutton" onClick={()=> handledelete(post.id)}>Delete Post</button>
        </>}

        {!post &&
        <>
        <h3>Post Not Found</h3>
        <p>Well, that's disappointing</p>
        <p>
          <Link to="/">Vist Our Homepage</Link>
        </p>
        </>
        }

       </article>
    </main>
  )
}

export default PostPage