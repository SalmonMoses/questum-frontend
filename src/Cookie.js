const questeriumStorage = window.localStorage;

export function setLocalStorage(name, value) {
    questeriumStorage.setItem(name, value);
}

export function getLocalStorage(name) {
    return questeriumStorage.getItem(name) || undefined;
}
    
export function deleteFromLocalStorage(name) {
    questeriumStorage.removeItem(name);
}

export function clearLocalStorage() {
    questeriumStorage.clear();
}