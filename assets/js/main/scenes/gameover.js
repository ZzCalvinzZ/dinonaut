import {renderStage, stage, CANVAS} from 'main/utils';

class GameOverScene {
	scene = new PIXI.Container();

	constructor({newGame=()=>{}, score=0, highScore=0}) {
		this.score = score;
		this.highScore = highScore;
		this.newGame = newGame;
		this.setScene();
	}

	setScene() {
		//highscore
		this.highScoreCard = new PIXI.Text(
			`High Score: ${this.highScore}`,
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xFFFFFF,
				align: 'center',
			}
		);

		this.highScoreCard.anchor.x = 0.5;
		this.highScoreCard.anchor.y = 0.5;
		this.highScoreCard.x = CANVAS.x / 2;
		this.highScoreCard.y = CANVAS.y / 2;

		//score
		this.scoreCard = new PIXI.Text(
			`Score: ${this.score}`,
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xFFFFFF,
				align: 'center',
			}
		);

		this.scoreCard.anchor.x = 0.5;
		this.scoreCard.anchor.y = 0.5;
		this.scoreCard.x = CANVAS.x / 2;
		this.scoreCard.y = CANVAS.y / 2 + 50;

		//replay
		this.replay = new PIXI.Text(
			'Replay',
			{
				fontFamily: 'Arial',
				fontSize: 24,
				fill: 0xffffff,
				align: 'center',
			}
		);
		this.replay.interactive = true;
		this.replay.cursor = 'pointer';
		this.replay.anchor.x = 0.5;
		this.replay.anchor.y = 0.5;
		this.replay.x = CANVAS.x / 2;
		this.replay.y = CANVAS.y / 2 + 100;

		this.replay.on('click', () => {
			this.newGame();
		});
		this.replay.on('mouseover', () => {
			this.replay.style.fill = 0xffff00;
		});
		this.replay.on('mouseout', () => {
			this.replay.style.fill = 0xffffff;
		});

		this.scene.addChild(this.highScoreCard);
		this.scene.addChild(this.scoreCard);
		this.scene.addChild(this.replay);

		stage.addChild(this.scene);
	}

}

module.exports = GameOverScene;
