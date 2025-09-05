const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");
const mainImage = document.querySelector(".main-image");
const imageName = document.querySelector(".container-name-image p");
const inputTags = document.getElementById("input-tags");
const tagList = document.querySelector(".tag-list");
const availableTags = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];
const publishButton = document.querySelector(".post-btn");
const discardButton = document.querySelector(".botao-descartar");

async function publishProject (projectName , projectDescription , projectTags) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            const itsOkay = Math.random() > 0.5;
            if (itsOkay) {
             resolve("Project successfully published");
            }
            else {
                reject("Error publishing project");
            }
        }, 2000)
    })
}

publishButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const projectName = document.getElementById("name").value;
    const projectDescription = document.getElementById("description").value;
    const projectTags = Array.from(tagList.querySelectorAll("p")).map((tag) => tag.textContent);
    if (projectName != "" && projectDescription != "" && projectTags != ""){
        try {
            const result = await publishProject(projectName, projectDescription, projectTags);
            console.log(result);
            alert("Deu certo!");
        } catch (error) {
            console.log("Deu errado: ", error);
            alert("Deu tudo errado! :(");
        }
    } else {
        alert("Preencha todos os campos!");
    }
})

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, name: file.name})
        }
        reader.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`)
        }
        reader.readAsDataURL(file)
    })
}

inputUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.name;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

inputTags.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagText = inputTags.value.trim();
        try {
        if (tagText !== "") {
            const existTag = await verifyAvailableTags(tagText);
            if (existTag) {
                const newTag = document.createElement("li");
                newTag.innerHTML = `<p>${tagText}</p> <img src="./img/close-black.svg" class="remove-tag">`
                tagList.appendChild(newTag);
                inputTags.value = "";
            } else {
                alert("Tag não foi encontrada.")
                inputTags.value = "";
            }
        }
    } catch (error) {
        console.error("ERRO AO VERIFICAR E EXISTÊNCIA DA TAG");
        alert("Erro ao verficar a existência da tag. Verifique o console.")
    }
    }
})

tagList.addEventListener("click", (event) =>{
    if (event.target.classList.contains("remove-tag")){
        const tagToBeRemoved = event.target.parentElement;
        tagList.removeChild(tagToBeRemoved);
    }
})

async function verifyAvailableTags (tagText) {
    return new Promise((resolve) => {
        setTimeout(() =>{
            const lowerTagText = tagText.toLowerCase();
            resolve(availableTags.some(tag => tag.toLowerCase() === lowerTagText));
        }, 1000)
    })
}

discardButton.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    form.reset();
    mainImage.src = "./image_projeto.png";
    imageName.textContent = "image_projeto.png";
    tagList.innerHTML = "";
})