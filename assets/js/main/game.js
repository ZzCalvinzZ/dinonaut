import {getImage} from 'main/utils';

class Game {
	canvasWrapper = 'root';
	stage = new PIXI.Container();
	renderer = PIXI.autoDetectRenderer(
		800, 600,
		{
			antialias: false,
			transparent: false,
			resolution: 1,
			autoResize: true,
		}
	);

	constructor() {
		this.setStage();
		this.loadAssets();
	}

	render() {
		this.renderer.render(this.stage);

	}

	setStage(){
		document.getElementById(this.canvasWrapper).appendChild(this.renderer.view);
		this.render();
	}

	setupGame() {
		this.sprite = new PIXI.Sprite(
			PIXI.loader.resources[getImage('farsa.png')].texture
		);

		this.stage.addChild(this.sprite);
		this.render();
	}

	loadAssets() {
		PIXI.loader
			.add(getImage('farsa.png'))
			.load(this.setupGame.bind(this));
	}
}

module.exports = Game;
