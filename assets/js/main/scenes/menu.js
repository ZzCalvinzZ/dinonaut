import {renderStage, stage, CANVAS} from 'main/utils';

class MenuScene {
	scene = new PIXI.Container();

	constructor({newGame=()=>{}}) {
		this.newGame = newGame;
		this.setScene();
	}

	setScene() {
		//title
		this.title = new PIXI.Text(
			'Dinonaut:',
			{
				fontFamily: 'Arial',
				fontSize: 40,
				fill: 0x92f673,
				align: 'center',
			}
		);

		this.title.anchor.x = 0.5;
		this.title.anchor.y = 0.5;
		this.title.x = CANVAS.x / 2;
		this.title.y = 200;

		//subtitle
		this.subtitle = new PIXI.Text(
			'Defender of Celestial Dwarves',
			{
				fontFamily: 'Arial',
				fontSize: 30,
				fill: 0x92f673,
				align: 'center',
			}
		);

		this.subtitle.anchor.x = 0.5;
		this.subtitle.anchor.y = 0.5;
		this.subtitle.x = CANVAS.x / 2;
		this.subtitle.y = 250;

		//instructions
		this.instructions = new PIXI.Text(
			'Left and Right arrow keys to move.',
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xFFFFFF,
				align: 'center',
			}
		);

		this.instructions.anchor.x = 0.5;
		this.instructions.anchor.y = 0.5;
		this.instructions.x = CANVAS.x / 2;
		this.instructions.y = CANVAS.y - 230;

		//instructions
		this.instructions2 = new PIXI.Text(
			'Space bar to defend.',
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xFFFFFF,
				align: 'center',
			}
		);

		this.instructions2.anchor.x = 0.5;
		this.instructions2.anchor.y = 0.5;
		this.instructions2.x = CANVAS.x / 2;
		this.instructions2.y = CANVAS.y - 200;

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

		this.scene.addChild(this.title);
		this.scene.addChild(this.subtitle);
		this.scene.addChild(this.instructions);
		this.scene.addChild(this.instructions2);
		this.scene.addChild(this.text);
		stage.addChildAt(this.scene, stage.children.length - 1);
	}

}

module.exports = MenuScene;
