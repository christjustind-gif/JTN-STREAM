document.addEventListener("DOMContentLoaded", () => {

const API_URL = "http://localhost:3000/api/movies";  

const homePage = document.getElementById("homePage");  
const favoritesPage = document.getElementById("favoritesPage");  
const downloadsPage = document.getElementById("downloadsPage");  

const favoriteList = document.getElementById("favoriteList");  
const downloadList = document.getElementById("downloadList");  

const player = document.getElementById("player");  
const video = document.getElementById("video");  
const closePlayer = document.getElementById("closePlayer");  

const searchBtn = document.getElementById("searchBtn");  
const searchBox = document.getElementById("searchBox");  
const searchInput = document.getElementById("searchInput");  

const homeBtn = document.getElementById("homeBtn");  
const favoritesBtn = document.getElementById("favoritesBtn");  
const downloadsBtn = document.getElementById("downloadsBtn");  

const backFromFavorites =  
    document.getElementById("backFromFavorites");  

const backFromDownloads =  
    document.getElementById("backFromDownloads");  

const heroPlay =  
    document.getElementById("heroPlay");  


/* =====================================================  
   DONNÉES  
===================================================== */  

let movies = [];  

let favorites =  
    JSON.parse(  
        localStorage.getItem("JTN_STREAM_FAVORITES")  
    ) || [];  

let downloads =  
    JSON.parse(  
        localStorage.getItem("JTN_STREAM_DOWNLOADS")  
    ) || [];  


/* =====================================================  
   MESSAGE  
===================================================== */  

function showMessage(message) {  

    let box = document.getElementById("jtnMessage");  

    if (!box) {  

        box = document.createElement("div");  

        box.id = "jtnMessage";  

        box.style.position = "fixed";  
        box.style.bottom = "80px";  
        box.style.left = "50%";  
        box.style.transform = "translateX(-50%)";  

        box.style.zIndex = "99999";  

        box.style.background = "#181818";  
        box.style.color = "#fff";  

        box.style.padding = "14px 22px";  
        box.style.borderRadius = "14px";  

        box.style.fontWeight = "600";  

        box.style.boxShadow =  
            "0 10px 30px rgba(0,0,0,.5)";  

        document.body.appendChild(box);  
    }  

    box.textContent = message;  

    box.style.display = "block";  

    clearTimeout(window.jtnMessageTimer);  

    window.jtnMessageTimer =  
        setTimeout(() => {  

            box.style.display = "none";  

        }, 3000);  
}  


/* =====================================================  
   CHARGER LES FILMS AUTOMATIQUEMENT  
===================================================== */  

async function loadMovies() {  

    try {  

        showMessage("⏳ Chargement de JTN STREAM...");  

        const response =  
            await fetch(API_URL);  

        if (!response.ok) {  
            throw new Error(  
                "Erreur HTTP " + response.status  
            );  
        }  

        movies = await response.json();  

        console.log(  
            "🎬 Films chargés :",  
            movies  
        );  

        renderMovies();  

        updateFavoriteButtons();  

        showMessage(  
            "🔥 JTN STREAM est prêt !"  
        );  

    } catch (error) {  

        console.error(  
            "Erreur chargement films :",  
            error  
        );  

        showMessage(  
            "❌ Impossible de contacter le serveur JTN STREAM"  
        );  
    }  
}  


/* =====================================================  
   AFFICHER LES FILMS  
===================================================== */  

function renderMovies() {  

    const categories =  
        document.querySelectorAll(".category");  

    categories.forEach(category => {  

        const row =  
            category.querySelector(".movie-row");  

        if (!row) return;  

        row.innerHTML = "";  
    });  


    movies.forEach(movie => {  

        let category =  
            [...document.querySelectorAll(".category")]  
            .find(section => {  

                const title =  
                    section.querySelector("h2");  

                if (!title) return false;  

                return title.textContent  
                    .toLowerCase()  
                    .includes(  
                        movie.category  
                            .toLowerCase()  
                    );  
            });  


        if (!category) {  

            category =  
                document.querySelector(".category");  
        }  


        const row =  
            category.querySelector(".movie-row");  

        if (!row) return;  


        const article =  
            document.createElement("article");  

        article.className = "movie";  

        article.dataset.id = movie.id;  
        article.dataset.title = movie.title;  
        article.dataset.video = movie.video;  


        article.innerHTML = `  

            <div  
                class="poster"  
                style="  
                    background-image:  
                    url('${movie.poster}');  
                "  
            ></div>  

            <h3>  
                ${escapeHTML(movie.title)}  
            </h3>  

            <div class="movie-actions">  

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


        row.appendChild(article);  


        /* REGARDER */  

        article  
            .querySelector(".watch-btn")  
            .addEventListener(  
                "click",  
                () => {  

                    watchMovie(movie);  

                }  
            );  


        /* FAVORIS */  

        article  
            .querySelector(".favorite-btn")  
            .addEventListener(  
                "click",  
                () => {  

                    toggleFavorite(movie);  

                }  
            );  


        /* TÉLÉCHARGEMENT */  

        article  
            .querySelector(".download-btn")  
            .addEventListener(  
                "click",  
                () => {  

                    addDownload(movie);  

                }  
            );  

    });  

}  


/* =====================================================  
   LECTEUR  
===================================================== */  

function watchMovie(movie) {  

    if (!movie.video) {  

        showMessage(  
            "🎬 Vidéo bientôt disponible"  
        );  

        return;  
    }  


    if (!video || !player) {  

        showMessage(  
            "❌ Lecteur vidéo introuvable"  
        );  

        return;  
    }  


    video.src = movie.video;  

    player.style.display = "flex";  

    video.load();  

    video.play().catch(() => {  

        showMessage(  
            "▶ Appuie sur lecture pour démarrer la vidéo"  
        );  

    });  

}  


/* =====================================================  
   FERMER LE LECTEUR  
===================================================== */  

function closeVideo() {  

    if (!video || !player) return;  

    video.pause();  

    video.removeAttribute("src");  

    video.load();  

    player.style.display = "none";  
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

function isFavorite(id) {  

    return favorites.includes(id);  

}  


function toggleFavorite(movie) {  

    if (isFavorite(movie.id)) {  

        favorites =  
            favorites.filter(  
                id => id !== movie.id  
            );  

        showMessage(  
            "♡ Retiré des favoris"  
        );  

    } else {  

        favorites.push(movie.id);  

        showMessage(  
            "♥ Ajouté aux favoris"  
        );  

    }  


    localStorage.setItem(  
        "JTN_STREAM_FAVORITES",  
        JSON.stringify(favorites)  
    );  


    updateFavoriteButtons();  

    renderFavorites();  

}  


function updateFavoriteButtons() {  

    document  
        .querySelectorAll(".movie")  
        .forEach(movieElement => {  

            const id =  
                movieElement.dataset.id;  

            const button =  
                movieElement  
                    .querySelector(  
                        ".favorite-btn"  
                    );  

            if (!button) return;  


            if (isFavorite(id)) {  

                button.textContent = "♥";  

                button.classList.add(  
                    "active"  
                );  

            } else {  

                button.textContent = "♡";  

                button.classList.remove(  
                    "active"  
                );  
            }  

        });  

}  


/* =====================================================  
   FAVORIS PAGE  
===================================================== */  

function renderFavorites() {  

    if (!favoriteList) return;  

    favoriteList.innerHTML = "";  


    const favoriteMovies =  
        movies.filter(  
            movie =>  
                favorites.includes(movie.id)  
        );  


    if (favoriteMovies.length === 0) {  

        favoriteList.innerHTML = `  
            <div class="empty-message">  
                <h3>♡ Aucun favori</h3>  
                <p>  
                    Ajoute des films à tes favoris.  
                </p>  
            </div>  
        `;  

        return;  
    }  


    favoriteMovies.forEach(movie => {  

        const item =  
            document.createElement("div");  

        item.className =  
            "favorite-item";  

        item.innerHTML = `  
            <strong>  
                ${escapeHTML(movie.title)}  
            </strong>  

            <button  
                class="watch-btn"  
                type="button"  
            >  
                ▶ Regarder  
            </button>  
        `;  


        item  
            .querySelector(".watch-btn")  
            .addEventListener(  
                "click",  
                () => {  

                    watchMovie(movie);  

                }  
            );  


        favoriteList.appendChild(item);  

    });  

}  


/* =====================================================  
   TÉLÉCHARGEMENTS  
===================================================== */  

function addDownload(movie) {  

    if (!downloads.includes(movie.id)) {  

        downloads.push(movie.id);  

        localStorage.setItem(  
            "JTN_STREAM_DOWNLOADS",  
            JSON.stringify(downloads)  
        );  

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

    if (!downloadList) return;  

    downloadList.innerHTML = "";  


    const downloadedMovies =  
        movies.filter(  
            movie =>  
                downloads.includes(movie.id)  
        );  


    if (downloadedMovies.length === 0) {  

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


    downloadedMovies.forEach(movie => {  

        const item =  
            document.createElement("div");  

        item.className =  
            "download-item";  


        item.innerHTML = `  

            <strong>  
                ${escapeHTML(movie.title)}  
            </strong>  

            <button  
                class="watch-btn"  
                type="button"  
            >  
                ▶  
            </button>  

        `;  


        item  
            .querySelector(".watch-btn")  
            .addEventListener(  
                "click",  
                () => {  

                    watchMovie(movie);  

                }  
            );  


        downloadList.appendChild(item);  

    });  

}  


/* =====================================================  
   RECHERCHE  
===================================================== */  

if (searchBtn) {  

    searchBtn.addEventListener(  
        "click",  
        () => {  

            if (!searchBox) return;  

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
        () => {  

            const text =  
                searchInput.value  
                    .toLowerCase()  
                    .trim();  


            document  
                .querySelectorAll(".movie")  
                .forEach(movie => {  

                    const title =  
                        movie.dataset.title  
                            .toLowerCase();  


                    movie.style.display =  
                        title.includes(text)  
                            ? ""  
                            : "none";  

                });  

        }  
    );  

}  


/* =====================================================  
   NAVIGATION  
===================================================== */  

function showPage(page) {  

    if (homePage)  
        homePage.style.display = "none";  

    if (favoritesPage)  
        favoritesPage.style.display = "none";  

    if (downloadsPage)  
        downloadsPage.style.display = "none";  


    if (page === "home" && homePage)  
        homePage.style.display = "block";  


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
        () => showPage("home")  
    );  

}  


if (favoritesBtn) {  

    favoritesBtn.addEventListener(  
        "click",  
        () => showPage("favorites")  
    );  

}  


if (downloadsBtn) {  

    downloadsBtn.addEventListener(  
        "click",  
        () => showPage("downloads")  
    );  

}  


if (backFromFavorites) {  

    backFromFavorites.addEventListener(  
        "click",  
        () => showPage("home")  
    );  

}  


if (backFromDownloads) {  

    backFromDownloads.addEventListener(  
        "click",  
        () => showPage("home")  
    );  

}  


/* =====================================================  
   HERO  
===================================================== */  

if (heroPlay) {  

    heroPlay.addEventListener(  
        "click",  
        () => {  

            if (movies.length > 0) {  

                watchMovie(movies[0]);  

            } else {  

                showMessage(  
                    "🎬 Aucun film disponible"  
                );  

            }  

        }  
    );  

}  


/* =====================================================  
   HTML SÉCURISÉ  
===================================================== */  

function escapeHTML(text) {  

    const element =  
        document.createElement("div");  

    element.textContent = text;  

    return element.innerHTML;  

}  


/* =====================================================  
   DÉMARRAGE  
===================================================== */  

showPage("home");  

renderFavorites();  

renderDownloads();  

loadMovies();

});
