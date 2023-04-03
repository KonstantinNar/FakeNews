import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { PostList } from '../PostList/PostList';
import './App.css';
import { api } from '../../utils/api';
import { useEffect, useState } from 'react';


function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [post, setPost] = useState([])
  const [refresh, setRefresh] = useState(false)

  const hendleSetPost = (postData) => {
    api.setPost(postData)
  }

  const hendleDeletePost = (id) => {
    api.deletePost(id).then(() => {
      setRefresh(!refresh)
    })
  }

  const hendelChangeLike = (item) => {
    const isLiked = item.likes.some((id) => id === currentUser._id)
    api.changeLike(item._id, !isLiked).then((postData) => {
      const newPost = post.map((p) => {
        return p._id === postData._id ? postData : p
      })
      setPost(newPost)
    })
  }

  useEffect(() => {
    Promise.all([api.getPosts(), api.getUserInfo()]).then(([postsData, userData]) => {
      setPost(postsData)
      setCurrentUser(userData)
    })
  }, [refresh])

  return (
    <>
      <Header userInfo={currentUser} hendleSetPost={hendleSetPost} />
      <PostList post={post} hendleDeletePost={hendleDeletePost} userInfo={currentUser} hendelChangeLike={hendelChangeLike} />
      <Footer />
    </>
  )
}

export default App;
