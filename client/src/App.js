import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import PostsList from './Components/PostsList/PostsList';
import Onepost from './Components/OnePost/OnePost';
import NewPost from './Components/NewPost/NewPost';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/posts' element={<PostsList />} />
        <Route path='/new' element={<NewPost />} />
        <Route path='/posts/:idPost' element={<Onepost />} />
      </Routes>
    </div>
  );
}

export default App;
