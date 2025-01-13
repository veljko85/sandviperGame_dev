import {
  ArcRotateCamera,
  FreeCamera,
  Vector3,
  MeshBuilder,
  AnimationGroup,
} from '@babylonjs/core';
import { cameraAlphaAnimation, cameraTargetPos, positionAnimY } from '../functions/animations';

export function camera(scene, canvas, cameraObject, playerObject, gameObject) {
  var viewCamera = new ArcRotateCamera(
    'viewCamera',
    Math.PI / 2,
    Math.PI / 2,
    0,
    new Vector3(0, 0, 0),
    scene
  );

  if (!gameObject.isMobile) viewCamera.setPosition(new Vector3(0.25, 0, -0.9));
  if (gameObject.isMobile) viewCamera.setPosition(new Vector3(0, 0, -1.1));
  // viewCamera.setTarget(-8, 1, -13)
  viewCamera.lowerBetaLimit = 0.5;
  viewCamera.minZ = 0.01;


  cameraObject.viewCamera = viewCamera

  cameraObject.cameraTarget = new MeshBuilder.CreateBox(
    "playerCameraTarget",
    { width: 0.2, height: 0.2, depth: 0.2 },
    scene
  );

  if (!gameObject.isMobile) cameraObject.cameraTarget.position = new Vector3(0.25, 0, 0);
  if (gameObject.isMobile) cameraObject.cameraTarget.position = new Vector3(0, 0, 0);

  cameraObject.cameraTarget.isVisible = false;
  cameraObject.cameraTarget.parent = playerObject.playerContainerMesh;
  scene.activeCamera.target = cameraObject.cameraTarget;


  var devCamera = new FreeCamera("devCamera", new Vector3(0, 0, 0), scene);

  let cameraOn = 0
  document.addEventListener("keydown", (e) => {
    if (e.key === 'c') {
      if (cameraOn == 0) {
        cameraOn = 1
        scene.activeCamera = scene.cameras[1]
        devCamera.attachControl(true);
      } else {
        cameraOn = 0
        scene.activeCamera = scene.cameras[0]
        devCamera.detachControl(true);
      }
    }
  })
}
