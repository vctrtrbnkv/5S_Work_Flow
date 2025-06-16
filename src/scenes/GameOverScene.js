import CustomScene from './CustomScene.js';

export default class GameOverScene extends CustomScene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        this.removeAllModals();
        this.showScoresSidebar();
    }
}