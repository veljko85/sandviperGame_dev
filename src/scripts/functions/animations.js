import {
    Animation,
    Vector3,
    CubicEase,
    EasingFunction,
    Texture,
    Color3
} from '@babylonjs/core';

export function rotateAnimY(scene, mesh, speed) {
    // console.log('rot y')
    const animateRotationY = new Animation("animateRotationY", "rotation.y",
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const animKeys = [];

    animKeys.push({
        frame: 0,
        value: 0
    });

    animKeys.push({
        frame: 30,
        value: Math.PI
    });

    animKeys.push({
        frame: 60,
        value: 0
    });

    animateRotationY.setKeys(animKeys);
    mesh.animations.push(animateRotationY);
    scene.beginAnimation(mesh, 0, 60, true, speed);
}

export function positionAnimY(scene, mesh, posY, speed) {
    // console.log('pos y')
    var positionAnimation = new Animation(
        "positionAnimation",
        "position.y",
        120,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: posY,
    });
    keyFrames.push({
        frame: 60,
        value: posY + 0.2,
    });
    keyFrames.push({
        frame: 120,
        value: posY,
    });
    positionAnimation.setKeys(keyFrames);
    mesh.animations.push(positionAnimation);
    //call animation
    scene.beginAnimation(mesh, 0, 120, true, speed);
}

export function cameraAlphaAnimation(scene, startPosition, endPosition, loop, speed) {
    // console.log(scene.activeCamera.alpha)
    const alphaAnimation = new Animation(
        "camAlpha",
        "alpha",
        120,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_RELATIVE
    )
    const keys2 = [{
        frame: 0,
        value: startPosition/*scene.activeCamera.alpha*/
    }, {
        frame: 120,
        value: endPosition/*4.714*/
    }]
    alphaAnimation.setKeys(keys2)
    scene.activeCamera.animations.push(alphaAnimation);
    //call animation
    scene.beginAnimation(scene.activeCamera, 0, 120, loop, speed);
}

export function changePayerPosX(scene, mesh, startPos, endPos, speed) {
    // console.log('pos y')
    var positionAnimation = new Animation(
        "positionAnimation",
        "position.x",
        120,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: startPos,
    });
    keyFrames.push({
        frame: 120,
        value: endPos,
    });
    positionAnimation.setKeys(keyFrames);
    mesh.animations.push(positionAnimation);
    //call animation
    scene.beginAnimation(mesh, 0, 120, false, speed);
}

export function cameraTargetPos(scene, mesh, startPos, endPos, speed) {
    // console.log('pos y')
    var positionAnimation = new Animation(
        "positionAnimation",
        "position",
        120,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const keyFrames = [];
    keyFrames.push({
        frame: 0,
        value: startPos,
    });
    keyFrames.push({
        frame: 120,
        value: endPos,
    });
    positionAnimation.setKeys(keyFrames);
    mesh.animations.push(positionAnimation);

    const easingFun2 = new CubicEase();
    easingFun2.setEasingMode(EasingFunction.EASINGMODE_EASEOUT);
    positionAnimation.setEasingFunction(easingFun2);
    //call animation
    scene.beginAnimation(mesh, 0, 120, false, speed);
}