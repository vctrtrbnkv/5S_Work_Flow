import { Scene } from 'phaser';

export default class GameOverScene extends Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.add.text(100, 100, "Конец игры!", { fontSize: "24px", fill: "#000"});
    }
}