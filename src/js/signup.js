var signup = {

	init: function () {
		var btnNext = document.querySelectorAll('.signup-button-next');
		var btnPrev = document.querySelectorAll('.signup-button-back');

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

		var pageParent = this.closest('.page');
		var bodyRect = document.body.getBoundingClientRect(),
			pageRect = pageParent.getBoundingClientRect(),
			pageOffset = pageRect.top - bodyRect.top;
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pages[pageParentIndex + 1].classList.add('page-active');

		//smooth scroll to top
		window.scrollTo({ top: pageOffset, behavior: 'smooth' });
	},

	goToPrevPage: function () {
		var pages = document.querySelectorAll('.page');
		var btnPrev = document.querySelectorAll('.signup-button-back');
		var pageContainer = document.querySelectorAll('.signup-container')[0];

		var pageParent = this.closest('.page');
		var bodyRect = document.body.getBoundingClientRect(),
			pageRect = pageParent.getBoundingClientRect(),
			pageOffset = pageRect.top - bodyRect.top;
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pages[pageParentIndex - 1].classList.add('page-active');

		//smooth scroll to top
		window.scrollTo({ top: pageOffset, behavior: 'smooth' });
	}
};

uk.ready(function () {
	signup.init();
});
