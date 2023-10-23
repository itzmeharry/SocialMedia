import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const PostLayout = () => {
  return (
    // inge irundhu vera page ah access panna <> Fragment ah use pondrom
    <>
        <Link to='/PostPage/1'>Post 1</Link><br />
        <Link to='/PostPage/2'>Post 2</Link><br />
        <Link to='/PostPage/3'>Post 3</Link><br />
        <Link to='/PostPage/NewPost'>NewPost</Link>  
        {/* indha outlet ah use pannanum, pannala na current ah enga irukum nu kamikathu, endha path la irukum nu kamikadhu */}
        <Outlet />
        </>

        )
}

export default PostLayout