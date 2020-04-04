import * as PIXI from "pixi.js";
import Bump from "./bump";

export let b = new Bump(PIXI);

export let canvasWrapper = "canvas-wrapper";
export let stage = new PIXI.Container();

export let CANVAS = {
  x: 700,
  y: 700,
};

export const meteorInterval = [100, 300];
export const meteorIntervalAcceleration = 0.97;
export const meteorSpeed = [0.003, 0.002];

export let playerSpeed = 2;
export const speedAcceleration = 0.1;

export let renderer = PIXI.autoDetectRenderer(CANVAS.x, CANVAS.y, {
  antialias: false,
  transparent: false,
  resolution: 1,
  autoResize: true,
});

document.getElementById(canvasWrapper).appendChild(renderer.view);

export let textures = {};
export let sounds = {};

export const getTexture = (name) => {
  let texture = textures[name];

  if (texture) {
    return texture;
  } else {
    throw "no texture with that name";
  }
};

export const getSound = (name) => {
  let sound = sounds[name];

  if (sound) {
    return sound;
  } else {
    throw "no sound with that name";
  }
};

export const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

export const getRandomPointOnPerimeter = () => {
  let width = CANVAS.x;
  let height = CANVAS.y;
  let pos = {};

  let p = Math.floor(Math.random() * (width + width + height + height));

  if (p < width + height) {
    if (p < width) {
      pos.x = p;
      pos.y = 0;
    } else {
      pos.x = width;
      pos.y = p - width;
    }
  } else {
    p = p - (width + height);
    if (p < width) {
      pos.x = width - p;
      pos.y = height;
    } else {
      pos.x = 0;
      pos.y = height - (p - width);
    }
  }

  return pos;
};

//stop spacebar from scrolling
window.onkeydown = function(e) {
  e.preventDefault();
  return false;
};

export const imagePath = (filename) => `static/img/${filename}`;
export const soundPath = (filename) => `static/sound/${filename}`;
export const renderStage = () => renderer.render(stage);
