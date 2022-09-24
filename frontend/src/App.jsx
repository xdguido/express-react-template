import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recovery from './pages/Recovery';
import GoogleOauth from './pages/GoogleOauth';
import NotFound from './pages/NotFound';
import PageLayout from './pages/PageLayout';

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
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/google/*" element={<GoogleOauth />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
