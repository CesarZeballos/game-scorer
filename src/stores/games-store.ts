import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uid } from 'quasar'
import {gameOptions, gameModel} from 'src/utils/gameOptions'
import { RoundModel, PlayerModel } from './models/gamesStoreModels'

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
            setNewGame,
            resetGame,
            finishGame
        }
    },
    {
        persist: {
            storage: localStorage
        }
    }
)