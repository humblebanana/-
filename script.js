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

// 点击祝福语的爆竹效果
document.querySelectorAll('.blessing-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // 移除之前的动画类
        this.classList.remove('clicked');
        void this.offsetWidth;
        this.classList.add('clicked');
        
        // 获取点击位置（适配移动端）
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        
        // 创建爆竹效果
        createFireworks(x, y);
    });

    // 添加触摸事件支持
    item.addEventListener('touchstart', function(e) {
        e.preventDefault(); // 防止触发点击事件
        const touch = e.touches[0];
        createFireworks(touch.clientX, touch.clientY);
    });
});

// 修改爆竹效果函数，使其在移动端更明显
function createFireworks(x, y) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 增大粒子尺寸，使其在移动端更容易看到
        particle.style.width = '8px';
        particle.style.height = '8px';
        
        document.body.appendChild(particle);
        
        const angle = (i * 30) * Math.PI / 180;
        const velocity = 15; // 增加速度
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        // 设置初始位置
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // 使用动画
        particle.animate([
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
        }).onfinish = () => particle.remove();
    }
}

// 添加爆竹粒子的样式
const style = document.createElement('style');
style.textContent = `
    .firework-particle {
        position: fixed;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

// 修改背景特效创建函数
function createBackgroundEffects() {
    const starsContainer = document.querySelector('.stars');
    const snowflakesContainer = document.querySelector('.snowflakes');
    const symbols = ['🧧', '🏮', '💰'];
    
    // 添加最大雪花数量限制
    const MAX_SNOWFLAKES = 100; // 限制同时存在的雪花数量
    
    // 创建星星的代码保持不变
    function createStars() {
        starsContainer.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsContainer.appendChild(star);
        }
    }

    function createSnowflake() {
        // 检查当前雪花数量
        if (snowflakesContainer.children.length >= MAX_SNOWFLAKES) {
            return; // 如果超过最大数量，不创建新雪花
        }

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `${Math.random() * 100}%`;
        
        const size = 0.8 + Math.random() * 1;
        snowflake.style.fontSize = `${size}em`;
        
        snowflake.style.opacity = 0.6 + Math.random() * 0.4;
        
        const duration = 4 + Math.random() * 4;
        
        snowflake.style.animation = `
            twinkle ${duration}s infinite,
            float ${duration * 2}s infinite
        `;
        
        snowflakesContainer.appendChild(snowflake);
        
        setTimeout(() => {
            snowflake.remove();
        }, duration * 2000);
    }

    // 初始化
    createStars();
    setInterval(createStars, 5000);
    
    // 降低雪花生成频率，从300ms改为1500ms
    setInterval(createSnowflake, 600); // 每1.5秒生成一个雪花
}

// 确保函数在页面加载完成后执行
document.addEventListener('DOMContentLoaded', createBackgroundEffects); 