export const server = process.env.REACT_APP_API_URL || 'http://localhost:5000';
// export const server = 'https://shutterpics-backend.onrender.com';

const apiList = {
	login: `${server}/user/userauth/loginuser`,
	usersignup: `${server}/user/userauth/createuser`,
	verifyotp: `${server}/user/userauth/verifyotp`,
	getuser: `${server}/user/userauth/getuser`,
	requestresetpassword: `${server}/user/userauth/request/resetpassword`,
	resetpassword: `${server}/user/userauth/resetpassword`,
	slotbooking: `${server}/user/booking/slotbooking`,
	getslots: `${server}/user/booking/getslots`,
	adminGetslots: `${server}/user/booking/admin/getslots`,
	myslot: `${server}/user/booking/myslot`,
	contactmessage: `${server}/contact/mailus`,
	rateus: `${server}/contact/rateus`,
	getfeedback: `${server}/contact/getrate`
};

export default apiList;
