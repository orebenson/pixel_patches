import * as PatchService from './api/patchService.js';
import { rgbToHex } from './utils/conversion-utils.js';

let picked_colour = "";
const canvas_background_colour = window.getComputedStyle(document.querySelector('.canvas-tile')).getPropertyValue("background-color");
const canvas_outline = window.getComputedStyle(document.querySelector('.canvas-tile')).getPropertyValue("outline");

function initPalette() {
    const palette_tiles = document.querySelectorAll('.palette-tile');
    for (let i = 0; i < palette_tiles.length; i++) {
        palette_tiles[i].addEventListener('click', function () {
            picked_colour = window.getComputedStyle(palette_tiles[i]).getPropertyValue("background-color")
        });
    };
}

function setCanvasTileColour(canvas_tile) {
    if (picked_colour === "") { return }
    canvas_tile.style.backgroundColor = picked_colour;
    canvas_tile.style.outline = picked_colour;
}

function loadCanvas(canvas_tiles) {
    try {
        const savedCanvas = localStorage.getItem('canvasState');
        if (!savedCanvas) return;
        const canvasState = JSON.parse(savedCanvas);
        for (let i = 0; i < canvas_tiles.length; i++) {
            const tileColour = canvasState[i];
            const tile = canvas_tiles[i]
            tile.style.backgroundColor = tileColour;
            if (tile.style.backgroundColor !== canvas_background_colour) {
                tile.style.outline = tileColour;
            }
        }
    } catch (error) {
        console.error('Failed to load canvas state:', error);
    }
}

function saveCanvas(canvas_tiles) {
    try {
        const canvasState = [];
        for (let i = 0; i < canvas_tiles.length; i++) {
            canvasState.push(
                canvas_tiles[i].style.backgroundColor
            );
        }
        localStorage.setItem('canvasState', JSON.stringify(canvasState));
    } catch (error) {
        console.error('Failed to save canvas state:', error);
    }
}


function clearCanvas(canvas_tiles) {
    for (let i = 0; i < canvas_tiles.length; i++) {
        canvas_tiles[i].style.backgroundColor = canvas_background_colour;
        canvas_tiles[i].style.outline = canvas_outline;
    };
    try {
        localStorage.removeItem('canvasState');
    } catch (error) {
        console.error('Failed to access canvas state:', error);
    }
}

async function submitCanvas(canvas_tiles) {
    let patchPixelHexes = [];
    for (let i = 0; i < canvas_tiles.length; i++) {
        patchPixelHexes.push(
            rgbToHex(window.getComputedStyle(canvas_tiles[i]).getPropertyValue("background-color"))
        );
    }
    const result = await PatchService.submitPatch(patchPixelHexes);

    if (result === 'error') alert('error uploading patch (it may already exist!)');
    if (result === 'success') alert('success uploading patch!');
}

function initCanvas() {
    const canvas_tiles = document.querySelectorAll('.canvas-tile');
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

    document.querySelector('#submit-patch').addEventListener('click', function () {
        submitCanvas(canvas_tiles);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    initPalette();
    initCanvas();
})

