const inputStr = document.querySelector("#inputStr");
const inputSearch = document.querySelector("#inputSearch");
const result = document.querySelector("#result");
const popularButton = document.querySelector("#popularButton");
const latestButton = document.querySelector("#latestButton");
const topRatedButton = document.querySelector("#topRatedButton");

//создаем строку запроса
const link="https://api.themoviedb.org/3";
const searchFolder="/search/movie"
const api_key= "f24a0fd18f52218851075901c5a108a0";
const request = "&query=";
const popular_request="/movie/popular";
const latest="/movie/upcoming";
const top_rated="/movie/top_rated";



//запрос API, получаем массив
const getJSON = (requestLink)=>
	fetch(requestLink)
		.then(response=> {
			if (response.ok) {
				return response.json(); //получаем строку
				}
			throw new Error(
			response.statusText
			);
		})
		.then(data=>data.results)  //получаем массив
		.catch(error => console.log(error)
		);


const makeGallery = (imageStr)=> {
		let infoAllAboutFilm ="";
		imageStr.forEach(linkScreen=>{
			if (linkScreen.poster_path)
			infoAllAboutFilm +=
				`<div style="background: url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${linkScreen.poster_path});background-size: cover;" 
				class="oneFilm"> 
					
					<div class="filmRating"> <p>${linkScreen.vote_average}</p> 
					</div>
					
					<div class="filmInfo"> 
						<div class="filmTitle"> <h2> ${linkScreen.title}</h2>
						</div>
						<p class="filmReleaseDate"> ${linkScreen.release_date.slice(0,4)} </p>
						<p class="filmOverview"> ${linkScreen.overview.slice(0,200)} </p>
					</div>
				 </div>`;
		});
		result.innerHTML = infoAllAboutFilm;
		inputStr.value = "";

};

inputSearch.addEventListener("submit",(event)=>{
	event.preventDefault();
	const searchRequest = `${link}${searchFolder}?api_key=${api_key}&page=1&${request}${inputStr.value}`;
	if (inputStr.value) {
		getJSON(searchRequest)
		.then(data=>{
			makeGallery(data);
			})
		}
	else inputStr.placeholder="Obligitory enter something!";
		
});

popularButton.addEventListener("click",(event)=>{
	const searchRequest = `${link}${popular_request}?api_key=${api_key}&page=1&`;
	getJSON(searchRequest)
		.then(data=>makeGallery(data));
});

latestButton.addEventListener("click",(event)=>{
	const searchRequest = `${link}${latest}?api_key=${api_key}&language=en-US`;
	getJSON(searchRequest)
		.then(data=>makeGallery(data));
});
topRatedButton.addEventListener("click",(event)=>{
	const searchRequest = `${link}${top_rated}?api_key=${api_key}&page=1`;
	getJSON(searchRequest)
		.then(data=>makeGallery(data));
});

//начальная страница
const searchRequest = `${link}${latest}?api_key=${api_key}&language=en-US`;
	getJSON(searchRequest)
		.then(data=>makeGallery(data));