import { Game, AUTO } from 'phaser';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js';
import level1 from './scenes/level1.js';
import level2 from './scenes/level2.js';
import level3 from './scenes/level3.js';
import GameOverScene from './scenes/GameOverScene.js';
import gameConfig, { onThemeChange, getGameConfig, getSavedTheme, applyTheme } from './gameConfig';

const savedTheme = getSavedTheme();
applyTheme(savedTheme);

const config = {
    type: AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: gameConfig.backgroundColor,
    parent: divId,
    dom: {
        createContainer: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        },
    },
    scene: [PreloadScene, MenuScene, level1, level2, level3, GameOverScene],
};

const game = new Game(config);

onThemeChange((theme) => {
    const newConfig = getGameConfig();
    game.scale.backgroundColor = newConfig.backgroundColor;
});
