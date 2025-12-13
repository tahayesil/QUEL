// assets/js/shader.js

function initShaderBackground(canvasId) {
<<<<<<< HEAD
    console.log("Initializing Shader (Complex Version) for:", canvasId);
    const canvas = document.getElementById(canvasId);

=======
    console.log("Shader başlatılıyor...", canvasId); // Kontrol Logu
    const canvas = document.getElementById(canvasId);
    
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
    if (!canvas) {
        console.error("HATA: Shader canvas bulunamadı! ID:", canvasId);
        return;
    }
<<<<<<< HEAD
=======

    // Canvas boyutlarını hemen ayarla
    const resizeCanvas = () => {
        if(canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        // WebGL viewport güncellemesi render içinde yapılacak
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // İlk boyutlandırma
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.warn('WebGL desteklenmiyor.');
        return;
    }

    // Vertex Shader
    const vsSource = \`
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    \`;

<<<<<<< HEAD
    // Fragment Shader - Ported from React component
    const fsSource = \`
=======
    // Fragment shader source code (Hata vermemesi için precision eklendi)
    const fsSource = `
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
        precision highp float;
        uniform vec2 iResolution;
        uniform float iTime;

        // Sabitler
        const float scale = 5.0;
        const vec4 gridColor = vec4(0.5);
        const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);
        const vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);
        const vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);

        // Yardımcı Fonksiyonlar
        float random(float t) {
            return fract(sin(t) * 43758.5453123); // Daha güvenli random fonksiyonu
        }

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            vec2 uv = fragCoord.xy / iResolution.xy;
            
<<<<<<< HEAD
            // Fix aspect ratio scaling using the React code logic
            // React code: vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;
            vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

            float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
            float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

            space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
            space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

            vec4 lines = vec4(0.0);
            vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);
            vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);

            for(int l = 0; l < linesPerGroup; l++) {
                float normalizedLineIndex = float(l) / float(linesPerGroup);
                float offsetTime = iTime * offsetSpeed;
                float offsetPosition = float(l) + space.x * offsetFrequency;
                float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
                float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
                float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
                float linePosition = getPlasmaY(space.x, horizontalFade, offset);
                float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

                float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
                vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
                float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

                line = line + circle;
                lines += line * lineColor * rand;
=======
            // Basit bir dalga efekti (Performanslı ve garantili)
            float time = iTime * 0.5;
            
            // Arka plan gradyanı
            vec4 color = mix(bgColor1, bgColor2, uv.y);
            
            // Dalgalar
            for(float i = 1.0; i < 4.0; i++) {
                float wave = sin(uv.x * 3.0 * i + time + i * 135.0) * 0.1;
                wave += sin(uv.x * 7.0 * i - time * 0.5) * 0.05;
                
                float line = 0.005 / abs(uv.y - 0.5 + wave);
                color += lineColor * line * (0.5 / i);
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
            }

            // Hafif vignette
            float vig = 1.0 - length(uv - 0.5);
            color *= vig * 1.5;

            gl_FragColor = vec4(color.rgb, 1.0);
        }
    \`;

<<<<<<< HEAD
    // Shader Compile Helper
=======
    // Shader Derleme Yardımcısı
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
    const loadShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader derleme hatası: ', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Shader program link hatası: ', gl.getProgramInfoLog(shaderProgram));
        return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
<<<<<<< HEAD
    const positions = [
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
    ];
=======
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
            time: gl.getUniformLocation(shaderProgram, 'iTime'),
        },
    };

<<<<<<< HEAD
    const resizeCanvas = () => {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

=======
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
    let startTime = Date.now();
    function render() {
        resizeCanvas(); // Her karede boyutu kontrol et (Garanti olsun)
        gl.viewport(0, 0, canvas.width, canvas.height);
        
        const currentTime = (Date.now() - startTime) / 1000;

        gl.clearColor(0.0, 0.0, 0.0, 0.0); // Transparent background
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(programInfo.program);
        gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
        gl.uniform1f(programInfo.uniformLocations.time, currentTime);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }
    
    console.log("Shader render döngüsü başlıyor...");
    render();
}

<<<<<<< HEAD
// Auto-init specific to the Hero Section
document.addEventListener('DOMContentLoaded', () => {
    initShaderBackground('hero-shader-canvas');
});
=======
// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    // Biraz gecikmeli başlat ki CSS tam otursun
    setTimeout(() => {
        initShaderBackground('hero-shader-canvas');
    }, 100);
});
>>>>>>> 675b8f45d8436c901d14fe653c84cb19194a0ced
