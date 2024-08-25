const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const template = document.querySelector('.snake-area');

canvas.height = 600;
canvas.width = 960;

template.append(canvas);

export {canvas, context};