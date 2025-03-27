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
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d10297bc19bdfd33d15_render-1.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d11012bb56b22a3d409_render-2.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d1156f5c157b8fb49bc_render-3.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d10104229dd085e8127_render-4.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e53d119b524bbda1c25486_render-5.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54247f9588832f00d2d01_render-6.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424773a60355b2250a68_render-7.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54247fb71cb149bd1087a_render-8.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542474be009508f12ff3f_render-9.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542478b2c5a85ecbb371f_render-10.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54247b8502ff1c4b4568d_render-11.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54247e0571be58a4f779d_render-12.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424729ff45a01753f4cb_render-13.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424726c2800695382a95_render-14.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542471fb19bf6f83c5b25_render-15.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424829ff45a01753f64b_render-16.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54247ab90c360913d3429_render-17.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542485e17a32f80689144_render-18.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54248914eeda96ac68ca5_render-19.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542489ea0dde17783e632_render-20.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542483d104600d7ec072e_render-21.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424935f211d28eeb92df_render-22.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54248d120826e227a19be_render-23.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54248d120826e227a19c2_render-24.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54248a40a04ef7d231e58_render-25.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424833dba2a9fe78571b_render-26.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54249f872cdfc7bf2463b_render-27.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e5424929ff45a01753faa5_render-28.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e542494be009508f13019e_render-29.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e54249aff8b31bf6432d9a_render-30.avif",
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
		trigger: ".o-section.morph",
		start: "top top",
		end: "bottom bottom",
		// pin: true,
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

// Track animation
function animateTrackItems() {
	const trackItems = document.querySelectorAll(".track__item");
	gsap.from(trackItems, {
		x: "300px",
		y: "-220px",
		opacity: 0,
		filter: "blur(8px)",
		rotate: 180,
		ease: "power2.out",
		duration: 0.8,
		stagger: 0.2,
		ease: "power2.out",
		scrollTrigger: {
			trigger: ".track__item",
			start: "top 80%",
			end: "bottom 20%",
			toggleActions: "play none none none",
		},
	});
}
animateTrackItems();

// horizontal scroll
function setupHorizontalScroll() {
    // Select the container
    const container = document.querySelector('.track__wrap');
    
    if (!container) return;
  
    // Calculate scroll distances
    const parentWidth = container.parentElement.clientWidth;
    const trackWrapWidth = container.scrollWidth;
    const scrollDistance = trackWrapWidth - parentWidth;
  
    // Create horizontal scroll animation
    gsap.to(container, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        scrub: 1,
        start: "top center",
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
        // markers: true, // Uncomment for debugging
      }
    });
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', setupHorizontalScroll);
  
  // Recalculate on window resize
  window.addEventListener('resize', setupHorizontalScroll);