// import './style.css'
import {
  Engine,
  Scene,
  DefaultLoadingScreen,
  Vector3,
  Color3,
  SceneLoader,
  MirrorTexture,
  Plane,
} from '@babylonjs/core';
// import {Texture} from '@babylonjs/procedural-textures';
import '@babylonjs/loaders/glTF';

// import "@babylonjs/core/Debug/debugLayer";
// import { Inspector } from '@babylonjs/inspector';

import { camera } from './scripts/babylon_components/camera'
import { lights } from './scripts/babylon_components/lights';

import { player } from './scripts/game_components/player'

import { authUser } from './scripts/firebas/authUser'
import { getDiscountCode } from './scripts/firebas/discountCode'

import {
  createStartTrack,
  createTrackOne,
  createTrackTwo,
  createTrackThree,
  createTrackFour,
  createTrackFive,
  createTrackSix
} from './scripts/game_components/createTracks';

import { colliders } from './scripts/game_components/colliders';
import { startGame, gameRender, gameRestart, gamePause } from './scripts/game_components/game';
import { environment } from './scripts/game_components/environment';
import { sounds } from './scripts/game_components/sounds';
import { cameraAlphaAnimation } from './scripts/functions/animations';
import { isMobile } from './scripts/functions/isMobile';
import { changePlayer } from './scripts/functions/changePlayer';
import { changeTrack } from './scripts/functions/changeTrack';
import { checkAndClearExpiredData } from './scripts/checkAndClearExpiredData';
import { checkIfYouWonCode } from './scripts/functions/checkIfYouWonCode';



var canvas = document.getElementById("renderCanvas");

let gameObject = {
  gameRestarted: false,
  gameRunning: false,
  gamePaused: false,
  isMobile: false,
  glowOnMobile: true,
  reflectionOnMobile: true,
  mobileToLookNice: true,
  userLoggedInData: null,
  discountCode: [],
  currentScore: -1,
}

// if (isMobile()) gameObject.isMobile = true
if (window.innerWidth < window.innerHeight) gameObject.isMobile = true


//LOADING
DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById('customLoadingScreenDiv')) {
    // Do not add a loading screen if there is already one
    document.getElementById('customLoadingScreenDiv').style.display = 'initial';
    return;
  }
};
DefaultLoadingScreen.prototype.hideLoadingUI = function () {
  setTimeout(() => {
    document.getElementById('loadingSpinner').remove();
  }, 1000);
};
//end of loading

//BABYLON
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false, antialiasing: true }); };
// var createDefaultEngine = async function () {
//   var engine = new WebGPUEngine(canvas);
//   await engine.initAsync();
//   return engine;
// };
var createScene = async function () {

  // const engine = new Engine(canvas, {
  //   antialiasing: true,
  // });

  // const engine = new WebGPUEngine(canvas);
  // // await engine.initAsync();

  //loading
  engine.displayLoadingUI();

  engine.enableOfflineSupport = false;

  //set for mobile chrome error
  if (canvas.width < canvas.height) {
    engine.disableUniformBuffers = true
  }
  // scene
  var scene = new Scene(engine);
  // scene.clearColor = Color3.FromHexString("#00003f");
  scene.clearColor = Color3.FromHexString("#87ceeb");
  // scene.clearColor = new Color4(0, 0, 0, 0);
  //FPS
  var fps = document.getElementById('fps');
  fps.style.display = "none";
  function getFPS() {
    // setInterval(function () {
    // fps.innerHTML = `${engine.getFps().toFixed(0)} fps`
    fps.innerHTML = `${engine.getFps().toFixed(0)} fps`
    // }, 1000)
    // if (engine.getFps().toFixed(0) < 58) console.log(engine.getFps().toFixed(0))
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === 'p') {
      getFPS()
      fps.style.display = "block"
    }
  })

  // //FETCH JSON
  // const fetchedObjResponse = await fetch("sandviperCode.json");
  // const fetchedObj = await fetchedObjResponse.json();

  // console.log(fetchedObj)

  // let discountCode = fetchedObj.sandviperCodeBase.code;
  // console.log(discountCode)

  // code(discountCode)

  // console.log(localStorage.getItem('sandViperCodeAlreadyUsed'))

  // checkAndClearExpiredData();

  //LOAD MESHES
  let gameEnvLoadedPercent = 0;
  let playerLoadedPercent = 0;
  let combLoadedPercent = 0;
  // let sceneLoaded = [false]
  let result = await Promise.all([
/*0*/SceneLoader.ImportMeshAsync(
    "",
    "meshes/viperman4.glb",
    null,
    scene,
    (evt) => {
      if (evt.lengthComputable) {
        gameEnvLoadedPercent = (evt.loaded * 100) / evt.total / 2;
        combLoadedPercent = (
          gameEnvLoadedPercent + playerLoadedPercent
        ).toFixed();
      } else {
        gameEnvLoadedPercent = (evt.loaded * 100) / 1246412 / 2;
        combLoadedPercent = (
          gameEnvLoadedPercent + playerLoadedPercent
        ).toFixed();
      }
      // console.log(combLoadedPercent)
      loadingPercentages.innerHTML = `${combLoadedPercent}% `
    }
  ),
/*1*/SceneLoader.ImportMeshAsync("", "meshes/staza_small (Stralo)5.glb", null, scene, (evt) => {
    if (evt.lengthComputable) {
      playerLoadedPercent = (evt.loaded * 100) / evt.total / 2;
      combLoadedPercent = (
        gameEnvLoadedPercent + playerLoadedPercent
      ).toFixed();
    } else {
      playerLoadedPercent = (evt.loaded * 100) / 4219028 / 2;
      combLoadedPercent = (
        gameEnvLoadedPercent + playerLoadedPercent
      ).toFixed();
    }
    // console.log(combLoadedPercent)
    loadingPercentages.innerHTML = `${combLoadedPercent}% `
  }),
/*2*/SceneLoader.ImportMeshAsync("", "meshes/logo.glb", null, scene, (evt) => {
  }),
/*3*/SceneLoader.ImportMeshAsync("", "meshes/CargoBox.glb", null, scene, (evt) => {
  }),
/*4*/SceneLoader.ImportMeshAsync("", "meshes/playerStartGround.glb", null, scene, (evt) => {
  }),
/*5*/SceneLoader.ImportMeshAsync("", "meshes/LaserBarriere 1.glb", null, scene, (evt) => {
  }),
/*6*/SceneLoader.ImportMeshAsync("", "meshes/vipergirl.glb", null, scene, (evt) => {
  }),
/*7*/SceneLoader.ImportMeshAsync("", "meshes/playerStartGround.glb", null, scene, (evt) => {
  }),
/*8*/SceneLoader.ImportMeshAsync("", "meshes/LaserBarriere 2.glb", null, scene, (evt) => {
  }),
/*9*/SceneLoader.ImportMeshAsync("", "meshes/LaserBarriere 3.glb", null, scene, (evt) => {
  }),
/*10*/SceneLoader.ImportMeshAsync("", "meshes/LaserBarriere 4.glb", null, scene, (evt) => {
  }),

/*11*/SceneLoader.ImportMeshAsync("", "meshes/CargoboxDesert.glb", null, scene, (evt) => {
  }),
/*12*/SceneLoader.ImportMeshAsync("", "meshes/DesertBarrier 1 (Dark).glb", null, scene, (evt) => {
  }),
/*13*/SceneLoader.ImportMeshAsync("", "meshes/DesertBarrier 2 (Dark).glb", null, scene, (evt) => {
  }),
/*14*/SceneLoader.ImportMeshAsync("", "meshes/DesertBarrier 3 (Dark).glb", null, scene, (evt) => {
  }),
/*15*/SceneLoader.ImportMeshAsync("", "meshes/DesertBarrier 4 (Dark).glb", null, scene, (evt) => {
  }),
/*16*/SceneLoader.ImportMeshAsync("", "meshes/DesertMap5.glb", null, scene, (evt) => {
  }),
  ]);

  sounds(scene, Engine)

  // function wait(num) {
  //   return new Promise(resolve => setTimeout(resolve, num));
  // }

  // async function getUser(id) {
  //   await wait(10000)
  //   console.log(id)
  // }

  // await getUser(1)

  // console.log('after')

  // console.log(scene.getSoundByName("coinSound"))

  //PLAYER OBJECT
  let playerObject = {
    playerModel: result[0],
    playerModelRoot: 0,
    femalePlayerModel: result[6],
    femalePlayerModelRoot: 0,
    selectedPlayer: "male",
    playerContainerMesh: 0,
    playerBoundingMesh: 0,
    malePlayerAnimations: 0,
    femalePlayerAnimations: 0,
    playerAnimations: 0,
    animationOn: 8,
    // playerSpeed: 0.01,
    playerSpeed: 0.2,
    playerJumpHeight: 1.5,
    playerLanePos: 0,
    playerJumped: false,
    playerSlided: false,
    playerGroundPosition: 0,
    playerKnocked: false,
    collectedCoins: 0,
    score: 0
  }
  player(scene, canvas, playerObject, gameObject)


  // lights(scene, playerObject, canvas)


  //CAMERA OBJECT
  let cameraObject = {
    viewCamera: 0,
    cameraTarget: 0,
  }
  camera(scene, canvas, cameraObject, playerObject, gameObject)


  //TRACKS OBJECT
  // let trackPosZ = [70]
  let tracksObject = {
    selectedTrack: 0,
    trackPosZ: 57,
    trackOptions: [
      createTrackOne,
      createTrackTwo,
      createTrackThree,
      createTrackFour,
      createTrackFive,
      createTrackSix
    ],
    runningTracks: [],
    laserEnvironmentModel: result[1],
    desertEnvironmentModel: result[16],
    environmentModel: result[1],
    coinLogoModel: result[2],
    laserBoxModel: result[3],
    desertBoxModel: result[11],
    mainBoxModel: result[3],
    playerStartGroundModel: result[4],
    femalePlayerStartGroundModel: result[7],
    laserBarrierSmallModel: result[5],
    desertBarrierSmallModel: result[12],
    mainBarrierSmallModel: result[5],
    laserBarrierHighSlideModel: result[8],
    desertBarrierHighSlideModel: result[13],
    mainBarrierHighSlideModel: result[8],
    laserBarrierHighModel: result[9],
    desertBarrierHighModel: result[14],
    mainBarrierHighModel: result[9],
    laserBarrierWideModel: result[10],
    desertBarrierWideModel: result[15],
    mainBarrierWideModel: result[10],
  }

  //player start position
  tracksObject.playerStartGroundModel.meshes[0].scaling.scaleInPlace(0.8)
  tracksObject.playerStartGroundModel.meshes[0].position = new Vector3(0, -0.5, 0)
  for (let i = 0; i < tracksObject.playerStartGroundModel.meshes.length; i++) {
    if (i != 0) tracksObject.playerStartGroundModel.meshes[i].material.albedoColor = Color3.FromHexString("#000000");
  }

  tracksObject.femalePlayerStartGroundModel.meshes[0].scaling.scaleInPlace(0.8)
  tracksObject.femalePlayerStartGroundModel.meshes[0].position = new Vector3(0.56, -0.5, -1.5)
  for (let i = 0; i < tracksObject.femalePlayerStartGroundModel.meshes.length; i++) {
    if (i != 0) {
      tracksObject.femalePlayerStartGroundModel.meshes[i].material.albedoColor = Color3.FromHexString("#000000");
      tracksObject.femalePlayerStartGroundModel.meshes[i].material.emissiveColor = Color3.FromHexString("#FF69B4");
    }
  }

  //env model
  tracksObject.laserEnvironmentModel.meshes[0].scaling.scaleInPlace(0.85);
  tracksObject.laserEnvironmentModel.meshes[0].position = new Vector3(0, -0.5, -120);
  tracksObject.laserEnvironmentModel.meshes[0].addRotation(0, Math.PI, 0)
  for (let i = 0; i < tracksObject.laserEnvironmentModel.meshes.length; i++) {
    tracksObject.laserEnvironmentModel.meshes[i].name = "originalEnvModel_" + tracksObject.laserEnvironmentModel.meshes[i].name
  }
  //create reflection
  scene.getMaterialByName("PlatformFloor6x6").metallicTexture = null;
  if (!gameObject.isMobile) {
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture = new MirrorTexture("mirror", 1024, scene, true);
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.mirrorPlane = new Plane(0, -1.0, 0, -0.5);
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.level = 0.5;
    //model mesh
    for (let i = 0; i < playerObject.playerModel.meshes.length; i++) {
      if (i > 0) {
        scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(playerObject.playerModel.meshes[i])
      }
    }
    for (let i = 0; i < playerObject.femalePlayerModel.meshes.length; i++) {
      if (i > 0) {
        scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(playerObject.femalePlayerModel.meshes[i])
      }
    }
  }
  if (gameObject.isMobile && gameObject.reflectionOnMobile) {
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture = new MirrorTexture("mirror", 1024, scene, true);
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.mirrorPlane = new Plane(0, -1.0, 0, -0.5);
    scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.level = 0.5;
    //model mesh
    for (let i = 0; i < playerObject.playerModel.meshes.length; i++) {
      if (i > 0) {
        scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(playerObject.playerModel.meshes[i])
      }
    }
    for (let i = 0; i < playerObject.femalePlayerModel.meshes.length; i++) {
      if (i > 0) {
        scene.getMaterialByName("PlatformFloor6x6").reflectionTexture.renderList.push(playerObject.femalePlayerModel.meshes[i])
      }
    }
  }

  //desert env model
  tracksObject.desertEnvironmentModel.meshes[0].scaling.scaleInPlace(0.85);
  tracksObject.desertEnvironmentModel.meshes[0].position = new Vector3(0, -0.5, -120);
  tracksObject.desertEnvironmentModel.meshes[0].addRotation(0, Math.PI, 0)
  for (let i = 0; i < tracksObject.desertEnvironmentModel.meshes.length; i++) {
    tracksObject.desertEnvironmentModel.meshes[i].name = "originalEnvModel_" + tracksObject.desertEnvironmentModel.meshes[i].name
    tracksObject.desertEnvironmentModel.meshes[i].isVisible = false
  }


  //coin model
  tracksObject.coinLogoModel.meshes[1].scaling.scaleInPlace(0.6);
  tracksObject.coinLogoModel.meshes[1].position = new Vector3(0, 0, 0);
  tracksObject.coinLogoModel.meshes[1].isVisible = false;
  tracksObject.coinLogoModel.meshes[1].material.albedoColor = Color3.FromHexString("#ffffff");
  tracksObject.coinLogoModel.meshes[1].material.emissiveColor = Color3.FromHexString("#ffffff");
  tracksObject.coinLogoModel.meshes[1].material.emissiveIntensity = 0.3
  tracksObject.coinLogoModel.meshes[1].rotationQuaternion = null;
  tracksObject.coinLogoModel.meshes[1].addRotation(0.9, 1.57, 1.57)

  for (let i = 0; i < tracksObject.coinLogoModel.meshes.length; i++) {
    tracksObject.coinLogoModel.meshes[i].name = 'originalCoinLogo_' + tracksObject.coinLogoModel.meshes[i].name
  }

  //box one model
  tracksObject.laserBoxModel.meshes[0].scaling.scaleInPlace(1.7);
  tracksObject.laserBoxModel.meshes[0].position = new Vector3(0, -5, 0);
  for (let i = 0; i < tracksObject.laserBoxModel.meshes.length; i++) {
    tracksObject.laserBoxModel.meshes[i].name = 'originallaserBoxModel_' + tracksObject.laserBoxModel.meshes[i].name
  }
  tracksObject.laserBoxModel.meshes[1].material.backFaceCulling = true

  //box two model
  tracksObject.desertBoxModel.meshes[0].scaling.scaleInPlace(1.7);
  tracksObject.desertBoxModel.meshes[0].position = new Vector3(0, -5, 0);
  for (let i = 0; i < tracksObject.desertBoxModel.meshes.length; i++) {
    tracksObject.desertBoxModel.meshes[i].name = 'originaldesertBoxModel_' + tracksObject.desertBoxModel.meshes[i].name
  }
  tracksObject.desertBoxModel.meshes[1].material.backFaceCulling = true

  ///LASER BARIERS
  tracksObject.laserBarrierSmallModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.laserBarrierSmallModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.desertBarrierSmallModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.desertBarrierSmallModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.laserBarrierHighSlideModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.laserBarrierHighSlideModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.desertBarrierHighSlideModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.desertBarrierHighSlideModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.laserBarrierHighModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.laserBarrierHighModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.desertBarrierHighModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.desertBarrierHighModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.laserBarrierWideModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.laserBarrierWideModel.meshes[0].position = new Vector3(0, -5, 5)

  tracksObject.desertBarrierWideModel.meshes[0].scaling = new Vector3(0.5, 0.65, 0.6)
  tracksObject.desertBarrierWideModel.meshes[0].position = new Vector3(0, -5, 5)



  // tracksObject.boxTwoModel.meshes[0].scaling.scaleInPlace(0);
  changePlayer(scene, playerObject, cameraObject, gameObject)

  /////create start track
  // createStartTrack(scene, tracksObject, playerObject, gameObject)
  // createTrackOne(scene, tracksObject, playerObject, gameObject)
  // createTrackTwo(scene, tracksObject, playerObject, gameObject)
  // createTrackThree(scene, tracksObject, playerObject, gameObject)
  // createTrackFour(scene, tracksObject, playerObject, gameObject)
  // createTrackFive(scene, tracksObject, playerObject, gameObject)
  // createTrackSix(scene, tracksObject, playerObject, gameObject)

  changeTrack(scene, tracksObject, playerObject, gameObject)

  //GAME
  // if (!gameObject.gameRestarted) startGameDisplay.style.display = "flex";

  play.onclick = () => {
    createStartTrack(scene, tracksObject, playerObject, gameObject)
    tracksObject.laserEnvironmentModel.meshes[0].position = new Vector3(0, -0.5, -127);
    tracksObject.desertEnvironmentModel.meshes[0].position = new Vector3(0, -0.5, -127);
    // if (gameObject.userLoggedInData.user_attempts_left > 0) {
    startGame(gameObject, playerObject, scene, Engine, cameraObject, tracksObject)
    // } else {
    //   userInGameDisplayAlert.classList.add("horizontal-shaking")
    //   setTimeout(() => {
    //     userInGameDisplayAlert.classList.remove("horizontal-shaking")
    //   }, 600)
    // }
  }

  restartGameDisplay.onclick = () => {
    // gameRestart(scene, gameObject, playerObject, createScene)
    if (window.location.href.includes('?')) {
      window.location.href = window.location.href.split('?')[0];
    } else {
      location.reload();
    }
  }

  pauseDisplay.onclick = () => {
    gamePause(gameObject, scene, playerObject)
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
      if (gameObject.gameRunning) gamePause(gameObject, scene, playerObject)
    }
  })

  controlsDisplay.onclick = () => {
    contorlsImgContainer.style.display = "flex"
  }

  closeControls.onclick = () => {
    contorlsImgContainer.style.display = "none"
  }

  creditsDisplay.onclick = () => {
    creditsMainContainer.style.display = "flex"
  }

  closeCredits.onclick = () => {
    creditsMainContainer.style.display = "none"
  }

  exitDisplay.onclick = () => {
    if (window.location.href.includes('?')) {
      window.location.href = window.location.href.split('?')[0];
    } else {
      location.reload();
    }
  }


  scene.onAfterRenderObservable.add(function () {
    // console.log(playerObject.playerContainerMesh.position.z)
    // getFPS()
    // console.log(playerObject.playerContainerMesh.position.y)
    // console.log(playerObject.playerSpeed)
    if (gameObject.gameRunning && !gameObject.gamePaused && !playerObject.playerKnocked) {

      //check if you won a code
      checkIfYouWonCode(playerObject, gameObject)
      //game render
      gameRender(scene, tracksObject, playerObject, gameObject)

      //score display
      scoreDisplay.innerHTML = `Score<br>${(Math.round(playerObject.playerContainerMesh.position.z) * 10) + (playerObject.collectedCoins * 100)}`

      //player movement
      playerObject.playerContainerMesh.position.z += playerObject.playerSpeed * scene.getAnimationRatio();
      scene.getMeshByName("skyBox").position.z += playerObject.playerSpeed * scene.getAnimationRatio();
    }

    //player ground position
    if (playerObject.playerContainerMesh.position.y > playerObject.playerGroundPosition && !playerObject.playerJumped && !playerObject.playerKnocked) {
      playerObject.playerContainerMesh.position.y -= 0.07;
    }



  })

  // scene.onPointerObservable.add((eventData) => {
  //   if (eventData.pickInfo.pickedPoint && eventData.event.button === 0) {
  //     console.log(eventData.pickInfo.pickedMesh.name)
  //   }
  // })

  // Inspector.Show(scene, {
  //   embedMode: true
  // });
  // scene.debugLayer.show();
  // document.getElementById("inspector-host").style.position = "absolute"
  // document.getElementById("scene-explorer-host").style.position = "absolute"
  // document.getElementById("inspector-host").style.zIndex = "10000"
  // document.getElementById("scene-explorer-host").style.zIndex = "10000"


  environment(scene, gameObject)

  // //for loading
  scene.executeWhenReady(() => {

    getDiscountCode(gameObject, "game")

    authUser(gameObject)

    loadingSpinnerBorder.style.display = "none"
    loadingPercentages.style.display = "none"
    // authSection.style.display = "flex"
    loadingLogo.style.display = "block"
    // console.log(gameObject.userLoggedInData)
    // if (gameObject.userLoggedInData != null) {
    //   startGameFromLoading.style.visibility = "visible"
    // }

    scene.activeCamera.alpha = 0 + Math.PI / 2

    startGameFromLoading.onclick = () => {
      engine.hideLoadingUI();
      Engine.audioEngine.unlock()
      scene.getSoundByName("startGameMusic").play(true)
      if (gameObject.userLoggedInData.user_name != null) {
        userInGameDisplayEmail.innerHTML = `Hi ${gameObject.userLoggedInData.user_name}`
      } else {
        userInGameDisplayEmail.innerHTML = `Hi ${gameObject.userLoggedInData.user_email}`
      }
      // userInGameDisplayAttemptsLeft.innerHTML = `Attempts left: ${gameObject.userLoggedInData.user_attempts_left}`
      // if (gameObject.userLoggedInData.user_attempts_left < 1) {
      //   userInGameDisplayAlert.style.visibility = "visible"
      // }
    }


    // if (gameObject.gameRestarted) {
    //   customLoadingScreenDiv.style.display = "none"
    //   gameObject.gameRunning = true
    //   playerObject.playerAnimations[3].play(true)
    // }
    // sceneLoaded[0] = true
    engine.runRenderLoop(() => {
      if (!gameObject.isMobile) {
        engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
        engine.adaptToDeviceRatio = true;
      }
      //mobile to look nice
      if (gameObject.isMobile && gameObject.mobileToLookNice) {
        engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
        engine.adaptToDeviceRatio = true;
      }
      if (!gameObject.gamePaused) {
        scene.render();
      }
    });
  });

  //end of scene
  return scene;
};



///////////////////////////////////END OF BABYLON/////////////////////////////////
async function initFunction() {
  // //HAVOK ACTIVATE
  // globalThis.HK = await HavokPhysics();
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        'the available createEngine function failed. Creating the default engine instead'
      );
      return createDefaultEngine();
    }
  };
  engine = await asyncEngineCreation();
  if (!engine) throw 'engine should not be null.';
  scene = createScene();
}
initFunction().then(() => {
  sceneToRender = scene;
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});

// Resize
window.addEventListener('resize', function () {
  engine.resize();
});