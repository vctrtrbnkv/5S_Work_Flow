import { Scene } from 'phaser';

const MESSAGES = {
    hello: 'Привет! Это игра по системе 5С! Давай сделаем наш офис более эффективным!',
    level2: 'Отлично! Теперь давай расставим нужные предметы по местам! Кликай на коробку, чтобы достать предметы.',
    level3: 'На рабочем месте порядок! Остальное отнесем на склад!'
}

export default class CustomScene extends Scene {
    constructor(sceneName) {
        super(sceneName);

        this.sprites = {};
        this.isDragging = false;

        this.zones = {};
    }

    saveScene(sceneKey) {
        localStorage.setItem('lastScene', sceneKey);
    }

    loadLastScene() {
        return localStorage.getItem('lastScene');
    }

    removeLastSceneInLocalStorage() {
        localStorage.removeItem('lastScene');
    }

    renderMenu() {
        const menu = document.getElementById('menu');
        const menuButtons = document.getElementById('menuButtons');
        const startButton = document.getElementById('startButton');
        
        const lastScene = this.loadLastScene();
    
        let continueButton = document.getElementById('continueButton');
    
        if (lastScene) {
            if (!continueButton) { 
                continueButton = document.createElement('button');
                continueButton.id = 'continueButton'; 
                continueButton.innerText = 'Продолжить';
                continueButton.classList.add('menu__button', 'menu__button--primary');
                menuButtons.prepend(continueButton);
            }
    
            continueButton.addEventListener('click', () => {
                this.scene.start(lastScene);
                menu.style.display = 'none';
            });
        } else {
            if (continueButton) {
                continueButton.remove();
            }
        }
    
        startButton.addEventListener('click', () => {
            this.scene.start('level1');
            menu.style.display = 'none';
        });
    
        menu.style.display = 'block';
    }

    removeAllModals() {
        const skipButton = document.getElementById('skipButton');
        const modal = document.getElementById('helloModal');
        const sidebar = document.getElementById('sidebar');
        const toMenuButton = document.getElementById('toMenuButton');

        skipButton.classList.remove("skipButton--open");
        modal.classList.remove("helloModal--open");
        sidebar.classList.remove("sidebar--open");
        toMenuButton.classList.remove("toMenuButton--open");
    }

    renderSkipButton(SceneName) {
        const skipButton = document.getElementById('skipButton');
        skipButton.classList.add("skipButton--open");

        skipButton.addEventListener("click", () => {
            // this.cameras.main.fadeOut(3000, 217, 217, 217)
            this.scene.start(SceneName);
        })
    }

    renderToMenuButton() {
        const toMenuButton = document.getElementById('toMenuButton');
        toMenuButton.classList.add("toMenuButton--open");

        toMenuButton.addEventListener("click", () => {
            this.cameras.main.fadeOut(3000, 217, 217, 217)
            this.scene.start('MenuScene');
            this.removeAllModals();
        })
    }

    renderHelloModal(message) {
        const modal = document.getElementById('helloModal');
        const textContainer = document.getElementById('helloModal__text-content');
        textContainer.innerHTML = '';

        const text = document.createElement("p");

        text.textContent = MESSAGES[message];

        textContainer.append(text);
        modal.classList.add("helloModal--open");

        setTimeout(() => {
            modal.classList.remove("helloModal--open");
        }, 10_000)
    }

    renderSidebar(listOfTasks) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.add("sidebar--open");
        sidebar.innerHTML = '';

        listOfTasks.forEach((task) => {
            const taskContainer = document.createElement("div");
            const titleGroup = document.createElement("div");
            const triangle = document.createElement("div");
            const title = document.createElement("h3");
            const itemList = document.createElement("ul");

            taskContainer.classList.add("sidebar__task");
            titleGroup.classList.add("sidebar__task-title-group");
            triangle.classList.add("triangle");
            title.classList.add("sidebar__task-title");
            itemList.classList.add("sidebar__task-list", "sidebar__task-list--open");

            title.textContent = task.description;

            titleGroup.addEventListener("click", () => {
                itemList.classList.toggle("sidebar__task-list--open");
                triangle.classList.toggle("triangle--close");
            });

            task.items.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.setAttribute("data-id", item.id);
                listItem.classList.add("sidebar__task-item");

                if (item.done) {
                    listItem.innerHTML = `<s>${item.description}</s>`;
                    listItem.classList.add("sidebar__task-item--done");
                } else {
                    listItem.textContent = item.description;
                }

                itemList.appendChild(listItem);
            });

            titleGroup.appendChild(triangle);
            titleGroup.appendChild(title);

            taskContainer.appendChild(titleGroup);
            taskContainer.appendChild(itemList);
            sidebar.appendChild(taskContainer);
        });
    }

    markItemAsDone(itemName, sidebar, listOfTasks) {
        listOfTasks.forEach((task) => {
            task.items.forEach((item) => {
                if (item.name === itemName) {
                    item.done = true;
                }
            });
        });

        this.updateItem(itemName, listOfTasks);

        return sidebar;
    }

    updateItem(itemName, listOfTasks) {
        const allItems = listOfTasks.flatMap((task) => task.items);
        const taskId = allItems.find((item) => item.name === itemName).id;
        const foundItem = document.querySelector(`[data-id="${taskId}"]`);
        const itemParent = foundItem.closest('ul');

        foundItem.innerHTML = `<s>${foundItem.innerHTML}</s>`;

        foundItem.classList.toggle('sidebar__task-item--remove');
        foundItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const newItem = foundItem;

        setTimeout(() => {
            foundItem.classList.toggle('sidebar__task-item--remove');
            foundItem.classList.add("sidebar__task-item--done");

            foundItem.remove();
            itemParent.appendChild(newItem);
        }, 1000);
    }

    endOfGameCheck(listOfTasks, SceneName) {
        const allItems = listOfTasks.flatMap((task) => task.items);
        const doneItems = allItems.filter((item) => item.done);

        if (doneItems.length === allItems.length) {
            this.renderEndLevelModal(SceneName);
        }
    }

    renderEndLevelModal(SceneName) {
        const modal = document.getElementById('levelEndModal');
        modal.classList.add('levelEndModal--open');

        modal.addEventListener('click', () => {
            this.cameras.main.fadeOut(3000, 217, 217, 217)
            this.scene.start(SceneName);
            modal.classList.remove('levelEndModal--open');
        })
    }

    createSprite(obj) {
        const { key, imageName, name, x, y, scale, options } = obj;

        const sprite = this.physics.add.sprite(0, 0, 'figures', imageName).setInteractive();

        sprite.name = name;

        sprite
            .setPosition(x, y)
            .setOrigin(0.5, 0.5)
            .setScale(scale)
            .setSize(sprite.width - 30, sprite.height - 30)
            .setDepth(2);

        if (options) {
            Object.keys(options).forEach((key) => {
                sprite[key] = options[key];
            })
        }

        this.sprites = {
            ...this.sprites,
            [key]: sprite,
        };

        this.addDragAndDrop(obj.key);

        return sprite;
    }

    createSpriteZone(obj) {
        const { key, x, y, imageName, name, targetKey, scale, description } = obj;

        const zone = this.physics.add.sprite(x, y, 'figures', imageName).setInteractive();

        zone.input.dropZone = true;
        zone.targetKey = targetKey;
        zone.name = name;

        zone
            .setSize(zone.width - 30, zone.height - 20)
            .setOrigin(0.5, 0.5)
            .setScale(scale)
            .setDepth(1);

        const hoverText = this.add.text(x, y - 50, description, {
            fontSize: '14px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 4, y: 4 }
        }).setOrigin(0.5).setVisible(false).setDepth(15);

        zone.on('pointerover', () => {
            hoverText.setVisible(true);
        });

        zone.on('pointerout', () => {
            hoverText.setVisible(false);
        });

        this.zones = {
            ...this.zones,
            [key]: zone,
        };
    }

    createZone(obj) {
        const { key, x, y, targetKey, description } = obj;

        const zone = this.physics.add.sprite(x, y).setInteractive();

        zone.input.dropZone = true;
        zone.targetKey = targetKey;

        zone
            .setSize(30, 40)
            .setOrigin(0.5, 0.5);

        const hoverText = this.add.text(x, y - 50, description, {
            fontSize: '14px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 4, y: 4 }
        }).setOrigin(0.5).setVisible(false).setDepth(5);

        zone.on('pointerover', () => {
            hoverText.setVisible(true);
        });

        zone.on('pointerout', () => {
            hoverText.setVisible(false);
        });

        this.zones = {
            ...this.zones,
            [key]: zone,
        };
    }

    addDragAndDrop(spriteName) {
        const sceneContext = this;

        const sprite = sceneContext.sprites[spriteName];

        sceneContext.input.setDraggable(sprite);

        sprite.on('dragstart', function () {
            if (!sceneContext.isDragging) {
                sceneContext.isDragging = true;
                this.setData('draggable', true);
                this.setDepth(10);
            }
        });

        sprite.on('drag', function (pointer, dragX, dragY) {
            sprite.x = dragX;
            sprite.y = dragY;
        });

        sprite.on('dragend', function () {
            sceneContext.isDragging = false;
            this.setDepth(3);

            if (sprite.isNew) {
                sprite.isNew = false;
            } else {
                this.setData('draggable', false);
            }
        });

        sprite.on('pointerdown', () => {
            sprite.isNew = false;
            this.input.setDefaultCursor('grabbing');
        });

        sprite.on('pointerup', () => {
            sprite.isNew = false;
            this.input.setDefaultCursor('grab');
        });

        sprite.on('pointerover', () => {
            this.input.setDefaultCursor('grab'); // Изменяем курсор на "поинтер"
        });

        
        sprite.on('pointerout', () => {
            this.input.setDefaultCursor('default'); // Возвращаем стандартный курсор
        });
    }

    createSpriteWithAnimation(obj, pointer) {
        const { key, imageName, x, y, scale, options } = obj;

        const sprite = this.physics.add.sprite(x, y, 'figures', imageName);

        sprite
            .setOrigin(0.5, 0.5)
            .setPosition(pointer.x, pointer.y)
            .setScale(0)
            .setSize(sprite.width - 30, sprite.height - 30)
            .setInteractive()
            .setDepth(2);

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

        this.addDragAndDrop(key);

        this.tweens.add({
            targets: sprite,
            ease: 'Back.easeOut',
            duration: 500,
            scale: scale,
            onComplete: () => {
                this.tweens.add({
                    targets: sprite,
                    x: pointer.x + Phaser.Math.Between(100, 150),
                    y: pointer.y + Phaser.Math.Between(-100, 100),
                    ease: 'Cubic.easeInOut',
                    duration: 1000,
                });
            }
        });

        return sprite;
    }
}