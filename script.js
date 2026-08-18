document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       JTN STREAM — CONFIGURATION
    ===================================================== */

    const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDgwNzc3NjIwNTY4MWM4Y2Q4ODNmMTYxM2Q1MjllYyIsIm5iZiI6MTc4NzA2NzEyNi4yMDgsInN1YiI6IjZhODQ3YWY2NThiYzMyOTYzZDJiYjc5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IY6NXG4HAHmvdHuKjA2CTG7o23k-QVsZqd2xOURjOWs";

    const TMDB_IMAGE =
        "https://image.tmdb.org/t/p/";

    /* =====================================================
       ÉLÉMENTS HTML
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
       FICHE DU FILM HTML
    ===================================================== */

    const movieDetailsPage =
        document.getElementById(
            "movieDetailsPage"
        );

    const closeMovieDetails =
        document.getElementById(
            "closeMovieDetails"
        );

    const detailsBackdrop =
        document.getElementById(
            "detailsBackdrop"
        );

    const detailsPoster =
        document.getElementById(
            "detailsPoster"
        );

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

    const detailsWatchBtn =
        document.getElementById(
            "detailsWatchBtn"
        );

    const detailsDownloadBtn =
        document.getElementById(
            "detailsDownloadBtn"
        );

    const detailsFavoriteBtn =
        document.getElementById(
            "detailsFavoriteBtn"
        );

    const detailsRecommendations =
        document.getElementById(
            "detailsRecommendations"
        );

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
       ÉTAT
    ===================================================== */

    let currentMovie = null;

    let favorites = [];

    let downloads = [];

    /* =====================================================
       CHARGER FAVORIS
    ===================================================== */

    try {

        favorites =
            JSON.parse(
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
       CHARGER TÉLÉCHARGEMENTS
    ===================================================== */

    try {

        downloads =
            JSON.parse(
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
       MESSAGE
    ===================================================== */

    function showMessage(message) {

        let box =
            document.getElementById(
                "jtnMessage"
            );

        if (!box) {

            box =
                document.createElement("div");

            box.id =
                "jtnMessage";

            box.style.position =
                "fixed";

            box.style.bottom =
                "100px";

            box.style.left =
                "50%";

            box.style.transform =
                "translateX(-50%)";

            box.style.zIndex =
                "999999";

            box.style.background =
                "#181818";

            box.style.color =
                "#fff";

            box.style.padding =
                "14px 20px";

            box.style.borderRadius =
                "14px";

            box.style.fontWeight =
                "bold";

            box.style.textAlign =
                "center";

            box.style.boxShadow =
                "0 5px 25px rgba(0,0,0,.5)";

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
       CHARGER TMDB POUR LES 13 FILMS
    ===================================================== */

    async function loadTMDBMovies() {

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
                        "❌ TMDB non trouvé :",
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

                movie.poster =
                    result.poster_path
                        ? TMDB_IMAGE +
                          "w500" +
                          result.poster_path
                        : "";

                movie.backdrop =
                    result.backdrop_path
                        ? TMDB_IMAGE +
                          "w1280" +
                          result.backdrop_path
                        : movie.poster;

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

                        movie.poster =
                            TMDB_IMAGE +
                            "w500" +
                            details.poster_path;
                    }

                    if (
                        details.backdrop_path
                    ) {

                        movie.backdrop =
                            TMDB_IMAGE +
                            "w1280" +
                            details.backdrop_path;
                    }

                    movie.genres =
                        details.genres ||
                        [];
                }

                updateMovieCard(movie);

                console.log(
                    "✅ TMDB chargé :",
                    movie.title
                );

            } catch (error) {

                console.error(
                    "Erreur TMDB :",
                    movie.title,
                    error
                );
            }
        }

        updateFavoriteButtons();

        console.log(
            "🎬 TMDB terminé pour les 13 films."
        );
    }

    /* =====================================================
       METTRE À JOUR UNE CARTE
    ===================================================== */

    function updateMovieCard(movie) {

        const element =
            document.querySelector(
                '.movie[data-id="' +
                movie.id +
                '"]'
            );

        if (!element) {
            return;
        }

        const title =
            movie.tmdbTitle ||
            movie.title;

        element.dataset.title =
            title;

        const titleElement =
            element.querySelector(
                "h3"
            );

        if (titleElement) {

            titleElement.textContent =
                title;
        }

        const poster =
            element.querySelector(
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

        const image =
            element.querySelector("img");

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
       CLIQUE SUR LES 13 CARTES
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
                    function (event) {

                        if (
                            event.target.closest(
                                ".favorite-btn"
                            )
                        ) {
                            return;
                        }

                        const id =
                            card.dataset.id;

                        const movie =
                            getMovieById(id);

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

        console.log(
            "🎬 Cartes configurées :",
            cards.length
        );
    }

    /* =====================================================
       FICHE DU FILM
    ===================================================== */

    function openMovieDetails(movie) {

        if (!movie) {
            return;
        }

        currentMovie =
            movie;

        if (!movieDetailsPage) {

            showMessage(
                "❌ Fiche du film introuvable"
            );

            return;
        }

        if (detailsTitle) {

            detailsTitle.textContent =
                movie.tmdbTitle ||
                movie.title;
        }

        if (detailsPoster) {

            if (movie.poster) {

                detailsPoster.style.backgroundImage =
                    "url('" +
                    movie.poster +
                    "')";

                detailsPoster.style.backgroundSize =
                    "cover";

                detailsPoster.style.backgroundPosition =
                    "center";

            } else {

                detailsPoster.style.backgroundImage =
                    "none";
            }
        }

        if (detailsBackdrop) {

            if (movie.backdrop) {

                detailsBackdrop.style.backgroundImage =
                    "url('" +
                    movie.backdrop +
                    "')";

            } else {

                detailsBackdrop.style.backgroundImage =
                    "none";
            }
        }

        if (detailsInfo) {

            const rating =
                movie.rating
                    ? Number(
                        movie.rating
                    ).toFixed(1)
                    : "—";

            const date =
                movie.releaseDate ||
                "Date inconnue";

            const category =
                movie.category ||
                "Film";

            detailsInfo.textContent =
                category +
                " • ⭐ " +
                rating +
                "/10 • 📅 " +
                date;
        }

        if (detailsDescription) {

            detailsDescription.textContent =
                movie.overview ||
                "Aucun résumé disponible.";
        }

        updateDetailsFavoriteButton();

        renderRecommendations();

        movieDetailsPage.style.display =
            "block";

        document.body.style.overflow =
            "hidden";
    }

    /* =====================================================
       FERMER LA FICHE
    ===================================================== */

    function closeDetails() {

        if (movieDetailsPage) {

            movieDetailsPage.style.display =
                "none";
        }

        currentMovie =
            null;

        document.body.style.overflow =
            "";
    }

    if (closeMovieDetails) {

        closeMovieDetails.addEventListener(
            "click",
            closeDetails
        );
    }
    /* =====================================================
       BOUTON REGARDER DE LA FICHE
    ===================================================== */

    if (detailsWatchBtn) {

        detailsWatchBtn.addEventListener(
            "click",
            function () {

                if (!currentMovie) {
                    showMessage(
                        "❌ Aucun film sélectionné"
                    );
                    return;
                }

                closeDetails();

                watchMovie(
                    currentMovie
                );
            }
        );
    }

    /* =====================================================
       BOUTON FAVORI DE LA FICHE
    ===================================================== */

    if (detailsFavoriteBtn) {

        detailsFavoriteBtn.addEventListener(
            "click",
            function () {

                if (!currentMovie) {
                    return;
                }

                toggleFavorite(
                    currentMovie
                );

                updateDetailsFavoriteButton();
            }
        );
    }

    /* =====================================================
       BOUTON TÉLÉCHARGER DE LA FICHE
    ===================================================== */

    if (detailsDownloadBtn) {

        detailsDownloadBtn.addEventListener(
            "click",
            function () {

                if (!currentMovie) {

                    showMessage(
                        "❌ Aucun film sélectionné"
                    );

                    return;
                }

                addDownload(
                    currentMovie
                );
            }
        );
    }

    /* =====================================================
       BOUTON FAVORI — APPARENCE
    ===================================================== */

    function updateDetailsFavoriteButton() {

        if (
            !detailsFavoriteBtn ||
            !currentMovie
        ) {
            return;
        }

        if (
            favorites.includes(
                currentMovie.id
            )
        ) {

            detailsFavoriteBtn.textContent =
                "♥ Retirer des favoris";

            detailsFavoriteBtn.classList.add(
                "active"
            );

        } else {

            detailsFavoriteBtn.textContent =
                "♡ Ajouter aux favoris";

            detailsFavoriteBtn.classList.remove(
                "active"
            );
        }
    }

    /* =====================================================
       FAVORIS — SAUVEGARDER
    ===================================================== */

    function saveFavorites() {

        localStorage.setItem(
            "JTN_STREAM_FAVORITES",
            JSON.stringify(
                favorites
            )
        );
    }

    /* =====================================================
       FAVORIS — BOUTONS DES CARTES
    ===================================================== */

    function updateFavoriteButtons() {

        document
            .querySelectorAll(".movie")
            .forEach(
                function (card) {

                    const id =
                        card.dataset.id;

                    let button =
                        card.querySelector(
                            ".favorite-btn"
                        );

                    if (!button) {
                        return;
                    }

                    if (
                        favorites.includes(id)
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

    /* =====================================================
       AJOUTER / RETIRER FAVORI
    ===================================================== */

    function toggleFavorite(movie) {

        if (!movie) {
            return;
        }

        const index =
            favorites.indexOf(
                movie.id
            );

        if (index !== -1) {

            favorites.splice(
                index,
                1
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
       FAVORIS — AFFICHAGE
    ===================================================== */

    function renderFavorites() {

        if (!favoriteList) {
            return;
        }

        favoriteList.innerHTML = "";

        if (favorites.length === 0) {

            favoriteList.innerHTML = `
                <p style="
                    color:#aaa;
                    text-align:center;
                    padding:40px 20px;
                ">
                    ❤️ Aucun favori pour le moment.
                </p>
            `;

            return;
        }

        favorites.forEach(
            function (id) {

                const movie =
                    getMovieById(id);

                if (!movie) {
                    return;
                }

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "favorite-item";

                item.innerHTML = `

                    <div
                        class="poster"
                        style="
                            background-image:url('${movie.poster || ""}');
                            background-size:cover;
                            background-position:center;
                        "
                    ></div>

                    <div>
                        <h3>
                            ${escapeHTML(
                                movie.tmdbTitle ||
                                movie.title
                            )}
                        </h3>

                        <button
                            type="button"
                            class="favorite-watch-btn"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            type="button"
                            class="favorite-remove-btn"
                        >
                            ♡ Retirer
                        </button>
                    </div>
                `;

                const watch =
                    item.querySelector(
                        ".favorite-watch-btn"
                    );

                const remove =
                    item.querySelector(
                        ".favorite-remove-btn"
                    );

                if (watch) {

                    watch.onclick =
                        function () {

                            watchMovie(
                                movie
                            );
                        };
                }

                if (remove) {

                    remove.onclick =
                        function () {

                            toggleFavorite(
                                movie
                            );
                        };
                }

                favoriteList.appendChild(
                    item
                );
            }
        );
    }

    /* =====================================================
       TÉLÉCHARGEMENTS — SAUVEGARDER
    ===================================================== */

    function saveDownloads() {

        localStorage.setItem(
            "JTN_STREAM_DOWNLOADS",
            JSON.stringify(
                downloads
            )
        );
    }

    /* =====================================================
       AJOUTER TÉLÉCHARGEMENT
    ===================================================== */

    function addDownload(movie) {

        if (!movie) {
            return;
        }

        if (!movie.video) {

            showMessage(
                "❌ Vidéo non disponible"
            );

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
       TÉLÉCHARGEMENTS — AFFICHAGE
    ===================================================== */

    function renderDownloads() {

        if (!downloadList) {
            return;
        }

        downloadList.innerHTML = "";

        if (downloads.length === 0) {

            downloadList.innerHTML = `
                <p style="
                    color:#aaa;
                    text-align:center;
                    padding:40px 20px;
                ">
                    ⬇️ Aucun téléchargement.
                </p>
            `;

            return;
        }

        downloads.forEach(
            function (id) {

                const movie =
                    getMovieById(id);

                if (!movie) {
                    return;
                }

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "download-item";

                item.innerHTML = `

                    <div
                        class="poster"
                        style="
                            background-image:url('${movie.poster || ""}');
                            background-size:cover;
                            background-position:center;
                        "
                    ></div>

                    <div>

                        <h3>
                            ${escapeHTML(
                                movie.tmdbTitle ||
                                movie.title
                            )}
                        </h3>

                        <button
                            type="button"
                            class="download-watch-btn"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            type="button"
                            class="download-remove-btn"
                        >
                            ✕ Supprimer
                        </button>

                    </div>
                `;

                const watch =
                    item.querySelector(
                        ".download-watch-btn"
                    );

                const remove =
                    item.querySelector(
                        ".download-remove-btn"
                    );

                if (watch) {

                    watch.onclick =
                        function () {

                            watchMovie(
                                movie
                            );
                        };
                }

                if (remove) {

                    remove.onclick =
                        function () {

                            downloads =
                                downloads.filter(
                                    function (
                                        movieId
                                    ) {
                                        return (
                                            movieId !==
                                            movie.id
                                        );
                                    }
                                );

                            saveDownloads();

                            renderDownloads();

                            showMessage(
                                "🗑 Supprimé"
                            );
                        };
                }

                downloadList.appendChild(
                    item
                );
            }
        );
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

            vdoFrame.src =
                "";

            vdoFrame.style.display =
                "none";
        }

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
       FERMER LECTEUR
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

            vdoFrame.src =
                "";

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
       RECOMMANDATIONS
    ===================================================== */

    function renderRecommendations() {

        if (!detailsRecommendations) {
            return;
        }

        detailsRecommendations.innerHTML =
            "";

        movies
            .filter(
                function (movie) {

                    return (
                        !currentMovie ||
                        movie.id !==
                        currentMovie.id
                    );
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
                        "movie";

                    card.dataset.id =
                        movie.id;

                    card.innerHTML = `

                        <div
                            class="poster"
                            style="
                                background-image:url('${movie.poster || ""}');
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
                    `;

                    card.onclick =
                        function () {

                            openMovieDetails(
                                movie
                            );
                        };

                    detailsRecommendations.appendChild(
                        card
                    );
                }
            );
    }

    /* =====================================================
       ACCUEIL
    ===================================================== */

    function showHome() {

        closeDetails();

        if (homePage) {
            homePage.style.display =
                "block";
        }

        if (favoritesPage) {
            favoritesPage.style.display =
                "none";
        }

        if (downloadsPage) {
            downloadsPage.style.display =
                "none";
        }
    }

    if (homeBtn) {

        homeBtn.addEventListener(
            "click",
            showHome
        );
    }

    /* =====================================================
       FAVORIS PAGE
    ===================================================== */

    function showFavorites() {

        closeDetails();

        if (homePage) {
            homePage.style.display =
                "none";
        }

        if (favoritesPage) {
            favoritesPage.style.display =
                "block";
        }

        if (downloadsPage) {
            downloadsPage.style.display =
                "none";
        }

        renderFavorites();
    }

    if (favoritesBtn) {

        favoritesBtn.addEventListener(
            "click",
            showFavorites
        );
    }

    if (backFromFavorites) {

        backFromFavorites.addEventListener(
            "click",
            showHome
        );
    }

    /* =====================================================
       TÉLÉCHARGEMENTS PAGE
    ===================================================== */

    function showDownloads() {

        closeDetails();

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
                "block";
        }

        renderDownloads();
    }

    if (downloadsBtn) {

        downloadsBtn.addEventListener(
            "click",
            showDownloads
        );
    }

    if (backFromDownloads) {

        backFromDownloads.addEventListener(
            "click",
            showHome
        );
    }

    /* =====================================================
       RECHERCHE
    ===================================================== */

    if (searchBtn && searchBox) {

        searchBtn.addEventListener(
            "click",
            function () {

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

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                document
                    .querySelectorAll(
                        "#homePage .movie"
                    )
                    .forEach(
                        function (card) {

                            const title =
                                (
                                    card.dataset.title ||
                                    card.textContent ||
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
       HERO — REGARDER
    ===================================================== */

    if (heroPlay) {

        heroPlay.addEventListener(
            "click",
            function () {

                const movie =
                    getMovieById(
                        "film1"
                    );

                if (movie) {

                    watchMovie(
                        movie
                    );
                }
            }
        );
    }

    /* =====================================================
       HERO — INFOS
    ===================================================== */

    if (heroInfo) {

        heroInfo.addEventListener(
            "click",
            function () {

                const movie =
                    getMovieById(
                        "film1"
                    );

                if (movie) {

                    openMovieDetails(
                        movie
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
       INITIALISATION
    ===================================================== */

    if (movieDetailsPage) {

        movieDetailsPage.style.display =
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

    if (player) {

        player.style.display =
            "none";
    }

    setupMovieCards();

    renderFavorites();

    renderDownloads();

    loadTMDBMovies();

    console.log(
        "🚀 JTN STREAM démarré correctement."
    );

});
