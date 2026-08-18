document.addEventListener("DOMContentLoaded", function () {


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

const movieDetails =
    document.getElementById("movieDetails");

const detailsPoster =
    document.getElementById("detailsPoster");

const detailsTitle =
    document.getElementById("detailsTitle");

const detailsYear =
    document.getElementById("detailsYear");

const detailsAge =
    document.getElementById("detailsAge");

const detailsQuality =
    document.getElementById("detailsQuality");

const detailsDescription =
    document.getElementById("detailsDescription");

const detailsWatch =
    document.getElementById("detailsWatch");

const detailsFavorite =
    document.getElementById("detailsFavorite");

const detailsDownload =
    document.getElementById("detailsDownload");

const closeDetails =
    document.getElementById("closeDetails");

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

const heroPlay =
    document.getElementById("heroPlay");

const heroInfo =
    document.getElementById("heroInfo");

const homeBtn =
    document.getElementById("homeBtn");

const favoritesBtn =
    document.getElementById("favoritesBtn");

const downloadsBtn =
    document.getElementById("downloadsBtn");

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsBtnBottom =
    document.getElementById("settingsBtnBottom");

const backFromFavorites =
    document.getElementById("backFromFavorites");

const backFromDownloads =
    document.getElementById("backFromDownloads");


/* =====================================================
   DONNÉES
===================================================== */

let currentMovie = null;

let favorites = [];

let downloads = [];

try {

    favorites =
        JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_FAVORITES"
            ) || "[]"
        );

    downloads =
        JSON.parse(
            localStorage.getItem(
                "JTN_STREAM_DOWNLOADS"
            ) || "[]"
        );

    if (!Array.isArray(favorites)) {
        favorites = [];
    }

    if (!Array.isArray(downloads)) {
        downloads = [];
    }

} catch (error) {

    favorites = [];
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
   RÉCUPÉRER UN FILM
===================================================== */

function getMovieFromElement(element) {

    if (!element) {
        return null;
    }

    return {

        element: element,

        id:
            element.dataset.id,

        title:
            element.dataset.title,

        year:
            element.dataset.year || "2026",

        age:
            element.dataset.age || "13+",

        quality:
            element.dataset.quality || "HD",

        category:
            element.dataset.category || "Film",

        description:
            element.dataset.description ||
            "Découvre ce film sur JTN STREAM.",

        video:
            element.dataset.video || "",

        external:
            element.dataset.external || "",

        poster:
            getPoster(element)

    };

}


/* =====================================================
   POSTER
===================================================== */

function getPoster(element) {

    const poster =
        element.querySelector(".poster");

    if (!poster) {
        return "";
    }

    const background =
        getComputedStyle(
            poster
        ).backgroundImage;

    return background;

}


/* =====================================================
   OUVRIR LA FICHE
===================================================== */

function openMovieDetails(movie) {

    if (!movie || !movieDetails) {
        return;
    }

    currentMovie =
        movie;


    detailsTitle.textContent =
        movie.title;

    detailsYear.textContent =
        movie.year;

    detailsAge.textContent =
        movie.age;

    detailsQuality.textContent =
        movie.quality;

    detailsDescription.textContent =
        movie.description;


    if (movie.poster) {

        detailsPoster.style.backgroundImage =
            movie.poster;

        movieDetails.querySelector(
            ".details-background"
        ).style.backgroundImage =
            `
            linear-gradient(
                to bottom,
                rgba(0,0,0,.1),
                #050505 90%
            ),
            ${movie.poster}
            `;

    }


    updateDetailsFavorite();


    movieDetails.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   FERMER LA FICHE
===================================================== */

function closeMovieDetails() {

    movieDetails.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

    currentMovie =
        null;

}


if (closeDetails) {

    closeDetails.addEventListener(
        "click",
        closeMovieDetails
    );

}


/* =====================================================
   BOUTON REGARDER
===================================================== */

function watchMovie(movie) {

    if (!movie) {
        return;
    }


    if (
        !movie.video &&
        !movie.external
    ) {

        showMessage(
            "🎬 Vidéo bientôt disponible"
        );

        return;

    }


    if (!player) {
        return;
    }


    if (movieDetails) {

        movieDetails.classList.remove(
            "active"
        );

    }


    video.pause();

    video.style.display =
        "none";

    vdoFrame.style.display =
        "none";

    vdoFrame.src =
        "";


    /*
       FILM AVEC LECTEUR EXTERNE
    */

    if (movie.external) {

        vdoFrame.src =
            movie.external;

        vdoFrame.style.display =
            "block";

        player.style.display =
            "flex";

        return;

    }


    /*
       FILM LOCAL / GITHUB
    */

    if (movie.video) {

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
                    "▶ Appuie sur lecture"
                );

            }
        );

    }

}


/* =====================================================
   BOUTON REGARDER DE LA FICHE
===================================================== */

if (detailsWatch) {

    detailsWatch.addEventListener(
        "click",
        function () {

            if (currentMovie) {

                watchMovie(
                    currentMovie
                );

            }

        }
    );

}


/* =====================================================
   FERMER LE LECTEUR
===================================================== */

function closeVideo() {

    if (!player) {
        return;
    }

    video.pause();

    video.removeAttribute(
        "src"
    );

    video.load();

    vdoFrame.src =
        "";

    vdoFrame.style.display =
        "none";

    video.style.display =
        "none";

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
   CLIQUE SUR LES FILMS
===================================================== */

document
    .querySelectorAll(".movie")
    .forEach(function (element) {


        /*
           Cliquer sur l'affiche
           ou le titre = fiche
        */

        element.addEventListener(
            "click",
            function (event) {

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


                const movie =
                    getMovieFromElement(
                        element
                    );

                openMovieDetails(
                    movie
                );

            }
        );


        /*
           REGARDER
        */

        const watchButton =
            element.querySelector(
                ".watch-btn"
            );

        if (watchButton) {

            watchButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const movie =
                        getMovieFromElement(
                            element
                        );

                    openMovieDetails(
                        movie
                    );

                }
            );

        }


        /*
           FAVORIS
        */

        const favoriteButton =
            element.querySelector(
                ".favorite-btn"
            );

        if (favoriteButton) {

            favoriteButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const movie =
                        getMovieFromElement(
                            element
                        );

                    toggleFavorite(
                        movie
                    );

                }
            );

        }


        /*
           TÉLÉCHARGEMENT
        */

        const downloadButton =
            element.querySelector(
                ".download-btn"
            );

        if (downloadButton) {

            downloadButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    const movie =
                        getMovieFromElement(
                            element
                        );

                    addDownload(
                        movie
                    );

                }
            );

        }

    });


/* =====================================================
   FAVORIS
===================================================== */

function isFavorite(id) {

    return favorites.includes(
        id
    );

}


function saveFavorites() {

    localStorage.setItem(
        "JTN_STREAM_FAVORITES",
        JSON.stringify(
            favorites
        )
    );

}


function toggleFavorite(movie) {

    if (!movie) {
        return;
    }


    if (
        isFavorite(
            movie.id
        )
    ) {

        favorites =
            favorites.filter(
                function (id) {

                    return id !== movie.id;

                }
            );

        showMessage(
            "♡ Retiré de Ma liste"
        );

    } else {

        favorites.push(
            movie.id
        );

        showMessage(
            "♥ Ajouté à Ma liste"
        );

    }


    saveFavorites();

    updateFavoriteButtons();

    updateDetailsFavorite();

    renderFavorites();

}


function updateFavoriteButtons() {

    document
        .querySelectorAll(".movie")
        .forEach(function (movie) {

            const id =
                movie.dataset.id;

            const button =
                movie.querySelector(
                    ".favorite-btn"
                );

            if (!button) {
                return;
            }


            if (
                isFavorite(id)
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

        });

}


function updateDetailsFavorite() {

    if (
        !detailsFavorite ||
        !currentMovie
    ) {
        return;
    }


    if (
        isFavorite(
            currentMovie.id
        )
    ) {

        detailsFavorite.textContent =
            "♥ Ma liste";

        detailsFavorite.classList.add(
            "active"
        );

    } else {

        detailsFavorite.textContent =
            "♡ Ma liste";

        detailsFavorite.classList.remove(
            "active"
        );

    }

}


if (detailsFavorite) {

    detailsFavorite.addEventListener(
        "click",
        function () {

            if (currentMovie) {

                toggleFavorite(
                    currentMovie
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


    const movies =
        getAllMovies();


    const favoriteMovies =
        movies.filter(
            function (movie) {

                return favorites.includes(
                    movie.id
                );

            }
        );


    if (
        favoriteMovies.length === 0
    ) {

        favoriteList.innerHTML = `
            <div class="empty-message">
                <h3>♡ Aucun film</h3>
                <p>
                    Ajoute tes films préférés
                    à Ma liste.
                </p>
            </div>
        `;

        return;

    }


    favoriteMovies.forEach(
        function (movie) {

            const item =
                document.createElement(
                    "div"
                );

            item.style.padding =
                "15px";

            item.style.marginBottom =
                "10px";

            item.style.background =
                "#151515";

            item.style.borderRadius =
                "8px";


            item.innerHTML = `
                <strong>
                    ${escapeHTML(
                        movie.title
                    )}
                </strong>

                <br><br>

                <button class="watch-btn">
                    ▶ Regarder
                </button>
            `;


            item
                .querySelector(
                    ".watch-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        openMovieDetails(
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
        !downloads.includes(
            movie.id
        )
    ) {

        downloads.push(
            movie.id
        );

        saveDownloads();

        showMessage(
            "⬇ Ajouté aux téléchargements"
        );

    } else {

        showMessage(
            "ℹ️ Déjà dans tes téléchargements"
        );

    }


    renderDownloads();

}


function renderDownloads() {

    if (!downloadList) {
        return;
    }

    downloadList.innerHTML =
        "";


    const movies =
        getAllMovies();


    const downloaded =
        movies.filter(
            function (movie) {

                return downloads.includes(
                    movie.id
                );

            }
        );


    if (
        downloaded.length === 0
    ) {

        downloadList.innerHTML = `
            <div class="empty-message">
                <h3>⬇ Aucun téléchargement</h3>
                <p>
                    Tes téléchargements
                    apparaîtront ici.
                </p>
            </div>
        `;

        return;

    }


    downloaded.forEach(
        function (movie) {

            const item =
                document.createElement(
                    "div"
                );

            item.style.padding =
                "15px";

            item.style.marginBottom =
                "10px";

            item.style.background =
                "#151515";

            item.style.borderRadius =
                "8px";


            item.innerHTML = `
                <strong>
                    ${escapeHTML(
                        movie.title
                    )}
                </strong>

                <br><br>

                <button class="watch-btn">
                    ▶ Regarder
                </button>
            `;


            item
                .querySelector(
                    ".watch-btn"
                )
                .addEventListener(
                    "click",
                    function () {

                        openMovieDetails(
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
   TOUS LES FILMS
===================================================== */

function getAllMovies() {

    return Array
        .from(
            document.querySelectorAll(
                ".movie"
            )
        )
        .map(
            function (element) {

                return getMovieFromElement(
                    element
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
                    function (movie) {

                        const title =
                            (
                                movie.dataset.title ||
                                ""
                            )
                            .toLowerCase();


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

function showHome() {

    homePage.style.display =
        "block";

    favoritesPage.style.display =
        "none";

    downloadsPage.style.display =
        "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showFavorites() {

    homePage.style.display =
        "none";

    favoritesPage.style.display =
        "block";

    downloadsPage.style.display =
        "none";

    renderFavorites();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showDownloads() {

    homePage.style.display =
        "none";

    favoritesPage.style.display =
        "none";

    downloadsPage.style.display =
        "block";

    renderDownloads();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


if (homeBtn) {

    homeBtn.addEventListener(
        "click",
        showHome
    );

}


if (favoritesBtn) {

    favoritesBtn.addEventListener(
        "click",
        showFavorites
    );

}


if (downloadsBtn) {

    downloadsBtn.addEventListener(
        "click",
        showDownloads
    );

}


if (backFromFavorites) {

    backFromFavorites.addEventListener(
        "click",
        showHome
    );

}


if (backFromDownloads) {

    backFromDownloads.addEventListener(
        "click",
        showHome
    );

}


/* =====================================================
   MENU
===================================================== */

document
    .querySelectorAll(
        ".menu button"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.dataset.scroll;

                    const section =
                        document.getElementById(
                            id
                        );

                    if (section) {

                        section.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


/* =====================================================
   HERO
===================================================== */

if (heroPlay) {

    heroPlay.addEventListener(
        "click",
        function () {

            const firstMovie =
                document.querySelector(
                    ".movie"
                );

            if (!firstMovie) {
                return;
            }

            const movie =
                getMovieFromElement(
                    firstMovie
                );

            watchMovie(
                movie
            );

        }
    );

}


if (heroInfo) {

    heroInfo.addEventListener(
        "click",
        function () {

            const firstMovie =
                document.querySelector(
                    ".movie"
                );

            if (!firstMovie) {
                return;
            }

            const movie =
                getMovieFromElement(
                    firstMovie
                );

            openMovieDetails(
                movie
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
   INITIALISATION
===================================================== */

homePage.style.display =
    "block";

favoritesPage.style.display =
    "none";

downloadsPage.style.display =
    "none";

updateFavoriteButtons();

renderFavorites();

renderDownloads();


console.log(
    "🔥 JTN STREAM — système Netflix chargé."
);

});
🎬 Ce qui change
