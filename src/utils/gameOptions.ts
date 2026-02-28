import { uid } from 'quasar'

export interface gameModel {
    id: string;
    name: string;
    pageName: string;
}

export const gameOptions: gameModel[] = [
    {
        id: uid(),
        name: 'Odin',
        pageName: 'odinScorePage'
    }
]