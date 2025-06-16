import { Scene } from 'phaser';

import { SOUNDS } from '../constants/sounds/sounds.js';
import PreloadScene from './PreloadScene.js';

const MESSAGES = {
    hello: 'Привет! Это игра по системе 5С! Давай сделаем наш офис более эффективным!',
    level2: 'Отлично! Теперь давай расставим нужные предметы по местам! Кликай на коробку, чтобы достать предметы.',
    level3: 'На рабочем месте порядок! Остальное отнесем на склад!',
};

export default class CustomScene extends Scene {
    constructor(sceneName) {
        super(sceneName);

        this.sprites = {};
        this.isDragging = false;

        this.zones = {};

        this.stopwatchId = null;
        this.seconds = 0;
        this.minutes = 0;
        this.isGameOver = false;
        
        // Extract level number from scene name (e.g., "level1" -> 1)
        this.level = parseInt(sceneName.replace('level', '')) || 1;
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

    saveLevelTime(level, time) {
        const times = JSON.parse(localStorage.getItem('levelTimes') || '{}');
        times[level] = time;
        localStorage.setItem('levelTimes', JSON.stringify(times));
    }

    getLevelTime(level) {
        const times = JSON.parse(localStorage.getItem('levelTimes') || '{}');
        return times[level] || null;
    }

    clearLevelTimes() {
        localStorage.removeItem('levelTimes');
    }

    renderMenu() {
        const menu = document.getElementById('menu');
        const menuButtons = document.getElementById('menuButtons');
        const startButton = document.getElementById('startButton');

        const lastScene = this.loadLastScene();

        let continueButton = document.getElementById('continueButton');

        const soundtrack = SOUNDS.click;
        const music = PreloadScene.sounds[soundtrack];

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
                music.play({
                    volume: 0.2,
                });
            });
        } else {
            if (continueButton) {
                continueButton.remove();
            }
        }

        startButton.addEventListener('click', () => {
            this.scene.start('level1');
            menu.style.display = 'none';
            music.play({
                volume: 0.2,
            });
        });

        menu.style.display = 'block';
    }

    removeAllModals() {
        const skipButton = document.getElementById('skipButton');
        const modal = document.getElementById('helloModal');
        const sidebar = document.getElementById('sidebar');
        const toMenuButton = document.getElementById('toMenuButton');

        skipButton.classList.remove('skipButton--open');
        modal.classList.remove('helloModal--open');
        sidebar.classList.remove('sidebar--open');
        toMenuButton.classList.remove('toMenuButton--open');
    }

    showScoresSidebar() {
        const scoresSidebar = document.querySelector('.scores-sidebar');
        const scoresTable = document.querySelector('.scores-table__body');
        const returnButton = document.querySelector('.scores-sidebar__button');

        // Очищаем предыдущие результаты
        scoresTable.innerHTML = '';

        // Получаем все сохраненные времена
        const times = JSON.parse(localStorage.getItem('levelTimes') || '{}');

        // Сортируем уровни по номеру
        const sortedLevels = Object.keys(times).sort((a, b) => parseInt(a) - parseInt(b));

        // Добавляем строки в таблицу
        sortedLevels.forEach(level => {
            const row = document.createElement('div');
            row.className = 'scores-table__row';
            row.innerHTML = `
                <div class="scores-table__cell">Уровень ${level}</div>
                <div class="scores-table__cell">${times[level]}</div>
            `;
            scoresTable.appendChild(row);
        });

        // Показываем сайдбар
        scoresSidebar.classList.add('scores-sidebar--visible');

        // Добавляем обработчик для кнопки возврата
        returnButton.onclick = () => {
            scoresSidebar.classList.remove('scores-sidebar--visible');
            this.clearLevelTimes();
            this.scene.start('MenuScene');
        };
    }

    renderSkipButton(SceneName) {
        const skipButton = document.getElementById('skipButton');
        skipButton.classList.add('skipButton--open');

        skipButton.onclick = () => {
            if (this.stopwatchId) {
                clearInterval(this.stopwatchId);
                this.stopwatchId = null;
            }

            this.scene.start(SceneName);
            const soundtrack = SOUNDS.click;
            const music = PreloadScene.sounds[soundtrack];

            music.play({
                volume: 0.2,
            });
        };
    }

    renderToMenuButton() {
        const toMenuButton = document.getElementById('toMenuButton');
        toMenuButton.classList.add('toMenuButton--open');

        toMenuButton.onclick = () => {
            if (this.stopwatchId) {
                clearInterval(this.stopwatchId);
                this.stopwatchId = null;
            }

            this.cameras.main.fadeOut(3000, 217, 217, 217);
            this.scene.start('MenuScene');
            this.removeAllModals();

            const soundtrack = SOUNDS.click;
            const music = PreloadScene.sounds[soundtrack];

            music.play({
                volume: 0.2,
            });
        };
    }

    renderHelloModal(message) {
        const modal = document.getElementById('helloModal');
        const textContainer = document.getElementById('helloModal__text-content');
        textContainer.innerHTML = '';

        const text = document.createElement('p');
        text.textContent = MESSAGES[message];
        textContainer.append(text);

        modal.classList.add('helloModal--open');

        const track = SOUNDS.modalSound;
        const sound = PreloadScene.sounds[track];
        sound.play({
            volume: 0.2,
        });

        modal.onclick = () => {
            modal.classList.remove('helloModal--open');
            sound.play();
        };

        setTimeout(() => {
            if (modal.classList.contains('helloModal--open')) {
                modal.classList.remove('helloModal--open');
                sound.play();
            }
        }, 10_000);
    }

    updateStopwatch() {
        const stopwatch = document.getElementById('stopwatch');
        
        this.seconds++;
        if (this.seconds === 60) {
            this.minutes++;
            this.seconds = 0;
        }

        stopwatch.textContent = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
    }

    renderSidebar(listOfTasks) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.add('sidebar--open');

        const levelTasks = document.getElementById('levelTasks');
        levelTasks.innerHTML = '';

        listOfTasks.forEach((task) => {
            const taskContainer = document.createElement('div');
            const titleGroup = document.createElement('div');
            const triangle = document.createElement('div');
            const title = document.createElement('h3');
            const itemList = document.createElement('ul');

            taskContainer.classList.add('sidebar__task');
            titleGroup.classList.add('sidebar__task-title-group');
            triangle.classList.add('triangle');
            title.classList.add('sidebar__task-title');
            itemList.classList.add('sidebar__task-list', 'sidebar__task-list--open');

            title.textContent = task.description;

            titleGroup.addEventListener('click', () => {
                itemList.classList.toggle('sidebar__task-list--open');
                triangle.classList.toggle('triangle--close');
                const soundtrack = SOUNDS.click;
                const music = PreloadScene.sounds[soundtrack];

                music.play({
                    volume: 0.2,
                });
            });

            task.items.forEach((item) => {
                // Сбрасываем состояние задачи при каждом запуске
                item.done = false;
                
                const listItem = document.createElement('li');
                listItem.setAttribute('data-id', item.id);
                listItem.classList.add('sidebar__task-item');
                listItem.textContent = item.description;

                itemList.appendChild(listItem);
            });

            titleGroup.appendChild(triangle);
            titleGroup.appendChild(title);

            taskContainer.appendChild(titleGroup);
            taskContainer.appendChild(itemList);
            levelTasks.appendChild(taskContainer);
        });

        const stopwatch = document.getElementById('stopwatch');
        stopwatch.innerHTML = '';

        if (this.stopwatchId) {
            clearInterval(this.stopwatchId);
        }

        this.seconds = 0;
        this.minutes = 0;

        this.stopwatchId = setInterval(() => {
            this.updateStopwatch();
        }, 1000);
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

        let randomSoundName = Phaser.Utils.Array.GetRandom(SOUNDS.pencilCheckSounds);
        let sound = PreloadScene.sounds[randomSoundName];

        if (sound) {
            sound.play({
                volume: 0.4,
            });
        }

        foundItem.classList.toggle('sidebar__task-item--remove');
        foundItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const newItem = foundItem;

        setTimeout(() => {
            foundItem.classList.toggle('sidebar__task-item--remove');
            foundItem.classList.add('sidebar__task-item--done');

            foundItem.remove();
            itemParent.appendChild(newItem);
        }, 1000);
    }

    endOfGameCheck(listOfTasks, SceneName) {
        const allItems = listOfTasks.flatMap((task) => task.items);
        const isAllDone = allItems.every((item) => item.done);

        if (isAllDone) {
            if (this.stopwatchId) {
                clearInterval(this.stopwatchId);
                this.stopwatchId = null;
            }

            const finalTime = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
            const timeElement = document.getElementById(`level${this.level}-time`);
            if (timeElement) {
                timeElement.textContent = finalTime;
            }

            this.saveLevelTime(this.level, finalTime);
            this.renderEndLevelModal(SceneName, finalTime);
        }
    }

    renderEndLevelModal(SceneName, finalTime) {
        const modal = document.getElementById('levelEndModal');
        modal.classList.add('levelEndModal--open');

        const modalText = document.querySelector('.levelEndModal__text');
        modalText.textContent = `Уровень пройден! Время: ${finalTime}`;

        modal.addEventListener('click', () => {
            this.cameras.main.fadeOut(3000, 217, 217, 217);
            this.scene.start(SceneName);
            modal.classList.remove('levelEndModal--open');

            const soundtrack = SOUNDS.click;
            const music = PreloadScene.sounds[soundtrack];

            music.play({
                volume: 0.2,
            });
        });

        const soundtrack = SOUNDS.success;
        const music = PreloadScene.sounds[soundtrack];

        music.play({
            volume: 0.2,
        });
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
            });
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
            .setSize(zone.width - 25, zone.height - 15)
            .setOrigin(0.5, 0.5)
            .setScale(scale)
            .setDepth(1);

        const hoverText = this.add.text(x, y - 50, description, {
            fontSize: '14px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 4, y: 4 },
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
            .setSize(45, 45)
            .setOrigin(0.5, 0.5);

        const hoverText = this.add.text(x, y - 50, description, {
            fontSize: '14px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 4, y: 4 },
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


                let randomSoundName = Phaser.Utils.Array.GetRandom(SOUNDS.dragSounds);
                let sound = PreloadScene.sounds[randomSoundName];

                if (sound) {
                    sound.play();
                }
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

            let randomSoundName = Phaser.Utils.Array.GetRandom(SOUNDS.dropSounds);
            let sound = PreloadScene.sounds[randomSoundName];

            if (sound) {
                sound.play();
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
            this.input.setDefaultCursor('grab');
        });


        sprite.on('pointerout', () => {
            this.input.setDefaultCursor('default');
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
            });
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
            },
        });

        return sprite;
    }

    createSounds(name) {
        if (!this.cache.audio.has(name)) {
            console.warn(`🚨 Звук "${name}" не найден в кэше Phaser!`);
            return null;
        }

        const sound = this.sound.add(name);

        PreloadScene.sounds = {
            ...PreloadScene.sounds,
            [name]: sound,
        };

        return sound;
    }

    create() {
        this.setLevelNumber();
    }
}