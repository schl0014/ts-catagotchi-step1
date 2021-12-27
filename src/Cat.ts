import Catagotchi from './app.js';

export default class Cat {
  public mood: number;

  public energy: number;

  public hunger: number;

  private audio;

  /**
   *
   */
  constructor() {
    this.mood = 10;
    this.hunger = 0;
    this.energy = 10;
    // this.feed();
    // this.play();
    // this.sleep();
    this.audio = new Audio('./nyan.mp3');
  }
  // getters and betters

  /**
   * get mood
   *
   * @returns mood
   */
  public getMood(): number {
    return this.mood;
  }

  /**
   * set mood
   *
   * @param mood mood
   */
  public setMood(mood: number): void {
    this.mood = mood;
  }

  /**
   * get hunger
   *
   * @returns  hunger
   */
  public getHunger(): number {
    return this.hunger;
  }

  /**
   * set hunger
   *
   * @param {number} hunger hunger
   */
  public setHunger(hunger: number): void {
    this.hunger = hunger;
  }

  /**
   * set energy
   *
   * @param {number} energy energy
   */
  public setEnergy(energy: number): void {
    this.energy = energy;
  }

  /**
   * get energy
   *
   * @returns {number} energy
   */
  public getEnergy(): number {
    return this.energy;
  }

  /**
   * feed the cat
   */
  public feed(): void {
    // console.log("test");
    if (this.hunger <= 10 && this.hunger > 0) {
      this.hunger -= 2;
    }
  }

  /**
   * plays with the cat and some state are going up others are going down
   */
  play(): void {
    if (this.mood < 10 && this.hunger <= 10 && this.energy < 10) {
      this.meow();
      this.mood += 2;
      this.hunger += 1;
      this.energy -= 1;
    }
  }

  /**
   * the  cat sleepsand some state are going up others are going down
   */
  sleep(): void {
    if (this.energy < 10 && this.hunger <= 10) {
      this.energy += 2;
      this.hunger += 1;
    }
  }

  /**
   * the cat plays audio
   */
  meow(): void {
    this.audio.play();
    console.log('nyan nyan');
  }

  /**
   * ignore everthing
   */
  public ignore(): void {
    if (this.hunger < 10 && this.energy > 0) {
      this.hunger += 1;
      this.mood -= 1;
      this.energy -= 1;
    }
  }
}
