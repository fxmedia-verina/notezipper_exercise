import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import MyNotes from './screens/MyNotes/MyNotes';
import CreateNote from './screens/DisplayNote/CreateNote';
import SingleNote from './screens/DisplayNote/SingleNote';
import { BrowserRouter, Route } from "react-router-dom";
import { useState } from 'react';
import ProfilePage from './screens/ProfilePage/ProfilePage';

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter> 
      <Header setSearch={setSearch}/>
      <main>
        <Route path='/' exact component={() => <LandingPage />}/>
        <Route path='/login' component={() => <LoginPage />}/>
        <Route path='/profile' component={() => <ProfilePage />}/>
        <Route path='/register' component={() => <RegisterPage />}/>
        <Route path='/mynotes' component={() => <MyNotes search={search} />}/>
        <Route path='/note/:id' component={() => <SingleNote />}/>
        <Route path='/createnote' component={() => <CreateNote />}/>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
