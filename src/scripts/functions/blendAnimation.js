export function blendAnimation(setAnimRunIndex, playerObject, animLoop) {
    playerObject.playerAnimations[playerObject.animationOn].stop();
    playerObject.playerAnimations[playerObject.animationOn].setWeightForAllAnimatables(0);
    playerObject.animationOn = setAnimRunIndex;
    playerObject.playerAnimations[playerObject.animationOn].play(animLoop);
    playerObject.playerAnimations[playerObject.animationOn].setWeightForAllAnimatables(1);
}