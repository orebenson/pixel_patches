import * as PatchService from './api/patchService.js';

const page_size = 16;
const patch_pixel_count = 64;
let current_page_number = 1;
let max_page_number = 0;

async function setMaxPageNumbers() {
    try {
        const total_patch_count = await PatchService.getTotalPatches().patchCount;
        if (!total_patch_count) {
            throw new Error("failed to get total patch count");
        }
        max_page_number = Math.ceil(total_patch_count / page_size);
        return 'success';
    } catch (error) {
        console.error("error in setMaxPageNumbers: ", error);
        return 'error';
    }
}


async function fetchPageData(page_number) {
    try {
        const start_index = (page_number - 1) * page_size;
        const end_index = start_index + page_size;
        const patches = await PatchService.getPatches(start_index, end_index);
        if (patches.length === 0) {
            throw new Error("no patches found for the given page number");
        }
        return patches;
    } catch (error) {
        console.error("error in fetchPageData: ", error);
        return [];
    }
}

function displayCurrentPagePatches(patches) {
    const patchListContainer = document.getElementById('patch-list-container');

    while (patchListContainer.firstChild) {
        patchListContainer.removeChild(patchListContainer.firstChild);
    }

    for (let i = 0; i < patches.length; i++) {
        const current_patch = patches[i];

        const patchListItem = document.createElement('div');
        patchListItem.className = 'patch-list-item';
        patchListItem.id = `patch-list-item-${i + 1}`;

        for (let j = 0; j < patch_pixel_count; j++) {
            const patchListItemTile = document.createElement('div');
            patchListItemTile.className = 'patch-list-item-tile';
            patchListItemTile.id = `patch-list-item-${i + 1}-tile-${j + 1}`;
            patchListItemTile.style.backgroundColor = current_patch.patchPixelHexes[j];
            patchListItemTile.style.outline = `1px solid ${current_patch.patchPixelHexes[j]}`;
            patchListItem.appendChild(patchListItemTile);
        }
        patchListContainer.appendChild(patchListItem);
    }
}

function updatePageButtons() {
    const nextPageButton = document.getElementById('next-page-button');
    const prevPageButton = document.getElementById('prev-page-button');

    nextPageButton.style.display = (current_page_number === max_page_number) ? 'none' : 'inline';
    prevPageButton.style.display = (current_page_number === 1) ? 'none' : 'inline';
}

function loadPage(page_number) {
    if (page_number > max_page_number || page_number < 1) return;
    fetchPageData(page_number).then(patches => {
        if (patches.length === 0) {
            throw new Error("no patches found for the given page number");
        }
        displayCurrentPagePatches(patches);
        current_page_number = page_number;
        document.getElementById('current-page-number').innerText = `${current_page_number}`;
        updatePageButtons()
    })
        .catch(error => {
            console.error("error in loadPage: ", error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    setMaxPageNumbers()
        .then((result) => {
            if (result === 'error') throw new Error("failed to get total patch count");
            loadPage(current_page_number);
        })
        .catch(error => {
            console.error("error in DOMContentLoaded event listener: ", error);
        });
})

document.getElementById('next-page-button').addEventListener('click', function () {
    if (current_page_number === max_page_number) return;
    loadPage(current_page_number + 1);
});

document.getElementById('prev-page-button').addEventListener('click', function () {
    if (current_page_number < 2) return;
    loadPage(current_page_number - 1);
});
