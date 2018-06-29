
// Create initial base class
class Entity {
  constructor() {
    this.sprite = 'images/'
    this.x = 2;
    this.y = 5;
  }

  update() {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  // Check for collisions method
  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    } else {
      return false;
    }
  }
}

// Player class
class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-boy.png';
    this.moving = false;
    this.win = false;
  }

  update() {
    super.update();
    if (this.isOutOfBoundsY && !this.moving && !this.win) {

      swal({    // Call Sweet modal
        type: 'success',
        text: 'You won...',
      })

      this.win = true;
      setTimeout(() => {  //Resetting board functionality so user can replay game immediately
        player.y = 5;
        player.x = 2;
        this.win = false; 
      }, 750);
    }
  }

  render() {
    super.render();
    this.moving = false;
  }

  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }
    this.moving = true;
  }
}

//Enemy class
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    super.update();
    if (this.isOutOfBoundsX) {
      this.x = -1;
    } else {
      const myInt = getRandomInt();
      this.x += myInt * dt;  //Can control speed with changing multiplier
    }
  }
}

// Used to generate random number between 1-3, used to make movement of bugs random
function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(10);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Instantiate player and enemy objects
const player = new Player();
const allEnemies = [new Enemy(1, 1), new Enemy(2, 2), new Enemy(1, 3)];