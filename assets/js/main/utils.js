let canvasWrapper = 'root';
let stage = new PIXI.Container();
let renderer = PIXI.autoDetectRenderer(
	800, 600,
	{
		antialias: false,
		transparent: false,
		resolution: 1,
		autoResize: true,
	}
);

document.getElementById(canvasWrapper).appendChild(renderer.view);

module.exports = {
	getImage: filename => `static/img/${filename}`,
	stage: stage,
	renderStage: () => renderer.render(stage)
};
