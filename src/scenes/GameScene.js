import CustomScene from "./CustomScene";

export default class GameScene extends CustomScene {
    constructor() {
        super('GameScene');
    }

    create() {
        const room1 = this.add.image(0, 0, 'room').setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

        // Вычисляем центр и устанавливаем позицию изображения
        room1.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        room1.setScale(0.5); // Устанавливаем масштаб изображения

        this.createInteractiveSprite('chair', 'chair', this.cameras.main.centerX, this.cameras.main.centerY, 0.5);

        const dropTarget = this.add.sprite(100, 100, 'spritesheet', 'trashCan.png').setOrigin(0.5, 0.5);

    }
}