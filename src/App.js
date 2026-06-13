import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './allcomponents/About';
import Booking from './allcomponents/Booking';
import Contact from './allcomponents/Contact';
import Footer from './allcomponents/Footer';
import Gallery from './allcomponents/Gallery';
import HomePage from './allcomponents/HomePage';
import Navbar from './allcomponents/Navbar';
import Services from './allcomponents/Services';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './libs/ScrollToTop';
import LenisProvider from './animations/LenisProvider';
import Login from './allcomponents/Login';
import AuthState from './context/auth/AuthState';
import Signup from './allcomponents/Signup';
import Profile from './allcomponents/Profile';
import AdminProfile from './allcomponents/AdminProfile';
import ResetPassword from './allcomponents/ResetPassword';
import Page404 from './allcomponents/page404';
import Ratings from './allcomponents/Ratings';
import Partners from './allcomponents/Partners';
function App() {
	return (
		<>
			<AuthState>
				<LenisProvider>
				<Router>
					<div className="flex min-h-screen flex-col">
					<ScrollToTop />
					<Navbar />

					<ToastContainer
						position="top-right"
						autoClose={3500}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						pauseOnHover
						theme="colored"
					/>

					<main className="flex-1">
					<Routes>
						<Route exact path="/" element={<HomePage />}></Route>
						<Route exact path="/shutterpics-login" element={<Login />}></Route>
						<Route exact path="/shutterpics-signup" element={<Signup />}></Route>
						<Route exact path="/shutterpics-profile" element={<Profile />}></Route>
						<Route exact path="/shutterpics-online-booking" element={<Booking />}></Route>
						<Route exact path="/shutterpics-online-services" element={<Services />}></Route>
						<Route exact path="/shutterpics-gallery" element={<Gallery />}></Route>
						<Route exact path="/shutterpics-contact" element={<Contact />}></Route>
						<Route exact path="/shutterpics-about" element={<About />}></Route>
						<Route exact path="/shutterpics-partners" element={<Partners />}></Route>
						<Route exact path="/reset/password" element={<ResetPassword />}></Route>
						<Route exact path="/admin/profile" element={<AdminProfile />}></Route>
						<Route exact path="/rateus" element={<Ratings />}></Route>
						<Route exact path="*" element={<Page404 />}></Route>
					</Routes>
					</main>

					<Footer />
					</div>
				</Router>
				</LenisProvider>
			</AuthState>
		</>
	);
}

export default App;
