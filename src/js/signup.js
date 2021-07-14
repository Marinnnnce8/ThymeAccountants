var signup = {

	init: function() {

		// var inputTexts = document.querySelectorAll('input[type="text"]');
		// var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
		var btnNext = document.querySelectorAll('.signup-button');
		var btnPrev = document.querySelectorAll('.signup-button-back');

		// if (isTouchDevice && inputTexts.length) {
		// 	for (var i = 0; i < inputTexts.length; i++) {
		// 		if (!inputTexts[i].classList.contains('js-range')) {
		// 			inputTexts[i].type = 'number';
		// 		}
		// 	}
		// }

		if (btnNext) {
			for (var i = 0; i < btnNext.length; i++) {
				btnNext[i].addEventListener('click', this.goToNextPage, false);
			}
		}

		if (btnPrev) {
			for (var i = 0; i < btnPrev.length; i++) {
				btnPrev[i].addEventListener('click', this.goToPrevPage, false);
			}
		}
	},

	goToNextPage: function () {
		var pages = document.querySelectorAll('.page');
		var btnNext = document.querySelectorAll('.signup-button');
		var btnIndex = [...btnNext].indexOf(this);

		var pageParent = this.closest('.page');
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pages[pageParentIndex + 1].classList.add('page-active');

		//not smooth scroll to top
		// window.scrollTo(0, 0);
		// window.scrollTo({ top: 0, behavior: 'smooth' });

		var pageContainer = document.querySelectorAll('.signup-container')[0];
		var pageActiveHeight = document.querySelectorAll('.page-active')[0].offsetHeight;
		pageContainer.style.minHeight = pageActiveHeight + 'px';
	},

	goToPrevPage: function() {
		var pages = document.querySelectorAll('.page');
		var btnPrev = document.querySelectorAll('.signup-button-back');
		// var btnIndex = [...btnPrev].indexOf(this);
		var pageContainer = document.querySelectorAll('.signup-container')[0];

		var pageParent = this.closest('.page');
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		// if (btnIndex !== 0) {
		pages[pageParentIndex - 1].classList.add('page-active');

		var pageActiveHeight = document.querySelectorAll('.page-active')[0].offsetHeight;
		pageContainer.style.minHeight = pageActiveHeight + 'px';
		// }
		// if (btnIndex === 0) {
		// 	templatesignup.classList.remove('signup-page-active');
		// 	pageContainer.style.minHeight = '';
		// }

		//not smooth scroll to top
		// window.scrollTo(0, 0);
		// window.scrollTo({ top: 0, behavior: 'smooth' });
	}
};

uk.ready(function() {
	signup.init();
});
