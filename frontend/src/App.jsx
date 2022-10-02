import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recovery from './pages/Recovery';
import GoogleOAuth from './pages/GoogleOAuth';
import FacebookOAuth from './pages/FacebookOAuth';
import NotFound from './pages/NotFound';
import PageLayout from './pages/PageLayout';
import GithubOAuth from './pages/GithubOAuth';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<PageLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="recovery/:token" element={<Recovery />} />
                        <Route path="/google/*" element={<GoogleOAuth />} />
                        <Route path="/facebook/*" element={<FacebookOAuth />} />
                        <Route path="/github/*" element={<GithubOAuth />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
