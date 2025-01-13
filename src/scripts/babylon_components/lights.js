import {
  DirectionalLight,
  HemisphericLight,
  PointLight,
  Vector3,
  Color3,
  MeshBuilder,
} from '@babylonjs/core';

export function lights(scene, playerObject, canvas) {

  // console.log(playerObject)

  // let lightOnePos = new Vector3(-0.5, 0.5, -0.5)
  // // const fakeLightOne = MeshBuilder.CreateSphere(
  // //   "sphere",
  // //   { diameter: 0.1 },
  // //   scene
  // // );
  // // fakeLightOne.position = lightOnePos

  // var lightSphereLight = new PointLight('lightSphereLight', lightOnePos, scene);
  // lightSphereLight.diffuse = Color3.FromHexString("#ffffff");
  // lightSphereLight.intensity = 10
  // lightSphereLight.range = 6;
  // lightSphereLight.parent = playerObject.playerContainerMesh;

  // let lightTwoPos = new Vector3(0.5, 0.5, -0.5)
  // // const fakeLightTwo = MeshBuilder.CreateSphere(
  // //   "sphere",
  // //   { diameter: 0.1 },
  // //   scene
  // // );
  // // fakeLightTwo.position = lightTwoPos

  // var lightSphereLightTwo = new PointLight('lightSphereLight', lightTwoPos, scene);
  // lightSphereLightTwo.diffuse = Color3.FromHexString("#ffffff");
  // lightSphereLightTwo.intensity = 10
  // lightSphereLightTwo.range = 6;
  // lightSphereLightTwo.parent = playerObject.playerContainerMesh;

  // let hemInte = 0.4

  // var light1 = new HemisphericLight(
  //   "light1",
  //   new Vector3(0, 1, -1),
  //   scene
  // );
  // light1.intensity = hemInte;
  // var light2 = new HemisphericLight(
  //   "light",
  //   new Vector3(0, 1, 1),
  //   scene
  // );
  // light2.intensity = hemInte;
  // var light3 = new HemisphericLight(
  //   "light",
  //   new Vector3(0, -1, -1),
  //   scene
  // );
  // light3.intensity = hemInte;
  // var light4 = new HemisphericLight(
  //   "light",
  //   new Vector3(0, -1, 1),
  //   scene
  // );
  // light4.intensity = hemInte;
  // var light2 = new PointLight("light2", new Vector3(3, -3, 0), scene);
  // light2.diffuse = new Color3(1, 1, 1);
  // // light.specular = new Color3(0, 1, 0);
  //   light2.intensity = 1;
  //   light2.parent = scene.cameras[0]
  //   var light1 = new PointLight("light1", new Vector3(-3, -3, 0), scene);
  //   light1.diffuse = new Color3(1, 1, 1);
  //   // light.specular = new Color3(0, 1, 0);
  //     light1.intensity = 1;
  //     light1.parent = scene.cameras[0]
}