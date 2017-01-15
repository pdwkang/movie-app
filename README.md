##ABC Movie Data Base

####[Check it out!](http://pauldkang.com/movie-app/)
---

ABC Movie Data Base is a wep application that provides detailed descriptions to of current
movies playing in theaters, most popular movies, 
upon input closest movie theaters and links to buying tickets for specific movies directly through fandango
it will also give the user local weather information of the users input
navigate. display live data of stocks from major movie industries refreshing every second
search any movie. on click.poster. modal. with ratings and overview
blahblah 3 different apikeys and 9 .get json functions


![alt text](./images/screenshot-game.png)

Descriptions for game modes are shown before starting each level

![alt text](./images/screenshot-level1.png) ![alt text](./images/screenshot-level2.png)

The user controls the shark's movements with arrow keys. In regular mode, player must eat all the fish within 30 seconds. Remaining fish are listed below the game-screen, while the timer ticks on the right.

![alt text](./images/screenshot-gameplay.png)

In boss mode, player must shoot down the enemy while dodging its attacks. Player is given 6 shark lives at the start of each level, and higher level bosses have more hp and projectiles.

![alt text](./images/screenshot-bosslevel.png)
---
##Code Example: Bullet creation, firing, and collision in Vanilla JS

Creating bullet objects with a constructor and pushing them into an array
```javascript
var bullets = [];

function Bullet(x, y){
	this.x = x;
	this.y = y;
};

Bullet.prototype.icon = new Image();
Bullet.prototype.icon.src = "bullet.png";

for(var i = 0; i < 100; i++){
	bullets.push(new Bullet(0, 500))
};
```

Adding an event listener to create and set the index of ```keysDown``` array to be true when a key is pressed (```keyCode``` is equal to index of ```keysDown[]``` being changed) 
```javascript
var keysDown = [];

addEventListener('keydown', function(event){
	keysDown[event.keyCode] = true;
});
addEventListener('keyup', function(event){
	delete keysDown[event.keyCode];
});
```

Creating two functions that fire bullet objects in each half of ```bullets``` array (```fireBullet2()``` fires ```bullets[50]``` ~ ```bullets[99]```). Bullets are fired from current shark location and moved by increasing their locations' x coordinates.
```javascript
function fireBullet(){
	if(70 in keysDown){
		if(bulletCounter >= 49){bulletCounter = 0};
		bullets[bulletCounter].x = heroLocation.x;
		bullets[bulletCounter].y = heroLocation.y;
		bulletCounter++;
	}
};

function fireBullet2(){
	if(70 in keysDown)){
		bullets[(bulletCounter+50)].x = heroLocation.x;
		bullets[(bulletCounter+50)].y = heroLocation.y;
	}
};

var bulletSpeed = 15;

function moveBullet(){
	for(var i = 0; i < 100; i++){
		bullets[i].x += bulletSpeed;
	}
};
```

Creating a function to reduce boss's health bar when bullets collide.
```<div id="healthBar">``` is inside another ```<div>``` that stays a constant size regardless of changes to ```#healthBar```, giving it the effect of boss's health shrinking as damage is dealt
```javascript
var healthBarWidth
var damageDoneToBoss = 0

function bulletCollideBoss(){
	for(var i = 0; i < 100; i++){
		if((bullets[i].x <= boss1Location.x + 45) 
			&& (bullets[i].y <= boss1Location.y + 150)
			&& (bullets[i].x >= boss1Location.x - 45)
			&& (bullets[i].y >= boss1Location.y + 50)){

			damageDoneToBoss += (9-level/2);
			bullets[i].x = 800;
			bullets[i].y = 520;
			healthBarWidth = 100-(damageDoneToBoss/50)

			document.getElementById('healthBar').style.width = 
				healthBarWidth + '%';
			
			if(healthBarWidth >= 15){
				document.getElementById('healthBar').innerHTML = 
					'5000 / ' + (5000-damageDoneToBoss);
			}else if(healthBarWidth >= 0){
				document.getElementById('healthBar').innerHTML = 		
					5000-damageDoneToBoss;
			}else{
				healthBarWidth = 0;
			}
		}
	}
};
```

Drawing the bullets on ```<canvas>``` and calling bullet related functions
```javascript
function drawBullets(){
	for(var i = 0; i < 100; i++){
		context.drawImage(bullets[i].icon, bullets[i].x, bullets[i].y)
	}
};

function draw(){
	drawBullets();
	moveBullet();
	fireBullet();
	fireBullet2();
	bulletCollideBoss();
	requestAnimationFrame(draw);
};

draw();
```


##Challenges
The biggest struggles were trying to code and keep up with all the ideas that were coming up as the game was being developed. Without being fully comfortable with javascript, I wrote a lot of code in a brute force manner and focused more on the functionality. For example, I originally typed out 100 variables each assigned to a bullet object and manually added their locations to an array.
```javascript 
var bulletsArray = [bullet1Location, bullet2Location, bullet3Location, bullet4Location, bullet5Location, bullet6Location, bullet7Location, bullet8Location, bullet9Location, bullet10Location, bullet11Location, bullet12Location, bullet13Location, 
    bullet14Location, bullet15Location, bullet16Location, bullet17Location, bullet18Location, bullet19Location, bullet20Location, bullet21Location, bullet22Location, bullet23Location, bullet24Location, bullet25Location, bullet26Location, bullet27Location
```
Another challenge I had was keeping track of all the functions being called within each other. As I was breaking down long functions into smaller ones, it was becoming harder to remember which function did what. I've resolved this problem by both commenting on my codes more often and coding longer hours in per sitting.

```javascript
function moveShell(){
  for(var i =0; i<shells.length; i++){
    shells[i].y += shellSpeed
  }
};

function runBossLevel(){
  moveShell();
};

function update(){
  runBossLevel()
};

function draw(){
  update();
};

draw();
```