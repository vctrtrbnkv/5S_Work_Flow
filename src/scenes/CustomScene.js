import { Scene } from 'phaser';

export default class CustomScene extends Scene {
    constructor(sceneName) {
        super(sceneName);

        this.sprites = {};
    }

    createSprite(spriteName, imageName, posX, posY, size) {
        const sprite = this.add.sprite(0, 0, imageName).setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

        // Вычисляем центр и устанавливаем позицию изображения
        sprite.setPosition(posX, posY);

        sprite.setScale(size); // Устанавливаем масштаб изображения
        sprite.setInteractive(); // Делаем изображение интерактивным

        this.sprites = {
            ...this.sprites,
            [spriteName]: sprite
        };
    }

    addDragAndDrop(spriteName) {
        const sprite = this.sprites[spriteName];

        sprite.on('pointerdown', function() {
            this.setAlpha(0.5); // Уменьшаем непрозрачность
            this.setData('dragging', true); // Устанавливаем флаг перетаскивания
        });
    
        // Добавляем обработчик события при перемещении указателя
        this.input.on('pointermove', function(pointer) {        
            if (sprite.getData('dragging')) {
                // Перемещение спрайта к текущей позиции указателя
                sprite.x = pointer.x;
                sprite.y = pointer.y;
            }
        });
    
        // Добавляем обработчик события завершения перетаскивания
        sprite.on('pointerup', function() {
            this.setAlpha(1); // Восстанавливаем непрозрачность
            this.setData('dragging', false); // Сбрасываем флаг перетаскивания
        });
    
        // Добавляем событие, если указатель выходит за пределы спрайта
        sprite.on('pointerout', function() {
            this.setAlpha(1); // Восстанавливаем непрозрачность, если указатель вышел
            this.setData('dragging', false); // Сбрасываем флаг перетаскивания
        });
    }

    createInteractiveSprite(spriteName, imageName, posX, posY, size) {
        this.createSprite(spriteName, imageName, posX, posY, size);

        this.addDragAndDrop(spriteName);
    }
}