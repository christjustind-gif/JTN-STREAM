document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TMDB
       ===================================================== */

    const TMDB_API_KEY =
        "COLLE_TA_NOUVELLE_CLE_ICI";


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
        document.getElementById("settingsBtnBottom");


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


    /* =====================================================
       FAVORIS
       ===================================================== */

    let favorites = [];

    try {

        favorites = JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_FAVORITES"
            ) || "[]"
        );

        if (!Array.isArray(favorites)) {
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

        downloads = JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_DOWNLOADS"
            ) || "[]"
        );

        if (!Array.isArray(downloads)) {
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
            document.getElementById("jtnMessage");

        if (!box) {

            box =
                document.createElement("div");

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

            document.body.appendChild(box);
        }

        box.textContent =
            message;

        box.style.display =
            "block";

        clearTimeout(
            window.jtnMessageTimer
        );

        window.jtnMessageTimer =
            setTimeout(function () {

                box.style.display =
                    "none";

            }, 2500);
    }


    /* =====================================================
       HTML SÉCURISÉ
       ===================================================== */

    function escapeHTML(text) {

        const element =
            document.createElement("div");

        element.textContent =
            text || "";

        return element.innerHTML;
    }


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
                    "&include_adult=false" +
                    "&page=1",
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
       TMDB — DÉTAILS
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
       TMDB — CHARGER TOUS LES FILMS
       ===================================================== */

    async function loadTMDBMovies() {

        if (
            !TMDB_API_KEY ||
            TMDB_API_KEY ===
                "COLLE_TA_NOUVELLE_CLE_ICI"
        ) {

            console.warn(
                "❌ Clé TMDB non configurée."
            );

            return;
        }


        console.log(
            "🎬 Chargement TMDB..."
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
                        "❌ TMDB : film non trouvé :",
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


                /* TMDB devient l'affiche */

                if (movie.tmdbPoster) {

                    movie.poster =
                        movie.tmdbPoster;
                }


                /* Mettre à jour l'accueil */

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
       METTRE À JOUR L'AFFICHE
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


        const title =
            movie.tmdbTitle ||
            movie.title;


        movieElement.dataset.title =
            title;


        /* TITRE */

        const titleElement =
            movieElement.querySelector(
                "[data-movie-title], h3, .movie-title, .title"
            );


        if (titleElement) {

            titleElement.textContent =
                title;
        }


        /* AFFICHAGE AVEC .poster */

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


        /* AFFICHAGE AVEC <img> */

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
                title;
        }
    }


    /* =====================================================
       AFFICHER TOUTES LES AFFICHES
       ===================================================== */

    function updateTMDBDisplay() {

        movies.forEach(function (movie) {

            updateMovieCard(
                movie
            );

        });
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
            "99999";

        details.style.overflowY =
            "auto";

        details.style.background =
            "#050505";

        details.style.color =
            "white";


        /* =================================================
           INFORMATIONS TMDB
           ================================================= */

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


        /* =================================================
           GENRES
           ================================================= */

        let genresHTML = "";

        if (
            movie.genres &&
            Array.isArray(movie.genres) &&
            movie.genres.length > 0
        ) {

            genresHTML =
                movie.genres
                    .map(function (genre) {

                        return `
                            <span style="
                                display:inline-block;
                                background:#222;
                                padding:6px 10px;
                                border-radius:8px;
                                margin:3px;
                                font-size:13px;
                            ">
                                ${escapeHTML(
                                    genre.name
                                )}
                            </span>
                        `;

                    })
                    .join("");

        }


        /* =================================================
           FICHE
           ================================================= */

        details.innerHTML = `

            <div style="
                min-height:100vh;

                background:
                    linear-gradient(
                        to bottom,
                        rgba(0,0,0,.20),
                        rgba(5,5,5,.80) 45%,
                        #050505 70%
                    ),

                    url('${backdrop}');

                background-size:cover;

                background-position:center top;

                background-attachment:fixed;
            ">


                <!-- BOUTON RETOUR -->

                <button
                    id="closeMovieDetails"
                    style="
                        position:fixed;

                        top:18px;
                        left:18px;

                        z-index:100000;

                        width:46px;
                        height:46px;

                        border:0;

                        border-radius:50%;

                        font-size:22px;

                        background:
                            rgba(0,0,0,.80);

                        color:white;

                        cursor:pointer;

                        box-shadow:
                            0 4px 15px
                            rgba(0,0,0,.5);
                    "
                >
                    ✕
                </button>


                <!-- CONTENU -->

                <div style="
                    padding:
                        150px
                        20px
                        80px;

                    max-width:900px;

                    margin:auto;
                ">


                    <!-- AFFICHE -->

                    ${
                        poster
                        ? `

                            <img
                                src="${poster}"

                                alt="${escapeHTML(
                                    title
                                )}"

                                style="
                                    width:220px;

                                    max-width:65%;

                                    border-radius:16px;

                                    display:block;

                                    margin:
                                        0 auto
                                        25px;

                                    box-shadow:
                                        0 15px 40px
                                        rgba(0,0,0,.7);
                                "
                            >

                        `
                        : ""
                    }


                    <!-- TITRE -->

                    <h1 style="
                        font-size:34px;

                        line-height:1.2;

                        margin:
                            0 0 18px;

                        text-align:center;
                    ">
                        ${escapeHTML(title)}
                    </h1>


                    <!-- NOTE + DATE -->

                    <div style="
                        display:flex;

                        justify-content:center;

                        flex-wrap:wrap;

                        gap:12px;

                        margin-bottom:20px;
                    ">


                        <span style="
                            background:#181818;

                            padding:
                                9px 14px;

                            border-radius:10px;

                            font-size:16px;
                        ">
                            ⭐
                            <strong>
                                ${rating}
                            </strong>
                            / 10
                        </span>


                        <span style="
                            background:#181818;

                            padding:
                                9px 14px;

                            border-radius:10px;

                            font-size:16px;
                        ">
                            📅
                            <strong>
                                ${escapeHTML(
                                    releaseDate
                                )}
                            </strong>
                        </span>


                    </div>


                    <!-- GENRES -->

                    ${
                        genresHTML
                        ? `

                            <div style="
                                text-align:center;

                                margin-bottom:25px;
                            ">
                                ${genresHTML}
                            </div>

                        `
                        : ""
                    }


                    <!-- RÉSUMÉ -->

                    <div style="
                        background:
                            rgba(10,10,10,.85);

                        padding:20px;

                        border-radius:16px;

                        margin-bottom:25px;
                    ">

                        <h2 style="
                            margin:
                                0 0 12px;

                            font-size:22px;
                        ">
                            📝 Résumé
                        </h2>


                        <p style="
                            margin:0;

                            font-size:16px;

                            line-height:1.7;

                            color:#ddd;
                        ">
                            ${escapeHTML(
                                overview
                            )}
                        </p>

                    </div>


                    <!-- BOUTONS -->

                    <div style="
                        display:flex;

                        justify-content:center;

                        flex-wrap:wrap;

                        gap:12px;
                    ">


                        <!-- REGARDER -->

                        <button
                            id="detailsWatchBtn"

                            style="
                                padding:
                                    14px 24px;

                                border:0;

                                border-radius:12px;

                                background:#e50914;

                                color:white;

                                font-size:16px;

                                font-weight:bold;

                                cursor:pointer;
                            "
                        >
                            ▶ Regarder
                        </button>


                        <!-- FAVORI -->

                        <button
                            id="detailsFavoriteBtn"

                            style="
                                padding:
                                    14px 24px;

                                border:0;

                                border-radius:12px;

                                background:#222;

                                color:white;

                                font-size:16px;

                                font-weight:bold;

                                cursor:pointer;
                            "
                        >
                            ♥ Favoris
                        </button>


                        <!-- TÉLÉCHARGER -->

                        <button
                            id="detailsDownloadBtn"

                            style="
                                padding:
                                    14px 24px;

                                border:0;

                                border-radius:12px;

                                background:#222;

                                color:white;

                                font-size:16px;

                                font-weight:bold;

                                cursor:pointer;
                            "
                        >
                            ⬇ Télécharger
                        </button>


                    </div>


                    <!-- IMAGE DE FOND -->

                    ${
                        backdrop
                        ? `

                            <div style="
                                margin-top:40px;

                                background:
                                    rgba(10,10,10,.85);

                                padding:18px;

                                border-radius:16px;
                            ">

                                <h2 style="
                                    margin:
                                        0 0 15px;

                                    font-size:20px;
                                ">
                                    🌄 Image de fond
                                </h2>

                                <img
                                    src="${backdrop}"

                                    alt="Image de fond"

                                    style="
                                        width:100%;

                                        border-radius:12px;

                                        display:block;
                                    "
                                >

                            </div>

                        `
                        : ""
                    }


                </div>

            </div>
        `;


        /* =================================================
           AJOUTER À LA PAGE
           ================================================= */

        document.body.appendChild(
            details
        );


        /* =================================================
           BOUTON FERMER
           ================================================= */

        const closeButton =
            document.getElementById(
                "closeMovieDetails"
            );

        if (closeButton) {

            closeButton.onclick =
                function () {

                    details.remove();

                };
        }


        /* =================================================
           BOUTON REGARDER
           ================================================= */

        const watchButton =
            document.getElementById(
                "detailsWatchBtn"
            );

        if (watchButton) {

            watchButton.onclick =
                function () {

                    details.remove();

                    watchMovie(
                        movie
                    );

                };
        }


        /* =================================================
           BOUTON FAVORIS
           ================================================= */

        const favoriteButton =
            document.getElementById(
                "detailsFavoriteBtn"
            );

        if (favoriteButton) {

            favoriteButton.onclick =
                function () {

                    toggleFavorite(
                        movie
                    );

                };
        }


                /* =================================================
           BOUTON TÉLÉCHARGER
           ================================================= */

        const downloadButton =
            document.getElementById(
                "detailsDownloadBtn"
            );

        if (downloadButton) {

            downloadButton.onclick =
                function () {

                    addDownload(movie);

                };

        }

    } // ← FIN DE openMovieDetails

                                           
