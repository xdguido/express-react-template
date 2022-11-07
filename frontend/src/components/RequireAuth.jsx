import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

function RequireAuth() {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

// RequireAuth.propTypes = {
//     allowedRoles: PropTypes.array
// };

export default RequireAuth;
