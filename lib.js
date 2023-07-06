/// <reference path="lib.d.ts" />

function setPixel(pos2, col3, a) {
    if (!a) a = 255;
    const imageData = lib.context.createImageData(1, 1);
    const data = imageData.data;

    data[0] = col3.x;  // Red
    data[1] = col3.y;  // Green
    data[2] = col3.z;  // Blue
    data[3] = a;  // Alpha

    lib.context.putImageData(imageData, pos2.x, pos2.y);
}

const AlignmentMode = (() => {
    return {
        ABSOLUTE: 0,
        RELATIVE: 1,
    }
})();

const lib = (() => {
    const x = {};

    x["Vector2"] = class {
        constructor(x, y) {
            this.vecprop = 2;
            this.x = x;
            this.y = y;
        }
        clone() {
            return new x.Vector3(this.x, this.y);
        }
        equals(other) {
            return this.x == other.x && this.y == other.y;
        }
        flip() {
            this.x *= -1;
            this.y *= -1;
            return this;
        }
    };

    x["Vector3"] = class {
        constructor(x, y, z) {
            this.vecprop = 3;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        clone() {
            return new x.Vector3(this.x, this.y, this.z);
        }
        equals(other) {
            return this.x == other.x && this.y == other.y && this.z == other.z;
        }
        flip() {
            this.x *= -1;
            this.y *= -1;
            this.z *= -1;
            return this;
        }
    };

    x["canv"] = document.getElementById("mainCanvas");
    x["context"] = x.canv.getContext("2d");

    x["timeMode"] = AlignmentMode.ABSOLUTE;

    x["realignTime"] = () => {
        if (x.timeMode === AlignmentMode.ABSOLUTE) return;
        seconds = 0;
    };

    x["updateTime"] = () => {
        switch (x.timeMode) {
            case AlignmentMode.ABSOLUTE:
                seconds = Date.now() / 1000;
                break;
            case AlignmentMode.RELATIVE:
                seconds += deltaTime / 1000;
                break;
        }
    };

    x["startTime"] = Date.now();
    x["endTime"] = Infinity;

    x["framerate"] = 60;

    x["mainLoop"] = () => {
        lib.endTime = Date.now();
        deltaTime = lib.endTime - lib.startTime;
        lib.startTime = Date.now();
        lib.updateTime();
        draw();
        frameCount++;
    };

    x["interval"] = null;

    x["reinitInterval"] = () => {
        if (x.interval) clearInterval(x.interval);
        lib.interval = setInterval(lib.mainLoop, 1000 / lib.framerate);
    };

    return x;
})();

function vec(x, y) {
    return new lib.Vector2(x, y);
}

function vec(x, y, z) {
    return new lib.Vector3(x, y, z);
}

function timeMode(mode) {
    lib.timeMode = mode;
    lib.realignTime();
}

function frameRate() {
    if (!arguments[0])
        return lib.framerate;
    else if (arguments[0]) {
        lib.framerate = arguments[0];
        lib.reinitInterval();
    }
}

let frameCount = 0;
let seconds = 0;
let deltaTime = 0;

function background(col3) {
    const color = `rgb(${col3.x}, ${col3.y}, ${col3.z})`;
    lib.context.fillStyle = color;
    lib.context.fillRect(0, 0, lib.canv.width, lib.canv.height);
}

function setCanvasSize(size2) {
    lib.canv.width = size2.x;
    lib.canv.height = size2.y;
}

function random(max) {
    return Math.random() * max;
}

const round = Math.round;
const floor = Math.floor;
const ceil = Math.ceil;

function draw() {
}

function keyPressed(key) {
}

document.addEventListener("keydown", keyPressed);

lib.reinitInterval();
