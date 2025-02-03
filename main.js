import Phaser from "phaser";
import './src/styles/style.css';
import { addDragAndDrop } from './src/utils.js';

var config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#D9D9D9',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true // Включите отображение отладочной информации физики
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    resize: resize // изменение под размер окна
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('room1', '/src/assets/images/Room1.png');
    this.load.image('chair', './src/assets/images/Chair.png');
}

function create() {
    const room1 = this.add.image(0, 0, 'room1').setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

    // Вычисляем центр и устанавливаем позицию изображения
    room1.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

    room1.setScale(0.5); // Устанавливаем масштаб изображения

    const chair = this.add.sprite(0, 0, 'chair').setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

    // Вычисляем центр и устанавливаем позицию изображения
    chair.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

    chair.setScale(0.5); // Устанавливаем масштаб изображения
    chair.setInteractive(); // Делаем изображение интерактивным

    addDragAndDrop(chair, this.input);

    // chair.on('pointerdown', function(pointer) {
    //     this.setAlpha(0.5); // Уменьшаем непрозрачность
    //     this.setData('dragging', true); // Устанавливаем флаг перетаскивания
    // });

    // // Добавляем обработчик события при перемещении указателя
    // this.input.on('pointermove', function(pointer) {        
    //     if (chair.getData('dragging')) {
    //         // Перемещение спрайта к текущей позиции указателя
    //         chair.x = pointer.x;
    //         chair.y = pointer.y;
    //     }
    // });

    // // Добавляем обработчик события завершения перетаскивания
    // chair.on('pointerup', function(pointer) {
    //     this.setAlpha(1); // Восстанавливаем непрозрачность
    //     this.setData('dragging', false); // Сбрасываем флаг перетаскивания
    // });

    // // Добавляем событие, если указатель выходит за пределы спрайта
    // chair.on('pointerout', function(pointer) {
    //     this.setAlpha(1); // Восстанавливаем непрозрачность, если указатель вышел
    //     this.setData('dragging', false); // Сбрасываем флаг перетаскивания
    // });
}

function update() {
}

function resize() {
    game.scale.resize(window.innerWidth, window.innerHeight); //изменение размера окна
}

