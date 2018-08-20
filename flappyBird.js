const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

console.log('https://www.youtube.com/watch?v=pufKO5EG8nc&list=PLlKsKmE4sMFTi6g_xw2aTAL6xP9yS5B2y&index=12&t=0s');

// images

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image(); 
const pipeSouth = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

// variables

const gap = 85;
const constant = pipeNorth.height + gap;

let bX = 10;
let bY = 150;

const gravity = 1.5;

let score = 0;

// audio files

const fly = new Audio();
const scoreAud = new Audio();

fly.src = 'sounds/fly.mp3';
scoreAud.src = 'sounds/score.mp3';

// on key down

document.addEventListener('keydown', (e) => {
    bY -= 25;
    fly.play();
})

// pipe coordinates

const pipes = [];

pipes[0] = {
    x: cvs.width,
    y: 0
}

// draw

const draw = () => {
    ctx.drawImage(bg,0,0);

    pipes.forEach(pipe => {
        ctx.drawImage(pipeNorth, pipe.x, pipe.y);
        ctx.drawImage(pipeSouth, pipe.x, pipe.y + constant);

        pipe.x--;

        if(pipe.x == 125) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // remove pipes outside the canvas

        if(pipe.x < -pipeNorth.width) {
            pipes.shift();
        }

        // detect collision

        if(bX + bird.width >= pipe.x && bX + bird.width <= pipe.x + pipeNorth.width && (bY <= pipe.y + pipeNorth.height  || bY + bird.height >= pipe.y+constant)|| bY + bird.height >= cvs.height - fg.height)
        {
            location.reload(); // reload page
        }

        // score 
        if(pipe.x == 5) {
            score++;
            scoreAud.play();
        }
    });

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px Verdana';
    ctx.fillText('Score: ' + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();