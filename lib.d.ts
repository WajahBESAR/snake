/**
 * Main draw loop, meant to be overriden.
 */
declare function draw(): void;
/**
 * Sets a pixel on the canvas
 * @param pos The position of the pixel to set
 * @param col The color of the pixel to set
 * @param a The alpha of the color
 */
declare function setPixel(pos: lib.Vector2, col: lib.Vector3, a?: number): void;
/**
 * Initialize a 2D vector.
 * @param x X component of the vector
 * @param y Y component of the vector
 */
declare function vec(x: number, y: number): lib.Vector2;
/**
 * Initialize a 3D vector.
 * @param x X component of the vector
 * @param y Y component of the vector
 * @param z Z component of the vector
 */
declare function vec(x: number, y: number, z: number): lib.Vector3;
/**
 * Fill the canvas with a color
 * @param col The color to fill the canvas with
 */
declare function background(col: lib.Vector3): void;
/**
 * Set the canvas size
 * @param size The size of the canvas
 */
declare function setCanvasSize(size: lib.Vector2): void;
/**
 * Sets the framerate.
 * @param framerate The framerate to set
 */
declare function frameRate(framerate: number): void;
/**
 * Returns the current framerate.
 * @returns The current framerate
 */
declare function frameRate(): number;
/**
 * Set the time alignment mode, When set to `AlignmentMode.RELATIVE`, the time will reset to zero and count on its own.
 * @param mode The mode to align time
 */
declare function timeMode(mode: AlignmentMode): void;
/**
 * The number of frames since the start.
 */
declare let frameCount: number;
/**
 * The number of milliseconds since the last frame.
 */
declare let deltaTime: number;
/**
 * The number of seconds based on the time mode.
 */
declare let seconds: number;
/**
 * Core library
 */
declare module lib {
    /**
     * The current working canvas
     */
    export const canv: HTMLCanvasElement;
    export class Vector2 {
        constructor(x: number, y: number);
        clone(): lib.Vector2;
        equals(other: lib.Vector2): boolean;
        flip(): this;
    }
    export class Vector3 {
        constructor(x: number, y: number, z: number);
        clone(): lib.Vector3;
        equals(other: lib.Vector3): boolean;
        flip(): this;
    }
    export function reinitInterval(): void;
    // other attributes hidden
}

declare enum AlignmentMode {
    ABSOLUTE,
    RELATIVE
}