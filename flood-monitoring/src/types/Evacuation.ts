export interface Evacuation {
    centerName: string,
    amenity: string,
    latitude: number,
    longitude: number,
    distanceFromLocation: number | null
}

export interface Hotlines {
    hotlineName: string,
    hotlineNumber: string
}