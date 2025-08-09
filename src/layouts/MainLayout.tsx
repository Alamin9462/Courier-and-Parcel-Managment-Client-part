 import { Outlet } from "react-router-dom";



const MainLayout = () => {
    return (
        <div>
            {/* Main content area */}          
            <Outlet />
        </div>
    );
};

export default MainLayout;