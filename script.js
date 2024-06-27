const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;
let timeLeft = 20;
let balloons = [];

function startGame() {
    setInterval(updateGame, 1000 / 60);
    setInterval(countdown, 1000);
    createBalloon();
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach((balloon, index) => {
        balloon.y -= balloon.speed;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();

        if (balloon.y + balloon.radius < 0) {
            balloons.splice(index, 1);
            createBalloon();
        }
    });
}

function countdown() {
    timeLeft -= 1;
    document.getElementById('timer').innerText = 'Time: ' + timeLeft;
    if (timeLeft <= 0) {
        endGame();
    }
}

function createBalloon() {
    const x = Math.random() * canvas.width;
    const radius = Math.random() * 30 + 10;
    const speed = Math.random() * 3 + 1;
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    balloons.push({ x, y: canvas.height, radius, speed, color });
}

function endGame() {
    alert('Game Over! Your score: ' + score);
    window.location.reload();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    balloons.forEach((balloon, index) => {
        const distance = Math.sqrt((x - balloon.x) ** 2 + (y - balloon.y) ** 2);
        if (distance < balloon.radius) {
            score += 1;
            document.getElementById('score').innerText = 'Score: ' + score;
        }
    });
});

startGame();