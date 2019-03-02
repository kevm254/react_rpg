export enum Keys {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
  ENTER = 13,
  SPACEBAR = 32
}

export class KeyPressed {
  static right(e: Event): boolean {
    return e.keyCode === Keys.RIGHT;
  }

  static left(e: Event): boolean {
    return e.keyCode === Keys.LEFT;
  }

  static up(e: Event): boolean {
    return e.keyCode === Keys.UP;
  }

  static down(e: Event): boolean {
    return e.keyCode === Keys.DOWN;
  }
}
