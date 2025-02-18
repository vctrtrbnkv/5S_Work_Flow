import CustomScene from './CustomScene';

import { ALL_OBJECTS } from '../constants/allFigures.js'
import { FINAL_OBJECTS } from '../constants/finalFigures.js'
import { NECESSARY_ITEMS } from '../constants/greenFigures.js'
import { GARBAGE_OBJECTS } from '../constants/redFigures.js'
import { OTHER_THINGS } from '../constants/yellowFigures.js'

export default class GameScene extends CustomScene {
    constructor() {
        super('GameScene');
    }

    create() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.display = 'block';

        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        const room1 = this.add.image(0, 0, 'room').setOrigin(0, 0);
        room1.setPosition(10, 10);
        room1.setScale(0.5);

        const checkRemainingObjects = () => {
            const remainingKeys = Object.keys(this.sprites);

            if (remainingKeys.length == FINAL_OBJECTS.length) {
                this.scene.start('level2');
            }
        }

        ALL_OBJECTS.forEach((obj) => this.createInteractiveSprite(obj));

        Object.keys(this.sprites).forEach((spriteKey) => {
            const sprite = this.sprites[spriteKey];

            if (sprite.isDestroyable && GARBAGE_OBJECTS.includes(spriteKey)) {
                this.physics.add.collider(this.sprites.boxRemove, sprite, () => {
                    sprite.destroy();
                    delete this.sprites[spriteKey];

                    checkRemainingObjects();
                })
            }

            if (sprite.isDestroyable && OTHER_THINGS.includes(spriteKey)) {
                this.physics.add.collider(this.sprites.boxNeeded, sprite, () => {
                    sprite.destroy();
                    delete this.sprites[spriteKey];

                    checkRemainingObjects();
                })
            }

            if (sprite.isDestroyable && NECESSARY_ITEMS.includes(spriteKey)) {
                this.physics.add.collider(this.sprites.boxRequired, sprite, () => {
                    sprite.destroy();
                    delete this.sprites[spriteKey];

                    checkRemainingObjects();
                })
            }
        })
    }
}