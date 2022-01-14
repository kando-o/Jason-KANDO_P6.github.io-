// recuperer les datas
// afficher les photos
// afficher l'id du photographe dans le lien 
// afficher la page qui correspond à l'id du lien


/**
 * 
 * @param {datas, function cartePhotographer} *datas* qui contien la fonction getData | *cartePhotographer* qui contien la fonction des carte des photographes
 * @returns {Array: photographer, media} | 
 */
main()
async function main() {
    const datas = await getData()
    console.log(datas);
    for (const cartes of datas.photographers) {
        cartePhotographer(cartes)
    }
}

/**
 * @param {json} fichier data.json
 * @returns {Array: photographer, media}
 */
function getData() {
   return fetch("data.json")
   .then((res) => res.json())
   .catch(function(error) {
        alert(error)
    })
}
/**
 * 
 * @param {carte} Array | Tableau des photographe
 * @returns {HTMLBodyElement} Carte des photographers 
 */
async function cartePhotographer(carte) {
    await getData()
    document.getElementById('main').innerHTML += 
    `
        <div class="cartePhotographer">
            <h2>${carte.id}</h2> 
            <a href="/Page_Photographer/photographers.html?id=${carte.id} "target="_blanc">
                <div class="ppPhotograher">
                    <img src="/Sample_Photos/Photographers-ID-Photos/${carte.portrait}">
                </div>
            </a>
                <div class="info">
                <p>${carte.country}, ${carte.city}</p> 
                <p>${carte.name}</p> 
                <p>${carte.tags}</p>
                </div>
        </div>
    `, console.log(` ${carte.id}`);
}




