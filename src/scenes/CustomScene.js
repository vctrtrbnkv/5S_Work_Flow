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

        setTimeout(() => {
            sprite.on('pointerup', function () {
                ;
                this.setAlpha(1);
                this.setData('dragging', false);
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

    // updateSidebar(sidebar) {
    //     console.log(this.listOfTasks);


        
        // sidebar.innerHTML = '';

        // listOfTask.forEach((task) => {
        //     const taskContainer = document.createElement("div");
        //     const titleGroup = document.createElement("div");
        //     const triangle = document.createElement("div");
        //     const title = document.createElement("h3");
        //     const itemList = document.createElement("ul");

        //     taskContainer.classList.add("sidebar__task");
        //     titleGroup.classList.add("sidebar__task-title-group");
        //     triangle.classList.add("triangle");
        //     title.classList.add("sidebar__task-title");
        //     itemList.classList.add("sidebar__task-list", "sidebar__task-list--open");

        //     title.textContent = task.description;

        //     titleGroup.addEventListener("click", () => {
        //         itemList.classList.toggle("sidebar__task-list--open");
        //         triangle.classList.toggle("triangle--close");
        //     });

        //     task.items.forEach((item) => {
        //         const listItem = document.createElement("li");
        //         listItem.setAttribute("data-id", item.id);
        //         listItem.classList.add("sidebar__task-item");

        //         if (item.done) {
        //             listItem.innerHTML = `<s>${item.description}</s>`;
        //             listItem.classList.add("sidebar__task-item--done");
        //         } else {
        //             listItem.textContent = item.description;
        //         }

        //         itemList.appendChild(listItem);
        //     });

        //     task.items.sort((a, b) => {
        //         if (a.done === b.done) {
        //             return 0;
        //         }
        //         return a.done ? 1 : -1;
        //     });

        //     titleGroup.appendChild(triangle);
        //     titleGroup.appendChild(title);

        //     taskContainer.appendChild(titleGroup);
        //     taskContainer.appendChild(itemList);
        //     sidebar.appendChild(taskContainer);
        // });

    //     return sidebar;
    // }

    updateTaskItem(item, listOfTask) {
        const id = item.id;

        listOfTask.forEach((task) => {
            const foundItem = task.items.find(i => i.id === id);

            if (foundItem) {
                const listItem = document.querySelector(`[data-id="${task.id}"]`);

                if (listItem) {
                    if (foundItem.done) {
                        listItem.innerHTML = `<s>${foundItem.name}</s>`;
                        listItem.classList.add("sidebar__task-item--done");
                    }
                }
            }
        });
    }


   
}