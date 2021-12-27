import Cat from './Cat.js';
import KeyListener from './KeyListener.js';
import Ticker from './ticker.js';

export default class Catagotchi {
  private cat: Cat;

  private keyListener: KeyListener;

  private trueorFalse: boolean;

  public readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private background: HTMLImageElement;

  private ticker: Ticker;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   * @param canvas pass the DOM element where the game will run.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ticker = new Ticker(this);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.keyListener = new KeyListener();
    this.cat = new Cat();
    // this.meow();
    this.checkCatDead();
    this.trueorFalse = true;
    this.background = this.loadNewImage('img/normal Cat.png');
    this.updateDisplays();
    this.ticker.startRunning();
  }

  /**
  * Removes all painted things from the canvas. Starts at the top-left pixel
  * of the canvas and stops at the bottom-right pixel.
  */
  private clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private updateDisplays() {
    this.clearScreen();

    this.ctx.drawImage(
      this.background,
      100,
      100,
      this.background.width,
      this.canvas.height / 2,
    );

    this.writeTextToCanvas(`Energy:${this.cat.getEnergy()}`, 100, 100);
    this.writeTextToCanvas(`Hunger:${this.cat.getHunger()}`, 300, 100);
    this.writeTextToCanvas(`Mood:${this.cat.getMood()}`, 500, 100);
  }

  /**
   * checkes if cat is dead or not
   */
  checkCatDead(): void {
    // console.log(this.trueorFalse);
    if (this.trueorFalse) {
      if (this.cat.hunger >= 10 || this.cat.energy <= 0) {
        this.background = this.loadNewImage('img/Dead Cat.png');
        this.trueorFalse = false;
      } else {
        this.background = this.loadNewImage('img/normal Cat.png');
      }
    }
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.cat.hunger <= 10 || this.cat.energy >= 0) {
      this.cat.ignore();

      if (this.keyListener.isKeyDown(KeyListener.KEY_F)) {
        this.background = this.loadNewImage('img/Grumpy Cat.png');
        this.cat.feed();
        console.log('test');
      } else if (this.keyListener.isKeyDown(KeyListener.KEY_P)) {
        this.background = this.loadNewImage('img/Happy Cat.png');
        // console.log('test1');
        this.cat.play();
      } else if (this.keyListener.isKeyDown(KeyListener.KEY_S) && this.cat.mood >= 0) {
        // console.log('test2');
        this.background = this.loadNewImage('img/Sleepy Cat.png');
        this.cat.sleep();
      } else {
        this.checkCatDead();
      }
    }
    this.updateDisplays();
  }

  /**
   * Write text to the canvas
   *
   * @param text Text to write
   * @param xCoordinate Horizontal coordinate in pixels
   * @param yCoordinate Vertical coordinate in pixels
   * @param fontSize Font size in pixels
   * @param color The color of the text
   * @param alignment Where to align the text
   */

  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize = 20,
    color = 'red',
    alignment: CanvasTextAlign = 'center',
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * loads an image in such a way that the screen doens't constantly flicker
   *
   * @param source Path to the image file to be loaded
   * @returns An image element
   */

  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#canvas'));
};

window.addEventListener('load', init);
