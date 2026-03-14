// ===== HERO 3D SCENE — SmartCanteen =====
// Self-contained Three.js scene for the hero section
// Creates floating 3D food objects with parallax mouse interaction
// V2 — Violet theme, slower/smoother animations, edge positioning

(function () {
    'use strict';

    // ── Configuration ──
    const CONFIG = {
        container: 'hero-3d-container',
        bgColor: 0x000000,
        bgAlpha: 0,                // fully transparent
        cameraZ: 16,               // pulled back for wider view
        ambientIntensity: 0.5,
        dirLightIntensity: 0.7,
        pointLightIntensity: 0.4,
        mouseInfluence: 0.4,       // reduced — subtler parallax
        floatSpeed: 0.0004,        // halved — much slower bob
        rotateSpeed: 0.0012,       // halved — slow elegant rotation
    };

    // ── Globals ──
    let scene, camera, renderer, foodObjects = [];
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let animFrameId = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    // ── Init ──
    function init() {
        const container = document.getElementById(CONFIG.container);
        if (!container) return;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.z = CONFIG.cameraZ;

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(CONFIG.bgColor, CONFIG.bgAlpha);
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(renderer.domElement);

        // Lights — violet-tinted
        const ambient = new THREE.AmbientLight(0xe8e0ff, CONFIG.ambientIntensity);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xf0eaff, CONFIG.dirLightIntensity);
        dirLight.position.set(5, 8, 10);
        scene.add(dirLight);

        // Main accent light — violet
        const pointLight = new THREE.PointLight(0x8b5cf6, CONFIG.pointLightIntensity, 35);
        pointLight.position.set(-5, 3, 5);
        scene.add(pointLight);

        // Rim light — deeper purple
        const rimLight = new THREE.PointLight(0x7c3aed, 0.25, 30);
        rimLight.position.set(5, -3, 3);
        scene.add(rimLight);

        // Subtle warm fill from below
        const fillLight = new THREE.PointLight(0xc084fc, 0.15, 20);
        fillLight.position.set(0, -5, 5);
        scene.add(fillLight);

        // Create food objects — positioned at edges, away from center content
        createBurger();
        createCoffeeCup();
        createPizzaSlice();
        createDrinkCan();
        createDonut();
        createApple();

        // Events
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        // Intersection Observer — pause when hero not visible
        const heroSection = document.getElementById('home');
        if (heroSection && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
                if (isVisible && !animFrameId) animate();
            }, { threshold: 0.05 });
            observer.observe(heroSection);
        }

        animate();
    }

    // ── Helpers ──
    function makeMat(color, opts = {}) {
        return new THREE.MeshStandardMaterial({
            color,
            roughness: opts.roughness ?? 0.5,
            metalness: opts.metalness ?? 0.08,
            flatShading: opts.flat ?? false,
        });
    }

    function addFoodObject(mesh, x, y, z, scale, rotOffset) {
        mesh.position.set(x, y, z);
        mesh.scale.setScalar(scale);
        scene.add(mesh);
        foodObjects.push({
            mesh,
            baseY: y,
            baseX: x,
            phaseOffset: rotOffset,
            floatAmplitude: 0.15 + Math.random() * 0.15,  // smaller float range
            rotSpeedX: (Math.random() - 0.5) * 0.0008,     // very gentle tilt
            rotSpeedY: CONFIG.rotateSpeed + Math.random() * 0.0008,
        });
    }

    // ── 🍔 Burger — top-left edge ──
    function createBurger() {
        const group = new THREE.Group();

        // Bottom bun
        const bunGeo = new THREE.CylinderGeometry(1, 1.05, 0.35, 32);
        const bunMat = makeMat(0xe8a849);
        const bottomBun = new THREE.Mesh(bunGeo, bunMat);
        bottomBun.position.y = -0.3;
        group.add(bottomBun);

        // Patty
        const pattyGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.22, 32);
        const pattyMat = makeMat(0x5c3317, { roughness: 0.8 });
        const patty = new THREE.Mesh(pattyGeo, pattyMat);
        patty.position.y = 0;
        group.add(patty);

        // Lettuce
        const lettuceGeo = new THREE.CylinderGeometry(1.05, 1, 0.1, 20);
        const lettuceMat = makeMat(0x4caf50);
        const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
        lettuce.position.y = 0.15;
        group.add(lettuce);

        // Cheese
        const cheeseGeo = new THREE.BoxGeometry(1.5, 0.06, 1.5);
        const cheeseMat = makeMat(0xffc107);
        const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
        cheese.position.y = 0.25;
        cheese.rotation.y = Math.PI / 4;
        group.add(cheese);

        // Top bun
        const topBunGeo = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const topBun = new THREE.Mesh(topBunGeo, bunMat);
        topBun.position.y = 0.4;
        group.add(topBun);

        // Sesame seeds
        const seedGeo = new THREE.SphereGeometry(0.05, 8, 6);
        const seedMat = makeMat(0xfff8e1);
        for (let i = 0; i < 8; i++) {
            const seed = new THREE.Mesh(seedGeo, seedMat);
            const angle = (i / 8) * Math.PI * 2;
            seed.position.set(Math.cos(angle) * 0.6, 0.78 + Math.random() * 0.1, Math.sin(angle) * 0.6);
            group.add(seed);
        }

        // Positioned far left, upper area
        addFoodObject(group, -7, 2.5, -3, 0.55, 0);
    }

    // ── ☕ Coffee Cup — far right, upper ──
    function createCoffeeCup() {
        const group = new THREE.Group();

        // Cup body (tapered cylinder)
        const cupGeo = new THREE.CylinderGeometry(0.6, 0.45, 1.2, 32);
        const cupMat = makeMat(0xfafafa, { roughness: 0.25, metalness: 0.02 });
        const cup = new THREE.Mesh(cupGeo, cupMat);
        group.add(cup);

        // Coffee inside
        const coffeeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 24);
        const coffeeMat = makeMat(0x3e2723);
        const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
        coffee.position.y = 0.55;
        group.add(coffee);

        // Handle (torus)
        const handleGeo = new THREE.TorusGeometry(0.3, 0.06, 12, 20, Math.PI);
        const handle = new THREE.Mesh(handleGeo, cupMat);
        handle.position.set(0.75, 0, 0);
        handle.rotation.z = Math.PI / 2;
        group.add(handle);

        // Steam particles — slow, ethereal
        const steamMat = new THREE.MeshStandardMaterial({
            color: 0xe8e0ff, // slight violet tint to steam
            transparent: true,
            opacity: 0.18,
            roughness: 1,
        });
        for (let i = 0; i < 3; i++) {
            const steamGeo = new THREE.CylinderGeometry(0.02, 0.04, 0.6, 6);
            const steam = new THREE.Mesh(steamGeo, steamMat.clone());
            steam.position.set((i - 1) * 0.2, 1.0 + i * 0.15, 0);
            steam.rotation.z = (i - 1) * 0.15;
            steam.userData.isSteam = true;
            steam.userData.steamPhase = i * 1.5;
            group.add(steam);
        }

        // Positioned far right, upper area
        addFoodObject(group, 7, 3, -2, 0.6, 1);
    }

    // ── 🍕 Pizza Slice — far left, lower ──
    function createPizzaSlice() {
        const group = new THREE.Group();

        // Crust base
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(1.2, 1.8);
        shape.quadraticCurveTo(0, 2.2, -1.2, 1.8);
        shape.lineTo(0, 0);

        const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 4 };
        const sliceGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const sliceMat = makeMat(0xf4a460);
        const slice = new THREE.Mesh(sliceGeo, sliceMat);
        slice.rotation.x = -Math.PI / 2;
        group.add(slice);

        // Cheese layer
        const cheeseShape = new THREE.Shape();
        cheeseShape.moveTo(0, 0.05);
        cheeseShape.lineTo(1.0, 1.6);
        cheeseShape.quadraticCurveTo(0, 1.95, -1.0, 1.6);
        cheeseShape.lineTo(0, 0.05);
        const cheeseGeo = new THREE.ExtrudeGeometry(cheeseShape, { depth: 0.04, bevelEnabled: false });
        const cheeseMat = makeMat(0xfdd835);
        const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
        cheese.rotation.x = -Math.PI / 2;
        cheese.position.y = 0.13;
        group.add(cheese);

        // Pepperoni
        const pepGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 12);
        const pepMat = makeMat(0xc62828);
        const pepPositions = [
            [0, 0.18, -0.8],
            [0.4, 0.18, -1.3],
            [-0.35, 0.18, -1.2],
            [0.1, 0.18, -1.6],
        ];
        pepPositions.forEach(p => {
            const pep = new THREE.Mesh(pepGeo, pepMat);
            pep.position.set(...p);
            group.add(pep);
        });

        group.rotation.x = 0.4;
        // Positioned far left, lower area
        addFoodObject(group, -6.5, -3, -2.5, 0.5, 2);
    }

    // ── 🧃 Drink Can — far right, lower ──
    function createDrinkCan() {
        const group = new THREE.Group();

        // Can body — purple tint instead of red
        const canGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.4, 32);
        const canMat = makeMat(0x7c3aed, { metalness: 0.35, roughness: 0.25 });
        const can = new THREE.Mesh(canGeo, canMat);
        group.add(can);

        // Top rim
        const rimGeo = new THREE.TorusGeometry(0.38, 0.04, 10, 28);
        const rimMat = makeMat(0xd4d4d8, { metalness: 0.6, roughness: 0.2 });
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = 0.7;
        group.add(rim);

        // Bottom rim
        const rimBottom = rim.clone();
        rimBottom.position.y = -0.7;
        group.add(rimBottom);

        // Label stripe
        const labelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.5, 32);
        const labelMat = makeMat(0xfafafa, { roughness: 0.5 });
        const label = new THREE.Mesh(labelGeo, labelMat);
        label.position.y = 0.1;
        group.add(label);

        // Positioned far right, lower area
        addFoodObject(group, 7.5, -2.5, -3, 0.55, 3);
    }

    // ── 🍩 Donut — top-center area, offset ──
    function createDonut() {
        const group = new THREE.Group();

        // Dough
        const doughGeo = new THREE.TorusGeometry(0.7, 0.35, 20, 32);
        const doughMat = makeMat(0xd4a056);
        const dough = new THREE.Mesh(doughGeo, doughMat);
        group.add(dough);

        // Glazing — violet-pink for theme coherence
        const glazeGeo = new THREE.TorusGeometry(0.7, 0.36, 20, 32, Math.PI * 2);
        const glazeMat = makeMat(0xa78bfa, { roughness: 0.2, metalness: 0.1 });
        const glaze = new THREE.Mesh(glazeGeo, glazeMat);
        glaze.position.y = 0.05;
        group.add(glaze);

        // Sprinkles
        const sprinkleColors = [0xfbbf24, 0x34d399, 0x60a5fa, 0xfb7185, 0xfafafa];
        for (let i = 0; i < 20; i++) {
            const sprGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 4);
            const sprMat = makeMat(sprinkleColors[i % sprinkleColors.length]);
            const spr = new THREE.Mesh(sprGeo, sprMat);
            const angle = (i / 20) * Math.PI * 2;
            const r = 0.65 + Math.random() * 0.15;
            spr.position.set(Math.cos(angle) * r, 0.3, Math.sin(angle) * r);
            spr.rotation.set(Math.random(), Math.random(), Math.random());
            group.add(spr);
        }

        group.rotation.x = 0.6;
        // Positioned top-left area, far from center
        addFoodObject(group, -3, 4.5, -4, 0.45, 4);
    }

    // ── 🍎 Apple — far right upper edge ──
    function createApple() {
        const group = new THREE.Group();

        // Body (squished sphere)
        const bodyGeo = new THREE.SphereGeometry(0.65, 28, 24);
        const bodyMat = makeMat(0xd32f2f);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.scale.y = 0.85;
        group.add(body);

        // Highlight
        const highlightGeo = new THREE.SphereGeometry(0.2, 12, 8);
        const highlightMat = new THREE.MeshStandardMaterial({
            color: 0xff6659,
            transparent: true,
            opacity: 0.35,
            roughness: 0.2,
        });
        const highlight = new THREE.Mesh(highlightGeo, highlightMat);
        highlight.position.set(0.3, 0.25, 0.4);
        group.add(highlight);

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.3, 8);
        const stemMat = makeMat(0x5d4037);
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.6;
        stem.rotation.z = 0.15;
        group.add(stem);

        // Leaf
        const leafShape = new THREE.Shape();
        leafShape.moveTo(0, 0);
        leafShape.quadraticCurveTo(0.2, 0.15, 0.4, 0);
        leafShape.quadraticCurveTo(0.2, -0.05, 0, 0);
        const leafGeo = new THREE.ExtrudeGeometry(leafShape, { depth: 0.02, bevelEnabled: false });
        const leafMat = makeMat(0x388e3c);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(0.05, 0.65, 0);
        leaf.rotation.set(-0.3, 0, 0.4);
        group.add(leaf);

        // Positioned far right, upper area
        addFoodObject(group, 4.5, 4.5, -3.5, 0.5, 5);
    }

    // ── Animation Loop — slow and smooth ──
    function animate() {
        if (!isVisible) {
            animFrameId = null;
            return;
        }
        animFrameId = requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        // Ultra-smooth mouse follow (lerp factor reduced)
        mouseX += (targetMouseX - mouseX) * 0.025;
        mouseY += (targetMouseY - mouseY) * 0.025;

        // Animate each food object
        foodObjects.forEach((obj) => {
            const t = elapsed + obj.phaseOffset;

            // Slow floating bob — gentle sine wave
            obj.mesh.position.y = obj.baseY + Math.sin(t * 0.5) * obj.floatAmplitude;

            // Very gentle rotation
            obj.mesh.rotation.y += obj.rotSpeedY;
            obj.mesh.rotation.x += obj.rotSpeedX;

            // Subtle mouse parallax — objects further from center move slightly
            const parallaxStrength = 0.15 + Math.abs(obj.baseX) * 0.02;
            obj.mesh.position.x = obj.baseX + mouseX * CONFIG.mouseInfluence * parallaxStrength;

            // Animate steam on coffee cup — slow and dreamy
            obj.mesh.traverse((child) => {
                if (child.userData && child.userData.isSteam) {
                    const sp = child.userData.steamPhase;
                    child.position.y = 1.0 + Math.sin(elapsed * 0.8 + sp) * 0.12 + sp * 0.15;
                    child.material.opacity = 0.12 + Math.sin(elapsed * 0.6 + sp) * 0.06;
                }
            });
        });

        // Very subtle camera drift from mouse
        camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.01;
        camera.position.y += (mouseY * 0.15 - camera.position.y) * 0.01;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    // ── Events ──
    function onMouseMove(e) {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onResize() {
        const container = document.getElementById(CONFIG.container);
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // ── Start when DOM ready ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
