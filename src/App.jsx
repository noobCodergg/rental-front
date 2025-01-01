import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import Test from "./Pages/Test";
import Navbar from "./Components/Navbar/Navbar";
import VerifyOTP from "./Pages/VerifyOTP";
import RegLanding from "./Pages/RegLanding";
import PropertyForm from "./Pages/PropertyForm";
import AllListings from "./Pages/AllListings";
import PropertyDetail from "./Pages/PropertyDetail";
import MyProperty from "./Pages/MyProperty";
import UserProfile from "./Pages/UserProfile";
import Chat from "./Pages/Chat";
import ChattedUsers from "./Pages/ChattedUsers";
import TenantProfile from "./Pages/TenantProfile";
import Appication from "./Pages/Appication";
import MyApplication from "./Pages/MyApplication";
import ApplicationPortal from "./Pages/ApplicationPortal";
import ChatHistory from "./Pages/ChatHistory";
import SubscriptionForm from "./Pages/SubscriptionForm";
import SubscriptionPlans from "./Pages/SubscriptionPlans";
import DriverProfile from "./Pages/DriverProfile";
import DriverNotification from "./Pages/DriverNotification";
import MySchedule from "./Pages/MySchedule";
import MyRideHistory from "./Pages/MyRideHistory";
import EarningFromSubscription from "./Pages/EarningFromSubscripton";
import EarningFromRental from "./Pages/EarningFromSubscription";
import MyEarnings from "./Pages/MyEarnings";
import AllUsers from "./Pages/AllUsers";
import SubscriptionDetail from "./Pages/SubscriptionDetail";
import ManageReports from "./Pages/ManageReports";
import LogOut from "./Pages/LogOut";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyOTP" element={<VerifyOTP />} />
        <Route path="/reglanding" element={<RegLanding />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes roles={["Admin", "Land Lord", "Tenant", "Driver"]}>
              <Feed />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoutes roles={["Admin", "User"]}>
              <Test />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/propertyform"
          element={
            <ProtectedRoutes roles={["Land Lord"]}>
              <PropertyForm />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/alllistings"
          element={
            <ProtectedRoutes roles={["Admin", "Land Lord", "Tenant"]}>
              <AllListings />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/propertydetails/:id"
          element={
            <ProtectedRoutes roles={["Admin", "Land Lord", "Tenant"]}>
              <PropertyDetail />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/myproperties"
          element={
            <ProtectedRoutes roles={["Land Lord"]}>
              <MyProperty />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/myaccount/:id"
          element={
            <ProtectedRoutes roles={["Land Lord", "Tenant"]}>
              <UserProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/tenantaccount/:id"
          element={
            <ProtectedRoutes roles={["Land Lord", "Tenant"]}>
              <TenantProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/chat/:id/:userId"
          element={
            <ProtectedRoutes roles={["Land Lord", "Tenant", "Driver"]}>
              <Chat />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/chatroom"
          element={
            <ProtectedRoutes roles={["Land Lord", "Tenant"]}>
              <ChattedUsers />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/application/:landlordid/:propertyid/:propertyname"
          element={
            <ProtectedRoutes roles={["Tenant"]}>
              <Appication />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/myapplication"
          element={
            <ProtectedRoutes roles={["Tenant"]}>
              <MyApplication />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/applicationportal"
          element={
            <ProtectedRoutes roles={["Land Lord"]}>
              <ApplicationPortal />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/chathistory"
          element={
            <ProtectedRoutes roles={["Land Lord", "Tenant"]}>
              <ChatHistory />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/createnewsubscription"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <SubscriptionForm />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoutes roles={["Admin", "Land Lord", "Tenant", "Driver"]}>
              <SubscriptionPlans />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/driveraccount/:id"
          element={
            <ProtectedRoutes roles={["Driver", "Tenant", "Land Lord"]}>
              <DriverProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/drivernotifications"
          element={
            <ProtectedRoutes roles={["Driver"]}>
              <DriverNotification />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/myschedule"
          element={
            <ProtectedRoutes roles={["Driver"]}>
              <MySchedule />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/myridehistory"
          element={
            <ProtectedRoutes roles={["Tenant", "Land Lord"]}>
              <MyRideHistory />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/earningfromsub"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <EarningFromSubscription />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/earningfromrent"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <EarningFromRental />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes roles={["Land Lord"]}>
              <MyEarnings />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/allusers"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <AllUsers />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/subscriptiondetail/:id"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <SubscriptionDetail />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/managereports&suggestions"
          element={
            <ProtectedRoutes roles={["Admin"]}>
              <ManageReports />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/logout"
          element={
            <ProtectedRoutes roles={["Admin", "Driver", "Land Lord", "Tenant"]}>
              <LogOut />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
