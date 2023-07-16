module.exports.ApiRouteMessage = (api, httpMethod) => {
    return `${api} ===> ${httpMethod} HttpMethod ACCEPTED.`
}
module.exports.ApiServiceMessage = (service, methodName) => {
    return `${service} ===> ${methodName} method ACCEPTED.`
}
module.exports.ApiRepositoryMessage = (repository, methodName) => {
    return `${repository} ===> ${methodName} method ACCEPTED.`
}
