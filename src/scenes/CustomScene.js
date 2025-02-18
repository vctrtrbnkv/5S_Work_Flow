import { Scene } from 'phaser';

export default class CustomScene extends Scene {
    constructor(sceneName) {
        super(sceneName);

        this.sprites = {};
        this.isDragging = false;

        this.zones = {};
    }

    createGroupOfZones() {
        this.groupOfZones = this.physics.add.group(); // Используем this
        return this.groupOfZones;
    }

    createGroupOfSprites() {
        this.groupOfSprites = this.physics.add.group(); // Используем this
        return this.groupOfSprites;
    }

    #test() {
        // console.log('test');
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

    createZone(obj, group) {
        const { key, x, y, imageName, targetKey, scale } = obj;

        const zone = this.physics.add.sprite(x, y, 'figures', imageName).setOrigin(0.5, 0.5).setInteractive();

        zone.input.dropZone = true;
        zone.targetKey = targetKey;

        zone.setInteractive(new Phaser.Geom.Rectangle(0, 0, zone.width - 80, zone.height - 30), Phaser.Geom.Rectangle.Contains);

        zone.setSize(zone.width - 80, zone.height - 30);
        zone.setScale(scale)

        // console.log('zone: ', zone);


        this.zones = {
            ...this.zones,
            [key]: zone,
        };

        group.add(zone);
    }

    addDragAndDrop(spriteName) {
        const sprite = this.sprites[spriteName];

        this.#test

        sprite.on('pointerdown', function () {
            debugger;
            this.setAlpha(0.5);
            this.setData('dragging', true);
            this.setDepth(1);
        });

        console.log(sprite);

        this.input.on('pointermove', function (pointer) {
            if (sprite.getData('dragging')) {
                sprite.x = pointer.x;
                sprite.y = pointer.y;
            }
        });

        setTimeout(() => {
            sprite.on('pointerup', function () {
                ;
                this.setAlpha(1);
                this.setData('dragging', false);
                console.log(sprite.x, sprite.y);
            });
        }, 1000);


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

    addDragAndDrop1(spriteName) {
        const sceneContext = this;

        const sprite = sceneContext.sprites[spriteName];

        sceneContext.input.setDraggable(sprite); // Разрешаем перетаскивание

        sprite.on('dragstart', function () {
            if (!sceneContext.isDragging) {
                sceneContext.isDragging = true;
                // this.setAlpha(0.5);
                this.setData('draggable', true);
            }
        });

        // this.input.on("pointermove", (pointer) => {
        //     if (sprite.isNew) {
        //         sprite.x = pointer.x;
        //         sprite.y = pointer.y;
        //     }
        // });

        // console.log(sprite);

        sprite.on('drag', function (pointer, dragX, dragY) {
            sprite.x = dragX;
            sprite.y = dragY;
        });

        sprite.on('dragend', function () {
            sceneContext.isDragging = false;

            if (sprite.isNew) {
                sprite.isNew = false;
            } else {
                this.setData('draggable', false);
            }
        });

        sprite.on('pointerdown', () => {
            sprite.isNew = false;
            // console.log('sprite.x, sprite.y: ', sprite.x, sprite.y);
        });
    }

    createStickySprite(obj, pointer, group) {
        const { key, imageName, x, y, scale, options } = obj;

        const sprite = this.physics.add.sprite(x, y, 'figures', imageName).setOrigin(0.5, 0.5);


        sprite.setPosition(pointer.x, pointer.y)
        sprite.setScale(scale);
        sprite.setSize(sprite.width - 30, sprite.height - 30);
        sprite.setInteractive();
        sprite.setAlpha(0);

        sprite.name = key;

        if (options) {
            Object.keys(options).forEach((key) => {
                sprite[key] = options[key];
            })
        }

        sprite.isNew = true;

        this.sprites = {
            ...this.sprites,
            [key]: sprite,
        };

        this.addDragAndDrop1(key);

        group.add(sprite);

        return sprite;
    }
}