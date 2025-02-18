import CustomScene from './CustomScene';

import { ALL_OBJECTS } from '../constants/level2/objects.js';
import { ALL_ZONES } from '../constants/level2/zones.js';

export default class level2 extends CustomScene {
    constructor() {
        super('level2');
        console.log('CONST');
        
    }

    create() {
        console.log('CREATE');
        
        const sidebar = document.getElementById('sidebar');
        // sidebar.style.display = 'block';

        const modal = document.getElementById('modal');
        // modal.style.display = 'block';

        this.input.dragDistanceThreshold = 0;

        const room1 = this.add.image(0, 0, 'room').setOrigin(0, 0);
        room1.setPosition(10, 10);
        room1.setScale(0.5);

        const groupOfZones = this.createGroupOfZones();
        const groupOfObjects = this.createGroupOfSprites();

        let sprites = [];

        ALL_OBJECTS.forEach((obj) => {
            const sprite = this.createStickySprite(obj,
                {
                    x: 0,
                    y: 0
                },
                groupOfObjects);
            sprites.push(sprite);  // Сохраняем спрайт в массив
        });

        const box = this.physics.add.sprite(150, 600, 'figures', 'boxRequired.png')
            .setOrigin(0.5, 0.5)
            .setScale(0.5)
            .setInteractive();

        let currentIndex = 0;
        box.on("pointerdown", () => {
            if (currentIndex < ALL_OBJECTS.length) {

                const sprite = sprites[currentIndex];
                sprite
                    .setPosition(150, 600)
                    .setAlpha(1)
                    .setData('dragging', true)
                    .setDepth(1);

                currentIndex++;
            }

            console.log(groupOfObjects);


            // Object.values(this.sprites).forEach((sprite) => {
            //     Object.values(this.zones).forEach((zone) => {
            //         console.log('added collide for: ', sprite, zone);

            //         this.physics.add.collider(sprite, zone, () => {
            //             console.log('Collided: ', sprite, zone);
            //         })
            //     });
            // });
        });

        ALL_ZONES.forEach((obj) => this.createZone(obj, groupOfZones));

        console.log(groupOfZones);

        // this.physics.add.collider(groupOfObjects, groupOfZones, (gameObject, dropZone) => {
        //     // debugger;
        //     console.log('Collide');

        //     if (gameObject.name === dropZone.targetKey) {
        //         gameObject.once('pointerup', () => {
        //             const centerX = dropZone.x; // Центр зоны
        //             const targetY = gameObject.y;
        //             // Устанавливаем объект
        //             gameObject.x = centerX;
        //             gameObject.y = targetY;

        //             gameObject.input.enabled = false;
        //         });
        //     }
        // }, (a,b,c) => {
        //     console.log('a,b,c', a,b,c);

        //     return false;

        // }, this);


        this.input.on('drop', (pointer, gameObject, dropZone) => {
            // debugger;
            if (gameObject.name === dropZone.targetKey) {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;

                gameObject.input.enabled = false;
            }
        });


        // console.log('!!!', this.sprites, this.zones);
    }
}
