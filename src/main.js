import { Game, AUTO } from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js'
import level1 from './scenes/level1.js';
import level2 from './scenes/level2.js';
import level3 from './scenes/level3.js';
import GameOverScene from './scenes/GameOverScene.js';

const config = {
    type: AUTO,
    width: 800,
    height: 800,
    backgroundColor: '#D9D9D9',
    parent: divId,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    scene: [
        PreloadScene,
        MenuScene,
        level1,
        level2,
        level3,
        GameOverScene
    ]
}

// const game = new Game(config); 
console.log('config: ', config);


new Game(config);