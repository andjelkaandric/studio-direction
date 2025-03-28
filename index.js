//ukiyo
const ukiyoElements = document.querySelectorAll(".ukiyo");

ukiyoElements.forEach((element) => {
	new Ukiyo(element, {
		scale: 1.2,
		speed: 1.5,
		willChange: true,
		externalRAF: false,
	});
});

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
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a109b4599d1ddb69ff26_render-1.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10947c0f53f2bff7d20_render-2.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10954b317bbb8e31bc3_render-3.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a108a1725de2cfc9be66_render-4.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1086e50ab2af90e3f8a_render-5.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1098804f13ab81e66fe_render-6.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1090247773b1899dc97_render-7.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1080093897ac0aef521_render-8.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10871f6156fa658f55a_render-9.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1088804f13ab81e66ca_render-10.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10843e1f70466d8003f_render-11.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a109ae15cc6adf5407fa_render-12.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1093340fee1c5d31778_render-13.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a1093b44bd59c9a07f8b_render-14.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10923eb80bb58253ae7_render-15.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a109c2e52864a07ab83c_render-16.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10cea0b49c5652ee2fb_render-17.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a109c2e52864a07ab80b_render-18.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a109df9d6be9c846e727_render-19.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10ab9fd4a41e9558d24_render-20.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b767e34f64d3ff62b_render-21.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b2f7b4856ae9454dc_render-22.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a8a2a29f3ca9377c0_render-23.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a320c2d93ad5c9b23_render-24.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a69540a7e8bc79e43_render-25.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a61380854c778eea2_render-26.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a0f5547c294544fd5_render-27.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a69540a7e8bc79e40_render-28.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10a301e588f2c77a9c6_render-29.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10ba5ee6fcb6e5bb950_render-30.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a11e36cd219e2f375ac5_render-31.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b713f0f794f614a67_render-32.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10bbf68d31a5f0935f0_render-33.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b4fd512c5b6edb7c6_render-34.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10ba64745e90740695b_render-35.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10ba5ee6fcb6e5bb97e_render-36.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b0093897ac0aefb9f_render-37.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b32f29a7f7a19d484_render-38.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10b7b1e3b6003c44cf6_render-39.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6a10c0db1d1c5f4e56fb5_render-40.avif",
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
		x: "120px",
		opacity: 0,
		filter: "blur(8px)",
		ease: "power2.out",
		duration: 0.8,
		stagger: 0.2,
		ease: "power2.out",
		scrollTrigger: {
			trigger: ".track__item",
			start: "top 90%",
			end: "bottom 20%",
			toggleActions: "play none none none",
		},
	});
}
animateTrackItems();

// horizontal scroll
function setupHorizontalScroll() {
	// Select the container
	const container = document.querySelector(".track__wrap");

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
			trigger: "#horizontal-trigger",
			scrub: 1,
			start: "top bottom",
			end: "top top",
			invalidateOnRefresh: true,
			// markers: true, // Uncomment for debugging
		},
	});
}

setupHorizontalScroll();
window.addEventListener("resize", setupHorizontalScroll);

// horizontal scroll overlay
function setupHorizontalScrollOverlay() {
	// Select the container
	const trackOver = document.querySelector(".track__over");
	const trackOverColor = document.querySelector(".track__over-color");

	if (!trackOver) return;

	// horizontal scroll animation for overlay
	gsap.from(trackOver, {
		x: "-100vw",
		ease: "none",
		scrollTrigger: {
			trigger: "#horizontal-trigger",
			scrub: 1,
			start: "top bottom",
			end: "top top",
			invalidateOnRefresh: true,
		},
	});

	// Create horizontal scroll animation
	gsap.to(trackOverColor, {
		width: "100%",
		ease: "none",
		scrollTrigger: {
			trigger: "#horizontal-trigger",
			scrub: 1,
			start: "bottom top",
			end: "bottom -10px",
			invalidateOnRefresh: true,
		},
	});
	gsap.to(trackOver, {
		color: "#3EC172",
		ease: "none",
		scrollTrigger: {
			trigger: "#horizontal-trigger",
			scrub: 1,
			start: "bottom top",
			end: "bottom -10px",
			invalidateOnRefresh: true,
		},
	});
}

setupHorizontalScrollOverlay();
window.addEventListener("resize", setupHorizontalScrollOverlay);

//swiper slider
const swiperThree = new Swiper("#swiper-three", {
	slidesPerView: 1,
	spaceBetween: 12,
	freeMode: false,
	speed: 800,
	scrollbar: {
		el: "#scrollbar-three",
	},
	navigation: {
		prevEl: "#three-prev",
		nextEl: "#three-next",
	},
	breakpoints: {
		1920: {
			slidesPerView: 4,
			freeMode: true,
			spaceBetween: 32,
		},
		992: {
			slidesPerView: 4,
			freeMode: true,
			spaceBetween: 32,
		},
		479: {
			slidesPerView: 2,
			freeMode: true,
			spaceBetween: 32,
		},
	},
});

//huge slider
document.addEventListener("DOMContentLoaded", () => {
	const hugeSlides = document.querySelectorAll(".swiper-slide.huge-slide");
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: "#huge-slider-trigger",
			start: "top bottom",
			end: "top top",
			scrub: true,
		},
	});
	tl.to(
		hugeSlides[1],
		{
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			ease: "sine.out",
		},
		"0"
	);
	tl.to(
		hugeSlides[1].querySelector(".huge-image .image"),
		{
			scale: 1.2,
			ease: "sine.out",
		},
		"0"
	);
	tl.to(
		hugeSlides[0].querySelector(".huge-image .image"),
		{
			scale: 1,
			y: "-80px",
			ease: "sine.out",
		},
		"0"
	);
	let tlSec = gsap.timeline({
		scrollTrigger: {
			trigger: "#huge-slider-trigger-second",
			start: "top bottom",
			end: "top top",
			scrub: true,
		},
	});
	tlSec.to(
		hugeSlides[2],
		{
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			ease: "sine.out",
		},
		"0"
	);
	tlSec.to(
		hugeSlides[2].querySelector(".huge-image .image"),
		{
			scale: 1.2,
			ease: "sine.out",
		},
		"0"
	);
	tlSec.to(
		hugeSlides[1].querySelector(".huge-image .image"),
		{
			scale: 1,
			y: "-80px",
			ease: "sine.out",
		},
		"0"
	);
});

//slider testimonials video
const swiperTestimonialsVideo = new Swiper(".swiper.testimonials-video", {
	slidesPerView: 1,
	spaceBetween: 12,
	freeMode: false,
	speed: 800,
	navigation: {
		nextEl: ".swiper-button-next.testimonials-video-btn",
		prevEl: ".swiper-button-prev.testimonials-video-btn",
	},
	scrollbar: {
		el: ".swiper-scrollbar.testimonials-video",
	},
	breakpoints: {
		1920: {
			slidesPerView: 1.2,
			freeMode: true,
			spaceBetween: 32,
		},
		992: {
			slidesPerView: 1.2,
			freeMode: true,
			spaceBetween: 32,
		},
	},
});

// Handle Testimonial video play
document.querySelectorAll(".testimonial__play").forEach((button) => {
	button.addEventListener("click", function () {
		// Find the parent testimonial container
		const testimonial = this.closest(".swiper-slide.testimonial");

		// Find the video and overlay within the same container
		const video = testimonial.querySelector("#testimonial-video");
		const overlay = testimonial.querySelector(".testimonial__over");

		if (video && overlay) {
			// Play the video
			video.play();
			video.setAttribute("controls", "true");

			// Hide the overlay
			overlay.style.opacity = "0";
			setTimeout(() => {
				overlay.style.display = "none";
			}, 300);

			// Request fullscreen mode
			if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen(); // Safari
			} else if (video.msRequestFullscreen) {
				video.msRequestFullscreen(); // Internet Explorer/Edge
			}

			// Listen for fullscreen exit
			document.addEventListener("fullscreenchange", handleFullscreenExit);
			document.addEventListener("webkitfullscreenchange", handleFullscreenExit);
			document.addEventListener("msfullscreenchange", handleFullscreenExit);

			function handleFullscreenExit() {
				if (
					!document.fullscreenElement &&
					!document.webkitFullscreenElement &&
					!document.msFullscreenElement
				) {
					// Pause the video
					video.pause();

					// Remove video controls
					video.removeAttribute("controls");

					// Show the overlay
					overlay.style.display = "flex";
					setTimeout(() => {
						overlay.style.opacity = "1";
					}, 10);

					// Remove event listener to avoid unnecessary calls
					document.removeEventListener(
						"fullscreenchange",
						handleFullscreenExit
					);
					document.removeEventListener(
						"webkitfullscreenchange",
						handleFullscreenExit
					);
					document.removeEventListener(
						"msfullscreenchange",
						handleFullscreenExit
					);
				}
			}
		}
	});
});

/* accordion */
var triggers = document.querySelectorAll(".acc__trigger");

triggers.forEach(function (trigger) {
	trigger.addEventListener("click", function () {
		this.classList.toggle("active");
	});
});

// faq hover
if (window.innerWidth > 992) {
	const faqTriggers = document.querySelectorAll(".acc__trigger");

	faqTriggers.forEach((item, index) => {
		item.addEventListener("mouseenter", () => {
			faqTriggers.forEach((otherItem) => {
				if (otherItem !== item) {
					otherItem.closest(".acc__item").style.opacity = 0.3;
				}
			});
		});

		item.addEventListener("mouseleave", () => {
			faqTriggers.forEach((otherItem) => {
				otherItem.closest(".acc__item").style.opacity = 1;
			});
		});
	});
}

//tiles GRID SCROLL ANIMATION
if (window.innerWidth > 992) {
	gsap.fromTo(
		".tiles__line-img[data-move='max']",
		{ x: "300px" },
		{
			x: "-40px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power1.out",
		}
	);
	gsap.fromTo(
		".tiles__line-img[data-move='mid']",
		{ x: "150px" },
		{
			x: "-24px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power2.out",
		}
	);
	gsap.fromTo(
		".tiles__line-img[data-move='min']",
		{ x: "50px" },
		{
			x: "-8px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power3.out",
		}
	);
	gsap.fromTo(
		".tiles__line-img[data-move='max-right']",
		{ x: "-300px" },
		{
			x: "40px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power1.out",
		}
	);
	gsap.fromTo(
		".tiles__line-img[data-move='mid-right']",
		{ x: "-100px" },
		{
			x: "24px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power2.out",
		}
	);
	gsap.fromTo(
		".tiles__line-img[data-move='min-right']",
		{ x: "-50px" },
		{
			x: "8px",
			scrollTrigger: {
				trigger: ".tiles",
				start: "top bottom",
				end: "bottom center",
				scrub: true,
				markers: false,
			},
			ease: "power3.out",
		}
	);
}
