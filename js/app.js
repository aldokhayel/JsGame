// Enemies our player must avoid
var Enemy = function(x, y, speed) {

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

    this.enemyCollision();
    player.displayScore();
};

Enemy.prototype.enemyCollision = function(){
    if( player.y + 40 >= this.y &&
        player.y      <= this.y + 60 &&
        player.x + 65 >= this.x &&
        player.x      <= this.x + 65){
        var called = true;
        player.playerReset(called);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Player.prototype.update = function() {
    this.borderCollision();

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}


Player.prototype.handleInput = function(KeyPress) {
    if(KeyPress == 'left')
        this.x -= this.speed;

    if(KeyPress == 'up')
        this.y -= this.speed - 20;

    if(KeyPress == 'right')
        this.x += this.speed;

    if(KeyPress == 'down')
        this.y += this.speed - 20;
};

// prevent to move outside of canvas borders
Player.prototype.borderCollision = function() {
    if(this.y > 380)
        this.y = 380;

    if(this.y < -20){
        var called = false;
        this.playerReset(called);
        //this.playerReset.called = false;
    }

    if(this.x > 400)
        this.x = 400;

    if(this.x < 0)
        this.x = 0;
}

// start from begin
Player.prototype.playerReset = function(called){
    //called = true;
    this.x = 200;
    this.y = 380;

    this.failCount(called);
}

// count sucessful pass
Player.prototype.scoreCount = function() {
    if(this.y + 50 <= 0)
        score++;
}

Player.prototype.failCount = function(called) {
    if(called)
        fail++;

    this.playerReset.called = false;

}

// show result
Player.prototype.displayScore = function() {
    this.scoreCount();
    //this.failCount();
    var canvas = document.getElementsByTagName('canvas');
    scoreDiv.innerHTML = 'Score : ' + score + ' / Collision : ' + fail;
    var first = canvas[0];
    document.body.insertBefore(scoreDiv, first[0]);
}


var allEnemies = [];
var score = 0;
var fail = 0;
var scoreDiv = document.createElement('div');
var player = new Player(200, 380, 100);
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
