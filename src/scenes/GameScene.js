// import { Scene } from 'phaser';

import CustomScene from "./CustomScene";

// export default class GameScene extends Scene {
//     constructor() {
//         super('GameScene');
//     }

//     create() {
//         this.add.sprite(0, 0, 'room');
//     }
// }

export default class GameScene extends CustomScene {
    constructor() {
        super('GameScene');
    }

    create() {
        const room1 = this.add.image(0, 0, 'room').setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

        // Вычисляем центр и устанавливаем позицию изображения
        room1.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        room1.setScale(0.5); // Устанавливаем масштаб изображения

        // const chair = this.add.sprite(0, 0, 'chair').setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

        // // Вычисляем центр и устанавливаем позицию изображения
        // chair.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // chair.setScale(0.5); // Устанавливаем масштаб изображения
        // chair.setInteractive(); // Делаем изображение интерактивным


        this.createInteractiveSprite('chair', 'chair', this.cameras.main.centerX, this.cameras.main.centerY, 0.5);

        // this.addDragAndDrop(this.sprites.chair);

        // this.createSprite('chair2', 'chair', this.cameras.main.centerX + 50, this.cameras.main.centerY + 50, 0.5);
    }
}