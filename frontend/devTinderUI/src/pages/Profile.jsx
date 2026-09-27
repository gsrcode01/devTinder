import { useSelector } from "react-redux";
import TopHeader from "../components/Dashboard/TopHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import EditProfile from "../components/Profile/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070913] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Fixed Top Header */}
      <TopHeader />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden max-w-[1720px] w-full mx-auto">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Center Content - Scrolls internally */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full">
          {user ? (
            <EditProfile user={user} />
          ) : (
            <div className="flex flex-col items-center justify-center p-16">
              <span className="loading loading-spinner loading-lg text-rose-500"></span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
