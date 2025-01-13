import {
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Texture,
    Color3
} from '@babylonjs/core';

import {
    createGround,
    createHightGround,
    createBlockade,
    createCoinsRow,
    createSmallLaserFence,
    createHighSlideLaserFence,
    createHighLaserFence,
    createWideLaserFence,
} from './trackParts';



export function createStartTrack(scene, tracksObject, playerObject, gameObject, fireBaseData) {

    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject)

    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject, hightGroundBlockade
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ - 30, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 100);
    ///////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, -1, tracksObject.trackPosZ - 23, playerObject, gameObject, tracksObject, fireBaseData)
    }, 200);
    ///////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 1, tracksObject.trackPosZ - 23, playerObject, gameObject, tracksObject, fireBaseData)
    }, 300);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ - 20, playerObject, tracksObject, gameObject, fireBaseData)
    }, 400);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, -0.2, tracksObject.trackPosZ - 20, playerObject, tracksObject, gameObject, fireBaseData)
    }, 500);
    ///////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ - 10, playerObject, gameObject, tracksObject, fireBaseData)
    }, 600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ + 3, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ + 3, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 800);

    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 0, tracksObject.trackPosZ + 15, playerObject, tracksObject, gameObject)
    }, 900);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 0, tracksObject.trackPosZ + 15, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1000);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, 0.3, tracksObject.trackPosZ + 17, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1100);

    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createSmallLaserFence(scene, 1, tracksObject.trackPosZ + 20, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1200);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createSmallLaserFence(scene, -1, tracksObject.trackPosZ + 30, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1300);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 45, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1400);
}

export function createTrackOne(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 1")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)

    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 20, -1, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 100);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 20, -1, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 200);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 0, tracksObject.trackPosZ - 45, playerObject, gameObject, tracksObject, fireBaseData)
    }, 400);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    // setTimeout(() => {
    //     createSmallLaserFence(scene, 0, tracksObject.trackPosZ - 37, playerObject, gameObject, tracksObject)
    // }, 500);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 20, 1, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 20, 1, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 700);

    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ - 22, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 800);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, -0.5, tracksObject.trackPosZ - 20.5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 900);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ - 10, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1000);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ + 10, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1100);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, -1, tracksObject.trackPosZ + 15, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1200);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, -1, tracksObject.trackPosZ + 15, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1300);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, 0.3, tracksObject.trackPosZ + 17, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1400);
    // ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 1, tracksObject.trackPosZ + 15, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 1, tracksObject.trackPosZ + 15, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1600);
    ///////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, 0.3, tracksObject.trackPosZ + 17, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ + 45, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1800);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createSmallLaserFence(scene, 0, tracksObject.trackPosZ + 46.5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1900);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ + 45, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 2000);
}

export function createTrackTwo(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 2")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)

    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, -1, tracksObject.trackPosZ - 41, playerObject, gameObject, tracksObject, fireBaseData)
    }, 200);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ - 42.5, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 1, tracksObject.trackPosZ - 41, playerObject, gameObject, tracksObject, fireBaseData)
    }, 400);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 500);

    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 0, tracksObject.trackPosZ - 20, playerObject, tracksObject, gameObject, fireBaseData)
    }, 600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 0, tracksObject.trackPosZ - 20, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 700);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, 0.3, tracksObject.trackPosZ - 17, playerObject, tracksObject, gameObject)
    }, 800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
    }, 900);
    createBlockade(scene, 2, 5, -1, tracksObject.trackPosZ - 15, playerObject, gameObject, tracksObject, false, fireBaseData)
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 5, 1, tracksObject.trackPosZ - 5, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1000);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, -0.5, tracksObject.trackPosZ + 13, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, 0.5, tracksObject.trackPosZ + 22, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1200);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ + 20, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, -1, tracksObject.trackPosZ + 31, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1400);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 29.5, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, 1, tracksObject.trackPosZ + 29.5, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, -1, tracksObject.trackPosZ + 45, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 46, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1800);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    // setTimeout(() => {
    //     createSmallLaserFence(scene, 1, tracksObject.trackPosZ + 46.5, playerObject, gameObject, tracksObject)
    // }, 1900);
}

export function createTrackThree(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 3")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)

    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    // setTimeout(() => {
    //     createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, false)
    // }, 100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, 0.5, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, fireBaseData)
    }, 100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, -1, tracksObject.trackPosZ - 45, playerObject, gameObject, tracksObject, fireBaseData)
    }, 200);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ - 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 300);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ - 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 400);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, -0.2, tracksObject.trackPosZ - 35, playerObject, tracksObject, gameObject)
    }, 500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ - 29.5, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 600);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 1, tracksObject.trackPosZ - 28, playerObject, gameObject, tracksObject, fireBaseData)
    }, 700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, -1, tracksObject.trackPosZ - 20, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ - 19, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 900);

    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, -0.5, tracksObject.trackPosZ - 11, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1000);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ - 10, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1100);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 30, 1, tracksObject.trackPosZ - 10, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1200);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 30, 1, tracksObject.trackPosZ - 10, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ + 10, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1400);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, -1, tracksObject.trackPosZ + 10, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, -1, tracksObject.trackPosZ + 10, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1600);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, 0.3, tracksObject.trackPosZ + 12, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1900);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ + 38, playerObject, tracksObject, gameObject, fireBaseData)
    }, 2000);
}

export function createTrackFour(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 4")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)


    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, -1, tracksObject.trackPosZ - 51, playerObject, gameObject, tracksObject, fireBaseData)
    }, 100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 0, tracksObject.trackPosZ - 51, playerObject, gameObject, tracksObject, fireBaseData)
    }, 200);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 1, tracksObject.trackPosZ - 51, playerObject, gameObject, tracksObject, fireBaseData)
    }, 300);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 400);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 500);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 600);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 30, -1, tracksObject.trackPosZ - 25, playerObject, tracksObject, gameObject, fireBaseData)
    }, 700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 30, -1, tracksObject.trackPosZ - 25, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ - 25, playerObject, gameObject, tracksObject, fireBaseData)
    }, 900);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ - 25, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1000);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ - 5.5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1100);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 1, tracksObject.trackPosZ - 5.5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1200);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 30, 1, tracksObject.trackPosZ - 5, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1300);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 30, 1, tracksObject.trackPosZ - 5, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1400);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, 0.3, tracksObject.trackPosZ, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ + 25, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1600);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ + 35, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1700);

    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, 1, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1900);

}

export function createTrackFive(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 5")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)

    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 0, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 100);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 0, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 200);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, 0.3, tracksObject.trackPosZ - 48, playerObject, tracksObject, gameObject, fireBaseData)
    }, 300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ - 23.5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 400);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 0, tracksObject.trackPosZ - 22, playerObject, tracksObject, gameObject, fireBaseData)
    }, 500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 0, tracksObject.trackPosZ - 22, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 600);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, 0.3, tracksObject.trackPosZ - 20, playerObject, tracksObject, gameObject, fireBaseData)
    }, 700);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, -1, tracksObject.trackPosZ + 8, playerObject, gameObject, tracksObject, fireBaseData)
    }, 800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 8, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 900);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, 1, tracksObject.trackPosZ + 8, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1000);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, -0.2, tracksObject.trackPosZ + 15, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1100);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ + 15, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1200);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 0, tracksObject.trackPosZ + 24, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, -1, tracksObject.trackPosZ + 24, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1400);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 1, -1, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 40, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ + 50, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1700);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 55, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1800);
}

export function createTrackSix(scene, tracksObject, playerObject, gameObject, fireBaseData) {
    // console.log("opt 6")
    createGround(scene, tracksObject.trackPosZ, tracksObject, gameObject, fireBaseData)

    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 100);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ - 50, playerObject, tracksObject, gameObject, fireBaseData)
    }, 200);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ - 50, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 300);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighSlideLaserFence(scene, 0, tracksObject.trackPosZ - 41, playerObject, gameObject, tracksObject, fireBaseData)
    }, 400);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createWideLaserFence(scene, -0.5, tracksObject.trackPosZ - 25, playerObject, gameObject, tracksObject, fireBaseData)
    }, 500);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, 1, tracksObject.trackPosZ - 25, playerObject, tracksObject, gameObject, fireBaseData)
    }, 600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, 1, tracksObject.trackPosZ - 25, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 700);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, 0.3, tracksObject.trackPosZ - 23, playerObject, tracksObject, gameObject, fireBaseData)
    }, 800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, -1, tracksObject.trackPosZ - 15, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 900);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ - 5, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1000);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, -1, tracksObject.trackPosZ - 5, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1100);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, -1, tracksObject.trackPosZ - 5, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1200);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, 0.3, tracksObject.trackPosZ - 3, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1300);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 0, tracksObject.trackPosZ + 10, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1400);
    /////////////scene, posX, posZ, playerObject, gameObject, tracksObject
    setTimeout(() => {
        createHighLaserFence(scene, 1, tracksObject.trackPosZ + 10, playerObject, gameObject, tracksObject, fireBaseData)
    }, 1500);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 0, tracksObject.trackPosZ + 25, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1600);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 2, 3, 1, tracksObject.trackPosZ + 30, playerObject, gameObject, tracksObject, false, fireBaseData)
    }, 1700);
    ///////////// scene, height, depth, posX, posZ, playerObject
    setTimeout(() => {
        createHightGround(scene, 1, 25, -1, tracksObject.trackPosZ + 35, playerObject, tracksObject, gameObject, fireBaseData)
    }, 1800);
    ////////////// scene, height, depth, posX, posZ, playerObject, gameObject
    setTimeout(() => {
        createBlockade(scene, 0.2, 25, -1, tracksObject.trackPosZ + 35, playerObject, gameObject, tracksObject, true, fireBaseData)
    }, 1900);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, -1, 0.3, tracksObject.trackPosZ + 33, playerObject, tracksObject, gameObject, fireBaseData)
    }, 2000);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 0, -0.2, tracksObject.trackPosZ + 35, playerObject, tracksObject, gameObject, fireBaseData)
    }, 2100);
    ///////////////scene, posX, posY, posZ, playerObject, tracksObject
    setTimeout(() => {
        createCoinsRow(scene, 1, -0.2, tracksObject.trackPosZ + 35, playerObject, tracksObject, gameObject, fireBaseData)
    }, 2200);
}