// Frontend

export const appHomeUrl = () => {
    return 'http://localhost:3000/'
}

export const appTopicsUrl = () => {
    return `${appHomeUrl()}topics/`
}

// Backend 

export const baseApiUrl = () => {
    return 'http://localhost:8000/api/'
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