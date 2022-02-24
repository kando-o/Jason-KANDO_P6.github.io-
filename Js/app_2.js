/**
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

function getData() {
   return fetch("data.json")
   .then((res) => res.json())
   .catch(function(error) {
        alert(error)
    })
}

async function cartePhotographer(carte) {
    await getData()
    document.getElementById('main').innerHTML += 
    `
        <div tabindex="0" class="cartePhotographer">
            <a href="/Page_Photographer/photographers.html?id=${carte.id} "target="_blanc">
                <div class="ppPhotograher">
                    <img src="/Sample_Photos/Photographers-ID-Photos/${carte.portrait}">
                </div>
            </a>
            <div class="info">
            <h4 tabindex="0">${carte.name}</h4> 
            <p tabindex="0">${carte.country}, ${carte.city}</p> 
            <p tabindex="0">${carte.tagline}..</p> 
            <p tabindex="0">${carte.price}€/jour</p>
            </div>
        </div>
    `
}




