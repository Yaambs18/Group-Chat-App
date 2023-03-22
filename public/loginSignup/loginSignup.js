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
		password: e.target.password.value
	};
	try{
		const res = await axios.post('http://localhost:3000/user/signup', userDetails);
        if(res.status === 201){
			alert(res.message);
			container.classList.remove("right-panel-active");
        }
        else{
            throw new Error(res.status);
        }
    }
    catch(error) {
        document.body.innerHTML += `<h1>Error: Request Failed with status code ${error}</h1>`;
        console.log(err);
    }
}