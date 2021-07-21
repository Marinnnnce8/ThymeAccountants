/**
 * Main JS
 *
 * @copyright 2021 NB Communication Ltd
 *
 */

const main = {

	init: () => {

		nb.profilerStart('main.init');

		// Content
		const blocks = uk.$$('.content');
		if (blocks.length) {

			blocks.forEach((block) => {

				// Apply UIkit table component
				uk.$$('table', block).forEach((el) => {
					uk.addClass(el, 'uk-table');
					uk.wrapAll(el, '<div class="uk-overflow-auto">');
				});

				// Inline Images UIkit Lightbox/Scrollspy
				(uk.$$('a[href]', block).filter((a) => {
					return uk.attr(a, 'href').match(/\.(jpg|jpeg|png|gif|webp)/i);
				})).forEach((a) => {

					const figure = a.parentElement;
					if (figure.nodeName !== 'FIGURE') {
						uk.wrapAll(a, '<figure>');
						figure = a.parentElement;
					}

					const img = uk.$('img', a);
					if (uk.hasAttr(img, 'class')) {
						uk.addClass(figure, uk.attr(img, 'class'));
						uk.removeAttr(img, 'class');
					}

					const caption = uk.$('figcaption', figure);

					// uk-lightbox
					uk.attr(figure, 'data-uk-lightbox', 'animation: fade');
					if (caption) uk.attr(a, 'data-caption', nb.wrap(uk.html(caption), 'div'));
				});
			});
		}

		main.mmenu();

		nb.profilerStop('main.init');
	},

	mmenu: () => {

		const el = uk.$('#mmenu');
		if (!el) return;

        const menu = new Mmenu(el,
            {
                offCanvas: false,
                extensions: [
                    'border-full',
                    'fullscreen'
                ],
            },
            {
                classNames: {
                    selected: 'uk-active'
                },
                transitionDuration: 256
            }
        );

		uk.removeClass(uk.$('.mmenu-overlay'), 'uk-hidden');

		const toggle = uk.$('.uk-navbar-toggle');
		const html = uk.$("html");
		if (toggle) {

			const toggler = (open) => {
				uk[`${open ? 'add' : 'remove'}Class`](toggle, 'uk-open');
				uk[`${open ? 'add' : 'remove'}Class`](html, 'show-menu');
			};

			menu.API.bind('close:start', () => toggler(false));
			            uk.on(toggle, 'click', () => {

                toggler(!uk.hasClass(toggle, 'uk-open'))
            });
		}
	}
};

uk.ready(() => main.init());
