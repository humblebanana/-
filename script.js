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
        
        // 创建多组爆竹效果
        createFireworks(e.clientX, e.clientY);
    });
});

function createFireworks(x, y) {
    // 创建多波爆竹效果
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            // 每波创建多个火花
            for (let i = 0; i < 12; i++) {
                const spark = document.createElement('div');
                spark.className = 'firework-spark';
                document.body.appendChild(spark);

                // 随机角度和速度
                const angle = (i * 30 + Math.random() * 20) * Math.PI / 180;
                const velocity = 8 + Math.random() * 8;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                spark.style.left = x + 'px';
                spark.style.top = y + 'px';
                
                // 使用动画
                spark.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${vx * 15}px, ${vy * 15}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => spark.remove();
            }
        }, wave * 200); // 每波之间间隔200ms
    }
}

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