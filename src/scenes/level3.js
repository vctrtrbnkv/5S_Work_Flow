import CustomScene from './CustomScene';

import { ALL_OBJECTS } from '../constants/level3/objects.js';
import { ALL_ZONES } from '../constants/level3/zones.js';
import { LIST_OF_TASKS } from '../constants/level3/tasks.js';

export default class level3 extends CustomScene {
    constructor() {
        super('level3', { key: 'Level3' });
    }

    create() {
        this.saveScene(this.scene.key);

        this.cameras.main.fadeIn(1000, 217, 217, 217);
        this.renderSidebar(LIST_OF_TASKS);
        this.renderHelloModal('level3');
        this.renderSkipButton('GameOverScene');
        this.renderToMenuButton();

        this.input.dragDistanceThreshold = 0;

        const warehouse = this.add.image(0, 0, 'warehouse').setOrigin(0, 0);
        warehouse.setPosition(10, 10);
        warehouse.setScale(0.8);

        ALL_ZONES.forEach((obj) => this.createZone(obj));

        let sprites = [];
        

        const box = this.physics.add.sprite(150, 600, 'figures', 'boxNeeded.png')
            .setOrigin(0.5, 0.5)
            .setScale(0.5)
            .setInteractive();

        let currentIndex = 0;
        
        box.on("pointerdown", () => {
            if (currentIndex < ALL_OBJECTS.length) {
        
                const obj = ALL_OBJECTS[currentIndex];
        
                const sprite = this.createSpriteWithAnimation(obj, {
                    x: 150,
                    y: 600
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
                this.endOfGameCheck(LIST_OF_TASKS, 'GameOverScene')
            }
        });
    }

    shutdown() {
        saveScene(this.scene.key);
    }
}
