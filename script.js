const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");


// =========================
// MUSIC
// =========================

if (music) {

    const savedTime =
        localStorage.getItem("musicTime");

    const musicWasPlaying =
        localStorage.getItem("musicPlaying");


    music.volume = 0.35;


    // Ждём загрузки музыки
    music.addEventListener("loadedmetadata", function () {

        if (savedTime) {

            music.currentTime =
                parseFloat(savedTime);

        }


        if (musicWasPlaying === "true") {

            music.play().catch(() => {});

        }

    });


    // Сохраняем текущую секунду
    music.addEventListener("timeupdate", function () {

        localStorage.setItem(
            "musicTime",
            music.currentTime
        );

    });


    // Кнопка музыки
    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function () {

                if (music.paused) {

                    music.play();

                    localStorage.setItem(
                        "musicPlaying",
                        "true"
                    );

                    musicButton.textContent = "♫";

                } else {

                    music.pause();

                    localStorage.setItem(
                        "musicPlaying",
                        "false"
                    );

                    musicButton.textContent = "×";

                }

            }
        );

    }

}


// =========================
// ПРОДОЛЖИТЬ
// =========================

const continueButton =
    document.getElementById("continueButton");


if (continueButton && music) {

    continueButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            // Запускаем музыку
            music.play().then(() => {

                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );


                // Сохраняем позицию прямо перед переходом
                localStorage.setItem(
                    "musicTime",
                    music.currentTime
                );


                window.location.href =
                    "question.html";

            }).catch(() => {

                window.location.href =
                    "question.html";

            });

        }
    );

}


// =========================
// ПЕРЕХОД НА DATE.HTML
// =========================

const yesButton =
    document.getElementById("yesButton");


if (yesButton) {

    yesButton.addEventListener(
        "click",
        function () {

            if (music) {

                localStorage.setItem(
                    "musicTime",
                    music.currentTime
                );

            }


            localStorage.setItem(
                "musicPlaying",
                "true"
            );

        }
    );

}


// =========================
// УБЕГАЮЩАЯ КНОПКА "НЕТ"
// =========================

const noButton =
    document.getElementById("noButton");

const answersArea =
    document.getElementById("answersArea");

const noMessage =
    document.getElementById("noMessage");


function moveNoButton(event) {

    if (!noButton || !answersArea) {
        return;
    }


    if (event) {

        event.preventDefault();
        event.stopPropagation();

    }


    const areaWidth =
        answersArea.clientWidth;

    const areaHeight =
        answersArea.clientHeight;


    const buttonWidth =
        noButton.offsetWidth;

    const buttonHeight =
        noButton.offsetHeight;


    const maxX =
        areaWidth - buttonWidth;

    const maxY =
        areaHeight - buttonHeight;


    let newX =
        Math.random() * maxX;

    let newY =
        Math.random() * maxY;


    if (newX < 250 && newY < 90) {

        newX += 250;

    }


    if (newX > maxX) {
        newX = maxX;
    }


    if (newY > maxY) {
        newY = maxY;
    }


    noButton.style.left =
        newX + "px";

    noButton.style.top =
        newY + "px";


    if (noMessage) {

        noMessage.textContent =
            "Я бы на твоём месте выбрал «Да» 😏";

    }

}


if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );


    noButton.addEventListener(
        "click",
        moveNoButton
    );


    noButton.addEventListener(
        "touchstart",
        moveNoButton,
        { passive: false }
    );

}


// =========================
// ТАЙМЕР
// =========================

const dateOfDate =
    new Date("2026-10-25T19:00:00");


function updateCountdown() {

    const now = new Date();

    const difference =
        dateOfDate - now;


    if (difference <= 0) {
        return;
    }


    const daysValue =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hoursValue =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );


    const minutesValue =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );


    const secondsValue =
        Math.floor(
            (difference / 1000) % 60
        );


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if (days) {

        days.textContent =
            String(daysValue).padStart(2, "0");

    }


    if (hours) {

        hours.textContent =
            String(hoursValue).padStart(2, "0");

    }


    if (minutes) {

        minutes.textContent =
            String(minutesValue).padStart(2, "0");

    }


    if (seconds) {

        seconds.textContent =
            String(secondsValue).padStart(2, "0");

    }

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);