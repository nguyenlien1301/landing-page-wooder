function debounce(func, delay) {
    let timeout;
    return function executedFunc(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}
// hàm sử lí nút backtotop
let backToTop = () => {
	// lấy Dom
	const banner = document.querySelector(".banner");
	const btnBackToTop = document.querySelector(".footer__totop");
	// dùng sự kiện scroll
	document.addEventListener("scroll", () => {
		// offsettop lấy khoảng cách từ trên cha tới đầu của phần tử cần sét, hoặc lấy từ đầu trang html
		const locationBanner = banner.offsetTop;
		// scrollY sự thay đổi khi cuộn trang
		const scrollY = window.scrollY;
		// nếu vị trí của banner < nhỏ hơn điểm scroll thì thêm active: opacity = 1, visibility = visable và ngc lại
		if (locationBanner < scrollY) {
			btnBackToTop.classList.add("active");
		} else {
			btnBackToTop.classList.remove("active");
		}
	});
	// sự kiện click vào nút backtotop gọi đến đối tượng window.scrollTo để cuộn trang đến vị trí cụ thể ở đây là window
	// và sét top = 0 là scroll lên đầu của đối tượng window & behavior: "smooth" mượt khi cuộn
	btnBackToTop.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
};
backToTop();
// hàm sử lí đổi màu background của header khi scroll đến điểm đã sét
let changeBackground = () => {
	// Lấy Dom
	const header = document.querySelector(".header");
	const btnMainHero = document.querySelector(".hero .content .button__main");
	// hàm getBoundingClientRect() để lấy giá trị của top, left, width và height
	const getBounding = btnMainHero.getBoundingClientRect();
	// sự kiện scroll
	document.addEventListener("scroll", () => {
		// biến heightBtn lấy chiều cao của phần tử button hero ( 48 )
		const heightBtn = btnMainHero.offsetHeight;
		// biến button getBounding.top là lấy ra giá trị của top ( 344.75 ) và cộng với chiều cao của nut btn
		// 344.75 + 48 = 392.75
		const button = getBounding.top + heightBtn;
		const scrollY = window.scrollY;
		// nếu button < scrollY thì thêm class changeBackground đổi background và height cho header và ngược lại
		if (button < scrollY) {
			header.classList.add("changeBackground");
		} else {
			header.classList.remove("changeBackground");
		}
	});
};
changeBackground();
// sử lí ẩn hiện menu mobile
let handleMenuMobile = () => {
	// lấy Dom
	const hambuger = document.querySelector(
		".header .header__cta .header__cta-hambuger"
	);
	const hambugerMobile = document.querySelector(
		".header .header__cta .header__cta-hambuger span"
	);
	const headerNav = document.querySelector(".header .header__nav");
	const menuLinks = document.querySelectorAll(
		".header .header__nav .header__nav-menu li a"
	);
	// Sự kiện click
	hambuger.addEventListener("click", () => {
		// classList.toggle là thêm 1 class vào và có thì gỡ bỏ ko có thì thêm vào
		// thêm active trỏ đến before và after css cho cái icon hambuger cho bắt chéo khi click
		// before: transform: translateY(-9px) rotate(45deg);
		// after: transform: translateY(9px) rotate(-45deg);
		hambugerMobile.classList.toggle("active");
		// toggle này là ẩn hiện menu
		// active: opacity = 0, visibility = visible
		// if(headerNav.classList.contains('active')) {
		// 	headerNav.style.transition = '0.4s';
		// 	headerNav.classList.remove('active');
		// } else {
		// 	headerNav.classList.add('active');
		// }
		headerNav.classList.toggle("active");
		// headerNav.style.display = 'flex'
	});
	// lấy ra các item menu rồi lặp foreach
	menuLinks.forEach((items) => {
		// sự kiện click
		items.addEventListener("click", () => {
			// contais() kiểm tra element headerNav nếu có active thì khi click vào 1 trong các item sẽ ẩn đi menu mobile
			// và gỡ active cho icon hambuger
			if (headerNav.classList.contains("active")) {
				hambugerMobile.classList.remove("active");
				headerNav.classList.remove("active");
			}
		});
	});
	// chức năng resize viết chung với menumobile vì khi resize cũng thực hiển chức năng tương tự là ẩn hiện menu và chéo bỏ chéo cho hambuger
	let handleResize = () => {
		const nav = document.querySelector('.header__nav')
		// sự kiện resize kéo màn hình trình duyệt trỏ tới window vì window cũng là một đối tượng toàn cục là cửa sổ trình duyệt.
		window.addEventListener("resize", ()=> {
			// window.innerWidth lấy chiều rộng của cửa sổ trình duyệt
			let windowWidth = window.innerWidth;
			// console.log(1);
			nav.style.transition = '0s'
			// window.innerHeight lấy chiều cao của cửa sổ trình duyệt
			// nếu khi kéo chiều rộng lớn hơn or bằng màn hình 767px thì ẩn menu và hambubger về vịtrị ban dầu
			// if(windowWidth < 992) {
			//     headerNav.classList.toggle('--hidden');
			// }
			if (windowWidth >= 767) {
				hambugerMobile.classList.remove("active");
				headerNav.classList.remove("active");
			}
		});
		window.addEventListener('resize', debounce(()=>{
			nav.style.transition = null
		}, 500))
	};
	handleResize();
};
handleMenuMobile();
// chức năng đổi ngôn ngữ
let handleChangeLanguage = () => {
	// Lấy Dom
	const current = document.querySelector(
		"header .header__cta .header__cta-language"
	);
	const currentText = document.querySelector(
		".header .header__cta .header__cta-language .current .current__text"
	);
	const language = document.querySelectorAll(".dropdown li");
	// sự kiện click
	current.addEventListener("click", (e) => {
		// e gọi là đối tượng MouseEvent trả về chính element đang lắng nghe cái Dom event này
		// stopPropagation() là ngăn chặn hành vi nổi bọt khi dùng thuộc tính này thì sẽ ko click lên đc phần tử đó
		e.stopPropagation();
		// bật tắt class --show: opcity, visibility
		current.classList.toggle("--show");
	});
	// lặp qua các item ngôn ngữ cần đổi
	language.forEach((items) => {
		items.addEventListener("click", () => {
			// currentText.textContent lấy ra chính cái text đó (là text EN ) và gán vào một biến lưu trữ
			let valueCurrent = currentText.textContent;
			// items.textContent lấy ra chính cái text đó (là text của các item ) và gán vào 1 biến lưu trữ
			let valueItem = items.textContent;
			// khi click vào các item thì sẽ đẩy các item lên vị trí của EN và phần tử ở vị trí EN sẽ đc gán lại cho vị trí đó hiểu là thay thế vị trí
			items.textContent = valueCurrent;
			currentText.textContent = valueItem;
		});
	});
	// sự kiện click trỏ tới document là toàn trang nhấn vào đâu cũng sẽ thực hiện xoá lass --show
	// nhân vào menu item ngôn ngữ ko ẩn vì đã có e.stopPropagation(); ở trên
	document.addEventListener("click", () => {
		current.classList.remove("--show");
	});
};
handleChangeLanguage();
// ẩn hiện modal form thông tin
let handleModal = () => {
	// Lấy Dom
	const getBtnSignUp = document.querySelector(".header__cta-signup");
	const getClose = document.querySelector(".modal .modal__close");
	const modal = document.querySelector(".modal");
	const modalContainer = document.querySelector(".modal__container");
	const signUpMobile = document.querySelector(".signup__mobile");
	// sự kiện click
	function openModal() {
		modal.classList.add("openModal");
	}
	// thêm class openModal: opcity, visibility mở modal, khi bấm vào nút sign
	getBtnSignUp.addEventListener("click", openModal);
	// đây là nút signup dưới mobile cũng tương tự
	signUpMobile.addEventListener("click", openModal);

	function closeModal() {
		modal.classList.remove("openModal");
	}
	getClose.addEventListener("click", closeModal);
	modal.addEventListener("click", closeModal);
	// ngăn chặn bấm vào modal container
	modalContainer.addEventListener("click", (e) => e.stopPropagation());
};

// chức năng ẩn hiện mật khẩu
let handlePassWord = () => {
	// lấy Dom
	const eye = document.querySelectorAll(".form__group-password .eye");
	// lặp item eye có 4 item 2 mắt ẩn và 2 mắt hiện
	eye.forEach((item) => {
		// sự kiện click hàm thì viết riêng ( chung cũng đc )
		item.addEventListener("click", handleEyePassword);
	});
	function handleEyePassword() {
		// this là một đối tượng và khi gọi nó thì nó sẽ là đối tượng mà nó thuộc về ( nhận biết đơn giản là thằng nào chấm tới một phương thức nào đó thì nó là phương thức trước dấu châm đó là this | ở đây item.addEventListener() vì vậy this ở đây là đối tượng item) còn nếu ở ngoài thì nó sẽ trỏ đến đối tượng global ( window );
		// this là đối tượng item, this.previousElementSibling là lấy ra một element liền kề trước nó
		// ở đây mặc định ban đầu sẽ là mắt ẩn
		const eyeShow = this.previousElementSibling;
		// this.parentNode là lấy ra phần tử cha chứa cái element đó
		// this.parentNode.previousElementSibling là từ phần tử cha gọi đến previousElementSibling để lấy ra 1 element thêm 1 lần nữa trước element cha đó
		const typeInput = this.parentNode.previousElementSibling;
		// kiểm tra item mắt ẩn đó có class eye-hide ko
		// nếu có thì sẽ add class hidden: display = block vào eyeShow ( là phần tử mắt hiện)
		if (this.classList.contains("eye-hide")) {
			eyeShow.classList.add("hidden");
			//setAttribute là sét lại Attribute cho một phần tử có sẵn Attribute hoặc thêm một Attribute tuỳ ý vào những phần tử ko có sẵn Attribute.
			// lấy ra Dom của thẻ input và setAttribute cho input đó là type="text"
			// khi mắt hiện hiện lên thì input sẽ là text còn ngược lại input sẽ là type="password";
			typeInput.setAttribute("type", "text");
		} else {
			this.classList.remove("hidden");
			typeInput.setAttribute("type", "password");
		}
	}
};
handlePassWord();
// ẩn hiện popup video
let handlePopup = () => {
	// Lấy Dom
	const btnWatch = document.querySelector(".banner .textbox .button__watch");
	const popup = document.querySelector(".popup");
	const popupVideo = document.querySelector(
		".popup .popup__container .popup__container-video"
	);
	const close = document.querySelector(
		".popup .popup__container .popup__container-video .close"
	);
	const iframe = document.querySelector(
		".popup .popup__container .popup__container-video iframe"
	);
	const thumbVideo = document.querySelectorAll(
		".videos .videos__list .videos__list-items .thumb"
	);
	// lặp element thumb là mấy cái đĩa tròn trong design
	thumbVideo.forEach((item, index) => {
		// sự kiện click
		item.addEventListener("click", () => {
			// getAttribute lấy Attribute của element có Attribute
			// ở đây trong element thumb có Attribute là data-video đã sét sẵn gọi là real Dom Attribute những Attribute này chứa một mã code của các video src="https://www.youtube.com/embed/lNxJxpCtm0E"
			let getDataThumb = item.getAttribute("data-video");
			// sét lại Attribute cho thẻ iframe
			// có type = src, đường link = https://www.youtube.com/embed/, Attribute được lấy ra Attribute = getDataThumb, ?autoplay=1 tự động phát khi truy cập
			iframe.setAttribute(
				"src",
				`https://www.youtube.com/embed/${getDataThumb}?autoplay=1`
			);
			// khi click sẽ thêm class active để mở active: opacity, visibility
			popup.classList.add("active");
		});
	});
	// click vào nút button watch video ở section banner
	btnWatch.addEventListener("click", () => {
		// tương tự lấy Attribute đã sét sẵn
		let getData = btnWatch.getAttribute("data-video");
		// tương tự sét lại Attribute cho thẻ iframe
		iframe.setAttribute(
			"src",
			`https://www.youtube.com/embed/${getData}?autoplay=1`
		);
		// tương tử mở popup
		popup.classList.add("active");
	});
	// hàm gở active: opacity, visibnility hidden và sét lại Attribute type src là rỗng
	function removePopup() {
		popup.classList.remove("active");
		iframe.setAttribute("src", "");
	}
	popup.addEventListener("click", removePopup);
	close.addEventListener("click", removePopup);
	// ngăn chặn ko cho click vào popup video dù khi click vào container thì nó sẽ ngừng video nhưng ở đây container vẫn còn border vì vậy click vào border vẫn ẩn popup nên phải chặn.
	popupVideo.addEventListener("click", (e) => e.stopPropagation());
};

// chức năng chuyển tabs
let handleTabs = () => {
	// Lấy Dom
	const tabsItem = document.querySelectorAll(
		".news .news__tabs .news__tabs-item"
	);
	const newsList = document.querySelectorAll(".news .news__list");
	// lặp qua các tabs item
	tabsItem.forEach((item, index) => {
		// click vào các tabs item
		item.addEventListener("click", () => {
			// vì ba tabs item thì tương ứng 3 trang nên dùng element newsList chuyền vào thứ tự index thì nó vẫn sẽ lấy ra các index của các trang tương ứng tabs: index = 0,1,2 <=> list; index = 0,1,2;
			const getList = newsList[index];
			// remove viết trước vì khi click nó phải tìm class nào đang active thì gỡ nó đi rồi mới thêm active vào item khác
			// active của tabs item là background và chữ
			// active của list là diplay = none và display = grid;
			// kiểm tra và gỡ active khỏi tabs
			document.querySelector(".news__tabs-item.active").classList.remove("active");
			// kiểm tra và gỡ active khỏi list
			document.querySelector(".news__list.active").classList.remove("active");
			// add active vào tabs
			item.classList.add("active");
			// add active vào list
			getList.classList.add("active");
		});
	});
};
handleTabs();

// chức năng thanh Progressbar chạy phần trăm khi cuộn trang
let handleProgressbar = () => {
	const progressbar = document.querySelector("body .progressbar");
	// dùng sự kiện scroll
	window.addEventListener("scroll", () => {
		// scrollHeight lấy chiều cao body
		const heightBody = document.body.scrollHeight;
		// lấy chiều cao của view pot
		const innerHeight = window.innerHeight;
		// thuộc tính scroll cho biết đoạn đường scroll
		const scrollY = window.scrollY;
		// Math.floor làm tròn số vì khi tính có số thập phân.
		// heightBody - innerHeight là vì
		// + heightBody là tổng chiều cao của body
		// + innerHeight sẽ trả về chiều cao của view port vì trỏ đến window.
		// quảng đường tối đa di chuyển của thanh scroll bằng heightBody - innerHeightx

		const pecentPages =((scrollY / (heightBody - innerHeight)) * 100).toFixed();
		// dùng Dom css thêm giá trị vừa tính vào
		progressbar.style.width = `${pecentPages}%`;
	});
};

// thêm load vào là để đảm bảo khi đc chạy thì nó mới gọi hàm vì có lúc chiều cao body nó chạy trước khi hình đc tải xong => chiều cao body ko đủ sai số
// chức năng croll section
let handleScrollSc = () => {
	// Lấy Dom
	const header = document.querySelector(".header");
	const menuLinks = document.querySelectorAll(
		".header .header__nav .header__nav-menu li a"
	);
	menuLinks.forEach((item) => {
		item.addEventListener("click", (e) => {
			// thẻ a chuyển trang nên phải dùng preventDefault();
			e.preventDefault();
			// Lấy ra Attribute href của từng thẻ a
			const getAttHref = item.getAttribute("href");
			// document.querySelector(getAttHref) lấy ra Dom của section
			// vidụ: ở thẻ a đặt cho nó href="#scproducts" thì dưới này thẻ sc có id="scproducts" thì cũng giống như lấy tên trong href ra gắn qua cho sc. vì ở đây sc là id rồi nên ko cần lấy docu.getbyid.
			const idSection = document.querySelector(getAttHref).offsetTop;
			// Lấy chiều cao của header
			const heightHeader = header.offsetHeight;
			window.scrollTo({
				top: idSection - heightHeader,
				behavior: 'smooth',
			});
			// đây là hàm đã tạo ở dòng 341 để gỡ đi active, giống như là kiểm tra trong các item đó có item nào có active thì gỡ
			removeActive();
			// sau đó mới active vào
			item.classList.add("active");
		});
	});
	// hàm gỡ active
	function removeActive() {
		// lặp lại menulinks
		menuLinks.forEach((itemMenu) => {
			itemMenu.classList.remove("active");
		});
	}
	// lấy Dom các thẻ section có attribite là id
	let sections = document.querySelectorAll("section[id]");
	// sự kiện csroll
	document.addEventListener("scroll", () => {
		// + 1 vì do bị ảnh hưởng hàm click ở trên khi nhấn nó sẽ scroll xuống chân section hiện tại và đầu section mới nhưng khi scroll có trường hợp nó bị thiếu 1 điểm scroll vì vậy code active và gỡ active nó sẽ ko thể thực hiện ( mắt thì nhìn có vẽ nó đã qua section khác những thật ra nó vẫn nằm ở chân section hiện tại 1 nhích) vì vậy +1 là +1 điểm scroll lên nó sẽ khớp.
		let scrollY = window.scrollY + 1;
		// lặp qua các section có chứa id
		sections.forEach((itemSc, index) => {
			let heightHeader = header.offsetHeight;
			// itemSc.offsetTop: lấy ra khoảng cách từ trên đến đỉnh của section
			// trừ cho height header cũng giống như hàm trên là trừ đi khoảng cách của header vì nếu ko trừ đỉnh của section sẽ nằm bằng cái top của header và dưới header
			let offsetTop = itemSc.offsetTop - heightHeader;
			// itemSc.offsetHeight lấy ra chiều cao của section đó
			// cộng với chiều cao của section là để cho biết đc là đã scroll qua section đó rồi.
			let offsetSc = itemSc.offsetTop + itemSc.offsetHeight;
			// ở đây có 2 điều kiện
			// nếu khi scroll số sroll lớn hơn với khoảng cách của section từ trên xuống đỉnh thì sé đáp ứng đc.
			// nếu scroll nhỏ hơn tổng chiều cao của section thì nó vẫn nằm trong section đó
			// đáp ứng 2 điều kiệnnày thì mới thực hiện
			if (scrollY > offsetTop && scrollY < offsetSc) {
				removeActive();
				menuLinks[index].classList.add("active");
			}
		});
	});
};
handleScrollSc();

// sử lí đóng mở accordion
let handleAccordion = () => {
	const question = document.querySelectorAll(
		".accordion .accordion__list .accordion__list-question .content .content__question"
	);
	function removeActive(selectedItem) {
		question.forEach((item) => {
			if (item !== selectedItem) {
				item.classList.remove("active");
				let answer = item.nextElementSibling;
				answer.style.maxHeight = null;
			}
		});
	}
	question.forEach((item, index) => {
		item.addEventListener("click", () => {
			question.forEach((item, _index) => {
				if (_index === index) return;
				item.classList.remove("active");
				item.nextElementSibling.style.maxHeight = null;
			});
			item.classList.toggle("active");
			let answer = item.nextElementSibling;
			if (answer.style.maxHeight) {
				answer.style.maxHeight = null;
			} else {
				answer.style.maxHeight = answer.scrollHeight + "px";
			}
		});
	});
};

let handleSliderHero = () => {
	const heroSlider = document.querySelector(".hero .hero__slider");
	const controlsNext = document.querySelector(".controls .--btnnext");
	const controlsPrev = document.querySelector(".controls .--btnprev");
	const flkty = new Flickity(heroSlider, {
		fade: true,
		cellAlign: "left",
		contain: true,
		draggable: ">1",
		prevNextButtons: false,
		wrapAround: true,
		// pageDots: false,
		on: {
			ready: function () {
				console.log("Flickity is ready");
				handleDots();
			},
			change: function (index) {
				console.log("Slide changed to" + index);
				handleNumber(index);
			},
		},
	});

	controlsNext.addEventListener("click", () => {
		flkty.next(true);
	});
	controlsPrev.addEventListener("click", () => {
		flkty.previous(true);
	});

	function handleDots() {
		let pageDots = document.querySelector(".flickity-page-dots");
		let quantity = document.querySelector(
			".hero__bottom .hero__bottom-quantity"
		);
		quantity.appendChild(pageDots);
	}
	function handleNumber(index) {
		let numberCurrent = document.querySelector(
			".hero__bottom-quantity .number .number__current"
		);
		numberCurrent.innerHTML = (index + 1).toString().padStart(2, "0");
	}
};

let handleCarousel = () => {
	const carousel = document.querySelector(".carousel__list");
	const flktyCarousel = new Flickity(carousel, {
		freeScroll: true,
		contain: true,
		pageDots: false,
		draggable: ">1",
		wrapAround: true,
		prevNextButtons: false,
		imagesLoaded: true,
		lazyLoad: 1,
	});

	function carouselProgress() {
		const progressbar = document.querySelector(
			".carousel__progress .carousel__progress-bar"
		);
		flktyCarousel.on("scroll", (progress) => {
			progress = Math.max(0, Math.min(1, progress));
			progressbar.style.width = `${progress * 100}%`;
		});
	}
	carouselProgress();
};

let handleLoading = () => {
	let loadingCount = 0;
	const getBody = document.querySelector("body");
	const imgs = document.querySelectorAll("img").length;
	const imgLoaded = imagesLoaded(getBody);
	imgLoaded
		.on("progress", (instance) => {
			loadingCount++;
			let percent = ((loadingCount / imgs) * 100).toFixed();
			handlePercent(percent);
		})
		.on("always", (instance) => {
			console.log("always");
		})
		.on("fail", (instance) => {
			console.log(instance);
		})
		.on("done", (instance) => {
			console.log("done");
			handlePageLoading();
		});

	let handlePercent = (percent) => {
		let progress = document.querySelector(".loading .loading__progress");
		let loadingPercent = document.querySelector(
			".loading .loading__page-percent"
		);
		progress.style.width = `${percent}%`;
		loadingPercent.innerHTML = `${percent}%`;
	};
	let handlePageLoading = () => {
		let loading = document.querySelector(".loading");
		loading.classList.add("--is-loaded");
		getBody.classList.add("--disable-scroll");
	};
};


let handleGallery = () => {
	console.log("fancybox check");
	Fancybox.bind("[data-fancybox]"),
	{
		// Your custom options
		infinite: false,
		keyboard: {
			Escape: "close",
			Delete: "close",
			Backspace: "close",
			PageUp: "next",
			PageDown: "prev",
			ArrowUp: "prev",
			ArrowDown: "next",
			ArrowRight: "next",
			ArrowLeft: "prev",
		},
		on: {
			ready: (fancybox) => {
				console.log(fancybox);
			},
		},
	};
};

// check form
let handleForm = ()=> {
	const form = document.querySelector(".form");
	const fullName = document.querySelector("#fullname");
	const email = document.querySelector("#email");
	const userName = document.querySelector("#username");
	const password = document.querySelector("#password");
	const cfPassword = document.querySelector("#cfpassword");
	const checkbox = document.querySelector(".checkbox");

	let isInvalidUserName = (value)=> {
		const regexUsernam = /^[a-z0-9_\.]+$/;
		return regexUsernam.test(value);
	}
	let isInvalidPassword = (value)=> {
		const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return regexPassword.test(value);
	}

	const getParentElement = (element, selector) => {
		while (element.parentElement) {
		  if (element.parentElement.matches(selector)) {
			return element.parentElement;
		  }
		  element = element.parentElement;
		}
	  }

	let handleErr = (input, textErr = '')=> {
		const parentElement = getParentElement(input, '.form__group');
		let error = parentElement.querySelector(".error");
		if(textErr != '') {
			error.textContent = textErr;
			input.classList.add('styleErr');
		} else {
			error.textContent = textErr;
			input.classList.remove('styleErr'); 
		}
	}
	let handleCheckInputs = ()=> {
		const valueFullName = fullName.value.trim();
		if(valueFullName == "") {
			handleErr(fullName, 'Please fill out this field');
		} else {
			handleErr(fullName);
		}

		const valueEmail = email.value.trim();
		if(valueEmail == "") {
			handleErr(email, "Please fill out this field");
		} else {
			handleErr(email);
		}

		const valueUserName = userName.value.trim();
		if(valueUserName == "") {
			handleErr(userName, 'Please fill out this field');
		} else if(!isInvalidUserName(valueUserName)){
			handleErr(userName, 'The login name cannot contain spaces or special characters');
		} else {
			handleErr(userName);
		}

		const valuePassword = password.value.trim();
		if(valuePassword == "") {
			handleErr(password, 'Please fill out this field');
		} else if(!isInvalidPassword(valuePassword)) {
			handleErr(password, 'Minimum password 8 characters, no spaces');
		} else {
			handleErr(password);
		}

		const valueCfPassword = cfPassword.value.trim();
		if(valueCfPassword == "") {
			handleErr(cfPassword, 'Please fill out this field');
		} else if(valuePassword !== valueCfPassword) {
			handleErr(cfPassword, 'Passwords do not match');
		} else {
			handleErr(cfPassword);
		}

		// conform
		if(!checkbox.checked) {
			handleErr(checkbox, 'Please select confirm');
		} else {
			handleErr(checkbox);
		}
	}
	form.addEventListener('submit', (e)=> {
		e.preventDefault();
		handleCheckInputs();
	})	
}

window.addEventListener("load", () => {
	handleLoading();
	handleSliderHero();
	handleCarousel();
	handleProgressbar();
	handleGallery();
	handleAccordion();
	handleForm();
	handleModal();
	handlePopup();

});
