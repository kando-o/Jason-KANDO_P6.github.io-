const sectionPhotographe = document.querySelector('.container_photographe')

let objData = []

const fetchFun = async () => {
    await fetch("data.json")
    .then((res) => res.json())
    // .then((data) => objData = data.photographers)
    .then((data) => objData = data )
    console.log("Feetch Ok");
}

function utils() {
    
    // Function async tant que la function * fetchFun * n'est pas lancer la function userDisplay ne se lance pas
    userDisplay = async () => {
        await fetchFun()
         sectionPhotographe.innerHTML = objData.photographers.map(
             (user) => //Cart Photographe => photo + info sur le photographe
                 `
                    <div class="cardPhotographer"> 
                            <div class="photo_Nom">
                                <a href="index_photographers.html" target="_blanc">
                                    <img src="Sample_Photos/Photographers-ID-Photos/${user.portrait}" alt="Portrait des artistes">
                                    <h2> ${user.name}</h2>
                                </a>
                            </div>
                            
                            <div class="info"> 
                                <p> ${user.city} , ${user.country}<p>
                                <p> ${user.tagline}<p>
                                <p> ${user.price}€ /jour<p>
                                <p> ${user.id}</p>
                            </div>
                    </div>
                `
        ).join("")
    };
    userDisplay()

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
        const containerPagePhotographer = document.querySelector('.container_PagePhotographer')
        const infoPhotograper = document.querySelectorAll('.infoPhotograper')
        console.log(objData.photographers[0].id);
        // console.log(objData);
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
            console.log(artistes);
        });

        containerPagePhotographer.innerHTML = objData.photographers.map(
            (top) => // Carte info + btn cotacte + photo artist
                `
                    <div class="container">
                        
                        <section class="top_Photographer ">
    
                            <div class="infoPhotograper">                        
                                <h2> ${top.name} </h2>
                                <h3>${top.city} , ${top.country}</h3>
                                <p>${top.tagline}</p>
                            </div> 
    
                            <button>Contactez-moi</button>
                            <img src="Sample_Photos/Photographers-ID-Photos/${top.portrait}" alt="Portrait des artistes">
    
                        </section>
                            
                    </div>
                `, 

        ).join("")
    }
    pagePhotographer();
};
utils();


// Phase test


        console.log(document.querySelector('.top_photographer'));

function pagePhographeAll(top, galeriePhoto, trie, prix ) {
    document.querySelectorAll('.top_Photographe').innerHTML = top,
    document.querySelectorAll('.galerie_Photographer').innerHTML = galeriePhoto,
    document.querySelector('.trie').innerHTML = trie,
    document.querySelector('.prix').innerHTML = prix
    

}
pagePhographeAll()


