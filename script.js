const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");


// =========================
// MUSIC
// =========================

if (music) {

    const musicWasPlaying =
        localStorage.getItem("musicPlaying");

    if (musicWasPlaying === "true") {

        music.volume = 0.35;

        music.play().catch(() => {});

    }


    if (musicButton) {

        musicButton.addEventListener("click", function () {

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

        });

    }
}


// =========================
// START MUSIC AFTER FIRST CLICK
// =========================

const continueButton =
    document.getElementById("continueButton");


if (continueButton && music) {

    continueButton.addEventListener(
        "click",
        function () {

            music.play().then(() => {

                localStorage.setItem(
                    "musicPlaying",
                    "true"
                );

            }).catch(() => {});

        }
    );

}


// =========================
// RUNNING "NO" BUTTON
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


    // Не даём кнопке попасть слишком близко
    // к кнопке "Да"

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


// Компьютер

if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );


    noButton.addEventListener(
        "click",
        moveNoButton
    );


    // Телефон

    noButton.addEventListener(
        "touchstart",
        moveNoButton,
        { passive: false }
    );


    noButton.addEventListener(
        "pointerdown",
        function(event) {

            if (event.pointerType === "touch") {

                moveNoButton(event);

            }

        }
    );

}


// =========================
// COUNTDOWN
// =========================

// ИЗМЕНИ ЗДЕСЬ ДАТУ И ВРЕМЯ

const dateOfDate =
    new Date("2026-10-25T19:00:00");


function updateCountdown() {

    const now = new Date();

    const difference =
        dateOfDate - now;


    if (difference <= 0) {

        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (days) days.textContent = "00";
        if (hours) hours.textContent = "00";
        if (minutes) minutes.textContent = "00";
        if (seconds) seconds.textContent = "00";

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