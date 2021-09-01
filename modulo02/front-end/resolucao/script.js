const movies = document.querySelector('.movies');
const highlightVideo = document.querySelector('.highlight__video');
const highlightTitle = document.querySelector('.highlight__title');
const highlightRating = document.querySelector('.highlight__rating');
const highlightGenres = document.querySelector('.highlight__genres');
const highlightLaunch = document.querySelector('.highlight__launch');
const highlightDescription = document.querySelector('.highlight__description');
const highlightVideoLink = document.querySelector('.highlight__video-link');

const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalGenres = document.querySelector('.modal__genres');
const modalAverage = document.querySelector('.modal__average');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const input = document.querySelector('.input');

const btnTheme = document.querySelector('.btn-theme');

let theme = localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light';

if (theme === 'dark') {
  body.style.setProperty('--background', '#242424');
  body.style.setProperty('--input-color', '#FFF');
  body.style.setProperty('--text-color', '#FFF');
  body.style.setProperty('--shadow-color', 'rgba(255, 255, 255, 0.15)');
  btnTheme.src = './assets/dark-mode.svg';
  btnPrev.src = './assets/seta-esquerda-branca.svg';
  btnNext.src = './assets/seta-direita-branca.svg';
} else {
  body.style.setProperty('--background', '#FFF');
  body.style.setProperty('--input-color', '#979797');
  body.style.setProperty('--text-color', '#000');
  body.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.15)');
  btnTheme.src = './assets/light-mode.svg';
  btnPrev.src = './assets/seta-esquerda-preta.svg';
  btnNext.src = './assets/seta-direita-preta.svg';
}

let moviesData = [];
let page = 0;
const minPage = 0;
const maxPage = 15;

btnPrev.addEventListener('click', () => {
  if (page === 0) {
    page = maxPage;
  } else {
    page -= 5;
  }

  refreshMovies();
});

btnNext.addEventListener('click', () => {
  if (page === maxPage) {
    page = minPage;
  } else {
    page += 5;
  }

  refreshMovies();
});

btnTheme.addEventListener('click', () => {
  if (theme === 'light') {
    body.style.setProperty('--background', '#242424');
    body.style.setProperty('--input-color', '#FFF');
    body.style.setProperty('--text-color', '#FFF');
    body.style.setProperty('--shadow-color', 'rgba(255, 255, 255, 0.15)');
    btnTheme.src = './assets/dark-mode.svg';
    btnPrev.src = './assets/seta-esquerda-branca.svg';
    btnNext.src = './assets/seta-direita-branca.svg';
    
    theme = 'dark';
  } else {
    body.style.setProperty('--background', '#FFF');
    body.style.setProperty('--input-color', '#979797');
    body.style.setProperty('--text-color', '#000');
    body.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.15)');
    btnTheme.src = './assets/light-mode.svg';
    btnPrev.src = './assets/seta-esquerda-preta.svg';
    btnNext.src = './assets/seta-direita-preta.svg';
    
    theme = 'light';
  }

  localStorage.setItem('theme', theme);
})

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  body.style.overflow = 'auto';
});

modal.addEventListener('click', () => {
  modal.classList.add('hidden');
  body.style.overflow = 'auto';
});

input.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;

  page = 0;
  if (input.value === '') {
    loadDiscoverMovies();
  } else {
    loadFilteredMovies(input.value);
  }

  input.value = '';
})

function loadDiscoverMovies() {
  fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false')
  .then(response => response.json())
  .then(({ results }) => {  
    moviesData = results;
    refreshMovies();
  });
}

function loadFilteredMovies(filter) {
  fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${filter}`)
  .then(response => response.json())
  .then(({ results }) => {  
    moviesData = results;
    refreshMovies();
  });
}

function refreshMovies() {
  movies.innerHTML = '';

  for (let i = page; i < page + 5; i++) {
    const movie = moviesData[i];
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie');
    movieContainer.style.backgroundImage = `url(${movie.poster_path})`;

    movieContainer.addEventListener('click', () => {
      modal.classList.remove('hidden');
      body.style.overflow = 'hidden';

      fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${movie.id}?language=pt-BR`)
      .then(response => response.json())
      .then(movieData => {
        modalTitle.textContent = movieData.title;
        modalImg.src = movieData.backdrop_path;
        modalImg.alt = movieData.title;
        modalDescription.textContent = movieData.overview;

        modalGenres.innerHTML = '';
        movieData.genres.forEach(genre => {
          const genreContainer = document.createElement('span');
          genreContainer.classList.add('modal__genre');
          genreContainer.textContent = genre.name;
          modalGenres.append(genreContainer);
        });          
        modalAverage.textContent = movieData.vote_average;
      });
    })

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info');

    const movieTitle = document.createElement('span');
    movieTitle.classList.add('movie__title');
    movieTitle.textContent = movie.title;
    movieTitle.title = movie.title;

    const movieRating = document.createElement('span');
    movieRating.classList.add('movie__rating');
    
    const ratingStar = document.createElement('img');
    ratingStar.src = './assets/estrela.svg';
    ratingStar.alt = 'Estrela';
    
    movieRating.append(ratingStar, movie.vote_average);
    movieInfo.append(movieTitle, movieRating);
    movieContainer.append(movieInfo);

    movies.append(movieContainer);
  }
}

loadDiscoverMovies();

fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR`)
.then(response => response.json())
.then(({ results }) => {
  const [firstVideo] = results;
  highlightVideoLink.href = `https://www.youtube.com/watch?v=${firstVideo.key}`;
})

fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR`)
.then(response => response.json())
.then(movieData => {
  highlightVideo.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%), url('${movieData.backdrop_path}') no-repeat center / cover`;
  highlightTitle.textContent = movieData.title;
  highlightRating.textContent = movieData.vote_average;
  highlightGenres.textContent = movieData.genres.map(genre => genre.name).join(', ');
  highlightLaunch.textContent = (new Date(movieData.release_date)).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  highlightDescription.textContent = movieData.overview
});