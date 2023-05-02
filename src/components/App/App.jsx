import './App.css';
import { PostList } from '../PostList/PostList';
import { api } from '../../utils/api';
import { useEffect, useState } from 'react';
import { OpenPost } from '../OpenPost/OpenPost';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { PostContext } from '../../context/PostContext';
import { UserContext } from '../../context/UserContext';
import { NotFound } from '../NotFound/NotFound';
import { Layout } from '../Layout/Layout';
import { Sider } from '../Sider/Sider';
import { UserInfo } from '../userPage/UserInfo/UserInfo';
import { UserAvatar } from '../userPage/UserAvatar/UserAvatar';
import { UserAbout } from '../userPage/UserAbout/UserAbout';
import { NotAuth } from '../NotAuth/NotAuth';
import { Signin } from '../AuthModal/Signin/Signin';
import { Signup } from '../AuthModal/Signup/Signup';
import { ResetPassword } from '../AuthModal/ResetPassword/ResetPassword';
import { ResetPasswordToken } from '../AuthModal/ResetPasswordToken/ResetPasswordToken';

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({})
  const [authModalActive, setAuthModalActive] = useState(false)
  const [authorization, setAuthorization] = useState(false)
  const navigate = useNavigate()

  const dayjs = require('dayjs')

  const handleSetPost = (postData) => {
    api.setPost(postData).then((setPost) => {
      posts.splice(0, 0, setPost)
      setPosts([...posts])
      return
    })
  }

  const handleChangeLike = (item,) => {
    const isLiked = item.likes.some((id) => id === currentUser._id)
    api.changeLike(item._id, !isLiked).then((postData) => {
      const newPost = posts.map((p) => {
        return p._id === postData._id ? postData : p
      })
      setPosts([...newPost])
      setPost(postData)
    })
  }

  const handleDeletePost = (id) => {
    api.deletePost(id).then((deletePost) => {
      posts.forEach((item, index) => {
        if (item._id === deletePost._id) {
          posts.splice(index, 1)
          return
        }
      })
      setPosts([...posts])
    })
  }

  const setSort = (data) => {
    // eslint-disable-next-line default-case
    switch (data) {
      case 'Популярные': {
        const newPosts = posts.sort((a, b) => b.likes.length - a.likes.length)
        return setPosts([...newPosts])
      }

      case 'Новинки': {
        const newPosts = posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        return setPosts([...newPosts])
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setAuthorization(true)
    }
  }, [navigate])

  useEffect(() => {
    console.log(authorization);
    Promise.all([api.getPosts(), api.getUserInfo()]).then(([postsData, userData]) => {
      setPosts(postsData)
      setCurrentUser(userData)
    })
  }, [authorization])

  const postContext = { posts, setPosts, handleDeletePost, handleChangeLike, handleSetPost, setSort, dayjs }
  const userContext = { userInfo: currentUser, setUserInfo: setCurrentUser, authModalActive, setAuthModalActive, setAuthorization, authorization }

  return (
    <div className="app">
      <UserContext.Provider value={userContext}>
        <PostContext.Provider value={postContext}>
          {authorization ?
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='user' element={<Sider />}>
                  <Route path='user-info' element={<UserInfo />} />
                  <Route path='avatar' element={<UserAvatar />} />
                  <Route path='about' element={<UserAbout />} />
                </Route>
                <Route index element={<PostList posts={posts} />} >
                </Route>
                <Route path='post/:PostId' element={<OpenPost post={post} setPost={setPost} />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
            :
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<NotAuth setAuthModalActive={setAuthModalActive} />} >
                  <Route path='authorization' element={
                    <Signin setAuthModalActive={setAuthModalActive} />
                  } />
                  <Route path='register' element={
                    <Signup setAuthModalActive={setAuthModalActive} />
                  } />
                  <Route path='reset-password' element={
                    <ResetPassword setAuthModalActive={setAuthModalActive} />
                  } />
                  <Route path='reset-password-token' element={
                    <ResetPasswordToken setAuthModalActive={setAuthModalActive} />
                  } />
                </Route>
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>}
        </PostContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App;
