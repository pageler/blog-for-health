import { Route, Routes } from "react-router-dom";
import "./App.css";

// #region --------------[ Import Components ]--------------
import BlogDetail from "./pages/BlogDetail";
import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
// #endRegion

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="/blogs" element={<PrivateRoute />}>
                    <Route path="/blogs" element={<BlogList />} />
                </Route>

                <Route path="/blogs/:id" element={<PrivateRoute />}>
                    <Route path="/blogs/:id" element={<BlogDetail />} />
                </Route>

                <Route path="/newblog" element={<PrivateRoute />}>
                    <Route path="/newblog" element={<NewBlog />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
