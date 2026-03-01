import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { uid } from 'quasar'
import {gameOptions, gameModel} from 'src/utils/gameOptions'
import {RoundModel, PlayerModel, PlayerCardModel} from './models/gamesStoreModels'

const QUASAR_COLORS = [
    'primary',
    'secondary',
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'teal',
    'green',
    'orange',
    'brown'
]

export const useGameStore = defineStore(
    'gameStore',
    () => {
        const actualGame = ref<gameModel | null>(null)
        const players = ref<PlayerModel[]>([])
        const rounds = ref<RoundModel[]>([])

        const playersRanking = computed<PlayerCardModel[]>(() => {
            if (!players.value.length) return []

            return players.value
                .map(player => {
                    const totalScore = rounds.value.reduce((acc, round) => {
                        const score = round.scores.find(
                            s => s.playerUid === player.uid
                        )

                        return acc + (score?.points ?? 0)
                    }, 0)

                    return {
                        player: player,
                        totalScore
                    }
                })
                .sort((a, b) => a.totalScore - b.totalScore) // menor a mayor
        })

        function getNextColor(index: number): string {
            return QUASAR_COLORS[index % QUASAR_COLORS.length] ?? 'primary'
        }

        function setNewGame(gameId: string, playerNames: string[]) {
            const game = gameOptions.find(g => g.id === gameId)

            if (!game) {
                console.error('Game not found')
                return
            }

            // seteamos juego actual
            actualGame.value = game

            // limpiamos estado
            rounds.value = []

            // creamos jugadores
            players.value = playerNames.map((name, index) => ({
                uid: uid(),
                name,
                color: getNextColor(index)
            }))
        }

        function addRound(
            roundData: { playerId: string; roundScore: number }[]
        ) {
            if (!players.value.length) return

            const nextRoundNumber = rounds.value.length + 1

            const newRound: RoundModel = {
                uid: uid(),
                roundNumber: nextRoundNumber,
                scores: players.value.map(player => {
                    const found = roundData.find(r => r.playerId === player.uid)

                    return {
                        playerUid: player.uid,
                        points: found?.roundScore ?? 0
                    }
                })
            }

            rounds.value.push(newRound)
        }

        function finishGame() {
            actualGame.value = null
            players.value = []
            rounds.value = []
        }

        function resetGame() {
            rounds.value = []
        }

        return {
            actualGame,
            players,
            rounds,
            playersRanking,
            setNewGame,
            addRound,
            resetGame,
            finishGame,
        }
    },
    {
        persist: {
            storage: localStorage
        }
    }
)