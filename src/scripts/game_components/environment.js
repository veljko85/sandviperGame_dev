import {
    CubeTexture,
    HDRCubeTexture,
    Color3,
    StandardMaterial,
    MeshBuilder,
    GlowLayer,
    Texture,
    Vector3,
    Mesh
} from '@babylonjs/core';

import { SkyMaterial } from '@babylonjs/materials';

export function environment(scene, gameObject) {
    scene.environmentTexture = new CubeTexture('enviorment/studio.env', scene);
    // scene.environmentTexture.rotationY = 2;
    scene.environmentIntensity = 1; //0.7

    // var hdrBcgRefTexture = new HDRCubeTexture(
    //     // "https://raw.githubusercontent.com/veljko85/viperman/ghpages/textures/shangai.hdr",
    //     "enviorment/kloppenheim_02_puresky_1k.hdr",
    //     scene,
    //     128
    // );

    // // Skybox
    // var hdrSkybox = Mesh.CreateBox("hdrSkyBox", 1000, scene);
    // var hdrSkyboxMaterial = new PBRMaterial("skyBox", scene);
    // hdrSkyboxMaterial.backFaceCulling = false;
    // hdrSkyboxMaterial.reflectionTexture = hdrBcgRefTexture.clone();
    // hdrSkyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // hdrSkyboxMaterial.microSurface = 1.0;
    // hdrSkyboxMaterial.cameraExposure = 0.66;
    // hdrSkyboxMaterial.cameraContrast = 1.66;
    // hdrSkyboxMaterial.disableLighting = true;
    // hdrSkybox.material = hdrSkyboxMaterial;
    // hdrSkybox.infiniteDistance = true;

    // Skybox
    // var skybox = MeshBuilder.CreateBox(
    //     "skyBox",
    //     { size: 250 },
    //     scene
    // );
    // skybox.position = new Vector3(0, 0, 0)
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture(
    //     "textures/skybox4/skybox",
    //     scene,
    //     ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]
    // );
    // skyboxMaterial.reflectionTexture.coordinatesMode =
    //     Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;


    var skyBox = Mesh.CreateBox(
        "skyBox",
        500,
        scene,
        false,
        Mesh.BACKSIDE
    );
    skyBox.material = new SkyMaterial("sky", scene);
    skyBox.material.inclination = 0.5;
    skyBox.material.luminance = 0.7;
    skyBox.material.azimuth = 0.25;
    skyBox.position.y = 0;
    skyBox.material.useSunPosition = true; // Do not set sun position from azimuth and inclination
    skyBox.material.sunPosition = new Vector3(50, 30, 0);




    if (!gameObject.isMobile) {
        var glow = new GlowLayer("glow", scene);
        glow.intensity = 0.3;
    }
    if (gameObject.isMobile && gameObject.glowOnMobile) {
        var glow = new GlowLayer("glow", scene);
        glow.intensity = 0.3;
    }
}