let colorPaletteForCodeWinings = ["#00ff00", "#0000ff", "#ff0000", "#008080", "#808000", "#800000", "#FF00FF", "#daa520", "#85f3f7", "#ac6ff7"]


export function checkIfYouWonCode(playerObject, gameObject) {
    if (gameObject.currentScore < gameObject.discountCode.length - 1) {
        if (gameObject.discountCode[gameObject.currentScore + 1].needed_score < (Math.round(playerObject.playerContainerMesh.position.z) * 10) + (playerObject.collectedCoins * 100)) {

            gameObject.currentScore += 1;

            for (let i = 0; i < upperGameScreen.children.length; i++) {
                if (gameObject.currentScore === gameObject.discountCode.length - 1) {
                    upperGameScreen.children[i].style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 1]
                    youWonCodeDisplay.style.color = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 1]
                    youWonCodeContainer.style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 1]
                }
                else if (gameObject.currentScore === gameObject.discountCode.length - 2) {
                    upperGameScreen.children[i].style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 2]
                    youWonCodeDisplay.style.color = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 2]
                    youWonCodeContainer.style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 2]
                }
                else if (gameObject.currentScore === gameObject.discountCode.length - 3) {
                    upperGameScreen.children[i].style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 3]
                    youWonCodeDisplay.style.color = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 3]
                    youWonCodeContainer.style.borderColor = colorPaletteForCodeWinings[colorPaletteForCodeWinings.length - 3]
                }
                else {
                    upperGameScreen.children[i].style.borderColor = colorPaletteForCodeWinings[gameObject.currentScore]
                    youWonCodeDisplay.style.color = colorPaletteForCodeWinings[gameObject.currentScore]
                    youWonCodeContainer.style.borderColor = colorPaletteForCodeWinings[gameObject.currentScore]
                }
            }

            youWonCodeContainer.style.display = "flex";
            youWonCodeDisplay.style.transform = 'scale(0)'; // Reset to starting state
            requestAnimationFrame(() => {
                youWonCodeDisplay.style.transform = 'scale(1)';
            });
            setTimeout(() => {
                youWonCodeContainer.style.display = "none";
            }, 2000)

            // console.log(gameObject.currentScore, gameObject.discountCode[gameObject.currentScore].needed_score)
        }
    }
}

