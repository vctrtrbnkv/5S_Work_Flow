import CustomScene from './CustomScene.js';

import { ALL_OBJECTS } from '../constants/level1/allFigures.js'
import { FINAL_OBJECTS } from '../constants/level1/finalFigures.js'
import { NECESSARY_ITEMS } from '../constants/level1/greenFigures.js'
import { GARBAGE_OBJECTS } from '../constants/level1/redFigures.js'
import { OTHER_THINGS } from '../constants/level1/yellowFigures.js'
import { LIST_OF_TASKS } from '../constants/level1/task.js';

export default class level1 extends CustomScene {
    constructor() {
        super('level1', LIST_OF_TASKS);

        this.listOfTasks = [...LIST_OF_TASKS];
        this.renderSidebar();
    }

    renderSidebar() {
        sidebar.innerHTML = '';

        this.listOfTasks.forEach((task) => {
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

    markItemAsDone(itemName, sidebar) {
        this.listOfTasks.forEach((task) => {
            task.items.forEach((item) => {
                if (item.name === itemName) {
                    item.done = true;
                }
            });
        });

        this.updateItem(itemName);

        return sidebar;
    }

    updateItem(itemName) {
        const allItems = this.listOfTasks.flatMap((task) => task.items);
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
            // newItem.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }

    create() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.add("sidebar--open");

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
                    this.markItemAsDone(spriteKey, sidebar, LIST_OF_TASKS);
                })
            }

            if (sprite.isDestroyable && OTHER_THINGS.includes(spriteKey)) {
                this.physics.add.collider(this.sprites.boxNeeded, sprite, () => {
                    sprite.destroy();
                    delete this.sprites[spriteKey];

                    checkRemainingObjects();
                    this.markItemAsDone(spriteKey, sidebar, LIST_OF_TASKS);
                })
            }

            if (sprite.isDestroyable && NECESSARY_ITEMS.includes(spriteKey)) {
                this.physics.add.collider(this.sprites.boxRequired, sprite, () => {
                    sprite.destroy();
                    delete this.sprites[spriteKey];

                    checkRemainingObjects();
                    this.markItemAsDone(spriteKey, sidebar, LIST_OF_TASKS);
                })
            }
        })
    }
}