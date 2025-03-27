const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

// Set canvas to full viewport width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Responsive resizing
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	// Re-render the current frame after resize
	render();
});

// Specific image URLs
const imageUrls = [
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d10297bc19bdfd33d15_render-1.jpg",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d11012bb56b22a3d409_render-2.jpg",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d1156f5c157b8fb49bc_render-3.jpg",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d10104229dd085e8127_render-4.jpg",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d119b524bbda1c25486_render-5.jpg",
];

const frameCount = imageUrls.length;
const images = [];
const sequenceState = {
	frame: 0,
};

// Preload images
imageUrls.forEach((url, index) => {
	const img = new Image();
	img.src = url;
	images.push(img);
});

// GSAP animation with ScrollTrigger
gsap.to(sequenceState, {
	frame: frameCount - 1,
	snap: "frame",
	ease: "none",
	scrollTrigger: {
		trigger: ".canvas-container",
		start: "top top",
		end: "bottom center",
		pin: true,
		scrub: 0.5,
	},
	onUpdate: render,
});

// First image load triggers initial render
images[0].onload = render;

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(
		images[Math.round(sequenceState.frame)],
		0,
		0,
		canvas.width,
		canvas.height
	);
}
