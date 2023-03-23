
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if(!token){
        window.location.href = '../loginSignup/login.html';
    }

    try{
        const res = await axios.get(`http://localhost:3000/user`, { headers: {'Authorization': token }});
        const users = res.data.users;
        for(user of users) {
            showUsers(user);
        }
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error.message);
        }
    }
});

function showUsers(user) {
    const aboutDiv = document.querySelector('.about');

    const userImg = document.createElement(img);
    userImg.classList = "rounded-5";
    userImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    userImg.alt="avatar";
    aboutDiv.appendChild(userImg);

    const userName = document.createElement(h6);
    userName.classList = "m-0 ps-5"
    aboutDiv.appendChild(userName);

    const userStatus = document.createElement(i);
    userStatus.classList = "fa fa-circle online ps-2";
    aboutDiv.appendChild(userStatus);

    aboutDiv.appendChild(document.createTextNode(" online"));
}

const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', async () => {
    localStorage.removeItem('token');
    window.location.href = '../loginSignup/login.html';
});