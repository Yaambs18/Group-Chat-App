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
		const res = await axios.post('http://localhost:3000/user/signup', userDetails);
		console.log(res);
        if(res.status === 201){
			alert(res.data.message);
			container.classList.remove("right-panel-active");
        }
    }
    catch(error) {
		alert(error.response.data.message);
        console.log(error.response);
		e.target.name.value = '';
		e.target.email.value = '';
		e.target.phoneNumber.value = '';
		e.target.password.value = '';
    }
}