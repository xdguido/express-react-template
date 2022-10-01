import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function PageLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default PageLayout;
