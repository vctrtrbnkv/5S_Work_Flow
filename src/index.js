import { Game, AUTO } from "phaser";
import PreloadScene from "./scenes/PreloadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import level1 from "./scenes/level1.js";
import level2 from "./scenes/level2.js";
import level3 from "./scenes/level3.js";
import GameOverScene from "./scenes/GameOverScene.js";
import gameConfig from "./gameConfig";

const config = {
<<<<<<< HEAD
    type: AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
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
=======
  type: AUTO,
  width: gameConfig.width,
  height: gameConfig.height,
  backgroundColor: gameConfig.backgroundColor,
  parent: divId,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    // arcade: {
    //     debug: true,
    // }
  },
  scene: [PreloadScene, MenuScene, level1, level2, level3, GameOverScene],
};
>>>>>>> test-2

new Game(config);
