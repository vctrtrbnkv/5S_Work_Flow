import CustomScene from './CustomScene.js';

export default class GameOverScene extends CustomScene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.removeAllModals();
        this.removeLastSceneInLocalStorage();

        const container = document.getElementById('gameOver');

        const text = document.createElement('div');
        text.classList.add('gameOver__text');
        text.textContent = 'Конец игры! Нажмите SPACE, чтобы вернуться в меню :)';

        container.appendChild(text);

        this.input.keyboard.on('keydown-SPACE', () => {
            location.reload();
        });
    }
}