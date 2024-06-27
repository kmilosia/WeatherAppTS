export const setLocalStorage = (key: string, value: any) : void => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = <T>(key: string): T | null => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

export const checkLocalStorage = (key: string): boolean => {
    return localStorage.getItem(key) !== null
}

// export const getLastLocationFromLocalStorage = (): string => {
//     const storedLocations: string[] | null = JSON.parse(localStorage.getItem('locations')) || []
//     return storedLocations.length > 0 ? storedLocations[storedLocations.length - 1] : ''
// }
export const getLastLocationFromLocalStorage = (): string => {
    const storedLocations: string[] = JSON.parse(localStorage.getItem('locations') || '[]');
    return storedLocations.length > 0 ? storedLocations[storedLocations.length - 1] : '';
}
export const checkCityExists = (cityName: string): boolean => {
    const storedLocations: string[] = JSON.parse(localStorage.getItem('locations')  || '[]')
    return storedLocations.includes(cityName)
};