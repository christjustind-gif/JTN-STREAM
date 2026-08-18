document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TMDB
       ===================================================== */

    const TMDB_API_KEY =
        "4a612e6631a19b542b88a5b684d4d083";


    /* =====================================================
       JTN STREAM
       ===================================================== */


    /* =====================================================
       ÉLÉMENTS
       ===================================================== */

    const homePage =
        document.getElementById("homePage");

    const favoritesPage =
        document.getElementById("favoritesPage");

    const downloadsPage =
        document.getElementById("downloadsPage");

    const favoriteList =
        document.getElementById("favoriteList");

    const downloadList =
        document.getElementById("downloadList");

    const player =
        document.getElementById("player");

    const video =
        document.getElementById("video");

    const vdoFrame =
        document.getElementById("vdoFrame");

    const closePlayer =
        document.getElementById("closePlayer");

    const searchBtn =
        document.getElementById("searchBtn");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");

    const homeBtn =
        document.getElementById("homeBtn");

    const favoritesBtn =
        document.getElementById("favoritesBtn");

    const downloadsBtn =
        document.getElementById("downloadsBtn");

    const backFromFavorites =
        document.getElementById("backFromFavorites");

    const backFromDownloads =
        document.getElementById("backFromDownloads");

    const heroPlay =
        document.getElementById("heroPlay");

    const heroInfo =
        document.getElementById("heroInfo");

    const settingsBtn =
        document.getElementById("settingsBtn");

    const settingsBtnBottom =
        document.getElementById(
            "settingsBtnBottom"
        );


    /* =====================================================
       FILMS
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
    function updateTMDBDisplay() {

    movies.forEach(function (movie) {

        const element =
            document.querySelector(
                '.movie[data-id="' +
                movie.id +
                '"]'
            );

        if (!element) {
            return;
        }

        const titleElement =
            element.querySelector(
                "[data-movie-title]"
            );

        if (titleElement) {
            titleElement.textContent =
                movie.title;
        }

        const poster =
            element.querySelector(".poster");

        if (poster && movie.poster) {

            poster.style.backgroundImage =
                "url('" + movie.poster + "')";

            poster.style.backgroundSize =
                "cover";

            poster.style.backgroundPosition =
                "center";
        }

    });

} 
// DÉMARRER TMDB
loadTMDBMovies();

});


    /* =====================================================
       TMDB — RECHERCHE
       ===================================================== */

    async function searchTMDB(movieName) {

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
                "Erreur TMDB :",
                error
            );

            return null;
        }

    }


    /* =====================================================
       TMDB — DÉTAILS DU FILM
       ===================================================== */

    async function getTMDBDetails(movieId) {

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
       TMDB — CHARGER LES INFORMATIONS
       ===================================================== */

    async function loadTMDBMovies() {

        if (!TMDB_API_KEY) {

            console.warn(
                "Clé TMDB non configurée."
            );

            return;

        }

        for (const movie of movies) {

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

                /* ID TMDB */

                movie.tmdbId =
                    result.id;

                /* TITRE OFFICIEL */

                movie.tmdbTitle =
                    result.title ||
                    movie.title;

                /* RÉSUMÉ */

                movie.overview =
                    result.overview ||
                    "";

                /* NOTE */

                movie.rating =
                    result.vote_average ||
                    0;

                /* DATE */

                movie.releaseDate =
                    result.release_date ||
                    "";

                /* AFFICHE */

                movie.tmdbPoster =
                    result.poster_path
                        ? "https://image.tmdb.org/t/p/w500" +
                          result.poster_path
                        : "";

                /* IMAGE DE FOND */

                movie.backdrop =
                    result.backdrop_path
                        ? "https://image.tmdb.org/t/p/w1280" +
                          result.backdrop_path
                        : "";

                /* DÉTAILS COMPLETS */

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

                    if (
                        details.poster_path
                    ) {

                        movie.tmdbPoster =
                            "https://image.tmdb.org/t/p/w500" +
                            details.poster_path;

                    }

                    if (
                        details.backdrop_path
                    ) {

                        movie.backdrop =
                            "https://image.tmdb.org/t/p/w1280" +
                            details.backdrop_path;

                    }

                    movie.genres =
                        details.genres || [];

                }

                /* TMDB devient l'affiche principale */

                if (
                    movie.tmdbPoster
                ) {

                    movie.poster =
                        movie.tmdbPoster;

                }

                /* Mettre à jour la carte */

                updateMovieCard(
                    movie
                );

                console.log(
                    "✅ TMDB chargé :",
                    movie.tmdbTitle
                );

            } catch (error) {

                console.error(
                    "❌ Erreur TMDB pour",
                    movie.title,
                    error
                );

            }

        }

        console.log(
            "🎬 TMDB terminé pour tous les films"
        );

    }

    /* =====================================================
       TMDB — CHARGER LES INFORMATIONS
       ===================================================== */

    async function loadTMDBMovies() {

        if (
            !TMDB_API_KEY ||
            TMDB_API_KEY ===
                "4a612e6631a19b542b88a5b684d4d083"
        ) {

            console.warn(
                "Clé TMDB non configurée."
            );

            return;

        }


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
                        ? "https://image.tmdb.org/t/p/w500" +
                          result.poster_path
                        : "";


                movie.backdrop =
                    result.backdrop_path
                        ? "https://image.tmdb.org/t/p/w1280" +
                          result.backdrop_path
                        : "";


                if (
                    result.genre_ids &&
                    Array.isArray(
                        result.genre_ids
                    )
                ) {

                    movie.tmdbGenreIds =
                        result.genre_ids;

                }


                /*
                 * Récupérer les détails
                 * complets de TMDB
                 */

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
                            ? "https://image.tmdb.org/t/p/w500" +
                              details.poster_path
                            : movie.tmdbPoster;


                    movie.backdrop =
                        details.backdrop_path
                            ? "https://image.tmdb.org/t/p/w1280" +
                              details.backdrop_path
                            : movie.backdrop;


                    movie.genres =
                        details.genres || [];

                }


                /*
                 * TMDB devient l'affiche principale.
                 * Si TMDB n'a pas d'affiche,
                 * on garde l'affiche locale.
                 */

                if (
                    movie.tmdbPoster
                ) {

                    movie.poster =
                        movie.tmdbPoster;

                }


                /*
                 * Mettre à jour la carte
                 * déjà présente sur l'accueil
                 */

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

    }


    /* =====================================================
       METTRE À JOUR UNE CARTE
       ===================================================== */

    function updateMovieCard(movie) {

        const movieElement =
            document.querySelector(
                '.movie[data-id="' +
                movie.id +
                '"]'
            );


        if (!movieElement) {
            return;
        }


        /*
         * Titre
         */

        const titleElement =
            movieElement.querySelector(
                "h3, .movie-title, .title"
            );


        if (titleElement) {

            titleElement.textContent =
                movie.tmdbTitle ||
                movie.title;

        }


        /*
         * Dataset
         */

        movieElement.dataset.title =
            movie.tmdbTitle ||
            movie.title;


        /*
         * Affiche
         */

        const poster =
            movieElement.querySelector(
                ".poster"
            );


        if (
            poster &&
            movie.poster
        ) {

            poster.style.backgroundImage =
                "url('" +
                movie.poster +
                "')";

            poster.style.backgroundSize =
                "cover";

            poster.style.backgroundPosition =
                "center";

        }


        /*
         * Image <img> éventuelle
         */

        const image =
            movieElement.querySelector(
                "img"
            );


        if (
            image &&
            movie.poster
        ) {

            image.src =
                movie.poster;

            image.alt =
                movie.tmdbTitle ||
                movie.title;

        }

    }


    /* =====================================================
       FAVORIS
       ===================================================== */

    let favorites = [];

    try {

        favorites =
            JSON.parse(
                localStorage.getItem(
                    "JTN_STREAM_FAVORITES"
                ) || "[]"
            );


        if (
            !Array.isArray(
                favorites
            )
        ) {

            favorites = [];

        }

    } catch (error) {

        favorites = [];

    }


    /* =====================================================
       TÉLÉCHARGEMENTS
       ===================================================== */

    let downloads = [];

    try {

        downloads =
            JSON.parse(
                localStorage.getItem(
                    "JTN_STREAM_DOWNLOADS"
                ) || "[]"
            );


        if (
            !Array.isArray(
                downloads
            )
        ) {

            downloads = [];

        }

    } catch (error) {

        downloads = [];

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function showMessage(message) {

        let box =
            document.getElementById(
                "jtnMessage"
            );


        if (!box) {

            box =
                document.createElement(
                    "div"
                );


            box.id =
                "jtnMessage";


            box.style.position =
                "fixed";

            box.style.bottom =
                "90px";

            box.style.left =
                "50%";

            box.style.transform =
                "translateX(-50%)";

            box.style.zIndex =
                "999999";

            box.style.background =
                "#181818";

            box.style.color =
                "white";

            box.style.padding =
                "14px 20px";

            box.style.borderRadius =
                "14px";

            box.style.fontWeight =
                "bold";

            box.style.textAlign =
                "center";


            document.body.appendChild(
                box
            );

        }


        box.textContent =
            message;


        box.style.display =
            "block";


        clearTimeout(
            window.jtnMessageTimer
        );


        window.jtnMessageTimer =
            setTimeout(
                function () {

                    box.style.display =
                        "none";

                },
                2500
            );

    }


    /* =====================================================
       HTML SÉCURISÉ
       ===================================================== */

    function escapeHTML(text) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            text || "";


        return element.innerHTML;

    }


    /* =====================================================
       LECTEUR
       ===================================================== */

    function watchMovie(movie) {

        if (!movie) {
            return;
        }


        if (!player) {

            showMessage(
                "❌ Lecteur introuvable"
            );

            return;

        }


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

            vdoFrame.src = "";

            vdoFrame.style.display =
                "none";

        }


        /*
         * IFRAME
         */

        if (
            movie.type === "iframe" &&
            movie.video
        ) {

            if (!vdoFrame) {

                showMessage(
                    "❌ Lecteur iframe introuvable"
                );

                return;

            }


            vdoFrame.src =
                movie.video;


            vdoFrame.style.display =
                "block";


            player.style.display =
                "flex";


            return;

        }


        /*
         * VIDÉO
         */

        if (
            movie.type === "video" &&
            movie.video &&
            video
        ) {

            video.src =
                movie.video;


            video.style.display =
                "block";


            player.style.display =
                "flex";


            video.load();


            video.play().catch(
                function () {

                    showMessage(
                        "▶ Appuie sur ▶ pour démarrer"
                    );

                }
            );


            return;

        }


        showMessage(
            "🎬 Vidéo non disponible"
        );

    }


    /* =====================================================
       FERMER LE LECTEUR
       ===================================================== */

    function closeVideo() {

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

            vdoFrame.src = "";

            vdoFrame.style.display =
                "none";

        }


        if (player) {

            player.style.display =
                "none";

        }

    }


    if (closePlayer) {

        closePlayer.addEventListener(
            "click",
            closeVideo
        );

    }


    /* =====================================================
       FAVORIS
       ===================================================== */

    function saveFavorites() {

        localStorage.setItem(
            "JTN_STREAM_FAVORITES",
            JSON.stringify(
                favorites
            )
        );

    }


    function updateFavoriteButtons() {

        document
            .querySelectorAll(
                ".movie"
            )
            .forEach(
                function (
                    movieElement
                ) {

                    const id =
                        movieElement.dataset.id;


                    const button =
                        movieElement.querySelector(
                            ".favorite-btn"
                        );


                    if (!button) {
                        return;
                    }


                    if (
                        favorites.includes(
                            id
                        )
                    ) {

                        button.textContent =
                            "♥";


                        button.classList.add(
                            "active"
                        );

                    } else {

                        button.textContent =
                            "♡";


                        button.classList.remove(
                            "active"
                        );

                    }

                }
            );

    }


    function toggleFavorite(movie) {

        if (!movie) {
            return;
        }


        if (
            favorites.includes(
                movie.id
            )
        ) {

            favorites =
                favorites.filter(
                    function (id) {

                        return id !==
                            movie.id;

                    }
                );


            showMessage(
                "♡ Retiré des favoris"
            );

        } else {

            favorites.push(
                movie.id
            );


            showMessage(
                "♥ Ajouté aux favoris"
            );

        }


        saveFavorites();

        updateFavoriteButtons();

        renderFavorites();

    }


    /* =====================================================
       TÉLÉCHARGEMENTS
       ===================================================== */

    function saveDownloads() {

        localStorage.setItem(
            "JTN_STREAM_DOWNLOADS",
            JSON.stringify(
                downloads
            )
        );

    }


    function addDownload(movie) {

        if (!movie) {
            return;
        }


        if (
            downloads.includes(
                movie.id
            )
        ) {

            showMessage(
                "ℹ️ Déjà dans les téléchargements"
            );

            return;

        }


        downloads.push(
            movie.id
        );


        saveDownloads();

        renderDownloads();


        showMessage(
            "⬇ Ajouté aux téléchargements"
        );

    }


    /* =====================================================
       FICHE DU FILM
       ===================================================== */

    function openMovieDetails(movie) {

        if (!movie) {
            return;
        }


        const oldDetails =
            document.getElementById(
                "movieDetails"
            );


        if (oldDetails) {
            oldDetails.remove();
        }


        const details =
            document.createElement(
                "div"
            );


        details.id =
            "movieDetails";


        details.style.position =
            "fixed";

        details.style.inset =
            "0";

        details.style.zIndex =
            "10000";

        details.style.overflowY =
            "auto";

        details.style.background =
            "#050505";

        details.style.padding =
            "70px 18px 100px";


        const title =
            movie.tmdbTitle ||
            movie.title;


        const description =
            movie.overview ||
            "Aucune description disponible.";


        const rating =
            movie.rating
                ? Number(
                    movie.rating
                ).toFixed(1)
                : "—";


        const releaseDate =
            movie.releaseDate ||
            "—";


        const genres =
            movie.genres &&
            movie.genres.length
                ? movie.genres
                    .map(
                        function (genre) {
                            return genre.name;
                        }
                    )
                    .join(", ")
                : movie.category;


        details.innerHTML = `

            <div
                style="
                    max-width:600px;
                    margin:auto;
                "
            >

                <button
                    class="movie-details-close"
                    type="button"
                    style="
                        position:fixed;
                        top:15px;
                        left:15px;
                        width:42px;
                        height:42px;
                        border:0;
                        border-radius:50%;
                        background:#181818;
                        color:white;
                        font-size:20px;
                        z-index:10001;
                    "
                >
                    ✕
                </button>


                <div
                    class="movie-details-poster"
                    style="
                        width:100%;
                        height:420px;
                        border-radius:10px;
                        background:
                            linear-gradient(
                                145deg,
                                #461010,
                                #111
                            );
                        background-size:cover;
                        background-position:center;
                        margin-bottom:18px;
                    "
                ></div>


                <h1
                    style="
                        font-size:28px;
                        margin-bottom:10px;
                    "
                >
                    ${escapeHTML(title)}
                </h1>


                <div
                    style="
                        color:#aaa;
                        margin-bottom:18px;
                    "
                >
                    ⭐ ${escapeHTML(
                        rating
                    )}
                    &nbsp; • &nbsp;
                    📅 ${escapeHTML(
                        releaseDate
                    )}
                </div>


                <div
                    style="
                        color:#aaa;
                        margin-bottom:20px;
                        line-height:1.6;
                    "
                >
                    🎭 ${escapeHTML(
                        genres
                    )}
                </div>


                <div
                    style="
                        display:flex;
                        flex-direction:column;
                        gap:9px;
                    "
                >

                    <button
                        class="details-watch"
                        type="button"
                        style="
                            width:100%;
                            padding:13px;
                            border:0;
                            border-radius:7px;
                            background:white;
                            color:black;
                            font-weight:bold;
                            font-size:15px;
                        "
                    >
                        ▶ Regarder
                    </button>


                    <button
                        class="details-favorite"
                        type="button"
                        style="
                            width:100%;
                            padding:13px;
                            border:1px solid #333;
                            border-radius:7px;
                            background:#181818;
                            color:white;
                            font-weight:bold;
                            font-size:14px;
                        "
                    >
                        ${
                            favorites.includes(
                                movie.id
                            )
                                ? "♥ Retirer des favoris"
                                : "♡ Ajouter aux favoris"
                        }
                    </button>


                    <button
                        class="details-download"
                        type="button"
                        style="
                            width:100%;
                            padding:13px;
                            border:1px solid #333;
                            border-radius:7px;
                            background:#181818;
                            color:white;
                            font-weight:bold;
                            font-size:14px;
                        "
                    >
                        ⬇ Télécharger
                    </button>

                </div>


                <div
                    style="
                        margin-top:28px;
                        color:#aaa;
                        line-height:1.7;
                    "
                >

                    <h2
                        style="
                            color:white;
                            font-size:19px;
                            margin-bottom:10px;
                        "
                    >
                        Description
                    </h2>

                    <p>
                        ${escapeHTML(
                            description
                        )}
                    </p>

                </div>


                <h2
                    style="
                        margin-top:35px;
                        margin-bottom:12px;
                        font-size:20px;
                    "
                >
                    🎬 Autres films
                </h2>


                <div
                    class="movie-details-other"
                    style="
                        display:flex;
                        gap:10px;
                        overflow-x:auto;
                        padding-bottom:15px;
                    "
                ></div>

            </div>

        `;


        document.body.appendChild(
            details
        );


        /* =================================================
           AFFICHE
           ================================================= */

        const poster =
            details.querySelector(
                ".movie-details-poster"
            );


        if (
            poster &&
            movie.poster
        ) {

            poster.style.backgroundImage =
                "url('" +
                movie.poster +
                "')";


            poster.style.backgroundSize =
                "cover";


            poster.style.backgroundPosition =
                "center";

        }


        /* =================================================
           REGARDER
           ================================================= */

        details
            .querySelector(
                ".details-watch"
            )
            .addEventListener(
                "click",
                function () {

                    watchMovie(
                        movie
                    );

                }
            );


        /* =================================================
           FAVORI
           ================================================= */

        details
            .querySelector(
                ".details-favorite"
            )
            .addEventListener(
                "click",
                function () {

                    toggleFavorite(
                        movie
                    );


                    this.textContent =
                        favorites.includes(
                            movie.id
                        )
                            ? "♥ Retirer des favoris"
                            : "♡ Ajouter aux favoris";

                }
            );


        /* =================================================
           TÉLÉCHARGER
           ================================================= */

        details
            .querySelector(
                ".details-download"
            )
            .addEventListener(
                "click",
                function () {

                    addDownload(
                        movie
                    );

                }
            );


        /* =================================================
           FERMER
           ================================================= */

        details
            .querySelector(
                ".movie-details-close"
            )
            .addEventListener(
                "click",
                function () {

                    details.remove();

                }
            );


        /* =================================================
           AUTRES FILMS
           ================================================= */

        const other =
            details.querySelector(
                ".movie-details-other"
            );


        movies
            .filter(
                function (item) {

                    return item.id !==
                        movie.id;

                }
            )
            .slice(0, 8)
            .forEach(
                function (item) {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.style.flex =
                        "0 0 125px";

                    card.style.cursor =
                        "pointer";


                    card.innerHTML = `

                        <div
                            class="
                                details-other-poster
                            "
                            style="
                                width:125px;
                                height:180px;
                                border-radius:6px;
                                background:
                                    linear-gradient(
                                        145deg,
                                        #461010,
                                        #111
                                    );
                                background-size:cover;
                                background-position:center;
                            "
                        ></div>

                        <p
                            style="
                                color:#ddd;
                                font-size:12px;
                                margin-top:6px;
                                white-space:nowrap;
                                overflow:hidden;
                                text-overflow:ellipsis;
                            "
                        >
                            ${escapeHTML(
                                item.tmdbTitle ||
                                item.title
                            )}
                        </p>

                    `;


                    const otherPoster =
                        card.querySelector(
                            ".details-other-poster"
                        );


                    if (
                        otherPoster &&
                        item.poster
                    ) {

                        otherPoster.style.backgroundImage =
                            "url('" +
                            item.poster +
                            "')";

                    }


                    card.addEventListener(
                        "click",
                        function () {

                            details.remove();

                            openMovieDetails(
                                item
                            );

                        }
                    );


                    other.appendChild(
                        card
                    );

                }
            );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       CLIC SUR UN FILM
       ===================================================== */

    document
        .querySelectorAll(".movie")
        .forEach(
            function (
                movieElement
            ) {

                movieElement.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target.closest(
                                "button"
                            )
                        ) {

                            return;

                        }


                        const id =
                            movieElement.dataset.id;


                        const movie =
                            movies.find(
                                function (
                                    item
                                ) {

                                    return item.id ===
                                        id;

                                }
                            );


                        if (!movie) {

                            showMessage(
                                "❌ Film introuvable"
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


    /* =====================================================
       BOUTONS REGARDER
       ===================================================== */

    document
        .querySelectorAll(
            ".watch-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const movieElement =
                            button.closest(
                                ".movie"
                            );


                        if (!movieElement) {
                            return;
                        }


                        const movie =
                            movies.find(
                                function (
                                    item
                                ) {

                                    return item.id ===
                                        movieElement.dataset.id;

                                }
                            );


                        if (!movie) {
                            return;
                        }


                        watchMovie(
                            movie
                        );

                    }
                );

            }
        );


    /* =====================================================
       FAVORIS ACCUEIL
       ===================================================== */

    document
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const movieElement =
                            button.closest(
                                ".movie"
                            );


                        if (!movieElement) {
                            return;
                        }


                        const movie =
                            movies.find(
                                function (
                                    item
                                ) {

                                    return item.id ===
                                        movieElement.dataset.id;

                                }
                            );


                        toggleFavorite(
                            movie
                        );

                    }
                );

            }
        );


    /* =====================================================
       TÉLÉCHARGEMENT ACCUEIL
       ===================================================== */

    document
        .querySelectorAll(
            ".download-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const movieElement =
                            button.closest(
                                ".movie"
                            );


                        if (!movieElement) {
                            return;
                        }


                        const movie =
                            movies.find(
                                function (
                                    item
                                ) {

                                    return item.id ===
                                        movieElement.dataset.id;

                                }
                            );


                        addDownload(
                            movie
                        );

                    }
                );

            }
        );


    /* =====================================================
       FAVORIS PAGE
       ===================================================== */

    function renderFavorites() {

        if (!favoriteList) {
            return;
        }


        favoriteList.innerHTML =
            "";


        const list =
            movies.filter(
                function (movie) {

                    return favorites.includes(
                        movie.id
                    );

                }
            );


        if (
            list.length === 0
        ) {

            favoriteList.innerHTML = `

                <div class="empty-message">

                    <h3>
                        ♡ Aucun favori
                    </h3>

                    <p>
                        Ajoute des films
                        à tes favoris.
                    </p>

                </div>

            `;

            return;

        }


        list.forEach(
            function (movie) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "favorite-card";


                item.innerHTML = `

                    <div
                        class="poster"
                        style="
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

                    <div
                        class="
                            favorite-card-actions
                        "
                    >

                        <button
                            class="favorite-watch"
                            type="button"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            class="favorite-remove"
                            type="button"
                        >
                            ✕
                        </button>

                    </div>

                `;


                const poster =
                    item.querySelector(
                        ".poster"
                    );


                if (
                    poster &&
                    movie.poster
                ) {

                    poster.style.backgroundImage =
                        "url('" +
                        movie.poster +
                        "')";

                }


                item
                    .querySelector(
                        ".favorite-watch"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            watchMovie(
                                movie
                            );

                        }
                    );


                item
                    .querySelector(
                        ".favorite-remove"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            toggleFavorite(
                                movie
                            );

                        }
                    );


                favoriteList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       TÉLÉCHARGEMENTS PAGE
       ===================================================== */

    function renderDownloads() {

        if (!downloadList) {
            return;
        }


        downloadList.innerHTML =
            "";


        const list =
            movies.filter(
                function (movie) {

                    return downloads.includes(
                        movie.id
                    );

                }
            );


        if (
            list.length === 0
        ) {

            downloadList.innerHTML = `

                <div class="empty-message">

                    <h3>
                        ⬇ Aucun téléchargement
                    </h3>

                    <p>
                        Tes téléchargements
                        apparaîtront ici.
                    </p>

                </div>

            `;

            return;

        }


        list.forEach(
            function (movie) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "download-item";


                item.innerHTML = `

                    <div
                        class="
                            download-item-poster
                        "
                        style="
                            background-size:cover;
                            background-position:center;
                        "
                    ></div>

                    <div
                        class="
                            download-info
                        "
                    >

                        <h3>
                            ${escapeHTML(
                                movie.tmdbTitle ||
                                movie.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                movie.category
                            )}
                        </p>

                        <button
                            class="
                                watch-offline-btn
                            "
                            type="button"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            class="
                                delete-download-btn
                            "
                            type="button"
                        >
                            ✕ Supprimer
                        </button>

                    </div>

                `;


                const poster =
                    item.querySelector(
                        ".download-item-poster"
                    );


                if (
                    poster &&
                    movie.poster
                ) {

                    poster.style.backgroundImage =
                        "url('" +
                        movie.poster +
                        "')";

                }


                item
                    .querySelector(
                        ".watch-offline-btn"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            watchMovie(
                                movie
                            );

                        }
                    );


                item
                    .querySelector(
                        ".delete-download-btn"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            downloads =
                                downloads.filter(
                                    function (id) {

                                        return id !==
                                            movie.id;

                                    }
                                );


                            saveDownloads();

                            renderDownloads();


                            showMessage(
                                "⬇ Téléchargement supprimé"
                            );

                        }
                    );


                downloadList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       RECHERCHE
       ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function () {

                if (!searchBox) {
                    return;
                }


                if (
                    searchBox.style.display ===
                    "block"
                ) {

                    searchBox.style.display =
                        "none";

                } else {

                    searchBox.style.display =
                        "block";


                    if (searchInput) {

                        searchInput.focus();

                    }

                }

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const text =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(
                        ".movie"
                    )
                    .forEach(
                        function (
                            movieElement
                        ) {

                            const title =
                                (
                                    movieElement.dataset.title ||
                                    ""
                                )
                                .toLowerCase();


                            movieElement.style.display =
                                title.includes(
                                    text
                                )
                                    ? ""
                                    : "none";

                        }
                    );

            }
        );

    }


    /* =====================================================
       NAVIGATION
       ===================================================== */

    function showPage(page) {

        if (homePage) {

            homePage.style.display =
                "none";

        }


        if (favoritesPage) {

            favoritesPage.style.display =
                "none";

        }


        if (downloadsPage) {

            downloadsPage.style.display =
                "none";

        }


        if (
            page === "home" &&
            homePage
        ) {

            homePage.style.display =
                "block";

        }


        if (
            page === "favorites" &&
            favoritesPage
        ) {

            favoritesPage.style.display =
                "block";

            renderFavorites();

        }


        if (
            page === "downloads" &&
            downloadsPage
        ) {

            downloadsPage.style.display =
                "block";

            renderDownloads();

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    if (homeBtn) {

        homeBtn.addEventListener(
            "click",
            function () {

                showPage("home");

            }
        );

    }


    if (favoritesBtn) {

        favoritesBtn.addEventListener(
            "click",
            function () {

                showPage(
                    "favorites"
                );

            }
        );

    }


    if (downloadsBtn) {

        downloadsBtn.addEventListener(
            "click",
            function () {

                showPage(
                    "downloads"
                );

            }
        );

    }


    if (backFromFavorites) {

        backFromFavorites.addEventListener(
            "click",
            function () {

                showPage("home");

            }
        );

    }


    if (backFromDownloads) {

        backFromDownloads.addEventListener(
            "click",
            function () {

                showPage("home");

            }
        );

    }


    /* =====================================================
       HERO
       ===================================================== */

    if (heroPlay) {

        heroPlay.addEventListener(
            "click",
            function () {

                if (
                    movies.length > 0
                ) {

                    watchMovie(
                        movies[0]
                    );

                } else {

                    showMessage(
                        "🎬 Aucun film disponible"
                    );

                }

            }
        );

    }


    if (heroInfo) {

        heroInfo.addEventListener(
            "click",
            function () {

                if (
                    movies.length > 0
                ) {

                    openMovieDetails(
                        movies[0]
                    );

                }

            }
        );

    }


    /* =====================================================
       PARAMÈTRES
       ===================================================== */

    function openSettings() {

        window.location.href =
            "settings.html";

    }


    if (settingsBtn) {

        settingsBtn.addEventListener(
            "click",
            openSettings
        );

    }


    if (settingsBtnBottom) {

        settingsBtnBottom.addEventListener(
            "click",
            openSettings
        );

    }


    /* =====================================================
       DÉMARRAGE
       ===================================================== */

    showPage("home");

    updateFavoriteButtons();

    renderFavorites();

    renderDownloads();


    /*
     * Charger TMDB après le démarrage
     * de JTN STREAM.
     */

    loadTMDBMovies();

});
