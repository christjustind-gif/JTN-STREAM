/* =====================================================
   JTN STREAM
   SCRIPT COMPLET
===================================================== */


/* =====================================================
   TMDB
===================================================== */

// METS TON JETON TMDB ENTRE LES GUILLEMETS
const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWRjMjc3MWUwYjdmYjI0NTBhZDFlODNlYzg1YzA1YiIsIm5iZiI6MTc4NzA2NzEyNi4yMDgsInN1YiI6IjZhODQ3YWY2NThiYzMyOTYzZDJiYjc5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OX6oEL57vReKEQ1VbSjSVOVfZ4F3RBuJRioXbcUKs_A";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP = "https://image.tmdb.org/t/p/w1280";


/* =====================================================
   FILMS — 13 FILMS
===================================================== */

const movies = [

    {
        id: "film1",
        title: "Avengers: Endgame",
        category: "Films",
        type: "video",
        video: "videos/avengers-endgame.mp4"
    },

    {
        id: "film2",
        title: "Spider-Man: No Way Home",
        category: "Films",
        type: "video",
        video: "videos/spider-man-no-way-home.mp4"
    },

    {
        id: "film3",
        title: "The Dark Knight",
        category: "Films",
        type: "video",
        video: "videos/the-dark-knight.mp4"
    },

    {
        id: "film4",
        title: "Top Gun: Maverick",
        category: "Films",
        type: "video",
        video: "videos/top-gun-maverick.mp4"
    },

    {
        id: "film5",
        title: "Avatar",
        category: "Films",
        type: "video",
        video: "videos/avatar.mp4"
    },

    {
        id: "film6",
        title: "Titanic",
        category: "Films",
        type: "video",
        video: "videos/titanic.mp4"
    },

    {
        id: "film7",
        title: "Inception",
        category: "Films",
        type: "video",
        video: "videos/inception.mp4"
    },

    {
        id: "film8",
        title: "Interstellar",
        category: "Films",
        type: "video",
        video: "videos/interstellar.mp4"
    },

    {
        id: "film9",
        title: "The Matrix",
        category: "Films",
        type: "video",
        video: "videos/the-matrix.mp4"
    },

    {
        id: "film10",
        title: "John Wick",
        category: "Action",
        type: "video",
        video: "videos/john-wick.mp4"
    },

    {
        id: "film11",
        title: "Joker",
        category: "Films",
        type: "video",
        video: "videos/joker.mp4"
    },

    {
        id: "film12",
        title: "Jurassic World",
        category: "Films",
        type: "video",
        video: "videos/jurassic-world.mp4"
    },

    {
        id: "film13",
        title: "Black Panther",
        category: "Action",
        type: "video",
        video: "videos/black-panther.mp4"
    }

];


/* =====================================================
   ÉLÉMENTS HTML
===================================================== */

const intro =
    document.getElementById("intro");

const homePage =
    document.getElementById("homePage");

const movieDetailsPage =
    document.getElementById("movieDetailsPage");

const detailsBackdrop =
    document.getElementById("detailsBackdrop");

const detailsPoster =
    document.getElementById("detailsPoster");

const detailsTitle =
    document.getElementById("detailsTitle");

const detailsInfo =
    document.getElementById("detailsInfo");

const detailsDescription =
    document.getElementById("detailsDescription");

const detailsRecommendations =
    document.getElementById("detailsRecommendations");

const closeMovieDetails =
    document.getElementById("closeMovieDetails");

const detailsWatchBtn =
    document.getElementById("detailsWatchBtn");

const detailsDownloadBtn =
    document.getElementById("detailsDownloadBtn");

const detailsFavoriteBtn =
    document.getElementById("detailsFavoriteBtn");

const player =
    document.getElementById("player");

const video =
    document.getElementById("video");

const vdoFrame =
    document.getElementById("vdoFrame");

const closePlayer =
    document.getElementById("closePlayer");

const favoritesPage =
    document.getElementById("favoritesPage");

const downloadsPage =
    document.getElementById("downloadsPage");

const favoriteList =
    document.getElementById("favoriteList");

const downloadList =
    document.getElementById("downloadList");

const homeBtn =
    document.getElementById("homeBtn");

const favoritesBtn =
    document.getElementById("favoritesBtn");

const downloadsBtn =
    document.getElementById("downloadsBtn");

const settingsBtnBottom =
    document.getElementById("settingsBtnBottom");

const backFromFavorites =
    document.getElementById("backFromFavorites");

const backFromDownloads =
    document.getElementById("backFromDownloads");

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");

const settingsBtn =
    document.getElementById("settingsBtn");


/* =====================================================
   ÉCHAPPER HTML
===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   TROUVER UN FILM
===================================================== */

function getMovieById(id) {

    return movies.find(
        function (movie) {
            return movie.id === id;
        }
    );

}


/* =====================================================
   TMDB — RECHERCHE
===================================================== */

async function searchTMDB(movieName) {

    if (
        !TMDB_API_KEY ||
        TMDB_API_KEY === "TON_JETON_TMDB_ICI"
    ) {

        console.warn(
            "TMDB : jeton non configuré."
        );

        return null;
    }


    try {

        const response =
            await fetch(
                "https://api.themoviedb.org/3/search/movie" +
                "?query=" +
                encodeURIComponent(movieName) +
                "&language=fr-FR" +
                "&include_adult=false",
                {
                    headers: {

                        Authorization:
                            "Bearer " +
                            TMDB_API_KEY,

                        accept:
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "TMDB HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        if (
            data.results &&
            data.results.length > 0
        ) {

            return data.results[0];

        }


        return null;

    } catch (error) {

        console.error(
            "Erreur recherche TMDB :",
            error
        );

        return null;
    }

}


/* =====================================================
   TMDB — DÉTAILS
===================================================== */

async function getTMDBDetails(movieId) {

    if (
        !TMDB_API_KEY ||
        TMDB_API_KEY === "TON_JETON_TMDB_ICI"
    ) {

        return null;
    }


    try {

        const response =
            await fetch(
                "https://api.themoviedb.org/3/movie/" +
                movieId +
                "?language=fr-FR",
                {
                    headers: {

                        Authorization:
                            "Bearer " +
                            TMDB_API_KEY,

                        accept:
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "TMDB DETAILS HTTP " +
                response.status
            );
        }


        return await response.json();

    } catch (error) {

        console.error(
            "Erreur détails TMDB :",
            error
        );

        return null;
    }

}


/* =====================================================
   CHARGER LES INFORMATIONS TMDB
===================================================== */

async function loadTMDBMovies() {

    if (
        !TMDB_API_KEY ||
        TMDB_API_KEY === "TON_JETON_TMDB_ICI"
    ) {

        console.warn(
            "TMDB : configure ton jeton."
        );

        return;
    }


    console.log(
        "TMDB : chargement des 13 films..."
    );


    for (
        const movie of movies
    ) {

        try {

            const result =
                await searchTMDB(
                    movie.title
                );


            if (!result) {

                console.warn(
                    "TMDB : film non trouvé :",
                    movie.title
                );

                continue;
            }


            movie.tmdbId =
                result.id;


            movie.tmdbTitle =
                result.title ||
                movie.title;


            movie.overview =
                result.overview ||
                "";


            movie.rating =
                result.vote_average ||
                0;


            movie.releaseDate =
                result.release_date ||
                "";


            movie.tmdbPoster =
                result.poster_path
                    ? TMDB_IMAGE +
                      result.poster_path
                    : "";


            movie.backdrop =
                result.backdrop_path
                    ? TMDB_BACKDROP +
                      result.backdrop_path
                    : "";


            const details =
                await getTMDBDetails(
                    result.id
                );


            if (details) {

                movie.overview =
                    details.overview ||
                    movie.overview;


                movie.rating =
                    details.vote_average ||
                    movie.rating;


                movie.releaseDate =
                    details.release_date ||
                    movie.releaseDate;


                movie.tmdbPoster =
                    details.poster_path
                        ? TMDB_IMAGE +
                          details.poster_path
                        : movie.tmdbPoster;


                movie.backdrop =
                    details.backdrop_path
                        ? TMDB_BACKDROP +
                          details.backdrop_path
                        : movie.backdrop;


                movie.genres =
                    details.genres ||
                    [];

            }


            if (movie.tmdbPoster) {

                movie.poster =
                    movie.tmdbPoster;

            }


            updateMovieCard(
                movie
            );


            console.log(
                "TMDB chargé :",
                movie.title
            );

        } catch (error) {

            console.error(
                "Erreur TMDB pour",
                movie.title,
                error
            );

        }

    }


    console.log(
        "TMDB : chargement terminé."
    );

}


/* =====================================================
   METTRE À JOUR UNE CARTE
===================================================== */

function updateMovieCard(movie) {

    if (!movie) {
        return;
    }


    const card =
        document.querySelector(
            '.movie[data-id="' +
            movie.id +
            '"]'
        );


    if (!card) {

        console.warn(
            "Carte introuvable :",
            movie.id
        );

        return;
    }


    const poster =
        card.querySelector(
            ".poster"
        );


    const titleElement =
        card.querySelector(
            "h3"
        );


    if (titleElement) {

        titleElement.textContent =
            movie.tmdbTitle ||
            movie.title;

    }


    if (
        poster &&
        movie.tmdbPoster
    ) {

        poster.style.backgroundImage =
            "url('" +
            movie.tmdbPoster +
            "')";

        poster.style.backgroundSize =
            "cover";

        poster.style.backgroundPosition =
            "center";

    }

}


/* =====================================================
   METTRE À JOUR TOUTES LES CARTES
===================================================== */

function updateAllMovieCards() {

    movies.forEach(
        function (movie) {

            updateMovieCard(
                movie
            );

        }
    );

}


/* =====================================================
   CLIC SUR LES 13 CARTES
===================================================== */

function setupMovieCards() {

    const cards =
        document.querySelectorAll(
            ".movie"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const id =
                        card.dataset.id;

                    const movie =
                        getMovieById(
                            id
                        );


                    if (!movie) {

                        console.error(
                            "Film introuvable :",
                            id
                        );

                        return;
                    }


                    openMovieDetails(
                        movie
                    );

                }
            );

        }
    );

}


/* =====================================================
   FICHE DU FILM
===================================================== */

function openMovieDetails(movie) {

    if (!movie) {
        return;
    }


    if (movieDetailsPage) {

        movieDetailsPage.classList.add(
            "active"
        );

    }


    document.body.style.overflow =
        "hidden";


    const title =
        movie.tmdbTitle ||
        movie.title ||
        "Titre inconnu";


    const overview =
        movie.overview ||
        "Aucun résumé disponible.";


    const rating =
        movie.rating
            ? Number(
                movie.rating
            ).toFixed(1)
            : "—";


    const releaseDate =
        movie.releaseDate ||
        "Date inconnue";


    const poster =
        movie.poster ||
        "";


    const backdrop =
        movie.backdrop ||
        poster;


    if (detailsTitle) {

        detailsTitle.textContent =
            title;

    }


    if (detailsDescription) {

        detailsDescription.textContent =
            overview;

    }


    if (detailsInfo) {

        const category =
            movie.category ||
            "Film";


        detailsInfo.textContent =
            category +
            " • ⭐ " +
            rating +
            "/10 • 📅 " +
            releaseDate;

    }


    if (detailsPoster) {

        if (poster) {

            detailsPoster.style.backgroundImage =
                "url('" +
                poster +
                "')";

        } else {

            detailsPoster.style.backgroundImage =
                "linear-gradient(145deg,#461010,#111)";

        }

    }


    if (detailsBackdrop) {

        if (backdrop) {

            detailsBackdrop.style.backgroundImage =
                "linear-gradient(to bottom, rgba(0,0,0,.05), #050505 85%, #050505), url('" +
                backdrop +
                "')";

        } else {

            detailsBackdrop.style.backgroundImage =
                "linear-gradient(to bottom, rgba(0,0,0,.05), #050505 85%, #050505)";

        }

    }


    updateFavoriteButton(
        movie
    );


    loadRecommendations(
        movie
    );


    if (detailsWatchBtn) {

        detailsWatchBtn.onclick =
            function () {

                watchMovie(
                    movie
                );

            };

    }


    if (detailsDownloadBtn) {

        detailsDownloadBtn.onclick =
            function () {

                addDownload(
                    movie
                );

            };

    }


    if (detailsFavoriteBtn) {

        detailsFavoriteBtn.onclick =
            function () {

                toggleFavorite(
                    movie
                );

            };

    }

}


/* =====================================================
   FERMER LA FICHE
===================================================== */

function closeDetailsPage() {

    if (movieDetailsPage) {

        movieDetailsPage.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


if (closeMovieDetails) {

    closeMovieDetails.onclick =
        closeDetailsPage;

}


/* =====================================================
   RECOMMANDATIONS
===================================================== */

function loadRecommendations(currentMovie) {

    if (!detailsRecommendations) {
        return;
    }


    detailsRecommendations.innerHTML =
        "";


    movies
        .filter(
            function (movie) {

                return movie.id !==
                    currentMovie.id;

            }
        )
        .slice(0, 6)
        .forEach(
            function (movie) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "details-recommendation-card";


                const poster =
                    document.createElement(
                        "div"
                    );


                poster.className =
                    "poster";


                if (movie.poster) {

                    poster.style.backgroundImage =
                        "url('" +
                        movie.poster +
                        "')";

                }


                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    movie.tmdbTitle ||
                    movie.title;


                card.appendChild(
                    poster
                );


                card.appendChild(
                    title
                );


                card.addEventListener(
                    "click",
                    function () {

                        openMovieDetails(
                            movie
                        );

                    }
                );


                detailsRecommendations.appendChild(
                    card
                );

            }
        );

}


/* =====================================================
   REGARDER
===================================================== */

function watchMovie(movie) {

    if (!movie) {
        return;
    }


    if (!player) {
        return;
    }


    player.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    /* =================================================
       RÉINITIALISER LE LECTEUR VIDÉO
    ================================================= */

    if (video) {

        video.pause();

        video.removeAttribute(
            "src"
        );

        video.load();

        video.style.display =
            "none";

    }


    if (vdoFrame) {

        vdoFrame.src =
            "";

        vdoFrame.style.display =
            "none";

    }


    /* =================================================
       VIDÉO EXTERNE
    ================================================= */

    if (
        movie.video &&
        (
            movie.video.startsWith(
                "http://"
            ) ||
            movie.video.startsWith(
                "https://"
            )
        )
    ) {

        if (vdoFrame) {

            vdoFrame.src =
                movie.video;

            vdoFrame.style.display =
                "block";

        }

        return;

    }


    /* =================================================
       VIDÉO LOCALE
    ================================================= */

    if (
        movie.video
    ) {

        if (video) {

            video.src =
                movie.video;

            video.style.display =
                "block";

            video.load();


            const playPromise =
                video.play();


            if (playPromise) {

                playPromise.catch(
                    function (error) {

                        console.log(
                            "Lecture automatique bloquée :",
                            error
                        );

                    }
                );

            }

        }

        return;

    }


    /* =================================================
       AUCUNE VIDÉO
    ================================================= */

    console.warn(
        "Aucune vidéo disponible pour :",
        movie.title
    );


    player.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   FERMER LE LECTEUR
===================================================== */

if (closePlayer) {

    closePlayer.onclick =
        function () {


            /* ARRÊTER VIDÉO */

            if (video) {

                video.pause();

                video.removeAttribute(
                    "src"
                );

                video.load();

                video.style.display =
                    "none";

            }


            /* ARRÊTER IFRAME */

            if (vdoFrame) {

                vdoFrame.src =
                    "";

                vdoFrame.style.display =
                    "none";

            }


            /* FERMER */

            if (player) {

                player.classList.remove(
                    "active"
                );

            }


            /* REMETTRE LE SCROLL */

            document.body.style.overflow =
                "";

        };

}


/* =====================================================
   FIN — REGARDER
===================================================== */

/* =====================================================
   CARTES DES FILMS — CLIC
===================================================== */

function setupMovieCards() {

    const cards =
        document.querySelectorAll(
            ".movie"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const id =
                        card.dataset.id;


                    const movie =
                        getMovieById(id);


                    if (!movie) {

                        console.warn(
                            "Film introuvable :",
                            id
                        );

                        return;
                    }


                    /* Récupérer la vidéo du HTML
                       si elle existe */

                    if (
                        card.dataset.video
                    ) {

                        movie.video =
                            card.dataset.video;

                    }


                    openMovieDetails(
                        movie
                    );

                }
            );

        }
    );

}


/* =====================================================
   RÉCUPÉRER UN FILM PAR ID
===================================================== */

function getMovieById(id) {

    if (!id) {
        return null;
    }


    return movies.find(
        function (movie) {

            return movie.id === id;

        }
    ) || null;

}


/* =====================================================
   METTRE À JOUR UNE CARTE
===================================================== */

function updateMovieCard(movie) {

    if (!movie) {
        return;
    }


    const card =
        document.querySelector(
            '.movie[data-id="' +
            movie.id +
            '"]'
        );


    if (!card) {
        return;
    }


    const titleElement =
        card.querySelector(
            "h3"
        );


    if (titleElement) {

        titleElement.textContent =
            movie.tmdbTitle ||
            movie.title;

    }


    const poster =
        card.querySelector(
            ".poster"
        );


    if (
        poster &&
        movie.poster
    ) {

        poster.style.backgroundImage =
            'url("' +
            movie.poster +
            '")';

    }

}


/* =====================================================
   METTRE À JOUR TOUTES LES CARTES
===================================================== */

function updateAllMovieCards() {

    movies.forEach(
        function (movie) {

            updateMovieCard(
                movie
            );

        }
    );

}


/* =====================================================
   OUVRIR LA FICHE DU FILM
===================================================== */

function openMovieDetails(movie) {

    if (!movie) {
        return;
    }


    const page =
        document.getElementById(
            "movieDetailsPage"
        );


    if (!page) {
        return;
    }


    const title =
        movie.tmdbTitle ||
        movie.title ||
        "Titre inconnu";


    const rating =
        movie.rating
            ? Number(
                movie.rating
            ).toFixed(1)
            : "—";


    const date =
        movie.releaseDate ||
        "Date inconnue";


    const description =
        movie.overview ||
        "Aucun résumé disponible.";


    const poster =
        movie.poster ||
        "";


    const backdrop =
        movie.backdrop ||
        poster;


    const detailsTitle =
        document.getElementById(
            "detailsTitle"
        );


    const detailsInfo =
        document.getElementById(
            "detailsInfo"
        );


    const detailsDescription =
        document.getElementById(
            "detailsDescription"
        );


    const detailsPoster =
        document.getElementById(
            "detailsPoster"
        );


    const detailsBackdrop =
        document.getElementById(
            "detailsBackdrop"
        );


    if (detailsTitle) {

        detailsTitle.textContent =
            title;

    }


    if (detailsInfo) {

        detailsInfo.textContent =
            movie.category +
            " • ⭐ " +
            rating +
            "/10 • 📅 " +
            date;

    }


    if (detailsDescription) {

        detailsDescription.textContent =
            description;

    }


    if (detailsPoster) {

        detailsPoster.style.backgroundImage =
            poster
                ? 'url("' +
                  poster +
                  '")'
                : "";

    }


    if (detailsBackdrop) {

        detailsBackdrop.style.backgroundImage =
            backdrop
                ? `
                    linear-gradient(
                        to bottom,
                        rgba(0,0,0,.15),
                        #050505 85%
                    ),
                    url("${backdrop}")
                  `
                : "";

    }


    page.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    currentMovie =
        movie;


    setupDetailsButtons(
        movie
    );


    renderRecommendations(
        movie
    );

}


/* =====================================================
   BOUTONS DE LA FICHE
===================================================== */

function setupDetailsButtons(movie) {

    const watchButton =
        document.getElementById(
            "detailsWatchBtn"
        );


    const favoriteButton =
        document.getElementById(
            "detailsFavoriteBtn"
        );


    const downloadButton =
        document.getElementById(
            "detailsDownloadBtn"
        );


    if (watchButton) {

        watchButton.onclick =
            function () {

                watchMovie(
                    movie
                );

            };

    }


    if (favoriteButton) {

        favoriteButton.onclick =
            function () {

                toggleFavorite(
                    movie
                );

                updateFavoriteButton(
                    movie
                );

            };

    }


    if (downloadButton) {

        downloadButton.onclick =
            function () {

                addDownload(
                    movie
                );

            };

    }


    updateFavoriteButton(
        movie
    );

}


/* =====================================================
   BOUTON FAVORI
===================================================== */

function updateFavoriteButton(movie) {

    const button =
        document.getElementById(
            "detailsFavoriteBtn"
        );


    if (!button) {
        return;
    }


    const favorites =
        JSON.parse(
            localStorage.getItem(
                "jtn_favorites"
            ) || "[]"
        );


    const exists =
        favorites.some(
            function (item) {

                return item.id ===
                    movie.id;

            }
        );


    button.textContent =
        exists
            ? "♥ Retirer des favoris"
            : "♡ Ajouter aux favoris";

}


/* =====================================================
   AJOUTER / RETIRER FAVORI
===================================================== */

function toggleFavorite(movie) {

    if (!movie) {
        return;
    }


    let favorites =
        JSON.parse(
            localStorage.getItem(
                "jtn_favorites"
            ) || "[]"
        );


    const index =
        favorites.findIndex(
            function (item) {

                return item.id ===
                    movie.id;

            }
        );


    if (index !== -1) {

        favorites.splice(
            index,
            1
        );

    } else {

        favorites.push(
            movie
        );

    }


    localStorage.setItem(
        "jtn_favorites",
        JSON.stringify(
            favorites
        )
    );


    renderFavorites();

}


/* =====================================================
   AFFICHER LES FAVORIS
===================================================== */

function renderFavorites() {

    const list =
        document.getElementById(
            "favoriteList"
        );


    if (!list) {
        return;
    }


    const favorites =
        JSON.parse(
            localStorage.getItem(
                "jtn_favorites"
            ) || "[]"
        );


    if (
        favorites.length === 0
    ) {

        list.innerHTML =
            `
                <div class="empty-message">
                    Aucun favori pour le moment.
                </div>
            `;

        return;

    }


    list.innerHTML =
        "";


    favorites.forEach(
        function (movie) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "favorite-card";


            const poster =
                movie.poster ||
                "";


            card.innerHTML =
                `
                    <div
                        class="poster"
                        style="
                            background-image:
                            url('${poster}');
                            background-size:cover;
                            background-position:center;
                        "
                    ></div>

                    <h3>
                        ${escapeHTML(
                            movie.tmdbTitle ||
                            movie.title
                        )}
                    </h3>

                    <div class="favorite-card-actions">

                        <button
                            class="favorite-watch"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            class="favorite-remove"
                        >
                            Retirer
                        </button>

                    </div>
                `;


            card.querySelector(
                ".favorite-watch"
            ).onclick =
                function () {

                    watchMovie(
                        movie
                    );

                };


            card.querySelector(
                ".favorite-remove"
            ).onclick =
                function () {

                    toggleFavorite(
                        movie
                    );

                };


            list.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   TÉLÉCHARGEMENTS
===================================================== */

function addDownload(movie) {

    if (!movie) {
        return;
    }


    let downloads =
        JSON.parse(
            localStorage.getItem(
                "jtn_downloads"
            ) || "[]"
        );


    const exists =
        downloads.some(
            function (item) {

                return item.id ===
                    movie.id;

            }
        );


    if (!exists) {

        downloads.push(
            movie
        );

    }


    localStorage.setItem(
        "jtn_downloads",
        JSON.stringify(
            downloads
        )
    );


    renderDownloads();

}


/* =====================================================
   AFFICHER LES TÉLÉCHARGEMENTS
===================================================== */

function renderDownloads() {

    const list =
        document.getElementById(
            "downloadList"
        );


    if (!list) {
        return;
    }


    const downloads =
        JSON.parse(
            localStorage.getItem(
                "jtn_downloads"
            ) || "[]"
        );


    if (
        downloads.length === 0
    ) {

        list.innerHTML =
            `
                <div class="empty-message">
                    Aucun téléchargement.
                </div>
            `;

        return;

    }


    list.innerHTML =
        "";


    downloads.forEach(
        function (movie) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "download-item";


            item.innerHTML =
                `
                    <div
                        class="download-item-poster"
                        style="
                            background-image:
                            url('${movie.poster || ""}');
                            background-size:cover;
                            background-position:center;
                        "
                    ></div>

                    <div class="download-info">

                        <h3>
                            ${escapeHTML(
                                movie.tmdbTitle ||
                                movie.title
                            )}
                        </h3>

                        <p>
                            Disponible dans JTN STREAM
                        </p>

                        <button
                            class="watch-offline-btn"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            class="delete-download-btn"
                        >
                            Supprimer
                        </button>

                    </div>
                `;


            item.querySelector(
                ".watch-offline-btn"
            ).onclick =
                function () {

                    watchMovie(
                        movie
                    );

                };


            item.querySelector(
                ".delete-download-btn"
            ).onclick =
                function () {

                    deleteDownload(
                        movie.id
                    );

                };


            list.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   SUPPRIMER TÉLÉCHARGEMENT
===================================================== */

function deleteDownload(id) {

    let downloads =
        JSON.parse(
            localStorage.getItem(
                "jtn_downloads"
            ) || "[]"
        );


    downloads =
        downloads.filter(
            function (movie) {

                return movie.id !==
                    id;

            }
        );


    localStorage.setItem(
        "jtn_downloads",
        JSON.stringify(
            downloads
        )
    );


    renderDownloads();

}


/* =====================================================
   RECOMMANDATIONS
===================================================== */

function renderRecommendations(movie) {

    const container =
        document.getElementById(
            "detailsRecommendations"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    movies
        .filter(
            function (item) {

                return item.id !==
                    movie.id;

            }
        )
        .slice(
            0,
            6
        )
        .forEach(
            function (item) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "details-recommendation-card";


                card.innerHTML =
                    `
                        <div
                            class="poster"
                            style="
                                background-image:
                                url('${item.poster || ""}');
                                background-size:cover;
                                background-position:center;
                            "
                        ></div>

                        <h3>
                            ${escapeHTML(
                                item.tmdbTitle ||
                                item.title
                            )}
                        </h3>
                    `;


                card.onclick =
                    function () {

                        openMovieDetails(
                            item
                        );

                    };


                container.appendChild(
                    card
                );

            }
        );

}


/* =====================================================
   FERMER FICHE DU FILM
===================================================== */

if (closeMovieDetails) {

    closeMovieDetails.onclick =
        function () {

            const page =
                document.getElementById(
                    "movieDetailsPage"
                );


            if (page) {

                page.classList.remove(
                    "active"
                );

            }


            document.body.style.overflow =
                "";

        };

}


/* =====================================================
   NAVIGATION ACCUEIL
===================================================== */

function showHome() {

    const detailsPage =
        document.getElementById(
            "movieDetailsPage"
        );


    const favoritesPage =
        document.getElementById(
            "favoritesPage"
        );


    const downloadsPage =
        document.getElementById(
            "downloadsPage"
        );


    const homePage =
        document.getElementById(
            "homePage"
        );


    if (detailsPage) {

        detailsPage.classList.remove(
            "active"
        );

    }


    if (favoritesPage) {

        favoritesPage.classList.remove(
            "active"
        );

    }


    if (downloadsPage) {

        downloadsPage.classList.remove(
            "active"
        );

    }


    if (homePage) {

        homePage.style.display =
            "";

    }


    document.body.style.overflow =
        "";

}


/* =====================================================
   NAVIGATION FAVORIS
===================================================== */

function showFavorites() {

    const homePage =
        document.getElementById(
            "homePage"
        );


    const favoritesPage =
        document.getElementById(
            "favoritesPage"
        );


    const downloadsPage =
        document.getElementById(
            "downloadsPage"
        );


    if (homePage) {

        homePage.style.display =
            "none";

    }


    if (downloadsPage) {

        downloadsPage.classList.remove(
            "active"
        );

    }


    if (favoritesPage) {

        favoritesPage.classList.add(
            "active"
        );

    }


    renderFavorites();

}


/* =====================================================
   NAVIGATION TÉLÉCHARGEMENTS
===================================================== */

function showDownloads() {

    const homePage =
        document.getElementById(
            "homePage"
        );


    const favoritesPage =
        document.getElementById(
            "favoritesPage"
        );


    const downloadsPage =
        document.getElementById(
            "downloadsPage"
        );


    if (homePage) {

        homePage.style.display =
            "none";

    }


    if (favoritesPage) {

        favoritesPage.classList.remove(
            "active"
        );

    }


    if (downloadsPage) {

        downloadsPage.classList.add(
            "active"
        );

    }


    renderDownloads();

}


/* =====================================================
   BOUTONS NAVIGATION BAS
===================================================== */

if (homeBtn) {

    homeBtn.onclick =
        function () {

            showHome();

        };

}


/* =====================================================
   BOUTON FAVORIS
===================================================== */

if (favoritesBtn) {

    favoritesBtn.onclick =
        function () {

            showFavorites();

        };

}


/* =====================================================
   BOUTON TÉLÉCHARGEMENTS
===================================================== */

if (downloadsBtn) {

    downloadsBtn.onclick =
        function () {

            showDownloads();

        };

}


/* =====================================================
   RETOUR FAVORIS
===================================================== */

if (backFromFavorites) {

    backFromFavorites.onclick =
        function () {

            showHome();

        };

}


/* =====================================================
   RETOUR TÉLÉCHARGEMENTS
===================================================== */

if (backFromDownloads) {

    backFromDownloads.onclick =
        function () {

            showHome();

        };

}


/* =====================================================
   PARAMÈTRES
===================================================== */

if (settingsBtnBottom) {

    settingsBtnBottom.onclick =
        function () {

            window.location.href =
                "settings.html";

        };

}


if (settingsBtn) {

    settingsBtn.onclick =
        function () {

            window.location.href =
                "settings.html";

        };

}


/* =====================================================
   HERO — REGARDER
===================================================== */

if (heroPlay) {

    heroPlay.onclick =
        function () {

            const movie =
                getMovieById("film1");

            if (movie) {

                watchMovie(movie);

            }

        };

}


/* =====================================================
   HERO — INFOS
===================================================== */

if (heroInfo) {

    heroInfo.onclick =
        function () {

            const movie =
                getMovieById("film1");

            if (movie) {

                openMovieDetails(movie);

            }

        };

}


/* =====================================================
   RECHERCHE
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const cards =
                document.querySelectorAll(
                    ".movie"
                );


            cards.forEach(
                function (card) {

                    const title =
                        (
                            card.dataset.title ||
                            card.querySelector("h3")?.textContent ||
                            ""
                        ).toLowerCase();


                    if (
                        !query ||
                        title.includes(query)
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


/* =====================================================
   FERMER LA RECHERCHE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            searchBox &&
            searchBox.classList.contains("active") &&
            !searchBox.contains(event.target) &&
            !searchBtn?.contains(event.target)
        ) {

            searchBox.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "JTN STREAM : démarrage..."
        );


        setupMovieCards();


        updateAllMovieCards();


        renderFavorites();


        renderDownloads();


        loadTMDBMovies();

    }
);
