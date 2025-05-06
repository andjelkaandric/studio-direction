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
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3c0aaa35fb782ccf6_render-41.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e49151938da08b4201_render-42.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e360e48504e8b08c6d_render-43.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e432ef0af5ab073574_render-44.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e2f70a7f3d2bf55203_render-45.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3e8b6156bb967a380_render-46.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3ff31c75b9296ec44_render-47.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e31bb83d0c4c891559_render-48.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3c8007d6d22e849d6_render-49.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e35b6310a2bd330e45_render-50.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e35c1d44e1bfa53c8a_render-51.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3f5bf1edc45ba9bc3_render-52.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e4e7f32c96af377346_render-53.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e31bb83d0c4c8915d5_render-54.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3947afe47b598f8fa_render-55.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e4a6254470f6d3cbcd_render-56.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e33ae41c5aaf0b9b76_render-57.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e3c0aaa35fb782cccf_render-58.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e31b83a37ae96f8e9f_render-59.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1e30fe2b39cc5036423_render-60.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4e81e30bebd444f4c_render-61.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4307571ca334660dd_render-62.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f3b92c8df91171c5af_render-63.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f386367387f2094fea_render-64.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4192a1f238ff71092_render-65.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4cbb30b7bb7616aa2_render-66.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f34ef02dc96c55dee4_render-67.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f37d2f307de9727b55_render-68.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f381917c8f2d059702_render-69.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f31bb83d0c4c892a73_render-70.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f40a366550bd5126d3_render-71.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f55f1d0741b67fd3da_render-72.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4a3b6caf0fca3c323_render-73.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4602d4498b18569b9_render-74.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4307571ca3346619d_render-75.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f40ab10ece3b96be14_render-76.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1fcea480856bf83889e_render-77.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f5320806b0d71f9815_render-78.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4682f062d8c67b481_render-79.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b1f4e18c02abc5751eea_render-80.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f81917c8f2d05aa96_render-81.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f292f87806d12bc93_render-82.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f682f062d8c67cf54_render-83.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20fc63371a79764cd53_render-84.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f39fc4cf7008c6844_render-85.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2117ff2ac75eaa9867b_render-86.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211ff4057300fbd7d5b_render-87.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b210ff31c75b92971a76_render-88.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21139b456b44ed1b2bc_render-89.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2164ef02dc96c55fb1f_render-90.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211192a1f238ff72f4a_render-91.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2127f57b834b016b3ad_render-92.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21213482089ae884c25_render-93.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212d13c198edf2fc1f6_render-94.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211ec87f3bf1ff423ac_render-95.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b214602d4498b1858ea2_render-96.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21464486bbbb4aaae25_render-97.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b216c8007d6d22e8863a_render-98.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2127ce0f49a2c6d95b1_render-99.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b214307571ca33467a2f_render-100.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21476343a4db52b5687_render-101.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2167ff2ac75eaa98a17_render-102.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21547f235c1aeb072c1_render-103.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b216292f87806d12c300_render-104.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b214ed16de163ef97716_render-105.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2169dcb713f1ff9b629_render-106.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2151b83a37ae96fd8a6_render-107.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b215ba049d7a132b9f6c_render-108.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21525a03a734d54c741_render-109.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b214320806b0d71fbc91_render-110.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2176574acfde044d76e_render-111.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b214791d9164a7a1c407_render-112.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b215ff4057300fbd84a0_render-113.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2149ec1f7f5b7f83852_render-114.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212c91e137770e9ead4_render-115.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b216521f7a0ec50f465e_render-116.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2150ab10ece3b96d449_render-117.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212947afe47b59921e7_render-118.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212e18c02abc5754aa4_render-119.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b21586367387f2096e66_render-120.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2159ec1f7f5b7f83890_render-121.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b215384350b6a5122d12_render-122.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f6574acfde044cfcd_render-123.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211e18c02abc575491a_render-124.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2113ae41c5aaf0bbce0_render-125.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2146b3780cd4873347f_render-126.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212fc86376df1734105_render-127.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f556edb3483bd54db_render-128.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2143c1802837d1ab4ce_render-129.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2151b83a37ae96fd8a0_render-130.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b212ba049d7a132b9d51_render-131.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b216602d4498b18590ad_render-132.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2110fe2b39cc5038639_render-133.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211384350b6a5122a77_render-134.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20e631fb4402851487c_render-135.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20ffd4256370a7476ef_render-136.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20f556edb3483bd5469_render-137.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b20e364e50cc646d2f43_render-138.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b211725aeecfb4462ebb_render-139.avif",
	"https://cdn.prod.website-files.com/65e9886bc86f0798cff8d99c/67e6b2121b190ccd1bef4827_render-140.avif",
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

// Morph items animation
const items = document.querySelectorAll(".morph__item");

items.forEach((item, index) => {
	gsap.to(item, {
		opacity: 0,
		filter: 'blur(24px)',
		scrollTrigger: {
			trigger: item,
			start: "top 20%",
			end: "bottom top",
			scrub: true,
		},
	});
});

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
			trigger: ".track__wrap",
			scrub: 1,
			start: "top 70%",
			end: "top 20%",
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
			start: "top center",
			end: "top 40%",
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
			start: "top 30%",
			end: "top top",
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

// SVG Icons - defined once and reused
const ICONS = {
	play: `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
	  <path d="M292-162v-636l502 318-502 318Z" />
	</svg>`,
	pause: `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
	  <path d="M549-171v-620h212v620H549Zm-350 0v-620h212v620H199Z" />
	</svg>`,
	mute: `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
	  <path d="m635-300-74-74 106-106-106-106 74-74 106 106 106-106 74 74-106 106 106 106-74 74-106-106-106 106ZM79-340v-280h174l228-230v740L253-340H79Z" />
	</svg>`,
	unmute: `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
	  <path d="M544-57v-108q110-26 179-115t69-202q0-112-69.5-200T544-796v-108q155 26 254.5 145.5T898-482q0 158-99.5 278.5T544-57ZM62-340v-280h174l228-230v740L236-340H62Zm482 32v-344q51 23 81.5 69.5T656-480q0 56-30.5 102.5T544-308Z" />
	</svg>`,
};

// Initialize all video modals
function initVideoModals() {
	// Find all modals on the page
	const videoModals = document.querySelectorAll(".video-modal");

	videoModals.forEach((modal) => {
		// Get modal-specific elements
		const modalId = modal.id;
		const video = modal.querySelector("video");
		const playBtn = modal.querySelector("#play-btn");
		const muteBtn = modal.querySelector("#mute-btn");
		const progressBar = modal.querySelector("#progress-bar");
		const progressBarContainer = modal.querySelector(".video-modal__progress");
		const closeBtn = modal.querySelector('[data-event="close-modal"]');

		// Skip if any essential element is missing
		if (!video || !playBtn || !muteBtn || !progressBar || !progressBarContainer)
			return;

		// Set initial button states
		playBtn.innerHTML = ICONS.pause;
		muteBtn.innerHTML = ICONS.unmute;

		// Open modal function
		function openModal() {
			modal.style.display = window.innerWidth > 992 ? "block" : "flex";
			setTimeout(() => modal.classList.add("active"), 100);
			document.body.style.overflow = "hidden";
			setTimeout(() => video.play(), 200);
		}

		// Close modal function
		function closeModal() {
			modal.classList.remove("active");
			setTimeout(() => (modal.style.display = "none"), 300);
			document.body.style.overflow = "visible";
			video.pause();
		}

		// Attach event listener to close button
		if (closeBtn) {
			closeBtn.addEventListener("click", closeModal);
		}

		// Find all buttons that open this specific modal
		document
			.querySelectorAll(`[data-event="open-modal"][data-target="${modalId}"]`)
			.forEach((btn) => {
				btn.addEventListener("click", openModal);
			});

		// Play/Pause toggle
		playBtn.addEventListener("click", () => {
			if (video.paused || video.ended) {
				video.play();
				playBtn.innerHTML = ICONS.pause;
			} else {
				video.pause();
				playBtn.innerHTML = ICONS.play;
			}
		});

		// Mute/Unmute toggle
		muteBtn.addEventListener("click", () => {
			video.muted = !video.muted;
			muteBtn.innerHTML = video.muted ? ICONS.mute : ICONS.unmute;
		});

		// Update progress bar
		video.addEventListener("timeupdate", () => {
			const progress = (video.currentTime / video.duration) * 100;
			progressBar.style.width = `${progress}%`;

			// Auto-switch play button when video ends
			if (video.ended) {
				playBtn.innerHTML = ICONS.play;
			}
		});

		// Seek video position
		progressBarContainer.addEventListener("mousedown", (e) => {
			const updateVideoProgress = (event) => {
				const rect = progressBarContainer.getBoundingClientRect();
				const clickPosition = event.clientX - rect.left;
				const percentage = clickPosition / rect.width;
				video.currentTime = percentage * video.duration;
			};

			updateVideoProgress(e);

			const handleMouseMove = (e) => updateVideoProgress(e);
			const handleMouseUp = () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		});
	});
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initVideoModals);
