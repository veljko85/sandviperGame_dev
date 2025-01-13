import {
    ActionManager,
    ExecuteCodeAction,
    Texture,
    Color3
} from '@babylonjs/core';

// import { createGround } from './trackParts';
// import { createHightGround } from './trackParts';


export function colliders(scene, playerObject, collidingObj) {

    collidingObj.mesh.checkCollisions = true;
    collidingObj.mesh.actionManager = new ActionManager(scene);
    //enter
    collidingObj.checkEnterCollision = new ExecuteCodeAction(
        {
            trigger: ActionManager.OnIntersectionEnterTrigger,
            parameter: {
                mesh: collidingObj.mesh,
            },
        },
        (evt) => {
            collidingObj.executeEnterCode()
        }
    )
    playerObject.playerBoundingMesh.actionManager.registerAction(collidingObj.checkEnterCollision);
    //exit
    collidingObj.checkExitCollision = new ExecuteCodeAction(
        {
            trigger: ActionManager.OnIntersectionExitTrigger,
            parameter: {
                mesh: collidingObj.mesh,
            },
        },
        (evt) => {
            collidingObj.executeExitCode()
        }
    )
    playerObject.playerBoundingMesh.actionManager.registerAction(collidingObj.checkExitCollision);

}