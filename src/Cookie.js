export function setCookie(name, value, exdays) {

    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";

    // options = {
    //     path: '/',
    //     // при необходимости добавьте другие значения по умолчанию
    //     ...options
    // };

    // if (options.expires instanceof Date) {
    //     options.expires = options.expires.toUTCString();
    // }

    // // let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    // let updatedCookie = name + "=" + value;

    // for (let optionKey in options) {
    //     updatedCookie += "; " + optionKey;
    //     let optionValue = options[optionKey];
    //     if (optionValue !== true) {
    //         updatedCookie += "=" + optionValue;
    //     }
    // }

    // document.cookie = updatedCookie;
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    // setCookie(name, "", {
    //     'max-age': -1
    // })
    setCookie(name, "", -1);
}