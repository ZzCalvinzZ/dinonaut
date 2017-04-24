import {renderStage, stage, CANVAS} from 'main/utils';

class MenuScene {
	scene = new PIXI.Container();

	constructor({newGame=()=>{}}) {
		this.newGame = newGame;
		this.setScene();
	}

	setScene() {
		this.text = new PIXI.Text(
			'Start Game',
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xffffff,
				align: 'center',
			}
		);
		this.text.interactive = true;
		this.text.cursor = 'pointer';
		this.text.anchor.x = 0.5;
		this.text.anchor.y = 0.5;
		this.text.x = CANVAS.x / 2;
		this.text.y = CANVAS.y / 2;

		this.text.on('click', () => {
			this.newGame();
		});

		this.text.on('mouseover', () => {
			this.text.style.fill = 0xffff00;
		});

		this.text.on('mouseout', () => {
			this.text.style.fill = 0xffffff;
		});

		this.scene.addChild(this.text);
		stage.addChild(this.scene);
	}

}

module.exports = MenuScene;
