const container = document.querySelector('.container')
console.log(container);
var objData = []

const fetchFun = async () => {
    await fetch("data.json")
    .then((res) => res.json())
    // .then((data) => objData = data.photographers)
    .then((data) => objData = data )
    console.log("Feetch Ok" , objData);
}

function utils() {
    
    // Function async tant que la function * fetchFun * n'est pas lancer la function userDisplay ne se lance pas
    userDisplay = async () => {
        await fetchFun()
        let diez = "#"
        container.innerHTML = objData.photographers.map(
            (user) => //Cart Photographe => photo + info sur le photographe
                `
                    <div class="cardPhotographer" id="${user.id}"> 
                        <div>
                            <a href="photographers.html?id=${user.id}" target="_blanc">
                            <img src="Sample_Photos/Photographers-ID-Photos/${user.portrait}" alt="Portrait des artistes">
                            <h2> ${user.name}</h2>
                            </a>
                        </div>
                        <div class="info"> 
                            <p> ${user.city}, ${user.country}<p>
                            <p> ${user.tagline}<p>
                            <p> ${user.price}€ /jour<p>
                            <p> ${diez+user.tags}</p>
                        </div>
                    </div>
                `
        ).join("")
    }
    userDisplay()

            // ************* JS Page Photographers ************** 

    const getLinkAllPhotographers = async () =>{
        await fetchFun()

        //Récupérer les ID
        //Mettre l'ID dans le lien
        //Au click sur une carte aller sur la page photographer qui correspond grace à l'id
        //Injecter le contenu qui correspond grace à l'ID

        let allPhotographer = document.querySelectorAll('.cardPhotographer')
        // boucle for pour recupèrer les ID 
        var h = window.location
        for (const item of allPhotographer) {
            let element = document.getElementById(item.id)
            
            element.addEventListener('click', (e) => {
                console.log(h);
                
                console.log("click");
                bloc_top.innerHTML = "click"
            })
        }
        console.log();

    }
    getLinkAllPhotographers()
    // Class Test
    class PhotographersAll {
        constructor( name, id, city, country, tags, price, portrait, tagline){
            this.name = name,
            this.id = id,
            this.city = city,
            this.country = country,
            this.tags = tags, 
            this.portrait = portrait,
            this.price = price,
            this.tagline = tagline
        }
    };

    
};
utils();

const pagePhotographer = async () => {
    await fetchFun();
    let bloc_top = document.querySelector('.bloc_top')
    console.log(bloc_top);

    let paraUrl = new URLSearchParams(window.location.search);
    let PhotographerID = paraUrl.get("id");
    // console.log(paraUrl);

    // console.log(objData);
    class Photographers {
        constructor( name, id, city, country, tags, price, portrait, tagline, image){
            this.name = name;
            this.id = id;
            this.city = city;
            this.country = country;
            this.tags = tags; 
            this.portrait = portrait;
            this.price = price;
            this.tagline = tagline;
            this.image = image;
        }
    }; 

    //pattern design
    //cours sur les classe en JS
    // Orienté objet

    let PhotographersMap = [];
    //Génér des Artiste de manier Dynamique.. Test
    objData.photographers.forEach( (user) => { 
        PhotographersMap.push( new Photographers (`${user.name}`, `${user.id}`, `${user.city}`, `${user.country}`, `${user.tags}`, `${user.price}`,` ${user.tagline}`, `${user.name}`) );
    });
    let photographers_ = PhotographersMap.filter(p => 
        p.id == PhotographerID
    )
    if(photographers_.length==0){
        throw "illegal photographer id";
    }
    console.log(photographers_[0].name);

    bloc_top.innerHTML=
    ` 
        <div class="bloc_top">
            <div class="card_Photographer">
                <div class="infoPhotograper">
                    <h1>${objData.photographers.name}</h1>
                    <p>${objData.photographers.city}, ${objData.photographers.country}</p>
                    <p>${objData.photographers.tagline}</p>
                    <p>${objData.photographers.tags}</p>
                </div>
                <button>Contactez-moi</button>
                <img src="Sample_Photos/Photographers-ID-Photos/${objData.photographers[1].portrait}" alt="Portrait des artistes">
            </div>
        </div>

    `

}
pagePhotographer();
