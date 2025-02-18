import { Game, AUTO } from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js'
import level1 from './scenes/level1.js';
import level2 from './scenes/level2.js';
import GameOverScene from './scenes/GameOverScene.js';
import gameConfig from './gameConfig'

const config = {
    type: AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
    parent: divId,
    // scale: {
    //     // Or set parent divId here
    //     parent: divId,

    //     mode: Phaser.Scale.FIT,
    // },
    // fullscreenTarget: divId, // For fullscreen
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true, // Включаем отображение границ
        }
    },
    scene: [
        PreloadScene,
        MenuScene,
        level1,
        level2,
        GameOverScene
    ]
}

new Game(config);