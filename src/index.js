import { Game, AUTO } from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import gameConfig from './gameConfig'

const config = {
    type: AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true, // Включаем отображение границ
        }
    },
    scene: [
        PreloadScene,
        GameScene,
        GameOverScene
    ]
}

new Game(config);