export interface PlayerModel {
    uid: string
    name: string
    color: string
}

export interface RoundScoreModel {
    playerUid: string
    points: number
}

export interface RoundModel {
    uid: string
    roundNumber: number
    scores: RoundScoreModel[]
}

export interface PlayerCardModel {
    player: PlayerModel
    totalScore: number
}