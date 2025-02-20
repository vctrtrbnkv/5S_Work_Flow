import CustomScene from './CustomScene.js';

export default class GameOverScene extends CustomScene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(100, 100, "Конец игры!", { fontSize: "24px", fill: "#000"});
        this.removeAllModals();
    }
}