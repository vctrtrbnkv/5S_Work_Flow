import { Scene } from 'phaser';

export default class MenuScene extends Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const menu = document.createElement('div');
        menu.classList = 'menu';

        const title = document.createElement('h1');
        title.innerText = '5S WORK FLOW';
        title.classList = 'menu__title';

        const startButton = document.createElement('button');
        startButton.innerText = 'Играть';
        startButton.classList.add('menu__button', 'menu__button--primary');

        const aboutButton = document.createElement('button');
        aboutButton.innerText = 'Об игре';
        aboutButton.classList.add('menu__button', 'menu__button--secondary');

        menu.append(title);
        menu.append(startButton);
        menu.append(aboutButton);

        const domElement = this.add.dom(10, 100, menu).setOrigin(0, 0);

        startButton.addEventListener('click', () => {
            // this.scene.start('GameScene');
            this.scene.start('level2');
        })
    }
}