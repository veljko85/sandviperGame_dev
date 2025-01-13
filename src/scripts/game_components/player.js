import {
    Vector3,
    MeshBuilder,
    ActionManager,
} from '@babylonjs/core';
import { blendAnimation } from '../functions/blendAnimation';


export function player(scene, canvas, playerObject, gameObject) {

    //MALE

    // console.log(playerObject.playerModel.animationGroups)

    for (let i = 0; i < playerObject.playerModel.animationGroups.length; i++) {
        playerObject.playerModel.animationGroups[i]._targetedAnimations.forEach(
            (targetedAnimation) => {
                targetedAnimation.animation.enableBlending = true;
                targetedAnimation.animation.blendingSpeed = 0.1;
            },
        );
    }



    playerObject.playerModel.animationGroups[0].stop()

    let game_over_male_anim = playerObject.playerModel.animationGroups[0]
    let hit_in_male_anim = playerObject.playerModel.animationGroups[1]
    let idle_male_anim = playerObject.playerModel.animationGroups[2]
    idle_male_anim.play(true)
    let jump_male_anim = playerObject.playerModel.animationGroups[3]
    let run_jump_2_male_anim = playerObject.playerModel.animationGroups[4]
    run_jump_2_male_anim.speedRatio = 2
    let run_JumpFall_male_anim = playerObject.playerModel.animationGroups[5]
    run_JumpFall_male_anim.speedRatio = 2
    let run_male_anim = playerObject.playerModel.animationGroups[6]
    let slide_male_anim = playerObject.playerModel.animationGroups[7]
    let start_male_anim = playerObject.playerModel.animationGroups[8]
    let stop_male_anim = playerObject.playerModel.animationGroups[9]

    playerObject.malePlayerAnimations = [
        game_over_male_anim,
        hit_in_male_anim,
        run_jump_2_male_anim,
        run_male_anim,
        slide_male_anim,
        start_male_anim,
        stop_male_anim,
        run_JumpFall_male_anim,
        idle_male_anim
    ]

    playerObject.playerAnimations = playerObject.malePlayerAnimations
    //FEMALE
    // console.log(playerObject.femalePlayerModel.animationGroups)

    for (let i = 0; i < playerObject.femalePlayerModel.animationGroups.length; i++) {
        playerObject.femalePlayerModel.animationGroups[i]._targetedAnimations.forEach(
            (targetedAnimation) => {
                targetedAnimation.animation.enableBlending = true;
                targetedAnimation.animation.blendingSpeed = 0.1;
            },
        );
    }

    playerObject.femalePlayerModel.animationGroups[0].stop()

    let game_over_female_anim = playerObject.femalePlayerModel.animationGroups[1]
    let hit_in_female_anim = playerObject.femalePlayerModel.animationGroups[2]
    let idle_female_anim = playerObject.femalePlayerModel.animationGroups[0]
    idle_female_anim.play(true)
    // let jump_anim = playerObject.femalePlayerModel.animationGroups[3]
    let run_jump_2_female_anim = playerObject.femalePlayerModel.animationGroups[3]
    run_jump_2_female_anim.speedRatio = 2
    let run_JumpFall_female_anim = playerObject.femalePlayerModel.animationGroups[4]
    run_JumpFall_female_anim.speedRatio = 2
    let run_female_anim = playerObject.femalePlayerModel.animationGroups[5]
    let slide_female_anim = playerObject.femalePlayerModel.animationGroups[6]
    let start_female_anim = playerObject.femalePlayerModel.animationGroups[7]
    let stop_female_anim = playerObject.femalePlayerModel.animationGroups[8]

    //SET OBJECT ANIMATIONS

    playerObject.femalePlayerAnimations = [
        game_over_female_anim,
        hit_in_female_anim,
        run_jump_2_female_anim,
        run_female_anim,
        slide_female_anim,
        start_female_anim,
        stop_female_anim,
        run_JumpFall_female_anim,
        idle_female_anim
    ]

    // playerObject.playerAnimations = [
    //     game_over_anim,
    //     hit_in_anim,
    //     run_jump_2_anim,
    //     run_anim,
    //     slide_anim,
    //     start_anim,
    //     stop_anim,
    //     run_JumpFall_anim,
    //     idle_anim
    // ]

    //MESH
    //player contaier mesh
    playerObject.playerContainerMesh = new MeshBuilder.CreateBox(
        "playerContainerMesh",
        { width: 0.4, height: 1, depth: 0.3 },
        scene
    );
    playerObject.playerContainerMesh.position = new Vector3(0, 0, 0);
    playerObject.playerContainerMesh.visibility = 0

    //model mesh male
    for (let i = 0; i < playerObject.playerModel.meshes.length; i++) {
        if (i === 0) playerObject.playerModel.meshes[i].name = "player_model_root"
        if (i > 0) playerObject.playerModel.meshes[i].name = `player_model_${i}`
    }
    playerObject.playerModelRoot = playerObject.playerModel.meshes[0];
    playerObject.playerModelRoot.scaling.scaleInPlace(1);
    playerObject.playerModelRoot.position = new Vector3(0, -0.5, 0);
    // playerObject.playerModelRoot.position = new Vector3(1, -0.5, 0);
    playerObject.playerModelRoot.addRotation(0, Math.PI, 0)
    playerObject.playerModelRoot.parent = playerObject.playerContainerMesh;

    //model mesh female
    for (let i = 0; i < playerObject.femalePlayerModel.meshes.length; i++) {
        if (i === 0) playerObject.femalePlayerModel.meshes[i].name = "player_model_root"
        if (i > 0) playerObject.femalePlayerModel.meshes[i].name = `player_model_${i}`
    }
    playerObject.femalePlayerModelRoot = playerObject.femalePlayerModel.meshes[0];
    playerObject.femalePlayerModelRoot.scaling.scaleInPlace(1);
    playerObject.femalePlayerModelRoot.position = new Vector3(0.56, -0.5, -1.5);
    // playerObject.femalePlayerModelRoot.position = new Vector3(-1, -0.5, 0);
    playerObject.femalePlayerModelRoot.addRotation(0, Math.PI, 0)
    playerObject.femalePlayerModelRoot.parent = playerObject.playerContainerMesh;

    //bounding mesh
    playerObject.playerBoundingMesh = new MeshBuilder.CreateBox(
        "playerBoundingMesh",
        { width: 0.4, height: 1, depth: 0.3 },
        scene
    );
    playerObject.playerBoundingMesh.position = new Vector3(0, 0, 0);
    playerObject.playerBoundingMesh.visibility = 0
    playerObject.playerBoundingMesh.parent = playerObject.playerContainerMesh;

    //set for collision
    playerObject.playerBoundingMesh.actionManager = new ActionManager(scene);

    // setTimeout(() => {
    // start_anim.play(true)
    // }, 5000);

    function playerJump() {
        if (!playerObject.playerJumped && playerObject.playerContainerMesh.position.y <= playerObject.playerGroundPosition && !playerObject.playerKnocked) {
            playerObject.playerJumped = true;
            // run_jump_2_anim.play(false)
            blendAnimation(2, playerObject, false)

            setTimeout(() => {
                if (!playerObject.playerKnocked) blendAnimation(3, playerObject, true)
            }, 600);
            let jumpMax = playerObject.playerContainerMesh.position.y + playerObject.playerJumpHeight
            scene.getSoundByName("jumpSound").play()
            scene.registerBeforeRender(function jump() {
                playerObject.playerContainerMesh.position.y += 0.07
                if (playerObject.playerContainerMesh.position.y > jumpMax || playerObject.playerKnocked) {
                    scene.unregisterBeforeRender(jump);
                    setTimeout(() => {
                        playerObject.playerJumped = false;
                    }, 100);
                }
            });
        }
    }

    function playerSlide() {
        if (!playerObject.playerJumped && !playerObject.playerKnocked) {
            playerObject.playerSlided = true;
            scene.getSoundByName("slideSound").play()
            // slide_anim.play(false)
            blendAnimation(4, playerObject, false)
            setTimeout(() => {
                blendAnimation(3, playerObject, true)
            }, 900);
            playerObject.playerBoundingMesh.scaling.y = 0.5
            playerObject.playerBoundingMesh.position.y = -0.25
            setTimeout(() => {
                playerObject.playerBoundingMesh.scaling.y = 1
                playerObject.playerBoundingMesh.position.y = 0
                playerObject.playerSlided = false;
            }, 1000);
        }
    }

    function playerLeft() {
        if (playerObject.playerLanePos > -1 && !playerObject.playerKnocked) {
            playerObject.playerLanePos -= 1;
            if (playerObject.selectedPlayer == "male") playerObject.playerModelRoot.addRotation(0, -0.8, 0)
            if (playerObject.selectedPlayer == "female") playerObject.femalePlayerModelRoot.addRotation(0, -0.8, 0)
            scene.registerBeforeRender(function left() {
                playerObject.playerContainerMesh.position.x -= 0.1
                if (playerObject.playerContainerMesh.position.x < playerObject.playerLanePos + 0.1 || playerObject.playerKnocked) {
                    scene.unregisterBeforeRender(left);
                    if (playerObject.selectedPlayer == "male") playerObject.playerModelRoot.addRotation(0, 0.8, 0)
                    if (playerObject.selectedPlayer == "female") playerObject.femalePlayerModelRoot.addRotation(0, 0.8, 0)
                }
            });
        }
    }

    function playerRight() {
        if (playerObject.playerLanePos < 1 && !playerObject.playerKnocked) {
            playerObject.playerLanePos += 1;
            if (playerObject.selectedPlayer == "male") playerObject.playerModelRoot.addRotation(0, 0.8, 0)
            if (playerObject.selectedPlayer == "female") playerObject.femalePlayerModelRoot.addRotation(0, 0.8, 0)
            scene.registerBeforeRender(function right() {
                playerObject.playerContainerMesh.position.x += 0.1
                if (playerObject.playerContainerMesh.position.x > playerObject.playerLanePos - 0.1 || playerObject.playerKnocked) {
                    scene.unregisterBeforeRender(right);
                    playerObject.playerModelRoot.addRotation(0, -0.8, 0)
                    playerObject.femalePlayerModelRoot.addRotation(0, -0.8, 0)
                }
            });
        }
    }

    // playerObject.playerOnHightGround

    //CONROLS

    //touch events
    function lintenTouchEvents() {
        var hammertime = new Hammer(canvas);
        hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
        hammertime.on(
            "swipeleft swiperight swipeup swipedown tap press",
            function (ev) {
                if (gameObject.gameRunning) {
                    if (ev.type == "swipeup") {
                        playerJump()
                        // console.log(ev.type)
                    } else if (ev.type == "swipedown") {
                        playerSlide()
                        // console.log(ev.type)
                    } else if (ev.type == "swipeleft") {
                        playerLeft()
                        // console.log(ev.type)
                    } else if (ev.type == "swiperight") {
                        playerRight()
                        // console.log(ev.type)
                    }
                }
            }
        );
    }

    lintenTouchEvents()

    //keypad events
    function lintenKeysEvents() {
        document.onkeydown = checkKey;
        function checkKey(event) {
            if (gameObject.gameRunning) {
                if (event.keyCode == 38 || event.keyCode == 87) {
                    playerJump();
                }
                if (event.keyCode == 37 || event.keyCode == 65) {
                    playerLeft();
                }
                if (event.keyCode == 39 || event.keyCode == 68) {
                    playerRight();
                }
                if (event.keyCode == 40 || event.keyCode == 83) {
                    playerSlide();
                }
            }
        }
    }

    lintenKeysEvents()



}