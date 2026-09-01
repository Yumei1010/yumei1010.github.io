/*!
 * 鼠标拖尾特效（适配 Gmeek）
 * 基于 cpython666.github.io 的 mouse-trail.js 精简适配
 * 原特效：Canvas 跟随鼠标绘制红→蓝渐变色拖尾线
 */
(function () {
    const config = {
        maxTrailLength: 10,   // 拖尾最大点数
        lineWidth: 3,         // 线条宽度
        startColor: [255, 0, 0],   // 起点色（红）
        endColor: [0, 0, 255],     // 终点色（蓝）
        fadeOutSpeed: 1       // 每帧淡出点数
    };

    let canvas = null;
    let animationId = null;
    let mouseMoveHandler = null;
    let resizeHandler = null;

    function initMouseTrail() {
        cleanupMouseTrail();

        canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999999';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const activeCanvas = canvas;
        const ctx = activeCanvas.getContext('2d');
        let trail = [];
        let lastMousePosition = { x: 0, y: 0 };

        function lerpColor(a, b, amount) {
            const [ar, ag, ab] = a;
            const [br, bg, bb] = b;
            return [
                ar + amount * (br - ar),
                ag + amount * (bg - ag),
                ab + amount * (bb - ab)
            ].map(Math.round);
        }

        function draw() {
            ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);

            for (let i = 1; i < trail.length; i++) {
                const gradientRatio = i / trail.length;
                const color = lerpColor(config.startColor, config.endColor, gradientRatio);

                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                ctx.lineWidth = config.lineWidth;
                ctx.stroke();
            }
        }

        function updateTrail() {
            if (lastMousePosition.x !== 0 && lastMousePosition.y !== 0) {
                trail.push({ ...lastMousePosition });
            }

            if (trail.length > config.maxTrailLength) {
                trail = trail.slice(config.fadeOutSpeed);
            }
        }

        mouseMoveHandler = function (event) {
            lastMousePosition.x = event.pageX;
            lastMousePosition.y = event.pageY - window.scrollY;
        };

        resizeHandler = function () {
            activeCanvas.width = window.innerWidth;
            activeCanvas.height = window.innerHeight;
        };

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('resize', resizeHandler);

        function animate() {
            updateTrail();
            draw();
            animationId = requestAnimationFrame(animate);
        }

        animate();
    }

    function cleanupMouseTrail() {
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        if (mouseMoveHandler) {
            window.removeEventListener('mousemove', mouseMoveHandler);
            mouseMoveHandler = null;
        }
        if (resizeHandler) {
            window.removeEventListener('resize', resizeHandler);
            resizeHandler = null;
        }
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
        canvas = null;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMouseTrail);
    } else {
        initMouseTrail();
    }
})();
