const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// SignUp
async function signUp(e) {
	e.preventDefault();
	const userDetails = {
		name: e.target.name.value,
		email: e.target.email.value,
		phoneNumber: e.target.phoneNumber.value,
		password: e.target.password.value
	};
	try{
		const res = await axios.post('http://3.238.138.102:3000/user/signup', userDetails);
		console.log(res);
        if(res.status === 201){
			alert(res.data.message);
			container.classList.remove("right-panel-active");
        }
		else {
			throw new Error(res);
		}
    }
    catch(error) {
		alert(error.response.data.message);
        console.log(error);
		e.target.name.value = '';
		e.target.email.value = '';
		e.target.phoneNumber.value = '';
		e.target.password.value = '';
    }
}

// SignIn
async function userSignin(e) {
	e.preventDefault();
	emailInput = e.target.email;
	passwordInput = e.target.password;
	try{
		const userCreds = {
			email: emailInput.value,
			password: passwordInput.value
		}
		const res = await axios.post("http://3.238.138.102:3000/user/login", userCreds);
		if(res.status === 200){
			alert(res.data.message);
			localStorage.setItem('token', res.data.token);
			window.location.href = '../chatApp/homePage.html'
		}
		else {
			throw new Error(res);
		}
	}
	catch (error) {
		alert(error.response.data.message);
        console.log(error);
	}
	emailInput.value = '';
	passwordInput.value = '';
}