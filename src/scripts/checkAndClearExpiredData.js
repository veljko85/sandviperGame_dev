export function checkAndClearExpiredData() {
    try {
        const codeUsedString = localStorage.getItem('sandViperCodeAlreadyUsed');
        if (codeUsedString) {
            const codeUsedData = JSON.parse(codeUsedString);
            const now = new Date().getTime();

            // console.log(codeUsedData.expiration - now)

            if (now > codeUsedData.expiration) {
                localStorage.removeItem('sandViperCodeAlreadyUsed');
                // console.log('Expired sandViperCodeAlreadyUsed data cleared from localStorage');
            }
        }
    } catch (e) {
        // console.warn('Error checking localStorage:', e);
    }
}