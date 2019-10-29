class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    clone() {
      return new Point(this.x, this.y);
    }
  }
  class Color {
    constructor(name) {
      this.name = name;
    }
    clone() {
      return new Color(this.name);
    }
  }
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y);
      this.color = color;
    }
    clone() {
      return new ColorPoint(
        this.x, this.y, this.color.clone()); // (A)
    }
  }

  /*
Line A demonstrates an important aspect of this technique:
 compound instance property values must also be cloned, recursively.
  */

 class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    static from(other) {
      return new Point(other.x, other.y);
    }
  }
  class Color {
    constructor(name) {
      this.name = name;
    }
    static from(other) {
      return new Color(other.name);
    }
  }
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y);
      this.color = color;
    }
    static from(other) {
      return new ColorPoint(
        other.x, other.y, Color.from(other.color)); // (A)
    }
  }

  /*
  In line A, we once again use recursive copying.
  
  This is how ColorPoint.from() works:
  
  const original = new ColorPoint(-1, 4, new Color('red'));
  const copy = ColorPoint.from(original);
  assert.deepEqual(copy, original);
  */