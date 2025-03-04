import CustomScene from './CustomScene';

export default class MenuScene extends CustomScene {
    constructor() {
        super('MenuScene');
    }

    create() {
        this.renderMenu();
    }
}