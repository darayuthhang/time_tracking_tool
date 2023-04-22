export const handleJsonError = (value) => {
    try {
        const myObject = JSON.parse(value);
        return Object
    } catch (e) {
        console.error('Error parsing JSON:', e);
        // Handle the error
    }
}
