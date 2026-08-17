document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const API_URL =
        "http://localhost:3000/api/movies";


    /* =====================================================
       ÉLÉMENTS
    ===================================================== */

    const intro =
        document.getElementById("intro");

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


    /* LECTEUR */

    const player =
        document.getElementById("player");

    const video =
        document.getElementById("video");

    const vdoFrame =
        document.getElementById("vdoFrame");

    const closePlayer =
        document.getElementById("closePlayer");


    /* RECHERCHE */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchBox =
        document.getElementById("searchBox");

    const searchInput =
        document.getElementById("searchInput");


    /* NAVIGATION */

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

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsBtnBottom =
    document.getElementById(
        "settingsBtnBottom"
    );



    /* HERO */

    const heroPlay =
        document.getElementById("heroPlay");

    const heroInfo =
        document.getElementById("heroInfo");


    /* =====================================================
       FICHE FILM
    ===================================================== */

    const movieDetails =
        document.getElementById(
            "movieDetails"
        );

    const detailsClose =
        document.getElementById(
            "detailsClose"
        );

    const detailsPoster =
        document.getElementById(
            "detailsPoster"
        );

    const detailsTitle =
        document.getElementById(
            "detailsTitle"
        );

    const detailsMeta =
        document.getElementById(
            "detailsMeta"
        );

    const detailsDescription =
        document.getElementById(
            "detailsDescription"
        );

    const detailsWatch =
        document.getElementById(
            "detailsWatch"
        );

    const detailsDownload =
        document.getElementById(
            "detailsDownload"
        );

    const detailsList =
        document.getElementById(
            "detailsList"
        );


    /* =====================================================
       VARIABLES
    ===================================================== */

    let movies = [];

    let selectedMovie = null;


    let favorites =
        JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_FAVORITES"
            ) || "[]"
        );


    let downloads =
        JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_DOWNLOADS"
            ) || "[]"
        );


    /* =====================================================
       INTRO
    ===================================================== */

    setTimeout(() => {

        if (intro) {

            intro.style.display =
                "none";

        }

    }, 3500);


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

            box.style.left =
                "50%";

            box.style.bottom =
                "90px";

            box.style.transform =
                "translateX(-50%)";

            box.style.zIndex =
                "999999";

            box.style.background =
                "#181818";

            box.style.color =
                "white";

            box.style.padding =
                "13px 20px";

            box.style.borderRadius =
                "14px";

            box.style.fontWeight =
                "bold";

            box.style.fontSize =
                "13px";

            box.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.6)";

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
            setTimeout(() => {

                box.style.display =
                    "none";

            }, 2800);

    }


    /* =====================================================
       CHARGER LES FILMS
    ===================================================== */

    async function loadMovies() {

        try {

            showMessage(
                "⏳ Chargement de JTN STREAM..."
            );


            const response =
                await fetch(API_URL);


            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            movies =
                Array.isArray(data)
                    ? data
                    : [];


            console.log(
                "🎬 Films chargés :",
                movies
            );


            renderMovies();

            updateFavoriteButtons();

            renderFavorites();

            renderDownloads();


            /*
             * Mettre le premier film
             * dans le Hero
             */

            if (movies.length > 0) {

                updateHero(
                    movies[0]
                );

            }


            showMessage(
                "🔥 JTN STREAM est prêt !"
            );


        } catch (error) {

            console.error(
                "Erreur API :",
                error
            );


            showMessage(
                "❌ Serveur JTN STREAM inaccessible"
            );

        }

    }


    /* =====================================================
       RENDU DES FILMS
    ===================================================== */

    function renderMovies() {

        const categories =
            document.querySelectorAll(
                ".category"
            );


        categories.forEach(
            category => {

                const row =
                    category.querySelector(
                        ".movie-row"
                    );

                if (row) {

                    row.innerHTML =
                        "";

                }

            }
        );


        movies.forEach(
            movie => {

                const category =
                    findCategory(
                        movie.category
                    );


                if (!category) {

                    return;

                }


                const row =
                    category.querySelector(
                        ".movie-row"
                    );


                if (!row) {

                    return;

                }


                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "movie";


                article.dataset.id =
                    movie.id;


                article.dataset.title =
                    movie.title || "";


                article.dataset.video =
                    movie.video || "";


                article.dataset.download =
                    movie.download || "";


                article.innerHTML = `

                    <div
                        class="poster"
                        style="
                            background-image:
                            url('${escapeAttribute(
                                movie.poster || ""
                            )}');
                        "
                    ></div>


                    <h3>
                        ${escapeHTML(
                            movie.title ||
                            "Sans titre"
                        )}
                    </h3>


                    <div
                        class="movie-actions"
                    >

                        <button
                            class="watch-btn"
                            type="button"
                        >
                            ▶ Regarder
                        </button>


                        <button
                            class="favorite-btn"
                            type="button"
                        >
                            ♡
                        </button>

                    </div>


                    <button
                        class="download-btn"
                        type="button"
                    >
                        ⬇ Télécharger
                    </button>

                `;


                row.appendChild(
                    article
                );


                /*
                 * CLIC SUR L'AFFICHE
                 */

                article.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target.closest(
                                ".watch-btn"
                            ) ||
                            event.target.closest(
                                ".favorite-btn"
                            ) ||
                            event.target.closest(
                                ".download-btn"
                            )
                        ) {

                            return;

                        }


                        openMovieDetails(
                            movie
                        );

                    }
                );


                /*
                 * REGARDER
                 */

                article
                    .querySelector(
                        ".watch-btn"
                    )
                    .addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            watchMovie(
                                movie
                            );

                        }
                    );


                /*
                 * FAVORIS
                 */

                article
                    .querySelector(
                        ".favorite-btn"
                    )
                    .addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            toggleFavorite(
                                movie
                            );

                        }
                    );


                /*
                 * TÉLÉCHARGEMENT
                 */

                article
                    .querySelector(
                        ".download-btn"
                    )
                    .addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            downloadMovie(
                                movie
                            );

                        }
                    );

            }
        );

    }


    /* =====================================================
       TROUVER UNE CATÉGORIE
    ===================================================== */

    function findCategory(categoryName) {

        const name =
            String(
                categoryName || ""
            )
            .toLowerCase()
            .trim();


        const sections =
            document.querySelectorAll(
                ".category"
            );


        let result =
            [...sections].find(
                section => {

                    const id =
                        section.id
                            .toLowerCase();


                    return (
                        id === name ||
                        id.includes(name) ||
                        name.includes(id)
                    );

                }
            );


        /*
         * Quelques correspondances
         */

        if (!result) {

            if (
                name.includes("film") ||
                name.includes("movie")
            ) {

                result =
                    document.getElementById(
                        "films"
                    );

            }

        }


        if (!result) {

            if (
                name.includes("action")
            ) {

                result =
                    document.getElementById(
                        "action"
                    );

            }

        }


        if (!result) {

            if (
                name.includes("com")
            ) {

                result =
                    document.getElementById(
                        "comedie"
                    );

            }

        }


        if (!result) {

            if (
                name.includes("série") ||
                name.includes("serie")
            ) {

                result =
                    document.getElementById(
                        "series"
                    );

            }

        }


        if (!result) {

            if (
                name.includes("anime") ||
                name.includes("animé")
            ) {

                result =
                    document.getElementById(
                        "animes"
                    );

            }

        }


        return result;

    }


    /* =====================================================
       HERO
    ===================================================== */

    function updateHero(movie) {

        if (!movie) {

            return;

        }


        const heroTitle =
            document.getElementById(
                "heroTitle"
            );


        const heroDescription =
            document.getElementById(
                "heroDescription"
            );


        if (heroTitle) {

            heroTitle.innerHTML =
                escapeHTML(
                    movie.title ||
                    "JTN STREAM"
                )
                .replace(
                    /\s+/g,
                    "<br>"
                );

        }


        if (heroDescription) {

            heroDescription.textContent =
                movie.description ||
                "Découvre ton nouvel espace de streaming.";

        }


        if (movie.poster) {

            const hero =
                document.querySelector(
                    ".hero"
                );


            if (hero) {

                hero.style.backgroundImage =
                    `
                    linear-gradient(
                        to top,
                        #050505 3%,
                        rgba(5,5,5,.55),
                        transparent
                    ),
                    url("${escapeAttribute(
                        movie.poster
                    )}")
                    `;

                hero.style.backgroundSize =
                    "cover";

                hero.style.backgroundPosition =
                    "center";

            }

        }

    }


    /* =====================================================
       OUVRIR FICHE FILM
    ===================================================== */

    function openMovieDetails(movie) {

        if (
            !movieDetails ||
            !movie
        ) {

            return;

        }


        selectedMovie =
            movie;


        detailsTitle.textContent =
            movie.title ||
            "Sans titre";


        const year =
            movie.year ||
            "2026";


        const age =
            movie.age ||
            "16+";


        const quality =
            movie.quality ||
            "HD";


        detailsMeta.textContent =
            `${year} • ${age} • ${quality}`;


        detailsDescription.textContent =
            movie.description ||
            `Découvre ${movie.title} sur JTN STREAM.`;


        if (detailsPoster) {

            if (movie.poster) {

                detailsPoster.style.backgroundImage =
                    `url("${escapeAttribute(
                        movie.poster
                    )}")`;

            } else {

                detailsPoster.style.backgroundImage =
                    "linear-gradient(145deg,#441010,#111)";

            }

        }


        updateDetailsFavoriteButton();


        movieDetails.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       FERMER FICHE
    ===================================================== */

    function closeMovieDetails() {

        if (!movieDetails) {

            return;

        }


        movieDetails.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";


        selectedMovie =
            null;

    }


    if (detailsClose) {

        detailsClose.addEventListener(
            "click",
            closeMovieDetails
        );

    }


    if (movieDetails) {

        movieDetails.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    movieDetails
                ) {

                    closeMovieDetails();

                }

            }
        );

    }


    /* =====================================================
       REGARDER DEPUIS FICHE
    ===================================================== */

    if (detailsWatch) {

        detailsWatch.addEventListener(
            "click",
            () => {

                if (!selectedMovie) {

                    return;

                }


                const movie =
                    selectedMovie;


                closeMovieDetails();


                watchMovie(
                    movie
                );

            }
        );

    }


    /* =====================================================
       TÉLÉCHARGER DEPUIS FICHE
    ===================================================== */

    if (detailsDownload) {

        detailsDownload.addEventListener(
            "click",
            () => {

                if (!selectedMovie) {

                    return;

                }


                downloadMovie(
                    selectedMovie
                );

            }
        );

    }


    /* =====================================================
       MA LISTE DEPUIS FICHE
    ===================================================== */

    if (detailsList) {

        detailsList.addEventListener(
            "click",
            () => {

                if (!selectedMovie) {

                    return;

                }


                toggleFavorite(
                    selectedMovie
                );


                updateDetailsFavoriteButton();

            }
        );

    }


    function updateDetailsFavoriteButton() {

        if (
            !detailsList ||
            !selectedMovie
        ) {

            return;

        }


        if (
            favorites.includes(
                selectedMovie.id
            )
        ) {

            detailsList.textContent =
                "♥ Dans ma liste";

        } else {

            detailsList.textContent =
                "♡ Ma liste";

        }

    }


    /* =====================================================
       LECTEUR
    ===================================================== */

    function watchMovie(movie) {

        if (!movie) {

            return;

        }


        if (!movie.video) {

            showMessage(
                "🎬 Vidéo bientôt disponible"
            );

            return;

        }


        if (!player) {

            return;

        }


        /*
         * Détecter les lecteurs EMBED
         */

        const isEmbed =
            movie.video.includes(
                "/embed/"
            ) ||
            movie.video.includes(
                "fembed"
            ) ||
            movie.video.includes(
                "iframe"
            );


        if (
            isEmbed &&
            vdoFrame
        ) {

            if (video) {

                video.pause();

                video.removeAttribute(
                    "src"
                );

                video.style.display =
                    "none";

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
         * Vidéo normale
         */

        if (vdoFrame) {

            vdoFrame.src =
                "";

            vdoFrame.style.display =
                "none";

        }


        if (video) {

            video.style.display =
                "block";


            video.src =
                movie.video;


            video.load();


            player.style.display =
                "flex";


            video.play()
                .catch(
                    () => {

                        showMessage(
                            "▶ Appuie sur lecture pour démarrer"
                        );

                    }
                );

        }

    }


    /* =====================================================
       FERMER LECTEUR
    ===================================================== */

    function closeVideo() {

        if (!player) {

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


        player.style.display =
            "none";

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

    function toggleFavorite(movie) {

        const id =
            movie.id;


        if (
            favorites.includes(id)
        ) {

            favorites =
                favorites.filter(
                    item =>
                        item !== id
                );


            showMessage(
                "♡ Retiré de ma liste"
            );

        } else {

            favorites.push(id);


            showMessage(
                "♥ Ajouté à ma liste"
            );

        }


        localStorage.setItem(
            "JTN_STREAM_FAVORITES",
            JSON.stringify(
                favorites
            )
        );


        updateFavoriteButtons();

        renderFavorites();

    }


    function updateFavoriteButtons() {

        document
            .querySelectorAll(
                ".movie"
            )
            .forEach(
                movieElement => {

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
       PAGE FAVORIS
    ===================================================== */

    function renderFavorites() {

        if (!favoriteList) {

            return;

        }


        favoriteList.innerHTML =
            "";


        const list =
            movies.filter(
                movie =>
                    favorites.includes(
                        movie.id
                    )
            );


        if (
            list.length === 0
        ) {

            favoriteList.innerHTML = `

                <div class="empty-message">

                    <h3>
                        ♡ Ta liste est vide
                    </h3>

                    <p>
                        Ajoute des films
                        à ta liste.
                    </p>

                </div>

            `;

            return;

        }


        list.forEach(
            movie => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "favorite-item";


                item.innerHTML = `

                    <strong>
                        ${escapeHTML(
                            movie.title
                        )}
                    </strong>

                    <button
                        class="watch-btn"
                        type="button"
                    >
                        ▶ Regarder
                    </button>

                `;


                item
                    .querySelector(
                        ".watch-btn"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            watchMovie(
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
       TÉLÉCHARGEMENT
    ===================================================== */

    function downloadMovie(movie) {

        if (!movie) {

            return;

        }


        if (!movie.download) {

            showMessage(
                "⬇ Téléchargement bientôt disponible"
            );

            return;

        }


        /*
         * Enregistrer dans la liste
         */

        if (
            !downloads.includes(
                movie.id
            )
        ) {

            downloads.push(
                movie.id
            );

            localStorage.setItem(
                "JTN_STREAM_DOWNLOADS",
                JSON.stringify(
                    downloads
                )
            );

        }


        /*
         * Ouvrir le lien
         */

        const link =
            document.createElement(
                "a"
            );


        link.href =
            movie.download;


        link.target =
            "_blank";


        link.rel =
            "noopener noreferrer";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        renderDownloads();


        showMessage(
            "⬇ Téléchargement lancé"
        );

    }


    /* =====================================================
       PAGE TÉLÉCHARGEMENTS
    ===================================================== */

    function renderDownloads() {

        if (!downloadList) {

            return;

        }


        downloadList.innerHTML =
            "";


        const list =
            movies.filter(
                movie =>
                    downloads.includes(
                        movie.id
                    )
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
            movie => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "download-item";


                item.innerHTML = `

                    <strong>
                        ${escapeHTML(
                            movie.title
                        )}
                    </strong>

                    <button
                        class="watch-btn"
                        type="button"
                    >
                        ▶
                    </button>

                `;


                item
                    .querySelector(
                        ".watch-btn"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            watchMovie(
                                movie
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
            () => {

                if (!searchBox) {

                    return;

                }


                searchBox.classList.toggle(
                    "active"
                );


                if (
                    searchBox.classList.contains(
                        "active"
                    )
                ) {

                    searchInput.focus();

                }

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const text =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(
                        ".movie"
                    )
                    .forEach(
                        movie => {

                            const title =
                                (
                                    movie.dataset.title ||
                                    ""
                                ).toLowerCase();


                            movie.style.display =
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


        document
            .querySelectorAll(
                ".nav-btn"
            )
            .forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


        if (
            page === "home"
        ) {

            if (homePage) {

                homePage.style.display =
                    "block";

            }


            if (homeBtn) {

                homeBtn.classList.add(
                    "active"
                );

            }

        }


        if (
            page === "favorites"
        ) {

            if (favoritesPage) {

                favoritesPage.style.display =
                    "block";

            }


            if (favoritesBtn) {

                favoritesBtn.classList.add(
                    "active"
                );

            }


            renderFavorites();

        }


        if (
            page === "downloads"
        ) {

            if (downloadsPage) {

                downloadsPage.style.display =
                    "block";

            }


            if (downloadsBtn) {

                downloadsBtn.classList.add(
                    "active"
                );

            }


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
            () => {

                showPage(
                    "home"
                );

            }
        );

    }


    if (favoritesBtn) {

        favoritesBtn.addEventListener(
            "click",
            () => {

                showPage(
                    "favorites"
                );

            }
        );

    }


    if (downloadsBtn) {

        downloadsBtn.addEventListener(
            "click",
            () => {

                showPage(
                    "downloads"
                );

            }
        );

    }


    if (backFromFavorites) {

        backFromFavorites.addEventListener(
            "click",
            () => {

                showPage(
                    "home"
                );

            }
        );

    }


    if (backFromDownloads) {

        backFromDownloads.addEventListener(
            "click",
            () => {

                showPage(
                    "home"
                );

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
       HERO
    ===================================================== */

    if (heroPlay) {

        heroPlay.addEventListener(
            "click",
            () => {

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
            () => {

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
       ÉCHAPPEMENT HTML
    ===================================================== */

    function escapeHTML(text) {

        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            String(text || "");


        return element.innerHTML;

    }


    function escapeAttribute(text) {

        return String(
            text || ""
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
       DÉMARRAGE
    ===================================================== */

    showPage(
        "home"
    );


    renderFavorites();

    renderDownloads();

    loadMovies();


    console.log(
        "🔥 JTN STREAM Ultimate chargé."
    );

});    
