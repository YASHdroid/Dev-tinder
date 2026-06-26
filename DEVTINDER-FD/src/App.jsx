import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Feed from "./components/Feed";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import SignUp from "./components/SignUp";
import Request from "./components/Request";

import { Provider } from "react-redux";
import Store from "./utils/Store";

function App() {

return (

<Provider store={Store}>

<BrowserRouter>

<Routes>

{/* Redirect */}

<Route
path="/"
element={
<Navigate
to="/login"
replace
/>
}
/>

{/* Public */}

<Route
path="/login"
element={<Login />}
/>

<Route
path="/signup"
element={<SignUp />}
/>

{/* Protected */}

<Route
path="/"
element={<Body />}
>

<Route
path="feed"
element={<Feed />}
/>

<Route
path="profile"
element={<Profile />}
/>

<Route
path="connections"
element={<Connections />}
/>

<Route
path="request"
element={<Request />}
/>

</Route>

</Routes>

</BrowserRouter>

</Provider>

);

}

export default App;