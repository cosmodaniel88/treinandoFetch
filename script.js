const userListUrl = "https://jsonplaceholder.typicode.com/users";

//base elements html DOM
const usersContainer = document.querySelector("#usersContainer");

async function getAllUsers() {
    
    const responseUsers = await fetch(userListUrl);

    try{
        if(!responseUsers.ok){
            throw new Error("Erro ao buscar usuários " + responseUsers.status)
        }

        const jsonUsers = await responseUsers.json();

        jsonUsers.forEach(user => {
            createUserCards(user.name, user.username, user.email, user.id);    
        });

        console.log(jsonUsers);
    }catch(erro){
        console.log("Erro capturado: "+ erro);
    }

 

}
window.addEventListener("load", ()=>{getAllUsers()});

function createUserCards(name, userName, email, id){

    //Creating elements
    
    const userLink = document.createElement("a");

    const divCard = document.createElement("div");
    const divImg = document.createElement("div");
    const divInfo = document.createElement("div");

    const img = document.createElement("img");

    const pname = document.createElement("p");
    const puser = document.createElement("p");
    const pmail = document.createElement("p");

    pname.textContent = name;
    puser.textContent = userName;
    pmail.textContent = email;



    divCard.classList.add("userCard");
    divImg.classList.add("userPhoto");
    divInfo.classList.add("info");

    img.setAttribute("src", "https://via.placeholder.com/150/92c952");
    userLink.setAttribute("href", `/user.html?id=${id}`);
    divImg.appendChild(img);

    divInfo.append(pname, puser, pmail);

    divCard.append(divImg, divInfo);

    userLink.appendChild(divCard);

    usersContainer.appendChild(userLink);


}


