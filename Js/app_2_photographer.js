// NB : 
//	change une chaine de caractere en entier **+string**

//Recuperer l'ID
//REcuperer les donées
//Recuperer les photographers
//Recuperer les medias
//Hydrate la page *changer le contenu des div*

// Lecture 1 :
// -> - initialisation Données
//	  - création du html

// Lecture 2 :
//	-> EventListenners (clicks)
//	  - mise à jour spécifiques



/**
 * @param {data.json} Array |
 * @returns {Array : photgraphers, media}
 */
function getData() {
    let ls = localStorage.getItem("data");
    if (ls){ return JSON.parse(ls)}

    return fetch(`/data.json`)
    .then( res => res.json())
	.then(res => {
		localStorage.setItem("data", JSON.stringify(res));
		return res;
	})
    // .then((data) => { return data } )
    .catch(function(error) {
         alert(error)
     })
}

/**
 * @argument {function idCardSelectionner_Photographer} | qui contien l'id du photographe selectionner
 * @argument {function idGalerieMedia} | qui contien le media du photographe selectionner
 * @argument {function initPhotographer} | qui init la card bot du photographe
 * @argument {function initMedia} | qui init la galerie photo
 */

var IDPHOTOGRAPHER = -1;
var PHOTOGRAPHER = null;
var ARRAY_MEDIAS = [];

function getParamID(){
	// url parameters
	const urlURL = new URL(location.href);
	// extract "id" from parameters
	IDPHOTOGRAPHER = parseInt(urlURL.searchParams.get('id'));
	console.log(IDPHOTOGRAPHER);
	return IDPHOTOGRAPHER;
}

async function loadData(){
	// get datas from local storage or API
    const datas = await getData()
    console.log(datas);
	
	// get photographer by its id
    PHOTOGRAPHER = datas.photographers.find(element => {
		return element.id == IDPHOTOGRAPHER;
	});

	//extract photographer's medias from medias
    ARRAY_MEDIAS = datas.media.filter((media) => media.photographerId == IDPHOTOGRAPHER);
}

async function main() {

	initLightBox();
	generateLightBoxEvents();
	getParamID();
	await loadData();
	render();
	formulaire()
	generateMediaLightBoxLinks();
}

async function formulaire() {
	await getData()
	const bgFormulaire = document.querySelector('.bgFormulaire')
	const btnContactPhotographer = document.querySelector('.btn_ContactPhotographer')
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose')
	
	btnContactPhotographer.addEventListener('click', () => {
		bgFormulaire.style.display = "block"
	})
	btnFormulaireClose.addEventListener('click', () => {
		bgFormulaire.style.display = "none"
	})
}
function render(){
	// photographer profile
    initPhotographer(PHOTOGRAPHER);
    console.log(PHOTOGRAPHER);

	// create drop down menus and overlay
    initGadgets(PHOTOGRAPHER, ARRAY_MEDIAS);
    console.log(ARRAY_MEDIAS);

	// draw photographer's medias
    ARRAY_MEDIAS.map(media => initGalerie(media, PHOTOGRAPHER))
    // Resoudre contentPhotographer
}

async function initPhotographer(cardPhoto){
    await getData()
    document.querySelector('.contain_bloc_top').innerHTML += 
    `
        <div class="bloc_top">
            <section class="card_Photographer">
                <div class="infoPhotograper">          
                    <h1> ${cardPhoto.name} </h1>
                    <p> ${cardPhoto.city}, ${cardPhoto.country}</p>
                    <p>${cardPhoto.tagline}</p>
                </div> 
                <button class="btn_ContactPhotographer">Contactez-moi</button>
                <img src="/Sample_Photos/Photographers-ID-Photos/${cardPhoto.portrait}">
            </section>
        </div> 
    `
}

async function initGadgets(photographe, medias){
    await getData()

    document.querySelector('.contain_galeriePhoto').innerHTML += 
    `
		<div class="trie">
			<p>Trier par
				<label for="trie">
					<select name="trie">
						<option value="Popularité">Popularité</option>
						<option value="Date">Date</option>
						<option value="Titre">Titre</option>    
					</select>
				</label>
			</p>
		</div>

		<div class="prix">  
			<p class="likesTotal"><i class="fas fa-heart"></i>0</p>
			<p>${photographe.price}€/jr </p>
		</div>
    `

    let likes = 0;
	let likesGlobal = likes;
	let likesTotal = document.querySelector('.likesTotal')
	let clickLike = document.querySelectorAll('.cardLikes')
	
	function UpdateOverlayLikes(count){
		likesTotal.innerHTML = `<p>love ${count}</p>`
	}

	medias.map(media => {
		likes += media.likes
	});
	likesGlobal = likes
	UpdateOverlayLikes(likesGlobal)

    console.log(likesGlobal, likes);
	
	clickLike.forEach(el =>  {
		el.addEventListener('click', () => {
			let likesCount = el.querySelector(".likesCount");
			likesGlobal += UpdateLike(likesCount);
			UpdateOverlayLikes(likesGlobal)
			console.log('clickLove', likesGlobal,likesCount.textContent);
		})
	})

}

function UpdateLike(elem){
	let id = elem.id;
	let ls = localStorage.getItem("likes");

	// local storage not found -> create and update
	if (!ls){
		localStorage.setItem("likes",JSON.stringify([id]));
		elem.textContent = (+elem.textContent) + 1;
		return 1;
	}else{
		let likes = JSON.parse(ls);
		let value = 1;
		// media already likes = dislike (remove from localStorage)
		if (likes.find(pId=>pId==id)){
			likes = likes.filter(pId => pId!=id)
			value = -1;
		}
		// media not found = like (insert into localStorage)
		else{
			likes.push(id);
		}
		localStorage.setItem("likes", JSON.stringify(likes));
		elem.textContent = (+elem.textContent) + value;
		return value;
	}
}



function initGalerie(galerieMedia, idPhoto) {
    let objMedia = "";
	console.log(objMedia);
	//Pourquoi avoir mit une condition. une simple décla aurai pu faire l'affaire 2x la meme chose
    if (galerieMedia.hasOwnProperty('image')) {
        objMedia = `<img src="/Sample_Photos/${idPhoto.name}/${galerieMedia.image}" alt="" srcset="">`;
    }else if (galerieMedia.hasOwnProperty('image')) {
        objMedia = `<img src="/Sample_Photos/${idPhoto.name}/${galerieMedia.image}" alt="" srcset="">`;
    }

	//".lighbox-view"
	let elemMaster = document.createElement('div')
	elemMaster.classList.add('card_galerieMaster')
	// let elem = document.createElement("div");
	// elem.classList.add("card_galerie");
	elemMaster.innerHTML =  
	`
		<div class="card_galerie">
			${objMedia}
		</div>                    
		<div class="titre_photo">
			<p>${galerieMedia.title}</p>
			<p class="cardLikes"><span class="likesCount" id="${galerieMedia.id}">${galerieMedia.likes}</span><i class="fas fa-heart"></i></p>
		</div>
	`
	document.querySelector('.galerie_Photographer').appendChild(elemMaster)
}

const LIGHTBOX =  {
	lightBox : null,
	srcEnCourSlider : null,
	allPicsLightBox : null,
	leftLightBox : null,
	rightLightBox : null,
	fermerLightBox : null,
	photoEnCours : null,
	indexEnCours : 0
}

function initLightBox(){
	LIGHTBOX.lightBox = document.querySelector('.lightBox')
	LIGHTBOX.srcEnCourSlider = document.querySelector('.img-visible-lightBox')
	LIGHTBOX.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerie"))
	console.log(LIGHTBOX.allPicsLightBox);
	LIGHTBOX.leftLightBox = document.querySelector('.btnSlide--left')
	LIGHTBOX.rightLightBox = document.querySelector('.btnSlide--right')
	LIGHTBOX.fermerLightBox  = document.querySelector('.btn-closeLightBox')
}

// Slider
function generateLightBoxEvents(){
	LIGHTBOX.fermerLightBox.addEventListener('click', () => {
		LIGHTBOX.lightBox.style.display = "none"
	})

	LIGHTBOX.rightLightBox.addEventListener('click', () => {
		LIGHTBOX.indexEnCours = (LIGHTBOX.indexEnCours + 1)%(LIGHTBOX.allPicsLightBox.length);
		LIGHTBOX.srcEnCourSlider.src = LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours].querySelector("img").src;
		console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
	})
	
	LIGHTBOX.leftLightBox.addEventListener('click', () => {
		LIGHTBOX.indexEnCours = LIGHTBOX.indexEnCours==0 ? LIGHTBOX.allPicsLightBox.length-1 : LIGHTBOX.indexEnCours-1;

		LIGHTBOX.srcEnCourSlider.src = LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours].querySelector("img").src;
		console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
	})
}

function generateMediaLightBoxLinks(){
	LIGHTBOX.allPicsLightBox = Array.from(document.querySelectorAll(".card_galerie"));
	console.log(LIGHTBOX.allPicsLightBox);
	let index = 0;
	LIGHTBOX.allPicsLightBox.forEach((item) => {
		item.listindex=index++;
	})

	LIGHTBOX.allPicsLightBox.forEach((item) => {
		 console.log()
		item.addEventListener('click', (e) => {
			console.log("click");
			LIGHTBOX.lightBox.style.display = "block";
			LIGHTBOX.srcEnCourSlider.src = item.querySelector("img").src; // image regarder src = l'image qu'on vient de cliquer
			LIGHTBOX.photoEnCours = item; // élément HTML de manier générale | élément cliquer
			LIGHTBOX.indexEnCours = item.listindex; // index de la photo en cours
			console.log("index=",LIGHTBOX.indexEnCours, "photo =", item.src);
		})
	})
}
main()
