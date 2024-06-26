export function rgbToHex(rgb_colour) {
    rgb_colour = rgb_colour.substring(4, (rgb_colour.length-1)).split(', ');
    const [r, g, b] = rgb_colour.map(Number);
    // shift each value into place (8 bits each for r, g, b), then convert binary to hex string and remove first digit
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
