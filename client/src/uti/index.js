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
