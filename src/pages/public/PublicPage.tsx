import { Outlet } from "react-router-dom";
import Banner from "../../components/root/Banner";
import Footer from "../../components/root/Footer";
import HomePage from "../../components/root/Navbar";
import IconBox from "../../components/root/IconBox";



const PublicPage = () => {
    return (
        <div>
            <HomePage/>
            <Banner/>
            <IconBox/>
            <Footer/>
            <Outlet />
        </div>
    );
};

export default PublicPage;