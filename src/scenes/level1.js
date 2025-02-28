import CustomScene from './CustomScene.js';

import { ALL_OBJECTS } from '../constants/level1/allFigures.js';
import { LIST_OF_TASKS } from '../constants/level1/tasks.js';
import { ALL_ZONES } from '../constants/level1/zones.js';

export default class level1 extends CustomScene {
    constructor() {
        super('level1');
    }

    create() {
        this.saveScene(this.scene.key);

        this.cameras.main.fadeIn(1000, 217, 217, 217);
        this.removeAllModals();
        this.renderSidebar(LIST_OF_TASKS);
        this.renderHelloModal('hello');
        this.renderSkipButton('level2');
        this.renderToMenuButton();

        const room = this.add.image(0, 0, 'room').setOrigin(0, 0);
        room.setPosition(10, 10);
        room.setScale(0.83);

        ALL_OBJECTS.forEach((obj) => this.createSprite(obj));
        ALL_ZONES.forEach((obj) => this.createSpriteZone(obj));

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            const spriteKey = gameObject.name;

            if (dropZone.targetKey.includes(spriteKey)) {
                gameObject.destroy();
                delete this.sprites[spriteKey];

                this.markItemAsDone(spriteKey, sidebar, LIST_OF_TASKS);
                this.endOfGameCheck(LIST_OF_TASKS, 'level2')
            }
        });
    }

    shutdown() {
        saveScene(this.scene.key);
    }
}