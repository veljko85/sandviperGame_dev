import {
    Vector3,
} from '@babylonjs/core';

import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";

import { cameraAlphaAnimation, cameraTargetPos } from "../functions/animations";
import { blendAnimation } from "../functions/blendAnimation";
import { randomNumber } from "../functions/randomNumber";

export function startGame(gameObject, playerObject, scene, Engine, cameraObject, tracksObject) {
    mainScreen.style.display = "none"
    startGameDisplay.style.display = "none";
    upperGameScreen.style.display = "flex";

    tracksObject.playerStartGroundModel.meshes[0].dispose()
    tracksObject.femalePlayerStartGroundModel.meshes[0].dispose()

    let startGameMusicVolumeDown = 0.3
    scene.registerBeforeRender(function soundDown() {
        startGameMusicVolumeDown -= 0.01
        scene.getSoundByName("startGameMusic").setVolume(startGameMusicVolumeDown)
        if (startGameMusicVolumeDown < 0) {
            scene.unregisterBeforeRender(soundDown);
            scene.getSoundByName("startGameMusic").stop(true)
        }
    });


    setTimeout(() => {
        scene.getSoundByName("gameMusic").play(true)
    }, 500);

    if (playerObject.selectedPlayer != "female") {
        playerObject.femalePlayerModelRoot.dispose()
        //set camera
        cameraAlphaAnimation(scene, scene.activeCamera.alpha, 0 - Math.PI / 2, false, 1)
        cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0.25, 0, 0), new Vector3(0, 0.5, -2), 1)
    }

    if (playerObject.selectedPlayer != "male") {
        playerObject.femalePlayerModelRoot.position = new Vector3(0, -0.5, 0);
        playerObject.playerModelRoot.dispose()
        //set camera
        cameraAlphaAnimation(scene, scene.activeCamera.alpha, 0 - Math.PI / 2, false, 1)
        cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0.75, 0, -1.5), new Vector3(0, 0.5, -2), 1)
    }

    //enable sound
    // Engine.audioEngine.unlock()
    // Engine.audioEngine.setGlobalVolume(2);
    //start game
    setTimeout(() => {
        gameObject.gameRunning = true
        blendAnimation(3, playerObject, true)
        // playerObject.playerAnimations[3].play(true)
    }, 1500);
}

export function gameRestart(scene, gameObject, playerObject, createScene) {
    mainScreen.style.display = "none"
    restartGameDisplay.style.display = "none";
    gameObject.gameRestarted = true

    playerObject.playerSpeed = 0.3
    playerObject.playerLanePos = 0
    playerObject.playerJumped = false
    playerObject.playerSlided = false
    playerObject.playerGroundPosition = 0
    playerObject.playerKnocked = false
    playerObject.collectedCoins = 0

    coinsNumber.innerHTML = `x ${playerObject.collectedCoins}`

    customLoadingScreenDiv.style.display = "flex"

    for (let i = 0; i < scene.meshes.length; i++) {
        scene.meshes[i].dispose()
    }
    setTimeout(() => {
        scene.dispose()
    }, 100);
    setTimeout(() => {
        createScene()
        // mainScreen.style.display = "flex"
        // startGame.style.display = "block";
        // setTimeout(() => {
        //     gameObject.gameRunning = true
        // }, 5000);
    }, 200);
}

export function gameRender(scene, tracksObject, playerObject, gameObject) {
    if (tracksObject.runningTracks.length < 2) {
        tracksObject.trackPosZ += 120
        let randomTrackNum = randomNumber(0, tracksObject.trackOptions.length - 1)
        // let randomTrackNum = 5
        tracksObject.trackOptions[randomTrackNum](scene, tracksObject, playerObject, gameObject)
    }

    if (playerObject.playerContainerMesh.position.z > 1000 && playerObject.playerSpeed == 0.2) {
        speedUpContainer.style.display = "flex"
        setTimeout(() => {
            speedUpDisplay.style.width = "160px"
            speedUpDisplay.style.height = "160px"
            speedUpDisplay.style.fontSize = "100px"
        }, 500);
        setTimeout(() => {
            playerObject.playerSpeed = 0.25
        }, 1500)
        setTimeout(() => {
            speedUpDisplay.style.width = "0px"
            speedUpDisplay.style.height = "0px"
            speedUpDisplay.style.fontSize = "0px"
            setTimeout(() => {
                speedUpContainer.style.display = "none"
            }, 500);
        }, 2500);
    }
    if (playerObject.playerContainerMesh.position.z > 2000 && playerObject.playerSpeed == 0.25) {
        speedUpContainer.style.display = "flex"
        setTimeout(() => {
            speedUpDisplay.innerHTML = "3x"
            speedUpDisplay.style.width = "160px"
            speedUpDisplay.style.height = "160px"
            speedUpDisplay.style.fontSize = "100px"
        }, 500);
        setTimeout(() => {
            playerObject.playerSpeed = 0.3
        }, 1500)
        setTimeout(() => {
            speedUpDisplay.innerHTML = "3x"
            speedUpDisplay.style.width = "0px"
            speedUpDisplay.style.height = "0px"
            speedUpDisplay.style.fontSize = "0px"
            setTimeout(() => {
                speedUpContainer.style.display = "none"
            }, 500);
        }, 2500);
    }
    if (playerObject.playerContainerMesh.position.z > 3000 && playerObject.playerSpeed == 0.3) {
        speedUpContainer.style.display = "flex"
        setTimeout(() => {
            speedUpDisplay.innerHTML = "4x"
            speedUpDisplay.style.width = "160px"
            speedUpDisplay.style.height = "160px"
            speedUpDisplay.style.fontSize = "100px"
        }, 500);
        setTimeout(() => {
            playerObject.playerSpeed = 0.35
        }, 1500)
        setTimeout(() => {
            speedUpDisplay.style.width = "0px"
            speedUpDisplay.style.height = "0px"
            speedUpDisplay.style.fontSize = "0px"
            setTimeout(() => {
                speedUpContainer.style.display = "none"
            }, 500);
        }, 2500);
    }

    for (let i = 0; i < tracksObject.runningTracks.length; i++) {
        if (playerObject.playerContainerMesh.position.z - 70 > tracksObject.runningTracks[0][0].position.z) {
            // tracksObject.runningTracks[i].dispose()
            tracksObject.runningTracks[i].forEach(element => {
                element.dispose()
            });
            tracksObject.runningTracks.splice(i, 1);
        }
    }
}

export function gamePause(gameObject, scene, playerObject) {
    if (!gameObject.gamePaused) {
        scene.getSoundByName("pauseSound").play()
        scene.getSoundByName("gameMusic").pause(true)
        pauseDisplay.innerHTML = "RESUME"
        gameObject.gamePaused = true
        mainScreen.style.display = "flex"
        pauseScreenContainer.style.display = "flex";
        return
    }
    if (gameObject.gamePaused) {
        scene.getSoundByName("pauseSound").play()
        scene.getSoundByName("gameMusic").play(true)
        pauseDisplay.innerHTML = "PAUSE"
        mainScreen.style.display = "none"
        pauseScreenContainer.style.display = "none";
        gameObject.gamePaused = false
        return
    }
}

export function gameOver(gameObject, scene, playerObject) {
    // console.log("gameOver")

    playerObject.playerKnocked = true;
    gameObject.gameRunning = false

    mainScreen.style.display = "flex";
    gameOverContainer.style.display = "flex";
    upperGameScreen.style.display = "none";

    endScorecoinsNumber.innerHTML = `x ${playerObject.collectedCoins}`;
    endScoreDistance.innerHTML = `Distance: ${Math.round(playerObject.playerContainerMesh.position.z)}m`;

    let endScoreDistanceNumber = Math.round(playerObject.playerContainerMesh.position.z)
    let finalScore = (endScoreDistanceNumber * 10) + (playerObject.collectedCoins * 100)
    endScore.innerHTML = `Score: ${finalScore}`;

    scene.getSoundByName("hitWallSound").play()

    playerObject.playerAnimations.forEach(anim => {
        anim.stop()
    });

    // playerObject.playerAnimations[7].play()
    blendAnimation(7, playerObject, false)
    setTimeout(() => {
        scene.registerBeforeRender(function fall() {

            if (playerObject.playerContainerMesh.position.y > playerObject.playerGroundPosition) {
                // scene.unregisterBeforeRender(fall);
                playerObject.playerContainerMesh.position.y -= 0.07
            }
        });
        setTimeout(() => {
            blendAnimation(0, playerObject, false)
        }, 300);

    }, 300);

    scene.activeCamera.useAutoRotationBehavior = true;
    // console.log(gameObject.userLoggedInData)

    //set attempts left
    // if (gameObject.userLoggedInData.user_attempts_left > 0) {
    //     set(ref(database, `users/${gameObject.userLoggedInData.database_position}/user_attempts_left`), gameObject.userLoggedInData.user_attempts_left - 1).then((snapshot) => {
    //         // console.log("success")
    //     }).catch((error) => {
    //         // console.error("Error setting data:", error);
    //     });
    // }


    // console.log(gameObject.discountCode)
    //set discount code
    // console.log(gameObject.userLoggedInData)
    if (/*gameObject.userLoggedInData.user_attempts_left > 0 && */gameObject.currentScore > -1) {
        codeSuccessDisplay.style.display = "flex"
        codeDisplay.innerHTML = gameObject.discountCode[gameObject.currentScore].discount_code
        // if (gameObject.discountCode != gameObject.userLoggedInData.user_get_discount_code) {
        gameObject.userLoggedInData.user_get_discount_code = gameObject.discountCode[gameObject.currentScore].discount_code
        // console.log(gameObject.userLoggedInData)
        set(ref(database, `users/${gameObject.userLoggedInData.database_position}/user_get_discount_code`), gameObject.discountCode[gameObject.currentScore].discount_code).then((snapshot) => {
            // console.log("success")
        }).catch((error) => {
            // console.error("Error setting data:", error);
        });
        // }
    }


    // console.log(localStorage.getItem('sandViperCodeAlreadyUsed'))
    // if (localStorage.getItem('sandViperCodeAlreadyUsed') == null) {

    //     

    //     const expirationDays = 0.001;
    //     const expirationMs = expirationDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    //     const now = new Date().getTime();
    //     const expirationTime = now + expirationMs;

    //     let sandViperCodeAlreadyUsed = {
    //         value: true,
    //         expiration: expirationTime
    //     };
    //     try {
    //         localStorage.setItem('sandViperCodeAlreadyUsed', JSON.stringify(sandViperCodeAlreadyUsed));
    //     } catch (e) {
    //         console.warn('Unable to save to localStorage:', e);
    //         // Optionally implement a fallback here
    //     }
    // } else {
    //     console.log("sandViperCodeAlreadyUsed is not null")
    // }
}
