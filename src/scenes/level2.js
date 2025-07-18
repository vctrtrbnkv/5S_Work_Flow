import CustomScene from './CustomScene';

import { ALL_OBJECTS } from '../constants/level2/objects.js';
import { ALL_ZONES } from '../constants/level2/zones.js';
import { LIST_OF_TASKS } from '../constants/level2/tasks.js';

export default class level2 extends CustomScene {
    constructor() {
        super('level2');
    }

    create() {
        this.saveScene(this.scene.key);

        this.fadeInCamera(1000);
        this.renderSidebar(LIST_OF_TASKS);
        this.renderHelloModal('level2');
        this.handlerSkipButton('level3');
        this.handlerToMenuButton();
        this.handlerSettingsButton();

        this.input.dragDistanceThreshold = 0;

        const room = this.add.image(0, 0, 'room');
        room.setOrigin(0, 0).setPosition(10, 10).setScale(0.83);

        ALL_ZONES.forEach((obj) => this.createSpriteZone(obj));

        let sprites = [];

        const box = this.physics.add
            .sprite(150, 600, 'figures', 'boxRequired.png')
            .setOrigin(0.5, 0.5)
            .setScale(0.5)
            .setInteractive();

        let currentIndex = 0;
        box.on('pointerdown', () => {
            if (currentIndex < ALL_OBJECTS.length) {
                const obj = ALL_OBJECTS[currentIndex];

                const sprite = this.createSpriteWithAnimation(obj, {
                    x: 150,
                    y: 600,
                });

                sprites.push(sprite);

                currentIndex++;
            }
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject.name === dropZone.targetKey) {
                const centerX = dropZone.x;
                const targetY = gameObject.y;
                gameObject.x = centerX;
                gameObject.y = targetY;

                gameObject.input.enabled = false;

                this.markItemAsDone(gameObject.name, sidebar, LIST_OF_TASKS);
                this.endOfGameCheck(LIST_OF_TASKS, 'level3');
            }
        });
    }

    shutdown() {
        saveScene(this.scene.key);
    }
}
