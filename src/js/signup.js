var signup = {

	init: function () {
		var btnNext = document.querySelectorAll('.signup-button-next');
		var btnPrev = document.querySelectorAll('.signup-button-back');
		var btnLater = document.querySelectorAll('.signup-button-later')[0];

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
		
		if (btnLater) {
			btnLater.addEventListener('click', this.goToThankYouPage, false);
		}
	},

	goToNextPage: function () {
		var pages = document.querySelectorAll('.page');

		var pageParent = this.closest('.page');
		var bodyRect = document.body.getBoundingClientRect(),
			pageRect = pageParent.getBoundingClientRect(),
			pageOffset = pageRect.top - bodyRect.top;
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		if (pages[pageParentIndex + 1].classList.contains('page-thank-you')) {
			pages[pageParentIndex + 2].classList.add('page-active');
		} else {
			pages[pageParentIndex + 1].classList.add('page-active');
		}

		//smooth scroll to top
		window.scrollTo({ top: pageOffset, behavior: 'smooth' });
	},

	goToPrevPage: function () {
		var pages = document.querySelectorAll('.page');

		var pageParent = this.closest('.page');
		var bodyRect = document.body.getBoundingClientRect(),
			pageRect = pageParent.getBoundingClientRect(),
			pageOffset = pageRect.top - bodyRect.top;
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pages[pageParentIndex - 1].classList.add('page-active');

		//smooth scroll to top
		window.scrollTo({ top: pageOffset, behavior: 'smooth' });
	},

	goToThankYouPage: function () {
		var pageThankYou = document.querySelectorAll('.page-thank-you')[0];
		var pages = document.querySelectorAll('.page');

		var pageParent = this.closest('.page');
		var bodyRect = document.body.getBoundingClientRect(),
			pageRect = pageParent.getBoundingClientRect(),
			pageOffset = pageRect.top - bodyRect.top;
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pageThankYou.classList.add('page-active');

		//smooth scroll to top
		window.scrollTo({ top: pageOffset, behavior: 'smooth' });
	}
};

uk.ready(function () {
	signup.init();
});
