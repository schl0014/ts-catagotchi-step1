import Catagotchi from "./app.js";
export default class Ticker {

  private catagotchi: Catagotchi;

  private lastTickTimeStamp: number;

  constructor(catagotchi: Catagotchi) {
    this.catagotchi = catagotchi;
    this.startRunning();
  }

  /**
   * Start the automatic updating process of this object
   */
  public startRunning(): void {
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
    if (timestamp - this.lastTickTimeStamp >= 1000) {
      // Call the method of this object that needs to be called
      this.catagotchi.gameTick();
      this.lastTickTimeStamp = timestamp;
    }
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  };
}
