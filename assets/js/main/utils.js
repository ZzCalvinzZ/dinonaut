let canvasWrapper = 'root';
let stage = new PIXI.Container()

let CANVAS = {
	x: 800,
	y: 800
}

let renderer = PIXI.autoDetectRenderer(
	CANVAS.x, CANVAS.y,
	{
		antialias: false,
		transparent: false,
		resolution: 1,
		autoResize: true,
	}
);

document.getElementById(canvasWrapper).appendChild(renderer.view);

let textures = {}
let sounds = {}

let getTexture = name => {
	let texture = textures[name];

	if (texture) {
		return texture;
	} else {
		throw 'no texture with that name';
	}

};

let getSound = name => {
	let sound = sounds[name];

	if (sound) {
		return sound;
	} else {
		throw 'no sound with that name';
	}

};

module.exports = {
	imagePath: filename => `static/img/${filename}`,
	soundPath: filename => `static/sound/${filename}`,
	stage: stage,
	textures: textures,
	getTexture: getTexture,
	getSound: getSound,
	sounds: sounds,
	CANVAS: CANVAS,
	renderStage: () => renderer.render(stage)
};
