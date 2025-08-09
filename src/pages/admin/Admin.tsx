import AdminCard from "../../components/admin-sidebar/AdminCard";
import RecentParcels from "../../components/admin-sidebar/RecentParcels";
import WelcomeSection from "../../components/admin-sidebar/WelcomeSection";

const Admin = () => {
  return (
    <div>
      <WelcomeSection />
      <AdminCard />
      <RecentParcels />
    </div>
  );
};

export default Admin;
