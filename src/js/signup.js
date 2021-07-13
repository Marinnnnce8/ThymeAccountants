var signup = {

	init: function() {

		// var inputTexts = document.querySelectorAll('input[type="text"]');
		// var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
		var btnNext = document.querySelectorAll('.calc-button');
		var btnPrev = document.querySelectorAll('.calc-button-back');
		// var quantities = document.querySelectorAll('[data-quantity]');
		var ctx1 = document.getElementById('doughnutChart');
		var ctx2 = document.getElementById('rectChart');
		// var inputRange = document.querySelector('.js-range');
		var addVehicleButton = document.querySelectorAll('.add-vehicle-button');
		var resultNum = document.querySelectorAll('.result-number')[0];

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

		if (ctx1) {
			this.doughnutChartFunc();
		}

		if (ctx2) {
			this.rectChartFunc();
		}

		// if (inputRange) {
		// 	this.setRangeProgress();
		// }

		if (addVehicleButton) {
			for (var i = 0; i < addVehicleButton.length; i++) {
				addVehicleButton[i].addEventListener('click', this.addVehicle, false);
			}
		}

		if (resultNum) {
			this.animateValue();
		}
	},

	goToNextPage: function() {
		var pages = document.querySelectorAll('.page');
		var btnNext = document.querySelectorAll('.calc-button');
		var btnIndex = [...btnNext].indexOf(this);

		var pageParent = this.closest('.page');
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		pages[pageParentIndex + 1].classList.add('page-active');
		for (var i = 0; i < btnIndex; i++) {
			pages[pageParentIndex + 1].querySelectorAll('.calc-steps li')[i].style.backgroundColor = '#b8ef00';
		}

		//not smooth scroll to top
		// window.scrollTo(0, 0);
		window.scrollTo({ top: 0, behavior: 'smooth' });

		var pageContainer = document.querySelectorAll('.calculator-container')[0];
		var pageActiveHeight = document.querySelectorAll('.page-active')[0].offsetHeight;
		pageContainer.style.minHeight = pageActiveHeight + 'px';
	},

	goToPrevPage: function() {
		var pages = document.querySelectorAll('.page');
		var btnPrev = document.querySelectorAll('.calc-button-back');
		// var btnIndex = [...btnPrev].indexOf(this);
		var pageContainer = document.querySelectorAll('.calculator-container')[0];

		var pageParent = this.closest('.page');
		var pageParentIndex = [...pages].indexOf(pageParent);
		pages[pageParentIndex].classList.remove('page-active');
		// if (btnIndex !== 0) {
		pages[pageParentIndex - 1].classList.add('page-active');

		var pageActiveHeight = document.querySelectorAll('.page-active')[0].offsetHeight;
		pageContainer.style.minHeight = pageActiveHeight + 'px';
		// }
		// if (btnIndex === 0) {
		// 	templateCalc.classList.remove('calculator-page-active');
		// 	pageContainer.style.minHeight = '';
		// }

		//not smooth scroll to top
		// window.scrollTo(0, 0);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},

	doughnutChartFunc: function() {
		var ctx1 = document.getElementById('doughnutChart').getContext('2d');
		var tooltipsLabel = ['Transport', 'Transport', 'Transport', 'Food', 'Housing', 'Housing', 'Government services', 'Consumables and waste']
		var doughnutChart = new Chart(ctx1, {
			type: 'doughnut',
			data: {
				labels: ['Public Transport - Air 1.76t', 'Public Transport - Land 1.76t', 'Public Transport - Sea 1.76t', 'text - 2.2t', 'first 0.56t', 'second 0.56t', 'text 0.56t', 'text 0.56t'],
				datasets: [{
					labels: '# of Votes',
					data: [30, 10, 4, 30, 12, 6, 6, 2],
					backgroundColor: [
						'rgb(0, 69, 131)',
						'rgb(0, 69, 131)',
						'rgb(0, 69, 131)',
						'rgb(253, 154, 18)',
						'rgb(155, 202, 0)',
						'rgb(155, 202, 0)',
						'rgb(25, 197, 194)',
						'rgb(237, 80, 69)'
					]
				}],
			},
			options: {
				responsive: true,
				legend: {
					display: false,
				},
				tooltips: {
					mode: 'index',
					intersect: true,
					callbacks: {
						title: function(tooltipItem) {
							return tooltipsLabel[tooltipItem[0].index];
						},
						label: function(tooltipItems, data) {
							return data.labels[tooltipItems.index];
						}
					}
				}
			}
		});
	},

	rectChartFunc: function() {
		var ctx2 = document.getElementById('rectChart').getContext('2d');
		ctx2.height = 434;
		var rectChart = new Chart(ctx2, {
			type: 'bar',
			data: {
				labels: ['Your carbon footprint', 'UK average', 'Global  average'],
				datasets: [{
					labels: '# of Votes',
					data: [5.2, 8.2, 5.1],
					backgroundColor: [
						'rgb(155, 202, 0)',
						'rgb(0, 69, 131)',
						'rgb(25, 197, 194)'
					]
				}],
			},
			options: {
				responsive: true,
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						display: true,
						ticks: {
							suggestedMin: 0,
							beginAtZero: true,
							fontColor: 'rgba(0, 0, 0, 0.5)',
							fontFamily: 'Ubuntu',
							fontSize: 14,
							padding: 14,
							callback: function(label) {
								return label + '.0';
							}
						}
					}],
					xAxes: [{
						barPercentage: 0.65,
						ticks: {
							fontColor: 'rgb(0, 69, 131)',
							fontFamily: 'Ubuntu',
							fontSize: 16
						}
					}]
				},
				maintainAspectRatio: false,
			}
		});
	},

	// setRangeProgress: function() {

	// 	var rangeEl = document.querySelector('.js-range');
	// 	var rangeVal = rangeEl.getAttribute('data-value');
	// 	document.getElementById('js-display-change').innerHTML = rangeVal + '%';
	// 	var init = new Powerange(rangeEl, { min: 0, max: 100, start: rangeVal, hideRange: true });
	// 	rangeEl.onchange = function() {
	// 		document.getElementById('js-display-change').innerHTML = rangeEl.value + '%';
	// 	};
	// },

	addVehicle: function() {

		var buttonParent = this.closest('.numbers-wrap');
		var vehicleInputsTarget = buttonParent.querySelectorAll('.vehicle-inputs');
		var copyElement = buttonParent.querySelectorAll('.vehicle-inputs')[0];
		var lastTarget = vehicleInputsTarget.length - 1;

		vehicleInputsTarget[lastTarget].insertAdjacentHTML('afterend', copyElement.outerHTML);

		var pageContainer = document.querySelectorAll('.calculator-container')[0];
		var pageActiveHeight = document.querySelectorAll('.page-active')[0].offsetHeight;
		pageContainer.style.minHeight = pageActiveHeight + 'px';
	},

	animateValue: function() {

		var resultNum = document.querySelectorAll('.result-number')[0];
		var maxValue = resultNum.getAttribute('data-value');
		var intervalFunction = setInterval(addNumber, 25);

		var stepValue = 0.2;
		var currentValue = 0;

		function addNumber() {
			currentValue += stepValue;
			currentValue.toFixed(1);
			if (currentValue < maxValue) {
				resultNum.innerHTML = (Math.round(currentValue * 100) / 100).toFixed(1);
			} else {
				clearInterval(intervalFunction);
				resultNum.innerHTML = maxValue;
			}
		}

	},

	// QuantityInput: {

	// 	input: {},
	// 	decreaseText: '',
	// 	increaseText: '',
	// 	button: {},
	// 	subtract: {},
	// 	add: {},

	// 	init: function(self, decreaseText, increaseText) {

	// 		var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
	// 		this.input = document.createElement('input');
	// 		this.input.placeholder = self.getAttribute('data-value');
	// 		if (isTouchDevice) {
	// 			this.input.type = 'number';
	// 		} else {
	// 			this.input.type = 'text';
	// 		}
	// 		this.input.name = 'quantity';
	// 		this.input.pattern = '[0-9]+';


	// 		// Get text for buttons
	// 		this.decreaseText = decreaseText || 'Decrease quantity';
	// 		this.increaseText = increaseText || 'Increase quantity';

	// 		var this$1 = this;

	// 		// Button constructor
	// 		function Button(text, className) {
	// 			this$1.button = document.createElement('button');
	// 			this$1.button.type = 'button';
	// 			this$1.button.innerHTML = text;
	// 			this$1.button.title = text;
	// 			this$1.button.classList.add(className);

	// 			return this$1.button;
	// 		}

	// 		// Create buttons
	// 		this.subtract = Button(this.decreaseText, 'sub');
	// 		this.add = Button(this.increaseText, 'add');

	// 		// Add functionality to buttons
	// 		this.subtract.addEventListener('click', function() {
	// 			this$1.change_quantity(-1, this);
	// 		});
	// 		this.add.addEventListener('click', function() {
	// 			this$1.change_quantity(1, this);
	// 		});

	// 		// Add input and buttons to wrapper
	// 		self.appendChild(this.subtract);
	// 		self.appendChild(this.input);
	// 		self.appendChild(this.add);
	// 	},

	// 	change_quantity: function(change, btn) {

	// 		var input = $uk.$('input', btn.parentElement);

	// 		// Get current value
	// 		var quantity = parseInt(input.value);

	// 		// Ensure quantity is a valid number
	// 		if (isNaN(quantity)) quantity = 0;

	// 		// Change quantity
	// 		quantity += change;

	// 		// Ensure quantity is always a number
	// 		quantity = Math.max(quantity, 0);

	// 		// Output number
	// 		$uk.attr(input, 'value', quantity);
	// 	}
	// }
};

uk.ready(function() {
	signup.init();
});
