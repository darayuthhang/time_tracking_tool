export const logError = (error, message) => {
    if (process.env.REACT_APP_STAGE === 'local') {
        console.log(error);
        console.log(error.message);
    }
}

export const logSuccess = (success) => {
    if (process.env.REACT_APP_STAGE === 'local') {
        console.log(success);
    }
}
