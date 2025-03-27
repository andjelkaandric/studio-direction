//test

//radi

    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");
    
    // Set canvas to full viewport width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Responsive resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-render the current frame after resize
        render();
    });
    
    const frameCount = 147;
    const currentFrame = (index) =>
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
            index + 1
        )
            .toString()
            .padStart(4, "0")}.jpg`;
    
    const images = [];
    const airpods = {
        frame: 0,
    };
    
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }
    
    gsap.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: ".canvas-container",
            start: "top top",
            end: "+=3500",
            pin: true,
            scrub: 0.5,
        },
        onUpdate: render,
    });
    
    images[0].onload = render;
    
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
    }
 










