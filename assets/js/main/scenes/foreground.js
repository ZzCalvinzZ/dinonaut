import {CANVAS, renderStage, stage, toRadians} from 'main/utils';
import Background from 'main/objects/background';
import Speaker from 'main/objects/speaker';


class ForegroundScene {
	scene = new PIXI.Container();

	constructor() {
		this.setScene();
	}

	setScene() {
		this.speaker = new Speaker({
			scene: this.scene,
		});

		stage.addChild(this.scene);
	}

}

module.exports = ForegroundScene;

