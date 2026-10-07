const noButton = document.getElementById("noButton");
const answersArea = document.getElementById("answersArea");
const noMessage = document.getElementById("noMessage");


function moveNoButton(event) {

    if (!noButton || !answersArea) {
        return;
    }

    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const areaWidth = answersArea.clientWidth;
    const areaHeight = answersArea.clientHeight;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const maxX = areaWidth - buttonWidth;
    const maxY = areaHeight - buttonHeight;

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    if (newX < 230 && newY < 80) {
        newX += 230;
    }

    if (newX > maxX) {
        newX = maxX;
    }

    if (newY > maxY) {
        newY = maxY;
    }

    noButton.style.left = newX + "px";
    noButton.style.top = newY + "px";

    if (noMessage) {
        noMessage.textContent = "Я бы выбрал «Да» 😏";
    }
}


if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        moveNoButton
    );

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


/* TIMER */

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


    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");


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

setInterval(updateCountdown, 1000);