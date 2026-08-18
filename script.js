document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       JTN STREAM — GITHUB PAGES
       PAS DE LOCALHOST
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
        document.getElementById("settingsBtnBottom");


    /* =====================================================
       FILMS
       ===================================================== */

    const movies = [

        {
            id: "film1",
            title: "The Last Mission",
            category: "Films",
            type: "iframe",
            video:
                "https://fembed.co/embed/N_Xc8eTr-4MGW"
        },

        {
            id: "film2",
            title: "Dark City",
            category: "Films",
            type: "video",
            video: "videos/dark-city.mp4"
        },

        {
            id: "film3",
            title: "Fast Road",
            category: "Films",
            type: "video",
            video: "videos/fast-road.mp4"
        },

        {
            id: "film4",
            title: "The Survivor",
            category: "Films",
            type: "video",
            video: "videos/the-survivor.mp4"
        },

        {
            id: "film5",
            title: "War Zone",
            category: "Action",
            type: "video",
            video: "videos/war-zone.mp4"
        },

        {
            id: "film6",
            title: "Night Hunter",
            category: "Action",
            type: "video",
            video: "videos/night-hunter.mp4"
        },

        {
            id: "film7",
            title: "Final Target",
            category: "Action",
            type: "video",
            video: "videos/final-target.mp4"
        },

        {
            id: "film8",
            title: "Crazy Family",
            category: "Comédie",
            type: "video",
            video: "videos/crazy-family.mp4"
        },

        {
            id: "film9",
            title: "Best Friends",
            category: "Comédie",
            type: "video",
            video: "videos/best-friends.mp4"
        },

        {
            id: "series1",
            title: "Dark Stories",
            category: "Séries",
            type: "video",
            video: "videos/dark-stories.mp4"
        },

        {
            id: "series2",
            title: "City Life",
            category: "Séries",
            type: "video",
            video: "videos/city-life.mp4"
        },

        {
            id: "anime1",
            title: "Shadow Warriors",
            category: "Animés",
            type: "video",
            video: "videos/shadow-warriors.mp4"
        },

        {
            id: "anime2",
            title: "Dragon Power",
            category: "Animés",
            type: "video",
            video: "videos/dragon-power.mp4"
        }

    ];


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

            box.id = "jtnMessage";

            box.style.position = "fixed";
            box.style.bottom = "90px";
            box.style.left = "50%";
            box.style.transform =
                "translateX(-50%)";

            box.style.zIndex = "999999";

            box.style.background =
                "#181818";

            box.style.color = "white";

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

        box.textContent = message;
        box.style.display = "block";

        clearTimeout(
            window.jtnMessageTimer
        );

        window.jtnMessageTimer =
            setTimeout(function () {

                box.style.display = "none";

            }, 2500);
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


        /* Fermer l'ancien contenu */

        if (video) {

            video.pause();

            video.removeAttribute("src");

            video.load();

            video.style.display = "none";
        }


        if (vdoFrame) {

            vdoFrame.src = "";

            vdoFrame.style.display =
                "none";
        }


        /* =================================================
           THE LAST MISSION / IFRAME
           ================================================= */

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


        /* =================================================
           VIDÉO MP4
           ================================================= */

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
       BOUTONS REGARDER
       ===================================================== */

    document
        .querySelectorAll(".watch-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const movieElement =
                        button.closest(
                            ".movie"
                        );

                    if (!movieElement) {
                        return;
                    }

                    const id =
                        movieElement.dataset.id;

                    const movie =
                        movies.find(
                            function (item) {
                                return item.id === id;
                            }
                        );

                    if (!movie) {

                        showMessage(
                            "❌ Film introuvable"
                        );

                        return;
                    }

                    watchMovie(movie);

                }
            );

        });


    /* =====================================================
       FAVORIS
       ===================================================== */

    function saveFavorites() {

        localStorage.setItem(
            "JTN_STREAM_FAVORITES",
            JSON.stringify(favorites)
        );

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

            });

    }


    document
        .querySelectorAll(".favorite-btn")
        .forEach(function (button) {

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

                    const id =
                        movieElement.dataset.id;


                    if (
                        favorites.includes(id)
                    ) {

                        favorites =
                            favorites.filter(
                                function (item) {
                                    return item !== id;
                                }
                            );

                        showMessage(
                            "♡ Retiré des favoris"
                        );

                    } else {

                        favorites.push(id);

                        showMessage(
                            "♥ Ajouté aux favoris"
                        );

                    }


                    saveFavorites();

                    updateFavoriteButtons();

                    renderFavorites();

                }
            );

        });


    /* =====================================================
       FAVORIS PAGE
       ===================================================== */

    function renderFavorites() {

        if (!favoriteList) {
            return;
        }

        favoriteList.innerHTML = "";


        const list =
            movies.filter(
                function (movie) {

                    return favorites.includes(
                        movie.id
                    );

                }
            );


        if (list.length === 0) {

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
                            background:
                            linear-gradient(
                                145deg,
                                #461010,
                                #111
                            );
                        "
                    ></div>

                    <h3>
                        ${escapeHTML(movie.title)}
                    </h3>

                    <div
                        class="favorite-card-actions"
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


                item
                    .querySelector(
                        ".favorite-watch"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            watchMovie(movie);

                        }
                    );


                item
                    .querySelector(
                        ".favorite-remove"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            favorites =
                                favorites.filter(
                                    function (id) {
                                        return id !== movie.id;
                                    }
                                );

                            saveFavorites();

                            updateFavoriteButtons();

                            renderFavorites();

                            showMessage(
                                "♡ Retiré des favoris"
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
            JSON.stringify(downloads)
        );

    }


    function addDownload(movie) {

        if (!movie) {
            return;
        }


        if (
            downloads.includes(movie.id)
        ) {

            showMessage(
                "ℹ️ Déjà dans les téléchargements"
            );

            return;
        }


        downloads.push(movie.id);

        saveDownloads();

        renderDownloads();

        showMessage(
            "⬇ Ajouté aux téléchargements"
        );

    }


    document
        .querySelectorAll(".download-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const movieElement =
                        button.closest(
                            ".movie"
                        );

                    if (!movieElement) {
                        return;
                    }

                    const id =
                        movieElement.dataset.id;

                    const movie =
                        movies.find(
                            function (item) {
                                return item.id === id;
                            }
                        );

                    addDownload(movie);

                }
            );

        });


    function renderDownloads() {

        if (!downloadList) {
            return;
        }

        downloadList.innerHTML = "";


        const list =
            movies.filter(
                function (movie) {

                    return downloads.includes(
                        movie.id
                    );

                }
            );


        if (list.length === 0) {

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
                        class="download-item-poster"
                    ></div>

                    <div
                        class="download-info"
                    >

                        <h3>
                            ${escapeHTML(movie.title)}
                        </h3>

                        <p>
                            Disponible dans JTN STREAM
                        </p>

                        <button
                            class="watch-offline-btn"
                            type="button"
                        >
                            ▶ Regarder
                        </button>

                        <button
                            class="delete-download-btn"
                            type="button"
                        >
                            ✕ Supprimer
                        </button>

                    </div>
                `;


                item
                    .querySelector(
                        ".watch-offline-btn"
                    )
                    .addEventListener(
                        "click",
                        function () {

                            watchMovie(movie);

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
                                        return id !== movie.id;
                                    }
                                );

                            saveDownloads();

                            renderDownloads();

                            showMessage(
                                "🗑 Supprimé"
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

                searchBox.classList.toggle(
                    "active"
                );

                if (
                    searchBox.classList.contains(
                        "active"
                    ) &&
                    searchInput
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
                    .querySelectorAll(".movie")
                    .forEach(
                        function (movie) {

                            const title =
                                (
                                    movie.dataset.title ||
                                    ""
                                ).toLowerCase();


                            if (
                                title.includes(text)
                            ) {

                                movie.style.display =
                                    "";

                            } else {

                                movie.style.display =
                                    "none";

                            }

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

                showPage("favorites");

            }
        );

    }


    if (downloadsBtn) {

        downloadsBtn.addEventListener(
            "click",
            function () {

                showPage("downloads");

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
       HERO — REGARDER
       ===================================================== */

    if (heroPlay) {

        heroPlay.addEventListener(
            "click",
            function () {

                const movie =
                    movies.find(
                        function (item) {
                            return item.id === "film1";
                        }
                    );

                watchMovie(movie);

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

                showMessage(
                    "🎬 THE LAST MISSION — Bienvenue sur JTN STREAM !"
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
       DÉMARRAGE
       ===================================================== */

    updateFavoriteButtons();

    renderFavorites();

    renderDownloads();

    showPage("home");


    console.log(
        "✅ JTN STREAM fonctionne avec GitHub Pages"
    );

});
