
/** @type {Record<string, HTMLImageElement>} */
const _imageCache = {};
/** @type {Record<string, Promise<HTMLImageElement>>} */
const _imagePromiseCache = {};
let _nextImageId = 0;

/**
  * @param {string | number} cacheKey
  * @param {HTMLImageElement} image
  */
export function setCache(cacheKey, image) {
  _imageCache[cacheKey] = image;
}

/**
  * @param {string | number} cacheKey
  * @returns {HTMLImageElement}
  */
export function getCache(cacheKey) {
  return _imageCache[cacheKey];
}
/**
  * @param {string} src
  * @returns Promise<HTMLImageElement>
  */
async function createImage(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

/**
  * @param {string} url
  * @returns Promise<HTMLImageElement>
  */
export function loadFromUrl(
  url,
  cacheKey = url,
) {
  if (cacheKey in _imageCache) {
    return Promise.resolve(_imageCache[cacheKey]);
  } else if (!(cacheKey in _imagePromiseCache)) {
    const promise = createImage(url);
    promise.then(
      (img) => {
        _imageCache[cacheKey] = img;
        return img;
      },
    );
    _imagePromiseCache[cacheKey] = promise;
    return promise;
  } else {
    return _imagePromiseCache[cacheKey];
  }
}

/**
  * @param {string} src
  * @param {string} spriteSet
  * @param {string} spriteKey
  * @param {number} width
  * @param {number} height
  * @returns Promise<HTMLImageElement>
  */
export async function loadSprite(
  src,
  spriteSet,
  spriteKey,
  width,
  height,
) {
  const image = await loadFromUrl(src);

  const imageId = _nextImageId++;

  setCache(imageId, image);
  SpriteState.bind(spriteSet, spriteKey, new Sprite(imageId, width, height));
}

class Sprite {
  /**
    * @param {number} imageId
    * @param {number} width
    * @param {number} height
    */
  constructor(imageId, width, height) {
    this.imageId = imageId;
    this.width = width;
    this.height = height;
  }
}

export const SpriteState = {
  /** @type {Record<string, Record<string, Sprite>>} */
  _spriteSets: {},
  /**
  * @param {string} spriteSet
  * @param {string} spriteKey
  * @param {Sprite} sprite
  * @returns void
  */
  bind(spriteSet, spriteKey, sprite) {
    this._spriteSets[spriteSet] = this._spriteSets[spriteSet] || {};
    this._spriteSets[spriteSet][spriteKey] = sprite;
  },
  /**
  * @param {string} spriteSet
  * @param {string} spriteKey
  * @returns Sprite
  */
  find(spriteSet, spriteKey) {
    return this._spriteSets[spriteSet][spriteKey];
  }
}

/** @type {HTMLCanvasElement | null} */
let _foreground = null;
/**
  * @returns {HTMLCanvasElement}
  */
export function getForegroundCanvas() {
  _foreground = _foreground ||  /** @type {HTMLCanvasElement} */ (
    document.getElementById("foreground")
  );
  return _foreground;
}

/**
  * @param {HTMLCanvasElement} el
  * @param {import("./vec2").Vec2} resolution
  */
export function setupCanvas(el, resolution) {
  // Get the DPR and size of the canvas
  const dpr = 2 ** Math.ceil(Math.log2(window.devicePixelRatio));

  el.width = resolution.x * dpr;
  el.height = resolution.y * dpr;

  const ctx = el.getContext("2d");
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);
  }
}
