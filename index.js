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
            document.addEventListener(
                "webkitfullscreenchange",
                handleFullscreenExit
            );
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
document.addEventListener("DOMContentLoaded", function () {
    var triggers = document.querySelectorAll(".acc__trigger");

    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            this.classList.toggle("active");
        });
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