const dataKey = 'siteData';
const sessionKey = 'adminLoggedIn';

function getData() {
    const d = JSON.parse(localStorage.getItem(dataKey)) || {
        username: 'admin',
        password: 'admin',
        social: [],
        skills: [],
        projects: []
    };
    return d;
}

function saveData(d) {
    localStorage.setItem(dataKey, JSON.stringify(d));
}

function renderLists() {
    const data = getData();

    // color
    document.getElementById('themeColor').value = data.color || '#191d2b';

    const sList = document.getElementById('socialList');
    sList.innerHTML = '';
    data.social.forEach((s, i) => {
        const div = document.createElement('div');
        div.textContent = s.icon + ' - ' + s.link;
        const b = document.createElement('button');
        b.textContent = 'Remove';
        b.onclick = () => {
            data.social.splice(i,1);
            saveData(data);
            renderLists();
        };
        div.appendChild(b);
        sList.appendChild(div);
    });

    const skList = document.getElementById('skillsList');
    skList.innerHTML = '';
    data.skills.forEach((s,i)=>{
        const div=document.createElement('div');
        div.textContent = s.name + ' ('+s.percent+'%)';
        const b=document.createElement('button');
        b.textContent='Remove';
        b.onclick=()=>{data.skills.splice(i,1);saveData(data);renderLists();};
        div.appendChild(b);
        skList.appendChild(div);
    });

    const pList = document.getElementById('projectsList');
    pList.innerHTML = '';
    data.projects.forEach((p,i)=>{
        const div=document.createElement('div');
        div.textContent = p.title;
        const b=document.createElement('button');
        b.textContent='Remove';
        b.onclick=()=>{data.projects.splice(i,1);saveData(data);renderLists();};
        div.appendChild(b);
        pList.appendChild(div);
    });
}

function showAdmin(){
    document.getElementById('login').style.display='none';
    document.getElementById('admin').style.display='block';
    renderLists();
}

document.getElementById('loginForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const d=getData();
    const u=document.getElementById('username').value;
    const p=document.getElementById('password').value;
    if(u===d.username && p===d.password){
        localStorage.setItem(sessionKey,'true');
        showAdmin();
    }else{
        alert('Invalid credentials');
    }
});

if(localStorage.getItem(sessionKey)==='true') showAdmin();

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.removeItem(sessionKey);
    location.reload();
});

document.getElementById('saveColor').addEventListener('click',()=>{
    const d=getData();
    d.color=document.getElementById('themeColor').value;
    saveData(d);
    alert('Saved');
});

document.getElementById('addSocial').addEventListener('click',()=>{
    const icon=document.getElementById('socialIcon').value;
    const link=document.getElementById('socialLink').value;
    if(!icon || !link) return;
    const d=getData();
    d.social.push({icon,link});
    saveData(d);renderLists();
});

document.getElementById('addSkill').addEventListener('click',()=>{
    const name=document.getElementById('skillName').value;
    const percent=parseInt(document.getElementById('skillPercent').value)||0;
    const certificate=document.getElementById('skillCert').value;
    if(!name) return;
    const d=getData();
    d.skills.push({name,percent,certificate});
    saveData(d);renderLists();
});

document.getElementById('addProject').addEventListener('click',()=>{
    const title=document.getElementById('projectTitle').value;
    if(!title) return;
    const description=document.getElementById('projectDesc').value;
    const image=document.getElementById('projectImage').value;
    const link=document.getElementById('projectLink').value;
    const languages=document.getElementById('projectLang').value.split(',').map(s=>s.trim()).filter(s=>s);
    const d=getData();
    d.projects.push({title,description,image,link,languages});
    saveData(d);renderLists();
});

document.getElementById('updateCred').addEventListener('click',()=>{
    const u=document.getElementById('newUser').value;
    const p=document.getElementById('newPass').value;
    if(!u && !p) return;
    const d=getData();
    if(u) d.username=u;
    if(p) d.password=p;
    saveData(d);
    alert('Credentials updated');
});
