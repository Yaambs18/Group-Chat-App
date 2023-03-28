const groupBtn = document.getElementById('group-btn');

const showGroupsBtn = document.getElementById('select-group');

groupBtn.addEventListener('click', createGroup);

showGroupsBtn.addEventListener('click', showGroups);

async function createGroup() {
    const groupName = prompt('Give a name to your group.', '');
    if(groupName === '' || groupName === null){
        console.log('invalid')
        alert('Invalid group Name');
        return;
    }
    try{
        const res = await axios.post('http://44.200.225.63:3000/group/createGroup', { groupName: groupName }, { headers: { 'Authorization': token }})
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

async function showGroups() {
    try{
        document.getElementById('users-list').style.display = 'none';
        const groupsList = document.getElementById('groups-list');
        groupsList.style.display = 'block';

        const res = await axios.get('http://44.200.225.63:3000/group', { headers: { 'Authorization': token }})
        const groups = res.data.groups

        groupsList.innerHTML = '';
        for(group of groups) {
            showGroupsOnSidePanel(group);
        }

    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

function showGroupsOnSidePanel(group) {
    const groupsList = document.getElementById('groups-list');

    const groupLi = document.createElement('li');
    groupLi.className = 'chat-group';

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const groupImg = document.createElement('img');
    groupImg.classList = "rounded-5";
    groupImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    groupImg.alt="avatar";
    groupLi.appendChild(groupImg);

    const groupName = document.createElement('h6');
    groupName.classList = "name m-0 ps-2"
    groupName.textContent = `${group.groupName}`;
    aboutDiv.appendChild(groupName);

    const userStatus = document.createElement('i');
    userStatus.classList = "fa fa-circle online ps-2";
    userStatus.textContent = ' active';
    aboutDiv.appendChild(userStatus);

    groupLi.appendChild(aboutDiv);
    
    groupLi.addEventListener('click', () => {
        showCardTitle(group);
    });
    groupsList.append(groupLi);
}

function showCardTitle(groupObj) {
    const chatCardTitleDiv = document.querySelector('.chat-card-title');

    chatCardTitleDiv.innerHTML = '';

    const groupImg = document.createElement('img');
    groupImg.classList = "rounded-5";
    groupImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    groupImg.alt="avatar";
    chatCardTitleDiv.appendChild(groupImg);

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const groupName = document.createElement('h6');
    groupName.classList = "name m-0 ps-2"
    groupName.textContent = `${groupObj.groupName}`;
    aboutDiv.appendChild(groupName);

    chatCardTitleDiv.appendChild(aboutDiv);

    if(groupObj.groupMembers.admin){
        const addUserBtn = document.createElement('button');
        addUserBtn.className = "addBtn btn btn-secondary";
        addUserBtn.innerHTML = `<i class="fa fa-user-plus"> Add-User</i>`;
    
        addUserBtn.addEventListener('click', () => addGroupUsers(groupObj.id));
        chatCardTitleDiv.appendChild(addUserBtn);

    }
    const optionBtn = document.createElement('button');
    optionBtn.className = "addBtn btn btn-secondary";
    optionBtn.textContent = `Show Users`;

    optionBtn.addEventListener('click', () => getGroupUsers(groupObj));
    chatCardTitleDiv.appendChild(optionBtn);


    const sendMsgBtn = document.getElementById('user-msg-box');
    sendMsgBtn.addEventListener('submit', () => sendMsg('group', groupObj.id));

    setInterval(() => {
        getMessages('group', groupObj.id);
    }, 15000);

}

async function addGroupUsers(groupId) {
    const userEmail = prompt('Enter valid user emailId else user will not added', '');
    if(userEmail === '' || userEmail === null){
        console.log('Invalid emailId')
        alert('Invalid emailId');
        return;
    }
    try{
        const addUserRes = await axios.post(`http://44.200.225.63:3000/group/${groupId}/addUser`, {userEmail: userEmail}, { headers: { 'Authorization': token }});
        alert(addUserRes.data.message);
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

async function getGroupUsers(group) {
    try {
        const res = await axios.get(`http://44.200.225.63:3000/group/${group.id}/users`, { headers: { 'Authorization': token }});
        const { groupMembers } = res.data;
        const userList = document.querySelector('#chat-msgs-box');
        userList.innerHTML = "";
        for(groupMember of groupMembers) {
            showGroupUsers(groupMember, group);
        }
    }
    catch(error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}

function showGroupUsers(groupUser, groupObj) {
    const userList = document.querySelector('#chat-msgs-box');

    const userLi = document.createElement('li');
    userLi.className = 'chat-user';

    const aboutDiv = document.createElement('div');
    aboutDiv.className = 'about';

    const userImg = document.createElement('img');
    userImg.classList = "rounded-5";
    userImg.src = "https://bootdey.com/img/Content/avatar/avatar2.png";
    userImg.alt="avatar";
    userLi.appendChild(userImg);

    const userName = document.createElement('h6');
    userName.classList = "name m-0 ps-2"
    userName.textContent = `${groupUser.name}`;
    aboutDiv.appendChild(userName);

    const userStatus = document.createElement('i');
    userStatus.classList = "fa fa-circle online ps-2";
    userStatus.textContent = ' online';
    aboutDiv.appendChild(userStatus);

    userLi.appendChild(aboutDiv);
     if(groupObj.groupMembers.admin){
         const removeUserBtn = document.createElement('button');
         removeUserBtn.className = "rmvBtn btn btn-outline-dark";
         removeUserBtn.innerHTML = `Remove-User`;
     
         removeUserBtn.addEventListener('click', () => removeGroupUsers(groupObj.id, groupUser.id));
         userLi.appendChild(removeUserBtn);
     }

    userList.append(userLi);
}

async function removeGroupUsers(groupId, userId) {
    try {
        const deleteRes = await axios.delete(`http://44.200.225.63:3000/group/${groupId}/user/${userId}`, { headers: { 'Authorization': token }});
        alert(deleteRes.data.message);
    } catch (error) {
        console.log(error);
        if(error.response){
            alert(error.response.data.message);
        }else{
            alert(error);
        }
    }
}