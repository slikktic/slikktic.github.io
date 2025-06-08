document.addEventListener("DOMContentLoaded", () => {
    const door = document.getElementById("door");
    const doorSound = document.getElementById("doorSound");

    door.addEventListener("mouseenter", () => {
        doorSound.currentTime = 0;
        doorSound.play();
    });
    door.addEventListener("mouseleave", () => {
        doorSound.pause();
    });

});

const tabsound = document.getElementsByClassName("tabsound");
const linkbutton = document.getElementsByClassName("linkbutton");

function play(audio) {
    audio.playbackRate = 2; //(Math.random() * (1.5 - 0.6) + 0.6);
    audio.preservesPitch = false;
    audio.currentTime = 0;
    audio.play();
}

for (let i = 0; i < linkbutton.length; i++) {
    linkbutton[i].addEventListener("mouseover", () => {
        play(tabsound[i]);
    })
}