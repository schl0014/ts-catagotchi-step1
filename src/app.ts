class Catagotchi {
  alive: boolean;

  mood: number;

  energy: number;

  hunger: number;

  gameDOM: Element;

  displayMood: HTMLDivElement;

  displayHunger: HTMLDivElement;

  displayStatus: HTMLDivElement;

  displayEnergy: HTMLDivElement;

  private lastTickTimeStamp: number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param gameDOM pass the DOM element where the game will run.
   */
  constructor(gameDOM: Element) {
    this.mood = 10;
    this.alive = true;
    this.hunger = 0;
    this.energy = 10;
    this.startRunning();
    this.feed();
    this.play();
    this.sleep();
    // this.meow();
    this.catDead();
    this.getDOMElements();
    this.updateDisplays();
  }

  feed(): void {
    // console.log("test");
    if (this.hunger <= 10 && this.hunger > 0) {
      this.hunger -= 1;
    }
  }

  play(): void {
    if (this.mood < 10 && this.hunger <= 10 && this.energy < 10) {
      this.meow();
      this.mood += 1;
      this.hunger += 1;
      this.energy -= 1;
    }
  }

  sleep(): void {
    if (this.energy < 10 && this.hunger <= 10) {
      this.energy += 1;
      this.hunger += 1;
    }
  }

  meow(): void {
    let audio = new Audio('./nyan.mp3');
    audio.play();
    console.log('nyan nyan');
  }

  catDead(): void {
    if (this.hunger >= 10 || this.energy <= 0) {
      const game = document.getElementById('game');
      game.remove();
      const body = document.querySelector('body');
      const dood = document.createElement('div');
      dood.className = 'dood';
      document.body.style.background = 'red';
      body.append(dood);
      const tekstDood = document.createElement('h1');
      tekstDood.innerHTML = 'you are dead';
      tekstDood.style.textAlign = 'center';
      console.log(dood);
      dood.appendChild(tekstDood);
      console.log('dead');
      //   this.meow();
    }
  }

  /**
   * Called for every game tick.
   */
  public gameTick() {
    if (this.hunger < 10 && this.energy > 0) {
      this.hunger += 1;
      this.mood -= 1;
      this.energy -= 1;
      this.updateDisplays();
      this.catDead();
    }
  }

  updateDisplays = () => {
    this.displayEnergy.innerHTML = String(this.energy);
    this.displayHunger.innerHTML = String(this.hunger);
    this.displayMood.innerHTML = String(this.mood);
  };

  getDOMElements = () => {
    this.displayHunger = document.querySelector('#displayHunger');
    this.displayMood = document.querySelector('#displayMood');
    this.displayEnergy = document.querySelector('#displayEnergy');
    // console.log(this.displayHunger);
    let buttons = document.querySelectorAll('.button');
    for (let i = 0; i < buttons.length; i++) {
      this.gameDOM = buttons[i];
      // console.log(this.gameDOM);
      this.gameDOM.addEventListener('click', () => {
        if (i === 0) {
          this.feed();
        } else if (i === 1) {
          // console.log("test1");
          this.play();
        } else {
          // console.log("test2");
          this.sleep();
        }
        this.updateDisplays();
      });
    }
  };

  /**
   * Start the automatic updating process of this object
   */
  private startRunning() {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (timestamp - this.lastTickTimeStamp >= 3000) {
      // Call the method of this object that needs to be called
      this.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#game'));
};

window.addEventListener('load', init);
