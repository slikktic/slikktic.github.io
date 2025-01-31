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