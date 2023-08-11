import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Design from "./pages/Design/Design";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Followers from "./components/Followers/Followers";
import Following from "./components/Following/Following"
import Notifications from "./pages/Notifications/Notifications";

import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Hashtag from "./pages/Hashtag/Hashtag";
import Explore from "./pages/Explore/Explore";


function App() {
  return (
    <>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Design />}>
        <Route element={<ProtectedRoute />}>
          <Route path="feed" element={<Feed />} />
          <Route path="hashtag/:hashtag" element={<Hashtag />} />
          <Route path="profiles/:id" element={<Profile />}>
            <Route path="followers" element={<Followers />} />
            <Route path="following" element={<Following />} /> 
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="explore" element={<Explore />} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
