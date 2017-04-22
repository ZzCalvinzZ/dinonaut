import {renderer} from 'main/utils';
import {CANVAS, renderStage, stage} from 'main/utils';
import Planet from 'main/objects/planet';
import Player from 'main/objects/player';


class MainScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.planet = new Planet({
			scene: this.scene,
			x: CANVAS.x/2,
			y: CANVAS.y/2
		});

		this.player = new Player({
			scene: this.scene,
			x: this.planet.center.x,
			y: this.planet.y
		});

		stage.addChild(this.scene);
	}

}

module.exports = MainScene;

