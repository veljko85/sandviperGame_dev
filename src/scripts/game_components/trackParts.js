import {
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Texture,
    MirrorTexture,
    Color3,
    Plane,
    Mesh,
    Sound,
} from '@babylonjs/core';

import { colliders } from './colliders';

import { rotateAnimY, positionAnimY } from '../functions/animations';
import { blendAnimation } from '../functions/blendAnimation';
import { gameOver } from './game';

export function createGround(scene, posZ, tracksObject, gameObject) {
    // console.log('aaa')
    var trackGround = MeshBuilder.CreateGround(
        "trackGround",
        { width: 10, height: 120 },
        scene
    );
    trackGround.position = new Vector3(0, -0.5, posZ);
    trackGround.visibility = 0

    let trackEnvironment = tracksObject.environmentModel.meshes[0].clone("trackEnvironment")
    trackEnvironment.position = new Vector3(0, -0.5, posZ - 62);

    if (!gameObject.isMobile && tracksObject.selectedTrack === 0) {
        for (let i = 0; i < trackEnvironment.getChildren().length; i++) {

            if (trackEnvironment.getChildren()[i].name.startsWith("trackEnvironment.originalEnvModel_polySurface143")) {

                scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackEnvironment.getChildren()[i])
            }
            if (trackEnvironment.getChildren()[i].name.startsWith("trackEnvironment.originalEnvModel_Cylinder.002")) {

                scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackEnvironment.getChildren()[i])
            }
        }
    }


    if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) {
        for (let i = 0; i < trackEnvironment.getChildren().length; i++) {

            if (trackEnvironment.getChildren()[i].name.startsWith("trackEnvironment.originalEnvModel_polySurface143")) {

                scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackEnvironment.getChildren()[i])
            }
            if (trackEnvironment.getChildren()[i].name.startsWith("trackEnvironment.originalEnvModel_Cylinder.002")) {

                scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackEnvironment.getChildren()[i])
            }
        }
    }


    // setTimeout(() => {
    //     trackEnvironment.dispose()
    // }, 10000);

    // console.log(tracksObject.environmentModel)

    // let trackMat = new StandardMaterial("trackMat", scene);
    // trackMat.diffuseTexture = new Texture(
    //     "textures/tron-txture-1 (Base Color).png",
    //     scene
    // );
    // trackGround.material = trackMat;
    // trackMat.diffuseTexture.uScale = 1;
    // trackMat.diffuseTexture.vScale = 5;

    // var yellowSphere = Mesh.CreateSphere("yellowSphere", 10, 0.5, scene);
    // yellowSphere.position.z = 5
    // yellowSphere.position.x = 1
    // yellowSphere.material = new StandardMaterial("ballGlow", scene);
    // yellowSphere.material.diffuseColor = new Color3(1, 0, 0);
    // yellowSphere.material.emissiveColor = new Color3(1, 0, 0);

    // trackGround.material = new StandardMaterial("mirror", scene);
    //mirror.material.diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene);
    //mirror.material.diffuseTexture.uScale = 10;
    //mirror.material.diffuseTexture.vScale = 10;
    // trackGround.material.diffuseColor = new Color3(0, 0, 0);
    // console.log(trackEnvironment.getChildren()[0].material)

    // let trackEnvironmentMeshes = trackEnvironment.getChildren()
    // for (let i = 0; i < trackEnvironmentMeshes.length; i++) {
    //     // scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackEnvironmentMeshes[i])
    //     console.log(trackEnvironmentMeshes[i].name)
    // }
    // scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(yellowSphere)

    tracksObject.runningTracks.push([trackGround])
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(trackEnvironment)
}

export function createHightGround(scene, height, depth, posX, posZ, playerObject, tracksObject, gameObject) {
    let highGroundBounding = new MeshBuilder.CreateBox(
        "highGroundBounding",
        { width: 0.9, height: height, depth: depth - 0.05 },
        scene
    );
    highGroundBounding.position = new Vector3(posX, 0, (posZ + depth / 2) + 0.1);
    highGroundBounding.visibility = 0;
    let highGroundBoundingObj = {
        mesh: highGroundBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            // console.log(this.mesh)
            // playerObject.playerOnHightGround = true;
            playerObject.playerGroundPosition = height / 2
        },
        executeExitCode: function () {
            // console.log(this.mesh)
            // playerObject.playerOnHightGround = false;
            playerObject.playerGroundPosition = 0
        },
    }

    colliders(scene, playerObject, highGroundBoundingObj)


    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(highGroundBounding)

    /////////////////////////////////////////////////////////
    // let highGround = new MeshBuilder.CreateBox(
    //     "highGround",
    //     { width: 0.9, height: 0.5, depth: depth },
    //     scene
    // );

    // highGround.position = new Vector3(posX, -0.25, (posZ + depth / 2));

    // let highGroundMat = new StandardMaterial("highGroundMat", scene);
    // highGroundMat.diffuseColor = Color3.FromHexString("#00ff00");
    // highGround.material = highGroundMat;
    // highGround.visibility = 0;
    // // tracksObject.reflectionObjects.push(highGround)
    // tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(highGround)

    // console.log(depth)

    for (let i = 0; i < depth; i++) {
        let trackHightGround = tracksObject.mainBoxModel.meshes[0].clone("trackHightGround")
        trackHightGround.position = new Vector3(posX, -0.49, (posZ + 0.5) + i);
        tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(trackHightGround)
        if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGround.getChildren()[0]);
        if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGround.getChildren()[0])
    }

}

export function createBlockade(scene, height, depth, posX, posZ, playerObject, gameObject, tracksObject, hightGroundBlockade) {
    let blockadeBounding = new MeshBuilder.CreateBox(
        "blockadeBounding",
        { width: 0.9, height: height, depth: depth },
        scene
    );
    blockadeBounding.position = new Vector3(posX, -0.5 + height / 2, (posZ + depth / 2) - 0.2);
    blockadeBounding.visibility = 0;
    let blockadeBoundingObj = {
        mesh: blockadeBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            gameOver(gameObject, scene, playerObject)
        },
        executeExitCode: function () {
            return
        },
    }

    colliders(scene, playerObject, blockadeBoundingObj)
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockadeBounding)
    /////////////////////////////////////////////////////////////
    // let blockade = new MeshBuilder.CreateBox(
    //     "blockade",
    //     { width: 0.9, height: height, depth: depth },
    //     scene
    // );

    // blockade.position = new Vector3(posX, -0.5 + height / 2, (posZ + depth / 2) - 0.5);
    // blockade.visibility = 0;

    // let blockadeMat = new StandardMaterial("blockadeMat", scene);
    // blockadeMat.diffuseColor = Color3.FromHexString("#ff0000");
    // blockade.material = blockadeMat;
    // tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockade)

    if (!hightGroundBlockade) {
        for (let i = 0; i < depth; i++) {
            let trackHightGround = tracksObject.mainBoxModel.meshes[0].clone("trackHightGround")
            trackHightGround.position = new Vector3(posX, 0, (posZ + 0.5) + i);
            tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(trackHightGround)
            if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGround.getChildren()[0])
            if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGround.getChildren()[0])

            let trackHightGroundUpper = tracksObject.mainBoxModel.meshes[0].clone("trackHightGroundUpper")
            trackHightGroundUpper.position = new Vector3(posX, 1, (posZ + 0.5) + i);
            tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(trackHightGroundUpper)
            if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGroundUpper.getChildren()[0])
            if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(trackHightGroundUpper.getChildren()[0])
        }
    }
}

export function createCoinsRow(scene, posX, posY, posZ, playerObject, tracksObject, gameObject) {

    for (let i = 0; i < 10; i++) {
        let coin = new MeshBuilder.CreateBox(
            "coin",
            { width: 0.1, height: 0.8, depth: 0.1 },
            scene
        );
        coin.position = new Vector3(posX, posY, (posZ + i * 2) - 0.3);
        coin.isVisible = false

        tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(coin)

        // console.log(posZ)

        let coinClone = tracksObject.coinLogoModel.meshes[1].clone("coinClone")
        coinClone.isVisible = true
        coinClone.position = new Vector3(-posX, posY, posZ + i * 2);

        tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(coinClone)

        if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(coinClone)
        if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(coinClone)
        // coinClone.rotationQuaternion = null;

        // coinClone.addRotation(Math.PI / 4, 1.57, 1.57)

        rotateAnimY(scene, coinClone, 0.3)

        positionAnimY(scene, coinClone, posY, 0.3)

        let coinsObj = {
            mesh: coin,
            model: coinClone,
            checkEnterCollision: 0,
            checkExitCollision: 0,
            executeEnterCode: function () {
                playerObject.collectedCoins += 1;
                // this.mesh.isVisible = false;
                this.model.isVisible = false;
                coinsNumber.innerHTML = `x ${playerObject.collectedCoins}`
                // this.mesh.dispose();
                scene.getSoundByName("coinSound").play()
            },
            executeExitCode: function () {
                return
            },
        }

        colliders(scene, playerObject, coinsObj)
    }
}

export function createSmallLaserFence(scene, posX, posZ, playerObject, gameObject, tracksObject) {
    let blockadeBounding = new MeshBuilder.CreateBox(
        "blockadeBounding",
        { width: 0.9, height: 0.6, depth: 0.5 },
        scene
    );
    blockadeBounding.position = new Vector3(posX, 0, posZ);
    blockadeBounding.visibility = 0;
    let blockadeBoundingObj = {
        mesh: blockadeBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            gameOver(gameObject, scene, playerObject)
        },
        executeExitCode: function () {
            return
        },
    }

    colliders(scene, playerObject, blockadeBoundingObj)
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockadeBounding)



    let laserBarierSmall = tracksObject.mainBarrierSmallModel.meshes[0].clone("laserBarierSmall")
    laserBarierSmall.position = new Vector3(posX, -0.05, posZ);
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(laserBarierSmall)
    if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierSmall.getChildren()[0]);
    if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierSmall.getChildren()[0])
}

export function createHighSlideLaserFence(scene, posX, posZ, playerObject, gameObject, tracksObject) {
    let blockadeBounding = new MeshBuilder.CreateBox(
        "blockadeBounding",
        { width: 0.9, height: 1.5, depth: 0.5 },
        scene
    );
    blockadeBounding.position = new Vector3(posX, 0.85, posZ);
    blockadeBounding.visibility = 0;
    let blockadeBoundingObj = {
        mesh: blockadeBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            gameOver(gameObject, scene, playerObject)
        },
        executeExitCode: function () {
            return
        },
    }

    colliders(scene, playerObject, blockadeBoundingObj)
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockadeBounding)



    let laserBarrierHighSlide = tracksObject.mainBarrierHighSlideModel.meshes[0].clone("laserBarrierHighSlide")
    laserBarrierHighSlide.position = new Vector3(posX, -0.05, posZ);
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(laserBarrierHighSlide)
    if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarrierHighSlide.getChildren()[0]);
    if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarrierHighSlide.getChildren()[0])
}

export function createHighLaserFence(scene, posX, posZ, playerObject, gameObject, tracksObject) {
    let blockadeBounding = new MeshBuilder.CreateBox(
        "blockadeBounding",
        { width: 0.9, height: 1.7, depth: 0.5 },
        scene
    );
    blockadeBounding.position = new Vector3(posX, 0.4, posZ);
    blockadeBounding.visibility = 0;
    let blockadeBoundingObj = {
        mesh: blockadeBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            gameOver(gameObject, scene, playerObject)
        },
        executeExitCode: function () {
            return
        },
    }

    colliders(scene, playerObject, blockadeBoundingObj)
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockadeBounding)



    let laserBarierHigh = tracksObject.mainBarrierHighModel.meshes[0].clone("laserBarierHigh")
    laserBarierHigh.position = new Vector3(posX, -0.05, posZ);
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(laserBarierHigh)
    if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierHigh.getChildren()[0]);
    if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierHigh.getChildren()[0])
}

export function createWideLaserFence(scene, posX, posZ, playerObject, gameObject, tracksObject) {
    let blockadeBounding = new MeshBuilder.CreateBox(
        "blockadeBounding",
        { width: 1.8, height: 0.6, depth: 0.5 },
        scene
    );
    blockadeBounding.position = new Vector3(posX, 0, posZ);
    blockadeBounding.visibility = 0;
    let blockadeBoundingObj = {
        mesh: blockadeBounding,
        checkEnterCollision: 0,
        checkExitCollision: 0,
        executeEnterCode: function () {
            gameOver(gameObject, scene, playerObject)
        },
        executeExitCode: function () {
            return
        },
    }

    colliders(scene, playerObject, blockadeBoundingObj)
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(blockadeBounding)



    let laserBarierWide = tracksObject.mainBarrierWideModel.meshes[0].clone("laserBarierWide")
    laserBarierWide.position = new Vector3(posX, -0.05, posZ);
    tracksObject.runningTracks[tracksObject.runningTracks.length - 1].push(laserBarierWide)
    if (!gameObject.isMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierWide.getChildren()[0]);
    if (gameObject.isMobile && gameObject.reflectionOnMobile && tracksObject.selectedTrack === 0) scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(laserBarierWide.getChildren()[0])
}
