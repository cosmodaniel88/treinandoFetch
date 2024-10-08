//URL dos usuários

const urlUsers = "https://jsonplaceholder.typicode.com/users";
const urlPosts = "https://jsonplaceholder.typicode.com/posts";
const profileContainer = document.querySelector("#profileContainer");
const postsContainer = document.querySelector("#postsContainer");
//get complete url string
const urlParams = new URLSearchParams(window.location.search);


//get variable
const userId =  urlParams.get('id');

//Get user byId

window.addEventListener("load", ()=>{
    getById(userId);
})



async function getById(id) {
    
    const response = await fetch(`${urlUsers}/${id}`);

    try{    
        if(!response.ok){
            throw new Error("Erro ao carregar o recurso: "+ response.status);

        }

        const userJson = await response.json();

        createAtributes(userJson);

        getUserPosts(id);

    }catch(erro){
        console.log("erro capturado: " + erro);
    }
}

async function getUserPosts(id) {
    const response = await fetch(`${urlPosts}?userId=${id}`);
    try{
        if(!response.ok){
            throw new Error (`Erro ao carregar comentários: ${response.status}`);
        }
        const postsJson = await response.json();
        postsJson.forEach(post => {
            createPosts(post);
        });
    }catch(erro){
        console.log(erro)
    }
}


function createPosts(post){
    const divPost = document.createElement("div");
    const postTitle = document.createElement("p");
    const postBody = document.createElement("p");
    
    postTitle.innerText = post.title;
    postBody.innerText = post.body;

    divPost.append(postTitle, postBody);

    divPost.classList.add("post");
    postTitle.classList.add("postTitle");
    postBody.classList.add("body");

    postsContainer.appendChild(divPost);

}





function createAtributes(user){


    const divProfilePhoto = document.createElement("div");
    const imgProfile = document.createElement("img");
    const pUserName = document.createElement("p");

    const divProfileInfoFirst = document.createElement("div");
    const profileInfoName = document.createElement("p");
    const profileInfoEmail = document.createElement("p");

    const divProfileInfoSecond = document.createElement("div");
    const profileAddressStreet = document.createElement("p");
    const profileAdressSuite = document.createElement("p");
    const profileAddressCity = document.createElement("p");

    const divProfileInfoTird = document.createElement("div");
    const profileCompanyName = document.createElement("p");
    const profileCompanyCatchPhrase = document.createElement("p");

    const divProfileInfoFourty = document.createElement("div");
    const profilePhone = document.createElement("p");
    const profileWebSite = document.createElement("p");

    divProfilePhoto.classList.add("profilePhoto");

    divProfileInfoFirst.classList.add("profileInfo");
    divProfileInfoSecond.classList.add("profileInfo");
    divProfileInfoTird.classList.add("profileInfo");
    divProfileInfoFourty.classList.add("profileInfo");
    

    imgProfile.setAttribute("src", "https://via.placeholder.com/150/92c952");
    
    pUserName.innerText = user.username;

    divProfilePhoto.append(imgProfile);

    profileInfoName.innerText = user.name;

    profileInfoEmail.innerText = user.email;

    divProfileInfoFirst.append(profileInfoName, pUserName ,profileInfoEmail);

    profileAddressCity.innerText = user.address.city;
    profileAdressSuite.innerText = user.address.suite;
    profileAddressStreet.innerText = user.address.street;

    divProfileInfoSecond.append(profileAddressStreet, profileAdressSuite, profileAddressCity);

    profileCompanyName.innerText = user.company.name;
    profileCompanyCatchPhrase.innerText = user.company.catchPhrase;

    divProfileInfoTird.append(profileCompanyName, profileCompanyCatchPhrase);

    profilePhone.innerText = user.phone;
    profileWebSite.innerText = user.website;

    divProfileInfoFourty.append(profilePhone, profileWebSite);

    profileContainer.append(divProfilePhoto, divProfileInfoFirst, divProfileInfoSecond, divProfileInfoTird, divProfileInfoFourty);
    const loading = document.querySelector("#loading");
    loading.classList.add("hide");
}

