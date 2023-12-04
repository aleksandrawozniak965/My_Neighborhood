import WelcomePage from "./views/WelcomePage.jsx";
import SignIn from "./views/SignIn.jsx";
import SignUp from "./views/SignUp.jsx";
import MainPage from "./components/MainPage.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {useEffect, useState} from "react";


function App() {
    const [token, setToken] = useState(false);

    if (token){
        sessionStorage.setItem('token', JSON.stringify(token))
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')){
            let data = JSON.parse(sessionStorage.getItem('token'))
            setToken(data);
        }
    }, []);

  return (
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signin" element={<SignIn setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
              { token ? <Route path="/mainpage" element={<MainPage />} /> : "" }
            <Route path="/noticeboard" element={<NoticeBoard />} />
          </Routes>
        </Router>
  )
}

export default App;
