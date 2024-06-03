import * as PatchService from './api/patch.js';

let picked_colour = "";
const canvas_background_colour = window.getComputedStyle(document.querySelector('.canvas-tile')).getPropertyValue("background-color");
const canvas_outline_colour = '1px solid #adadad';


function rgbToHex(rgb_colour) {
    rgb_colour = rgb_colour.slice(4, -1).split(', ');
    const [r, g, b] = rgb_colour.map(Number);
    // shift each value into place (8 bits each for r, g, b), then convert binary to hex string and remove first digit
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function setPickedColour(palette_tile) {
    let colour = window.getComputedStyle(palette_tile).getPropertyValue("background-color");
    picked_colour = rgbToHex(colour);
}

function initPalette() {
    let palette_tiles = document.querySelectorAll('.palette-tile');
    for (let i = 0; i < palette_tiles.length; i++) {
        palette_tiles[i].addEventListener('click', function () {
            setPickedColour(this);
        });
    };
}

function setCanvasTileColour(canvas_tile) {
    if (picked_colour === "") { return }
    canvas_tile.style.backgroundColor = picked_colour;
    canvas_tile.style.outline = picked_colour;
}

function loadCanvas(canvas_tiles) {
    const savedCanvas = localStorage.getItem('canvasState');
    if (savedCanvas) {
        const canvasState = JSON.parse(savedCanvas);
        for (let i = 0; i < canvas_tiles.length; i++) {
            if (canvasState[i]) {
                const tile = canvas_tiles[i]
                tile.style.backgroundColor = canvasState[i];
                if (tile.style.backgroundColor !== canvas_background_colour) {
                    tile.style.outline = canvasState[i];
                }
            }
        }
    }
}

function saveCanvas(canvas_tiles) {
    const canvasState = [];
    for (let i = 0; i < canvas_tiles.length; i++) {
        canvasState.push(
            canvas_tiles[i].style.backgroundColor
        );
    }
    localStorage.setItem('canvasState', JSON.stringify(canvasState));
}


function clearCanvas(canvas_tiles) {
    for (let i = 0; i < canvas_tiles.length; i++) {
        canvas_tiles[i].style.backgroundColor = canvas_background_colour;
        canvas_tiles[i].style.outline = canvas_outline_colour;
    };
    localStorage.removeItem('canvasState');
}

function submitCanvas(canvas_tiles) {
    // PatchService.submitCanvas(canvas_tiles);
}

function initCanvas() {
    let canvas_tiles = document.querySelectorAll('.canvas-tile');
    for (let i = 0; i < canvas_tiles.length; i++) {
        canvas_tiles[i].addEventListener('click', function () { setCanvasTileColour(this) });
    };

    document.querySelector('#clear-canvas').addEventListener('click', function () {
        clearCanvas(canvas_tiles);
    });

    loadCanvas(canvas_tiles);

    window.addEventListener('beforeunload', function () {
        saveCanvas(canvas_tiles);
    });

    // document.querySelector('#submit-patch').addEventListener('click', function () {
    //     submitCanvas(canvas_tiles);
    // });
}


document.addEventListener('DOMContentLoaded', function () {
    initCanvas();
    initPalette();
})

