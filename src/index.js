import { Game, AUTO } from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import gameConfig from './gameConfig'

const config = {
    type: AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
    scene: [
        PreloadScene,
        GameScene
    ]
}

new Game(config);