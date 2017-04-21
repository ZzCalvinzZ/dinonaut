class Game {
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
	}

	setStage(){
		//Add the canvas to the HTML document
		document.getElementById('root').appendChild(this.renderer.view);

		//Create a container object called the `stage`
		var stage = new PIXI.Container();

		//Tell the `renderer` to `render` the `stage`
		this.renderer.render(stage);

	}
}

module.exports = Game;
