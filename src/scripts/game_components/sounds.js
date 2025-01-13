import {
    Sound,
    FreeCamera,
    Vector3,
    MeshBuilder,
} from '@babylonjs/core';

export function sounds(scene, Engine) {

    let changePlayer = new Sound("changePlayer", "sounds/cyber-swoosh.mp3", scene);
    changePlayer.setVolume(0.3)

    let slideSound = new Sound("slideSound", "sounds/20155 slide hissing swoosh-full.mp3", scene);
    slideSound.setVolume(0.8)

    let coinSound = new Sound("coinSound", "sounds/Simple_Menu_Select_3.mp3", scene);
    coinSound.setVolume(1)

    let jumpSound = new Sound("jumpSound", "sounds/Jump.mp3", scene)
    jumpSound.setVolume(2)

    let hitWallSound = new Sound("hitWallSound", "sounds/Future_Weapons_3_-_Laser_Hand_Gun_-_Hit_4.mp3", scene)
    hitWallSound.setVolume(0.5)

    let menuSound = new Sound("menuSound", "sounds/Bass Chirp UI Click 1.mp3", scene)
    menuSound.setVolume(0.5)

    let pauseSound = new Sound("pauseSound", "sounds/Game Task Pause.mp3", scene)
    pauseSound.setVolume(0.2)

    let menuButtons = document.getElementsByClassName("menu-btn")

    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener("mouseenter", (event) => {
            menuSound.play()
        })

    }

    let startGameMusic = new Sound(
        "startGameMusic",
        "sounds/Spacecraft Rumble Telemetry Ambience.mp3",
        scene,
        null,
        {
            loop: true,
            autoplay: false,
        });
    startGameMusic.setVolume(0.7)
    startGameMusic.setPlaybackRate(1)


    let gameMusic = new Sound(
        "gameMusic",
        "sounds/Action Cyber Game.mp3",
        scene,
        null,
        {
            loop: true,
            autoplay: false,
        });
    gameMusic.setVolume(0.3)
    gameMusic.setPlaybackRate(1)



    // Engine.audioEngine.setGlobalVolume(2);
    let soundOn = true;
    function toggleMuteSound() {
        if (soundOn) {
            soundOn = false
            // gameMusic.setVolume(0)
            Engine.audioEngine.setGlobalVolume(0);
            muteIcon.style.opacity = "0.5"
        } else {
            soundOn = true
            // gameMusic.setVolume(0.1)
            Engine.audioEngine.setGlobalVolume(2);
            muteIcon.style.opacity = "1"
        }
    }

    muteIcon.onclick = () => {
        toggleMuteSound()
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === 'm') {
            toggleMuteSound()
        }
    })

}
