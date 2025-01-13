export function changeTrack(scene, tracksObject, playerObject, gameObject) {
    choseCyberSpace.onclick = () => {

        scene.getSoundByName("changePlayer").play()

        choseCyberSpace.style.filter = "none"
        choseDesert.style.filter = "grayscale(100%)"
        tracksObject.selectedTrack = 0
        tracksObject.environmentModel = tracksObject.laserEnvironmentModel
        tracksObject.mainBoxModel = tracksObject.laserBoxModel
        tracksObject.mainBarrierSmallModel = tracksObject.laserBarrierSmallModel
        tracksObject.mainBarrierHighSlideModel = tracksObject.laserBarrierHighSlideModel
        tracksObject.mainBarrierHighModel = tracksObject.laserBarrierHighModel
        tracksObject.mainBarrierWideModel = tracksObject.laserBarrierWideModel
        for (let i = 0; i < tracksObject.desertEnvironmentModel.meshes.length; i++) {
            tracksObject.desertEnvironmentModel.meshes[i].isVisible = false
        }
        for (let i = 0; i < tracksObject.laserEnvironmentModel.meshes.length; i++) {
            tracksObject.laserEnvironmentModel.meshes[i].isVisible = true
        }
    }
    choseDesert.onclick = () => {

        scene.getSoundByName("changePlayer").play()

        choseDesert.style.filter = "none"
        choseCyberSpace.style.filter = "grayscale(100%)"
        tracksObject.selectedTrack = 1
        tracksObject.environmentModel = tracksObject.desertEnvironmentModel
        tracksObject.mainBoxModel = tracksObject.desertBoxModel
        tracksObject.mainBarrierSmallModel = tracksObject.desertBarrierSmallModel
        tracksObject.mainBarrierHighSlideModel = tracksObject.desertBarrierHighSlideModel
        tracksObject.mainBarrierHighModel = tracksObject.desertBarrierHighModel
        tracksObject.mainBarrierWideModel = tracksObject.desertBarrierWideModel
        for (let i = 0; i < tracksObject.laserEnvironmentModel.meshes.length; i++) {
            tracksObject.laserEnvironmentModel.meshes[i].isVisible = false
        }
        for (let i = 0; i < tracksObject.desertEnvironmentModel.meshes.length; i++) {
            tracksObject.desertEnvironmentModel.meshes[i].isVisible = true
        }
    }
}