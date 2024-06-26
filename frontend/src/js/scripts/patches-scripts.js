import * as PatchService from '../api/patches-service.js';
import { loadNavbar } from '../utils/navbar-utils.js';

const PAGE_SIZE = 16;
const PATCH_PIXEL_COUNT = 64;
let current_page_number = 1;
let max_page_number = 0;
let total_patch_count = 1;

async function fetchMaxPageNumbers() {
    try {
        const { patchCount } = await PatchService.getTotalPatches();
        if (patchCount === null) throw new Error("failed to get total patch count");
        total_patch_count = patchCount;
        max_page_number = Math.ceil(total_patch_count / PAGE_SIZE);
        return 'success';
    } catch (error) {
        console.error("error in fetchMaxPageNumbers: ", error);
        return 'error';
    }
}

async function fetchPageData(page_number) {
    try {
        const start_index = (page_number - 1) * PAGE_SIZE;
        const end_index = Math.min((start_index + PAGE_SIZE), total_patch_count);
        const patches = await PatchService.getPatches(start_index, end_index);
        if (patches.length === 0) throw new Error("no patches found for the given page number");
        return patches;
    } catch (error) {
        console.error("error in fetchPageData: ", error);
        return [];
    }
}

function displayCurrentPagePatches(patches) {
    const patchListContainer = document.getElementById('patch-list-container');
    while (patchListContainer.firstChild) patchListContainer.removeChild(patchListContainer.firstChild);

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < patches.length; i++) {
        const current_patch = patches[i];
        const patchListItem = document.createElement('div');
        patchListItem.className = 'patch-list-item';
        patchListItem.id = `patch-list-item-${i + 1}`;

        for (let j = 0; j < PATCH_PIXEL_COUNT; j++) {
            const patchListItemTile = document.createElement('div');
            patchListItemTile.className = 'patch-list-item-tile';
            patchListItemTile.id = `patch-list-item-${i + 1}-tile-${j + 1}`;
            patchListItemTile.style.backgroundColor = current_patch.patchPixelHexes[j];
            patchListItemTile.style.outline = `1px solid ${current_patch.patchPixelHexes[j]}`;
            patchListItem.appendChild(patchListItemTile);
        }
        fragment.appendChild(patchListItem);
    }
    patchListContainer.appendChild(fragment);
}

function updatePageMenu(page_number) {
    current_page_number = page_number;
    let currentPageNumberElement = document.getElementById('current-page-number');
    currentPageNumberElement.innerText = `${current_page_number}`;
    currentPageNumberElement.style.display = 'block';
    document.getElementById('next-page-button').style.display = (current_page_number === max_page_number) ? 'none' : 'block';
    document.getElementById('prev-page-button').style.display = (current_page_number === 1) ? 'none' : 'block';
}

function updatePage(patches, page_number) {
    displayCurrentPagePatches(patches);
    updatePageMenu(page_number);
}

function loadPage(page_number) {
    if (page_number > max_page_number || page_number < 1) return;
    fetchPageData(page_number)
        .then(patches => updatePage(patches, page_number))
        .catch(error => console.error("error in loadPage: ", error));
}

function initPage() {
    fetchMaxPageNumbers()
        .then((result) => {
            if (result === 'error') throw new Error("failed to get total patch count");
            loadPage(current_page_number);
        })
        .catch(error => console.error("error in initPage: ", error));
}

document.getElementById('next-page-button').addEventListener('click', loadPage(current_page_number + 1));
document.getElementById('prev-page-button').addEventListener('click', loadPage(current_page_number - 1));
window.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    initPage();
})


