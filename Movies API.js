const form = document.querySelector('#form');
const searchForm = document.querySelector('#searchForm');
const button = document.querySelector('#button');
const container = document.querySelector('#container');
const newDiv = document.createElement('div');
const title = document.querySelector('#title');
const summary = document.querySelector('#summary');
const language = document.querySelector('#language');
const category = document.querySelector('#category');
const genre = document.querySelector('#genre');
const img = document.querySelector('#img');
const linkAction = document.querySelector('#linkAction');
const linkComedy = document.querySelector('#linkComedy');
const linkHorror = document.querySelector('#linkHorror');
const linkAnime = document.querySelector('#linkAnime');
const linkFamily = document.querySelector('#linkFamily');
const linkDocumentary = document.querySelector('#linkdocumentary');
const linkScripted = document.querySelector('#linkScripted');
const linkDrama = document.querySelector('#linkDrama');
const linkSciFi = document.querySelector('#linkSciFi');
const linkFantasy = document.querySelector('#linkFantasy');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  try {
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    } catch (error) {
      console.log('error');
    }
  }
);

const makeImages = (shows) => {
  let html = '';
  shows.map(function (newArr) {
    let imageElement, bodyCard, listLanguage, listCategory, listGenre;

    try {
      imageElement = `
        <img src="${newArr.show.image.medium}" class="card-img-top" alt="..." id="img"/>
        `
    } catch (e) {
      console.log("image not found");
      imageElement = `
        <img src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
        `
    }
    try {
      bodyCard = `
        <h5 class="card-title" id="title">${newArr.show.name}</h5>
      `
    } catch (e) {
      console.log("body card error");
    }

    try {
      listLanguage = `Language: ${newArr.show.language}`
    } catch (e) {
      console.log("language not found");
      listLanguage = `Language:`
    }

    try {
      listCategory = `Category: ${newArr.show.type}`
    } catch (e) {
      console.log("category not found");
      listCategory = `Category:`
    }

    try {
      listGenre = `Genre: ${newArr.show.genres[0]}`
    } catch (e) {
      console.log("genre not found");
      listGenre = `Genre:`
    }

    html += `
            <div class="card">
              ${imageElement}
              <div class="card-body">
                ${bodyCard}
              </div>
              <div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item" id="language">${listLanguage}</li>
                  <li class="list-group-item" id="category">${listCategory}</li>
                  <li class="list-group-item" id="genre">${listGenre}</li>
                </ul>
              </div>
            </div>
            `
  }).join('');
  container.innerHTML = html;
  window.scrollTo({
    top: 1000,
    left: 0,
    behavior: 'smooth'
  });
}

searchForm.addEventListener('click', () => {
  searchForm.value = '';
});