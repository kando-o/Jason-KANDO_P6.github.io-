// NB : 
//	change une chaine de caractere en entier **+string**

//Recuperer l'ID
//REcuperer les donées
//Recuperer les photographers
//Recuperer les medias

// Lecture 1 :
// -> - initialisation Données
//	  - création du html

// Lecture 2 :
//	-> EventListenners (clicks)
//	  - mise à jour spécifiques
/**
 * @returns {Array : photgraphers, media} en premier
 * @returns {localStorage} puis en second
 */
function getData() {
    let ls = localStorage.getItem("data");
    if (ls){ return JSON.parse(ls)} // Transform l'argument en chaine et renvoie un entier ou Nan
    return fetch(`/data.json`)
    .then( res => res.json())
	.then(res => {
		localStorage.setItem("data", JSON.stringify(res));
		return res;
	})
    .catch(function(error) {
         alert(error)
     })
}



var IDPHOTOGRAPHER = -1;
var PHOTOGRAPHER = null;
var ARRAY_MEDIAS = [];
/**
 * @argument {} ID | qui contien l'id du photographe selectionner
 */
function getParamID(){
	// url parameters
	const urlURL = new URL(location.href);
	// extract "id" from parameters
	IDPHOTOGRAPHER = parseInt(urlURL.searchParams.get('id')); // Transform l'argument en chaine et renvoie un entier ou Nan
	console.log(IDPHOTOGRAPHER);
	return IDPHOTOGRAPHER;
}
/**
 * @function {} Data |  ID -->  Array Photographer , ID --> Array Media
 */
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
/**
 * @function {} Main | Rendu global de la page
 * @generator {} initLightBox |
 * @event {} LightBoxEvents |
 * @returns {} getParamID | Recupère l'id dans l'URL
 * @function {} loadData | Recupère tout les données
 * @function {} Formulaire |
 * @generator {} MediaLightBoxLinks | Fait apparaitre le lightBox  
 * 
 */
async function main() {

	getParamID();
	await loadData();
	initLightBox();
	generateLightBoxEvents();
	render();
	formulaire(PHOTOGRAPHER)
	generateMediaLightBoxLinks();
}

async function formulaire() {
	await getData()
			//Bouton Formulaire
	const bgFormulaire = document.querySelector('.bgFormulaire')
	const formulaireContacte = document.querySelector('.formulaire')
	const btnContactPhotographer = document.querySelector('.btn_ContactPhotographer')
	const btnFormulaireClose = document.querySelector('.btnFormulaireClose')
	btnFormulaireClose.nextElementSibling.innerHTML = `${PHOTOGRAPHER.name}`
	console.log(PHOTOGRAPHER);

	btnContactPhotographer.addEventListener('click', () => {
		// bgFormulaire.style.visibility = "visible"
		bgFormulaire.style.display = "block"
		formulaireContacte.style.display = "block"
		btnFormulaireClose.focus() // Permet de focus sur le formulaire fermer le formulaire avec *espace*
	})
	btnFormulaireClose.addEventListener('click', () => {
		bgFormulaire.style.display = "none"
		formulaireContacte.style.display = "none"
	})
	formulaireContacte.addEventListener('keydown', (e) => {
		// console.log(e.keyCode);
		if (e.keyCode === 27) {
			bgFormulaire.style.display = "none"
			formulaireContacte.style.display = "none"
		}
	})
	bgFormulaire.addEventListener('click', (e) => {
		
		bgFormulaire.style.display = "none"
		formulaireContacte.style.display = "none"
	})

			// Validation | Regex Formulaire
	const formulaire = document.querySelector('.formulaire')
	const prenom = document.getElementById('prenom')
	const nom = document.getElementById('nom')
	const email = document.getElementById('email')
	const spanErrorPrenom = document.querySelector('.mesgErrorPrenom')
	const spanErrorNom = document.querySelector('.mesgErrorNom')
	const spanErrorEmail = document.querySelector('.mesgErrorEmail')
	const submitForm = document.querySelector('.submit')
	const closeModalMerci = document.querySelector('.close-modal-merci');
	const modal_merci = document.querySelector('.modal_merci')
	const btnMerci = document.querySelector('.btn-merci')
	
	console.log();
	
	prenom.addEventListener('input', (e) => {
		console.log(e.target.value) 
		let state = validation(prenom.value, spanErrorPrenom)
		OnValidation(prenom, state)
	})
	nom.addEventListener('change', (e) => {
		let state = validation(nom.value, spanErrorNom)
		OnValidation(nom, state)
	})
	email.addEventListener('input', (e) => {
		let state = validationEmail( email.value, spanErrorEmail)
		OnValidation(email, state)

	})
	
	function validation(pName, pError) {
		//Regex manier 1 *Voir ValidationNom pour 2ème manier de faire*

	champInputText = false
	let msgError;
	pError.innerHTML = msgError

	console.log(pName);
		if (!/[a-z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une minuscule');
			msgError = 'il manque une minuscule';
		} else if (!/[A-Z]/g.test(pName)) {
			console.log('ChampPrénom --> il manque une majuscule');
			msgError = 'il manque une majuscule'
		} else if (pName.length < 2) {
			console.log('ChampPrénom --> il faut au moins 2 carractères');
			msgError = 'il faut au moins 2 carractères'
		} else {
			console.log('ChampNom --> All condition true');
			champInputText = true
			msgError = " "
		}
		if (msgError.length){
			pError.innerHTML = msgError
		}
		return champInputText;
	}

	function OnValidation (pField, pState){
		if (pState == true) {
			console.log('ChampsInputText OK');
			pField.classList.remove('champInputText-invalid')
			pField.classList.add('champInputText-valid')
			pState.innerHTML = "Good"
			return true
		} else {
			console.log('ChampsInputText NOK');
			pField.classList.remove('champInputText-valid')
			pField.classList.add('champInputText-invalid')
			return false
		}
	}

	function validationNom() {
		console.log(nom.value);

		champInputText = false
		if (!/[a-z]/g.test(nom.value)) {
			console.log('ChampNom --> il manque une minuscule');
			msgError = 'il manque une minuscule';
		} else if (!/[A-Z]/g.test(nom.value)) {
			console.log('ChampNom --> il manque une majuscule');
			msgError = 'il manque une majuscule'
		} else if (nom.value.length < 2) {
			console.log('ChampNom --> il faut au moins 2 carractères');
			msgError = 'il faut au moins 2 carractères'
		} else {
			console.log('ChampNom --> All condition true');
			champInputText = true
		}

		if (champInputText == true) {
			console.log('ChampNom --> ChampsInputText OK');
			spanErrorNom.innerHTML = ""
			nom.classList.remove('champInputText-invalid')
			nom.classList.add('champInputText-valid')
			return true
		} else {
			console.log('ChampNom --> ChampsInputText NOK');
			spanErrorNom.innerHTML = msgError
			nom.classList.remove('champInputText-valid')
			nom.classList.add('champInputText-invalid')
			return false
		}
	}

	function validationEmail(pEmail, pError) {
		pError.textContent = ''
		let champInputText = false
		let msgError = '';
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(pEmail).toLowerCase())){
			msgError = ''
			champInputText = true
		}else {
			msgError = 'Mail Invalid'
		}
		if (msgError.length>0) pError.textContent=msgError
		return champInputText
	}

	formulaire.addEventListener('submit', (e) => {
		console.log('clickForm');

		e.preventDefault()
		if ( validationNom(nom) && validation(prenom) ) {
			console.log('condition validation Nom | Prénom OK');
			formulaire.style.display = "none"
			modal_merci.style.display = "block"
		} else {
			console.log('condition validation Nom | Prénom NOK');
			// e.preventDefault()
		}
	})		
	btnMerci.addEventListener('click', () => {
		formulaire.submit()
	})
	closeModalMerci.addEventListener('click', () => {
		bgFormulaire.style.display = "none"
		console.log("formulaire close");
	})	
}
// * @argument {function idGalerieMedia} | qui contien le media du photographe selectionner
// * @argument {function initMedia} | qui init la galerie photo

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
                <button class="btn_ContactPhotographer" type="button">Contactez-moi</button>
                <img src="/Sample_Photos/Photographers-ID-Photos/${cardPhoto.portrait}" role="img" alt="Photo de profil du photographe">
            </section>
        </div> 
    `
}

async function initGadgets(photographe, medias){
    await getData()

    document.querySelector('.contain_galeriePhoto').innerHTML += 
    `
		<div class="trieAll">
			<p>Trier par
				<label for="trie"  aria-haspopup="true aria-expanded="false>
					<select name="trie">
						<option class="popularite" value="Popularité">Popularité</option>
						<option class="date" value="Date">Date</option>
						<option class="titre" value="Titre">Titre</option>    
					</select>
				</label>
			</p>
		</div>

		<div class="prix">  
			<p class="likesTotal"><i class="fas fa-heart"></i>0</p>
			<p>${photographe.price}€/jr </p>
		</div>
    `
		// Like Globale

    let likes = 0;
	let likesGlobal = 0;
	let likesTotal = document.querySelector('.likesTotal');
	let clickLike = document.querySelectorAll('.cardLikes');
	
	// Fonction Like
/**
 * 
 * @param {Number} count | addition des likes du photographer de --> media.likes 
 */
	function UpdateOverlayLikes(count){
		likesTotal.innerHTML = `<p>love ${count}</p>`
	};
	medias.map(media => {
		likes += media.likes
	});
    console.log(likesGlobal, likes);
	likesGlobal = likes;

	UpdateOverlayLikes(likesGlobal);

	clickLike.forEach(el =>  {
		el.addEventListener('click', () => {
			let likesCount = el.querySelector(".likesCount");
			likesGlobal += UpdateLike(likesCount);
			UpdateOverlayLikes(likesGlobal)
			console.log('clickLove', likesGlobal,likesCount.textContent);
		})
	});

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

	async function trieCategorie() {
		await getData()
		let trieAll = document.querySelector('.trieAll'),
			popularite = document.querySelector('.popularite'),
			titre = document.querySelector('.titre'),
			date = document.querySelector('.date'),
			ls = localStorage.getItem("categorie");

		console.log(trieAll);
		// Utiliser le localStorage pour spliter celui ci et recharger la page à chaque categorie selectionner  ou mthode sort() pour trier les clés.

		trieAll.lastItem = null;
		trieAll.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log("clickCatAll", e.target.value);
			let lsTrie = localStorage.getItem("data")
			if (e.target.value!=trieAll.lastItem){
				if (e.target.value == "Popularité") {
					SortByPopularity();
					console.log( "trieAll -> clic popu");
					// localStorage.setItem("data", )

				} else if (e.target.value == "Date") {
					SortByDate();
					console.log( "trieAll -> clic date");
				} else if (e.target.value == "Titre") {	
					SortByTitle();
					console.log( "trieAll -> clic titre");
				}
				trieAll.lastItem = e.target.value;
			}
		})
	}
	trieCategorie()
}
function SetCardsOrders( orders) {
	let x = 0; orders.map(d => d.elem.style.order = x++ )
}
function SortByPopularity(){
	let elems = document.querySelectorAll(".card_galerieMaster");
	let array = [...elems]; // spread operator
	array.map(a => {
		let id = a.id.split("_")[1];
		let likes = document.getElementById(id);
		a.likes = +likes.textContent;
	})
	array.sort( (a,b)=> { return b.likes - a.likes; })
	let orders = array.map(a => {return {elem : a}});
	SetCardsOrders(orders);
}

function SortByDate(){
	let elems = document.querySelectorAll(".card_galerieMaster");
	let array = [...elems];
	let a1 = array.map(a => a.date);
	let array2 = array.sort( (a,b)=> { return new Date(b.date)-new Date(a.date) })
	let a2 = array2.map(a => a.date);
	let orders = [];
	SetCardsOrders(orders);
}
function SortByTitle(){
	let elems = document.querySelectorAll(".card_galerieMaster");
	let array = [...elems];
	// array.sort( (a,b)=> { a.title ... b.title }); 
	let orders = array.map(a => {return {elem : a}});
	SetCardsOrders(orders);
}
function initGalerie(galerieMedia, idPhoto) {
    let objMedia = "";
	let elemMaster = document.createElement('div');
	elemMaster.id = "id_"+galerieMedia.id;
	elemMaster.date = galerieMedia.date;
	elemMaster.Title = galerieMedia.title;
	elemMaster.classList.add('card_galerieMaster')
	// console.log(objMedia);
	//Pourquoi avoir mit une condition. une simple décla aurai pu faire l'affaire 2x la meme chose
    if (galerieMedia.hasOwnProperty('image')) {
		objMedia = `<img src="/Sample_Photos/${idPhoto.name}/${galerieMedia.image}" alt="${galerieMedia.alt}">`;
		// document.querySelector('.controls').style.display = 'none'

    }else if (galerieMedia.hasOwnProperty('image')) {
		objMedia = `<img src="/Sample_Photos/${idPhoto.name}/${galerieMedia.image}" alt="${galerieMedia.alt} ">`;
    } else if (galerieMedia.hasOwnProperty('video')) {
		
		objMedia = `<video class="mediaVideo" src="/Sample_Photos/${idPhoto.name}/${galerieMedia.video}" alt="${galerieMedia.alt}" controls>`;
	}

	async function togglePlayPause() {
		await getData()
		let video = document.querySelector('.mediaVideo')
		let btnVideoPlayPause = document.querySelector('#play_pause')
		let mute = document.querySelector('#mute')
		let juice = document.querySelector('#orange_juice')
		let volumeSlider = document.querySelector('#volumeSlider')

		// video.play()
		
	}
	togglePlayPause()

	elemMaster.innerHTML =  
	`
	
		<div class="card_galerie" role="dialog" aria-label="galeri de petite carte" >
			${objMedia}
		</div>  
		                  
		<div class="titre_photo">
			<p>${galerieMedia.title}</p>
			<p class="cardLikes"><span class="likesCount" id="${galerieMedia.id}">${galerieMedia.likes}</span><i class="fas fa-heart" aria-hidden="true"></i></p>
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
	LIGHTBOX.leftLightBox = document.querySelector('.btnSlide--left')
	LIGHTBOX.rightLightBox = document.querySelector('.btnSlide--right')
	LIGHTBOX.fermerLightBox = document.querySelector('.btn-closeLightBox')
	console.log();
}

// Slider
function generateLightBoxEvents(){

	console.log(LIGHTBOX.lightBox); 

	LIGHTBOX.lightBox.addEventListener("keydown", (a) =>{
		console.log(a.keyCode, "push espace ou echap" )
		if (a.keyCode === 27 || a.keyCode === 32) {
			LIGHTBOX.lightBox.style.display ="none"
			LIGHTBOX.lightBox.focus()
		}
		if (a.keyCode == 39) {
			console.log(a.keyCode, "Push keyCode 39 => btn Right");
			console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src);
			LIGHTBOX.indexEnCours = (LIGHTBOX.indexEnCours + 1)%(LIGHTBOX.allPicsLightBox.length);
			LIGHTBOX.srcEnCourSlider.src = LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours].querySelector("img").src;
		}
		if (a.keyCode == 37) {
			console.log(a.keyCode, "push left");
			console.log("index ="+LIGHTBOX.indexEnCours,"photo="+LIGHTBOX.srcEnCourSlider.src, "Push keyCode 39 => btn Left");
			LIGHTBOX.indexEnCours = LIGHTBOX.indexEnCours==0 ? LIGHTBOX.allPicsLightBox.length-1 : LIGHTBOX.indexEnCours-1;
			LIGHTBOX.srcEnCourSlider.src = LIGHTBOX.allPicsLightBox[LIGHTBOX.indexEnCours].querySelector("img").src;
		}
	})
	LIGHTBOX.fermerLightBox.addEventListener('click', (e) => {
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
		item.focus()
		item.addEventListener('click', () => {
			console.log("click  => open lihgtBox");
			LIGHTBOX.lightBox.style.display = "block";
			LIGHTBOX.srcEnCourSlider.src = item.querySelector("img").src; // image regarder src = l'image qu'on vient de cliquer
			LIGHTBOX.photoEnCours = item; // élément HTML de manier générale | élément cliquer
			LIGHTBOX.indexEnCours = item.listindex; // index de la photo en cours
			console.log("index=",LIGHTBOX.indexEnCours, "photo =", item.src);
		})
	})

	

}
main()
