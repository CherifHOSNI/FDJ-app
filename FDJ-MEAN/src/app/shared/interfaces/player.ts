export interface Player {
    _id: number,
    name: string,
    position: string,
    thumbnail: string,
    signin: {
        amount: {
            $numberInt: string
        },
        currency: string
    }
    born: string
}