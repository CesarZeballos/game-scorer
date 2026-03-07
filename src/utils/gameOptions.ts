export interface gameModel {
    id: string;
    name: string;
    pageName: string;
    minPlayers: number;
    maxPlayers: number;
}

export const gameOptions: gameModel[] = [
    {
        id: 'odin',
        name: 'Odin',
        pageName: 'odinScorePage',
        minPlayers: 2,
        maxPlayers: 6
    }
]
