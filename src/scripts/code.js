export function code(discountCode) {
    // console.log(discountCode)
    // codeDisplay.innerHTML = discountCode
    copyCode.onclick = () => {
        navigator.clipboard.writeText(codeDisplay.innerHTML);
    }

}

// export function postponeUsegeOfDiscountCode() {
//     console.log("postponeUsegeOfDiscountCode")
// }