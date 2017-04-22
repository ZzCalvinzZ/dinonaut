import {renderStage, stage} from 'main/utils';

class Loader {
	scene = new PIXI.Container();

	progressText(progress) {
		return `${progress}% loaded`;
	}

	constructor() {
		this.setScene();
	}

	setScene() {
		this.text = new PIXI.Text(
			this.progressText(0),
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xff1010,
				align: 'center'
			}
		);
		this.scene.addChild(this.text);
		stage.addChild(this.scene);
	}

	loadProgress(loader, resource) {
		this.text.text = this.progressText(parseInt(loader.progress));
		renderStage();
	}

}

module.exports = Loader;

