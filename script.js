// 创建飘落的装饰元素
function createDecoration() {
    const decorations = ['🧧', '✨', '🏮'];
    const decoration = document.createElement('div');
    decoration.className = 'decoration';
    decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    
    // 随机位置和动画持续时间
    const left = Math.random() * 100;
    const animationDuration = 3 + Math.random() * 4;
    
    decoration.style.left = `${left}%`;
    decoration.style.animationDuration = `${animationDuration}s`;
    
    document.querySelector('.decorations').appendChild(decoration);
    
    // 动画结束后移除元素
    setTimeout(() => {
        decoration.remove();
    }, animationDuration * 1000);
}

// 定期创建新的装饰元素
setInterval(createDecoration, 1000);

// 添加鼠标移动效果
document.addEventListener('mousemove', (e) => {
    const snake = document.querySelector('.snake');
    const rect = snake.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 计算蛇头旋转角度
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    snake.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
});

document.querySelectorAll('.blessing-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // 移除之前的动画类
        this.classList.remove('clicked');
        
        // 触发重排以重新开始动画
        void this.offsetWidth;
        
        // 添加动画类
        this.classList.add('clicked');
        
        // 创建星星特效
        createSparkles(e.clientX, e.clientY);
    });
});

// 创建星星特效
function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        document.body.appendChild(sparkle);
        
        const angle = (i * 45) * Math.PI / 180;
        const velocity = 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // 使用动画
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${vx * 10}px, ${vy * 10}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => sparkle.remove();
    }
}

// 添加背景特效
function createBackgroundEffects() {
    // 创建星星
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 1}s`;
        starsContainer.appendChild(star);
    }

    // 创建雪花
    const snowflakesContainer = document.querySelector('.snowflakes');
    const symbols = ['✨', '⭐', '🌟', '✦', '✯'];
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random();
        snowflake.style.animation = `fall ${5 + Math.random() * 10}s linear infinite`;
        
        snowflakesContainer.appendChild(snowflake);
        
        // 当雪花落到底部时移除
        setTimeout(() => {
            snowflake.remove();
        }, 15000);
    }

    // 持续创建雪花
    setInterval(createSnowflake, 300);
}

// 页面加载完成后启动特效
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundEffects();
}); 