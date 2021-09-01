const input = document.querySelector('.input');
const gallery = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const highVideoLink = document.querySelector(".highlight__video-link");
const highVideo = document.querySelector(".highlight__video");
const highInfo = document.querySelector(".highlight__info");
const highTitlte = document.querySelector(".highlight__title");
const highRating = document.querySelector(".highlight__rating");
const highGenres = document.querySelector(".highlight__genres");
const highLaunch = document.querySelector(".highlight__launch");
const highDescription = document.querySelector(".highlight__description");


const modal = document.querySelector('.modal');
const modalClose = document.querySelector(".modal__close");
const modalTitle = document.querySelector(".modal__title");
const modalImg = document.querySelector(".modal__img");
const modalDescription = document.querySelector(".modal__description");
const modalAverage = document.querySelector(".modal__average");
const modalGenres = document.querySelector(".modal__genres");

const firstDivMmovie = document.querySelector(".movie");
firstDivMmovie.remove();


fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false`).then(function (response) {
    const promisseBody = response.json();

    promisseBody.then(async function (body) {
        let start = 0;
        let end = 5;
        let max = 15;

        const moviesArray = body.results;
        let searchedMovies = [];
        let searching = false;

        function showMovies(movies) {
            let screenMovies = movies.slice(start, end);

            screenMovies.forEach((page) => {
                const divMovie = document.createElement("div");
                divMovie.classList.add("movie");
                divMovie.id = String(page.id);
                divMovie.style.backgroundImage = `url(${page.poster_path})`;
                gallery.append(divMovie);

                const divMovieInfo = document.createElement("div");
                divMovieInfo.classList.add("movie__info");
                divMovie.append(divMovieInfo);

                const spanMovieTitle = document.createElement("span");
                const spanMovieRating = document.createElement("span");
                spanMovieTitle.classList.add("movie__title");
                spanMovieRating.classList.add("movie__rating");

                const movieTitle = page.title.slice(0, 9) + "...";
                spanMovieTitle.textContent = movieTitle;

                const starImg = document.createElement("img");
                starImg.src = "./assets/estrela.svg";
                spanMovieRating.append(starImg);

                const spanAverage = document.createElement("span");
                spanAverage.textContent = page.vote_average;
                spanMovieRating.append(spanAverage);

                divMovieInfo.append(spanMovieTitle, spanMovieRating);
            });
        }

        showMovies(moviesArray);

        input.addEventListener("keydown", function (event) {
            let pressKey = event.key;

            if (pressKey == "Enter" && input.value != "") {
                searching = true;

                fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`).then(function (response) {
                    const promisseBody = response.json();

                    promisseBody.then(function (body) {
                        const divs = document.querySelectorAll(".movie");

                        divs.forEach((element) => {
                            element.remove();
                        });

                        searchedMovies = body.results;

                        start = 0;
                        end = 5;

                        const arrayLength = searchedMovies.length;

                        if (arrayLength / 4 < 1.26) {
                            max = 0;
                        } else if (arrayLength / 4 < 2.51) {
                            max = 5;
                        } else if (arrayLength / 4 < 3.76) {
                            max = 10;
                        } else {
                            max = 15;
                        }

                        showMovies(searchedMovies);
                    });
                });

                input.value = "";

            } else if (pressKey == "Enter" && input.value == "") {
                searching = false;
                const divs = document.querySelectorAll(".movie");

                divs.forEach((element) => {
                    element.remove();
                });
                showMovies(moviesArray);
            } 
        });

        btnNext.addEventListener("click", function () {
            if (!searching) {
                const divs = document.querySelectorAll(".movie");
                divs.forEach((div) => {
                    div.remove();
                });

                start += 5;
                end += 5;

                if (start < max + 1) {
                    showMovies(moviesArray);
                } else {
                    start = 0;
                    end = 5;
                    showMovies(moviesArray);
                }
            } else {
                const divs = document.querySelectorAll(".movie");

                divs.forEach((element) => {
                    element.remove();
                });

                start += 5;
                end += 5;

                if (start < max + 1) {
                    showMovies(searchedMovies);
                } else {
                    start = 0;
                    end = 5;
                    showMovies(searchedMovies);
                }
            }
        });

        btnPrev.addEventListener("click", function () {
            if (!searching) {
                const divs = document.querySelectorAll(".movie");

                divs.forEach((element) => {
                    element.remove();
                });

                start -= 5;
                end -= 5;

                if (start > -1) {
                    showMovies(moviesArray);
                } else {
                    start = max;
                    end = max + 5;
                    showMovies(moviesArray);
                }
            } else {
                const divs = document.querySelectorAll(".movie");

                divs.forEach((element) => {
                    element.remove();
                });

                start -= 5;
                end -= 5;

                if (start > -1) {
                    showMovies(searchedMovies);
                } else {
                    start = max;
                    end = max + 5;
                    showMovies(searchedMovies);
                }
            }
        });

        gallery.addEventListener("click", function (event) {
            const id = event.target.attributes[1].value;

            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`).then(function (response) {
                const promisseBody = response.json();

                promisseBody.then(async function (body) {
                    const gendersArray = body.genres;

                    gendersArray.forEach((e) => {
                        const p = document.createElement("p");
                        p.textContent = e.name;
                        modalGenres.append(p);
                    });

                    modal.classList.remove("hidden");

                    modalTitle.textContent = body.title;
                    modalImg.src = body.backdrop_path;
                    modalDescription.textContent = body.overview;
                    modalAverage.textContent = body.vote_average;
                });
            });
        });
    });
});



fetch("https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR").then(function (response) {
    const promisseBody = response.json();

    promisseBody.then(function (body) {
        const date = body.release_date;
        const arr = date.split("-");
        let month = arr[1];

        switch (month) {
            case "01":
                month = "Janeiro";
                break;
            case "02":
                month = "Fevereiro";
                break;
            case "03":
                month = "Março";
                break;
            case "04":
                month = "Abril";
                break;
            case "05":
                month = "Maio";
                break;
            case "06":
                month = "Junho";
                break;
            case "07":
                month = "Julho";
                break;
            case "08":
                month = "Agosto";
                break;
            case "09":
                month = "Setembro";
                break;
            case "10":
                month = "Outubro";
                break;
            case "11":
                month = "Novembro";
                break;
            case "12":
                month = "Dezembro";
                break;
        }

        arr[1] = month;

        const nDate = arr.reverse().join().replaceAll(",", " de ");

        highTitlte.textContent = body.title;
        highRating.textContent = body.vote_average;
        highLaunch.textContent = nDate;
        highDescription.textContent = body.overview;
        highVideo.style.background = `no-repeat center/110% url(${body.backdrop_path})`;

        gendersArray = body.genres;

        gendersArray.forEach((e, i) => {
            gendersArray.length - 1 !== i ? (highGenres.textContent += `${e.name}, `) : (highGenres.textContent += `${e.name} `);
        });
    });
});


fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR`).then(function (response) {
    const promisseBody = response.json();

    promisseBody.then(async function (body) {
        const key = body.results[0].key;
        highVideoLink.href = `https://www.youtube.com/watch?v=${key}`;
    });
});



modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", closeModal);

modalImg.addEventListener("click", function (event) {
    event.stopPropagation();
});

function closeModal() {
    const p = document.querySelectorAll(".modal__genres>p");

    p.forEach((element) => {
        element.remove();
    });

    modal.classList.add("hidden");
}

