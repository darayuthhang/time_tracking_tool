export const handleJsonError = (value) => {
    try {
        const myObject = JSON.parse(value);
        return Object
    } catch (e) {
        console.error('Error parsing JSON:', e);
        // Handle the error
    }
}
export const defaultDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
/**
 * 
 *@description ISO FORMAT YYYY-MM-DD
 */
export const convertDateFormatToISOformat = (input = "") => {
    let format = input.split('/');
    /**
     * format is empty or there is no slash, return original input
     */
    if(format[0] === '' || format.length === 1) return input;
    let newFormat = format[2] + "-" + format[0] + "-" + format[1];
    return newFormat
}
/**
 * @description FORMAT mm dd, year (May 14, 2022)
 */
export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export const getLastUpdateAgo = (timestamp) => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(timestamp).getTime();
    const diffInMilliseconds = currentTime - targetTime;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours} hours ago`;
    } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays} days ago`;
    }
};

