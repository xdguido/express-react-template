import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recovery from './pages/Recovery';

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/google/:code" element={<GoogleOauth />}></Route>
                        <Route path="/recovery/:token" element={<Recovery />}></Route>
                        <Route path="*" element={<Login />}></Route>
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
