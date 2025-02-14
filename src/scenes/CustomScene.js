import { Scene } from 'phaser';

export default class CustomScene extends Scene {
    constructor(sceneName) {
        super(sceneName);

        this.sprites = {};
    }

    createSprite(obj) {
        const { key, imageName, x, y, scale, options } = obj;

        const sprite = this.physics.add.sprite(0, 0, 'figures', imageName).setOrigin(0.5, 0.5); // Устанавливаем точку отсчета в центр изображения

        sprite.setPosition(x, y);

        sprite.setScale(scale);
        sprite.setSize(sprite.width - 30, sprite.height - 30);

        if (options) {
            Object.keys(options).forEach((key) => {
                sprite[key] = options[key];
            })
        }

        this.sprites = {
            ...this.sprites,
            [key]: sprite,
        };
    }

    addDragAndDrop(spriteName) {
        const sprite = this.sprites[spriteName];

        sprite.on('pointerdown', function () {
            this.setAlpha(0.5);
            this.setData('dragging', true);
            this.setDepth(1);
        });

        this.input.on('pointermove', function (pointer) {
            if (sprite.getData('dragging')) {
                sprite.x = pointer.x;
                sprite.y = pointer.y;
            }
        });

        sprite.on('pointerup', function () {;
            this.setAlpha(1);
            this.setData('dragging', false);
            console.log(sprite.x, sprite.y);
        });
    }

    createInteractiveSprite(obj) {
        this.createSprite(obj);

        Object.keys(this.sprites).forEach((spriteKey) => {
            const sprite = this.sprites[spriteKey];

            if (sprite.isInteractive) {
                sprite.setInteractive();
                this.addDragAndDrop(obj.key);
            }
        })

        
    }
}