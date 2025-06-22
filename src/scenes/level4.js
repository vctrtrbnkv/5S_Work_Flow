import CustomScene from './CustomScene.js';

import { ALL_OBJECTS } from '../constants/level4/objects.js';
import { LIST_OF_TASKS } from '../constants/level4/tasks.js';
import { ALL_ZONES } from '../constants/level4/zones.js';

export default class level4 extends CustomScene {
    constructor() {
        super('level4');
    }

    create() {
        this.saveScene(this.scene.key);

        this.fadeInCamera(1000);
        this.removeAllModals();
        this.renderSidebar(LIST_OF_TASKS);
        this.renderHelloModal('level4');
        this.handlerSkipButton('GameOverScene');
        this.handlerToMenuButton();
        this.handlerSettingsButton();

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
                this.endOfGameCheck(LIST_OF_TASKS, 'GameOverScene');
            }
        });
    }

    shutdown() {
        saveScene(this.scene.key);
    }
}
