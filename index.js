const isValidHex = (hex) => {
    // recheck for any other character not valid for hex code
    if (!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length == 3 || strippedHex.length == 6;
}

function convertHexToRgb(hex) {

}


const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");


hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if (!isValidHex(hex)) return;
    strippedHex = hex.replace("#", "");
    inputColor.style.backgroundColor = "#" + strippedHex;
})

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace("#", "");

    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
            + strippedHex[1] + strippedHex[1]
            + strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return { r, g, b };
}


const convertRGBToHex = (r, g, b) => {
    const red = Number(r).toString(16);
    const green = Number(g).toString(16);
    const blue = Number(b).toString(16);

    let hexValue = "#";
    hexValue += red.length === 2 ? red : `0${red}`;
    hexValue += green.length === 2 ? green : `0${green}`;
    hexValue += blue.length === 2 ? blue : `0${blue}`;

    return hexValue;
}

slider.addEventListener("input", () => {
    if (!isValidHex(hexInput.value)) return false;

    sliderText.textContent = `${slider.value}%`;
    const alteredHex = alterColor(hexInput.value, slider.value);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
});


//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

const alterColor = (hex, percentage) => {
    const { r, g, b } = convertHexToRGB(hex);
    const amount = Math.floor((percentage / 100) * 255);
    const newR = increaseWithInRange(r, amount);
    const newG = increaseWithInRange(g, amount);
    const newB = increaseWithInRange(b, amount);
    console.log({ newR, newG, newB });

    return convertRGBToHex(newR, newG, newB);
}

const increaseWithInRange = (hex, amount) => {
    // range : 0 - 255
    const newHex = hex + amount;
    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex;
}