import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { PostList } from '../PostList/PostList';
import data from "../../data/post.json"
import './App.css';


function App() {
  return (
    <>
      <Header />
      <PostList post={data} />
      <Footer />
    </>
  )
}

export default App;
