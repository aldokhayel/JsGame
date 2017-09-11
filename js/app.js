// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

    // Check if enemy reach to end
    if(this.x >= 500){
        this.x = 0;
    };

    enemyCollision(this);
    displayScore();
};

var enemyCollision = function(Enemy){
    if( player.y + 40 >= Enemy.y &&
        player.y      <= Enemy.y + 60 &&
        player.x + 65 >= Enemy.x &&
        player.x      <= Enemy.x + 65)
        playerReset(player);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

player.prototype.update = function() {
    borderCollision(this);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}


player.prototype.handleInput = function(KeyPress) {
    if(KeyPress == 'left')
        player.x -= player.speed;

    if(KeyPress == 'up')
        player.y -= player.speed - 20;

    if(KeyPress == 'right')
        player.x += player.speed;

    if(KeyPress == 'down')
        player.y += player.speed - 20;
};

// prevent to move outside of canvas borders
var borderCollision = function(player) {
    if(player.y > 380)
        player.y = 380;

    if(player.y < -20){
        playerReset(player);
        playerReset.called = false;
    }

    if(player.x > 400)
        player.x = 400;

    if(player.x < 0)
        player.x = 0;
}

// start from begin
var playerReset = function(player){
    playerReset.called = true;
    player.x = 200;
    player.y = 380;
}

// count sucessful pass
var scoreCount = function() {
    if(player.y + 50 <= 0)
        score++;
}

var failCount = function() {
    if(playerReset.called)
        fail++;

    playerReset.called = false;

}

// show result
var displayScore = function() {
    scoreCount();
    failCount();
    var canvas = document.getElementsByTagName('canvas');
    scoreDiv.innerHTML = 'Score : ' + score + ' / Collision : ' + fail;
    var first = canvas[0];
    document.body.insertBefore(scoreDiv, first[0]);
}


var allEnemies = [];
var score = 0;
var fail = 0;
var scoreDiv = document.createElement('div');
var player = new player(200, 380, 100);
var enemy = new Enemy(0, Math.random() * 180 + 60, Math.random() * 300);
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
