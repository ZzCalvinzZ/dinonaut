import {getImage, renderStage, stage} from 'main/utils';
import Loader from 'main/loader';
import KeyboardInput from 'main/controls';

class Game {

	constructor() {
		renderStage();
		this.loadScreen = new Loader();
		this.loadAssets();
	}

	loadAssets() {
		PIXI.loader
			.add([
				getImage('farsa.png'),
				getImage('big.jpg'),
				getImage('bigg.jpg'),
				getImage('biggg.jpg'),
			])
			.on("progress", this.loadScreen.loadProgress.bind(this.loadScreen))
			.load(this.setupGame.bind(this));
	}

	setupGame() {
		this.sprite = new PIXI.Sprite(
			PIXI.loader.resources[getImage('farsa.png')].texture
		);

		stage.removeChild(this.loadScreen.scene);
		stage.addChild(this.sprite);
		renderStage();
		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		renderStage()
	}
}

module.exports = Game;
