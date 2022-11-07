import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Recovery from './pages/Auth/Recovery';
import HandleOAuth from './pages/Auth/OAuthHandler';
import PageLayout from './components/PageLayout';
import RequireAuth from './components/RequireAuth';
import RemindMeLogin from './components/RemindMeLogin';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<PageLayout />}>
                        {/* public routes  */}
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="recovery/:token" element={<Recovery />} />
                        <Route path=":provider/*" element={<HandleOAuth />} />
                        <Route path="*" element={<NotFound />} />
                        {/* private routes  */}
                        <Route element={<RemindMeLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route index element={<Dashboard />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
