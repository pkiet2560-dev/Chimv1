const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');

let score = 0;
let canShoot = true;
const reloadTime = 800;

// 1. Lấy điểm cao nhất từ localStorage khi vừa vào game
let highScore = localStorage.getItem('birdGameHighScore') || 0;
highScoreDisplay.innerText = `Kỷ lục: ${highScore}`;

window.addEventListener('mousedown', () => {
    if (!canShoot) return;
    canShoot = false;
    container.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    
    setTimeout(() => {
        canShoot = true;
        container.style.backgroundColor = '#70c5ce';
    }, reloadTime);
});

function updateScore() {
    score++;
    scoreDisplay.innerText = `Điểm: ${score}`;

    // 2. Kiểm tra nếu điểm hiện tại vượt kỷ lục
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerText = `Kỷ lục: ${highScore}`;
        // 3. Lưu kỷ lục mới vào bộ nhớ trình duyệt
        localStorage.setItem('birdGameHighScore', highScore);
    }
}

function createBird() {
    const bird = document.createElement('div');
    bird.classList.add('bird');

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    bird.style.left = `${centerX - 30}px`;
    bird.style.top = `${centerY - 30}px`;
    container.appendChild(bird);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;

    let posX = centerX - 30;
    let posY = centerY - 30;

    const moveInterval = setInterval(() => {
        posX += velocityX;
        posY += velocityY;
        bird.style.left = `${posX}px`;
        bird.style.top = `${posY}px`;

        if (posX < -100 || posX > window.innerWidth + 100 || 
            posY < -100 || posY > window.innerHeight + 100) {
            clearInterval(moveInterval);
            bird.remove();
        }
    }, 16);

    bird.addEventListener('mousedown', (e) => {
        if (canShoot) {
            updateScore(); // Gọi hàm cập nhật điểm và kỷ lục
            bird.style.backgroundColor = 'yellow';
            bird.style.transform = 'scale(1.5)';
            bird.style.opacity = '0';
            
            setTimeout(() => {
                clearInterval(moveInterval);
                bird.remove();
            }, 150);
        } else {
            e.stopPropagation();
        }
    });
}

setInterval(createBird, 800);
