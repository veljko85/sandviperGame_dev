import {
    Vector3,
} from '@babylonjs/core';

import { cameraTargetPos } from "./animations";


export function changePlayer(scene, playerObject, cameraObject, gameObject) {
    //CHANGE PLAYER
    let changingAnimationOn = false;

    choseMale.onclick = () => {
        // console.log("male")

        if (playerObject.selectedPlayer != "male" && !changingAnimationOn) {

            scene.getSoundByName("changePlayer").play()

            changingAnimationOn = true

            playerObject.selectedPlayer = "male"

            playerObject.playerAnimations = playerObject.malePlayerAnimations

            if (!gameObject.isMobile) cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0.75, 0, -1.5), new Vector3(0.25, 0, 0), 2)
            if (gameObject.isMobile) cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0.55, 0, -1.5), new Vector3(0, 0, 0), 2)

            setTimeout(() => {
                changingAnimationOn = false
            }, 500);

            selectedDivFemale.innerHTML = ""
            selectedDivMale.innerHTML = "&#10003;"



        }
    }

    choseFemale.onclick = () => {
        // console.log("female")

        if (playerObject.selectedPlayer != "female" && !changingAnimationOn) {

            scene.getSoundByName("changePlayer").play()

            changingAnimationOn = true

            playerObject.selectedPlayer = "female"

            playerObject.playerAnimations = playerObject.femalePlayerAnimations

            if (!gameObject.isMobile) cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0.25, 0, 0), new Vector3(0.75, 0, -1.5), 2)
            if (gameObject.isMobile) cameraTargetPos(scene, cameraObject.cameraTarget, new Vector3(0, 0, 0), new Vector3(0.55, 0, -1.5), 2)

            setTimeout(() => {
                changingAnimationOn = false
            }, 500);


            selectedDivMale.innerHTML = ""
            selectedDivFemale.innerHTML = "&#10003;"

        }

    }
}