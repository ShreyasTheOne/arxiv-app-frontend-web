// Frontend

export const appHomeUrl = () => {
    return 'http://localhost:54321/'
}

export const appTopicsUrl = () => {
    return `${appHomeUrl()}topics/`
}

// Backend 

export const baseApiUrl = () => {
    return 'http://localhost:54321/api/'
}

export const apiAuthVerifyUrl = () => {
    return `${baseApiUrl()}auth/verify/`
}

export const apiAuthLoginUrl = () => {
    return `${baseApiUrl()}auth/login/`
}

export const apiAuthLogoutUrl = () => {
    return `${baseApiUrl()}auth/logout/`
}

export const apiSearchUrl = () => {
    return `${baseApiUrl()}papers/search/`
}

export const apiBookmarkUrl = () => {
    return `${baseApiUrl()}users/bookmark/`
}

export const apiDownloadUrl = () => {
    return `${baseApiUrl()}users/download/`
}

export const apiBlogUrl = () => {
    return `${baseApiUrl()}blogs/`
}

export const apiBlogDetailUrl = id => {
    return `${baseApiUrl()}blogs/${id}/`
}

export const apiBlogVoteUrl = id => {
    return `${baseApiUrl()}blogs/${id}/vote/`
}

// Google OAuth

export const googleRedirect = (state) => {
    return (`https://accounts.google.com/o/oauth2/v2/auth?` +
    `response_type=code&` +
    `client_id=763177834879-975pu14eb6cg8f4q39nnjt99ovkeiqag.apps.googleusercontent.com&` +
    `scope=openid%20profile%20email&` +
    `redirect_uri=http%3A//localhost:54321/redirect&` +
    `state=${state}`)
}