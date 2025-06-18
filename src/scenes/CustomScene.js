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

    playSound(soundName) {
        const soundsEnabled = localStorage.getItem('soundsEnabled') === 'true';
        if (soundsEnabled) {
            const soundtrack = SOUNDS[soundName];
            const sound = PreloadScene.sounds[soundtrack];
            if (sound) {
                sound.play({
                    volume: 0.2,
                });
            }
        }
    }

    playRandomSound(soundGroup) {
        const soundsEnabled = localStorage.getItem('soundsEnabled') === 'true';
        const randomSoundName = Phaser.Utils.Array.GetRandom(soundGroup);
        if (soundsEnabled) {
            const sound = PreloadScene.sounds[randomSoundName];
            if (sound) {
                sound.play();
            }
        }
    }

    renderMenu() {
        const menu = document.getElementById('menu');
        const menuButtons = document.getElementById('menuButtons');
        const startButton = document.getElementById('startButton');
        const settingsButton = document.getElementById('settingsButton');

        const lastScene = this.loadLastScene();

        let continueButton = document.getElementById('continueButton');

        if (lastScene) {
            if (!continueButton) {
                continueButton = document.createElement('button');
                continueButton.id = 'continueButton';
                continueButton.innerText = 'Продолжить';
                continueButton.classList.add('menu__button', 'menu__button--quaternary');
                menuButtons.prepend(continueButton);
            }

            continueButton.addEventListener('click', () => {
                this.scene.start(lastScene);
                menu.style.display = 'none';
                this.playSound('click');
            });
        } else {
            if (continueButton) {
                continueButton.remove();
            }
        }

        startButton.addEventListener('click', () => {
            this.scene.start('level1');
            menu.style.display = 'none';
            this.playSound('click');
        });

        settingsButton.addEventListener('click', () => {
            this.showSettingsSidebar();
            this.playSound('click');
        });

        menu.style.display = 'block';
    }

    showSettingsSidebar() {
        const settingsSidebar = document.getElementById('settings-sidebar');
        const closeButton = settingsSidebar.querySelector('.settings-sidebar__close-button');
        const musicToggle = settingsSidebar.querySelector('#musicToggle');
        const soundsToggle = settingsSidebar.querySelector('#soundsToggle');

        const savedMusicState = localStorage.getItem('musicEnabled');
        const savedSoundsState = localStorage.getItem('soundsEnabled');

        if (savedMusicState !== false) {
            musicToggle.checked = savedMusicState === 'true';
            const backgroundMusic = PreloadScene.sounds[SOUNDS.backgroundMusic];
            if (musicToggle.checked) {
                if (!backgroundMusic.isPlaying) {
                    backgroundMusic.play({
                        loop: true,
                        volume: 0.2,
                    });
                }
            } else {
                backgroundMusic.stop();
            }
        }

        if (savedSoundsState !== false) {
            soundsToggle.checked = savedSoundsState === 'true';
        }

        settingsSidebar.classList.add('settings-sidebar--visible');

        closeButton.onclick = () => {
            settingsSidebar.classList.remove('settings-sidebar--visible');
            this.playSound('click');
        };

        musicToggle.onchange = (e) => {
            const backgroundMusic = PreloadScene.sounds[SOUNDS.backgroundMusic];
            if (e.target.checked) {
                if (!backgroundMusic.isPlaying) {
                    backgroundMusic.play({
                        loop: true,
                        volume: 0.2,
                    });
                }
            } else {
                backgroundMusic.stop();
            }
            localStorage.setItem('musicEnabled', e.target.checked);
        };

        soundsToggle.onchange = (e) => {
            localStorage.setItem('soundsEnabled', e.target.checked);
        };
    }

    removeAllModals() {
        const modal = document.getElementById('helloModal');
        const sidebar = document.getElementById('sidebar');

        modal.classList.remove('helloModal--open');
        sidebar.classList.remove('sidebar--open');
    }

    showScoresSidebar() {
        const scoresSidebar = document.querySelector('.scores-sidebar');
        const scoresTable = document.querySelector('.scores-table__body');
        const returnButton = document.querySelector('.scores-sidebar__button');

        scoresTable.innerHTML = '';

        const times = JSON.parse(localStorage.getItem('levelTimes') || '{}');

        const sortedLevels = Object.keys(times).sort((a, b) => parseInt(a) - parseInt(b));

        sortedLevels.forEach(level => {
            const row = document.createElement('div');
            row.className = 'scores-table__row';
            row.innerHTML = `
                <div class="scores-table__cell">Уровень ${level}</div>
                <div class="scores-table__cell">${times[level]}</div>
            `;
            scoresTable.appendChild(row);
        });

        scoresSidebar.classList.add('scores-sidebar--visible');

        returnButton.onclick = () => {
            scoresSidebar.classList.remove('scores-sidebar--visible');
            this.clearLevelTimes();
            window.location.reload();
        };
    }

    handlerSkipButton(SceneName) {
        const skipButton = document.getElementById('skipButton');
        skipButton.onclick = () => {
            if (this.stopwatchId) {
                clearInterval(this.stopwatchId);
                this.stopwatchId = null;
            }

            this.scene.start(SceneName);
            this.playSound('click');
        };
    }

    handlerToMenuButton() {
        const toMenuButton = document.getElementById('toMenuButton');
        toMenuButton.onclick = () => {
            if (this.stopwatchId) {
                clearInterval(this.stopwatchId);
                this.stopwatchId = null;
            }

            this.cameras.main.fadeOut(3000, 217, 217, 217);
            this.playSound('click');
            window.location.reload();
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

        this.playSound('modalSound');

        modal.onclick = () => {
            modal.classList.remove('helloModal--open');
            this.playSound('modalSound');        };

        setTimeout(() => {
            if (modal.classList.contains('helloModal--open')) {
                modal.classList.remove('helloModal--open');
                this.playSound('modalSound');            
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
                this.playSound('click');
            });

            task.items.forEach((item) => {
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

        this.renderBurgerMenu();

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

        this.playRandomSound(SOUNDS.pencilCheckSounds);

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

            this.playSound('click');
        });

        this.playSound('success');
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

                sceneContext.playRandomSound(SOUNDS.dragSounds);
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

            sceneContext.playRandomSound(SOUNDS.dropSounds);
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

    renderBurgerMenu() {
        const burgerMenu = document.getElementById('burgerMenu');
        const sidebarButtons = document.querySelector('.sidebar__buttons');

        burgerMenu.addEventListener('click', () => {
            this.playSound('click');
            requestAnimationFrame(() => {
                burgerMenu.classList.toggle('burger-menu--active');
                sidebarButtons.classList.toggle('sidebar__buttons--visible');
            });
        });
    }

    handlerSettingsButton() {
        const settingsButton = document.getElementById('sidebarSettingsButton');
        settingsButton.onclick = () => {
            this.showSettingsSidebar();
            this.playSound('click');
        };
    }

    create() {
        this.setLevelNumber();
    }
}