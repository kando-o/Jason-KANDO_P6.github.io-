const sectionPhotographe = document.querySelector('.container')

let objData = []

const fetchFun = async () => {
    await fetch("data.json")
    .then((res) => res.json())
    // .then((data) => objData = data.photographers)
    .then((data) => objData = data )
    .catch(rejected => {
        console.log(rejected);
    });
}


function utils() {
    // Function async tant que la function * fetchFun * n'est pas lancer la function userDisplay ne se lance pas
    userDisplay = async () => {
        await fetchFun()
        sectionPhotographe.innerHTML = objData.photographers.map(
        (user) => //Cart Photographe => photo + info sur le photographe
                `
                    <div id="${user.id}" class="cardPhotographer"> 
                            <div class="photo_Nom">
                                <div>
                                    <img src="Sample_Photos/Photographers-ID-Photos/${user.portrait}" alt="Portrait des artistes">
                                    <h2> ${user.name}</h2>
                                </div>
                            </div>
                            
                            <div class="info"> 
                                <p> ${user.city} , ${user.country}<p>
                                <p> ${user.tagline}<p>
                                <p> ${user.price}€ /jour<p> 
                            </div>
                    </div>
                `
        ).join("")
    };
    userDisplay()
    
    // get all the links
    const getLinkPhotographerPage = async () =>{
        await fetchFun();
        // Récupère tout les photographe
        let allPhotographer = document.getElementsByClassName("cardPhotographer")
        for (let item of allPhotographer) {
            // recupere l'element en fonction de l'id
            let element = document.getElementById(item.id)
            element.addEventListener("click", () => {   

                let para = new URLSearchParams(); // crée une instance de URL
                para.append("id_photographer", item.id); // Création d'un clé appelée id_photographer
                
                // fais pareil que un lien
                window.location.href = "index_photographers.html?" + para.toString();
            })
        }
    }
    getLinkPhotographerPage()

    // ************* JS Page Photographers ************** 
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

    const pagePhotographer = async () => {
        await fetchFun();
        const container_photographe = document.querySelector('.container_photographe')
        const infoPhotograper = document.querySelectorAll('.infoPhotograper')

        // Get params
        let para = new URLSearchParams(window.location.search);
        let pass = para.get("id_photographer");

        // Get one photo grapher by id
        let photographer = objData.photographers.find( photographer => photographer.id === parseInt(pass))
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
        //Génér des Artiste de manier Dynamique.. Test
        objData.photographers.forEach( (user) => { 
            let artistes = new PhotographersAll (` ${user.name}`, `${user.id}`, `${user.city}`, `${user.country}`, `${user.tags}`, `${user.price}`,` ${user.tagline}`, `${user.name}` )    
            // console.log(user)
            //console.log(artistes);
        });
        console.log(container_photographe);
        
        containerPagePhotographer.innerHTML = 
                `
                <div class="container">
                        
                <section class="top_Photographer ">

                    <div class="infoPhotograper">                        
                        <h2> ${objData.photographers.name} </h2>
                        <h3>${objData.photographers.city} , ${objData.photographers.country}</h3>
                        <p>${objData.photographers.tagline}</p>
                    </div> 

                    <button>Contactez-moi</button>
                    <img src="Sample_Photos/Photographers-ID-Photos/${objData.photographers.portrait}" alt="Portrait des artistes">

                </section>
                    
            </div>
                `
    }
    pagePhotographer();
};
utils();


// Phase test


//         console.log(document.querySelector('.top_photographer'));

// function pagePhographeAll(top, galeriePhoto, trie, prix ) {
//     document.querySelectorAll('.top_Photographe').innerHTML = top,
//     document.querySelectorAll('.galerie_Photographer').innerHTML = galeriePhoto,
//     document.querySelector('.trie').innerHTML = trie,
//     document.querySelector('.prix').innerHTML = prix
    

// }
// pagePhographeAll()

