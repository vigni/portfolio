let Nightmare = require('nightmare'),
chai = require("chai"),
chaiAsPromised = require("chai-as-promised"),
config = require('../config'),
url = require('url');


const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Transverse', function() {
	describe('Input Textarea', function() {
		this.timeout(30000);
		let nightmare = new Nightmare();

		before(function() {
			nightmare = new Nightmare({
					show: config.SHOW,
					width: config.WIDTH,
					height: config.HEIGHT,
					typeInterval: config.TYPEINTERVAL
				})
				.goto(config.URI)
				.wait(config.WAIT)
				.type('#username', config.USERNAME)
				.type('#password', config.PASSWORD)
				.click('#loginform > button')
				.wait('application')
				.wait('#avr-mainnav-logo')
				.goto(url.resolve(config.URI, '/app/tests/form'));
		});

		after(function() {
			nightmare.end().then();
			nightmare = null;
		});

		it('waits for login', function() {
			this.slow(5000);

			return nightmare.wait('application');
		});

		it('0207-0040 - input textarea should contain entered value', function() {
			const text = 'lalala';
			return nightmare
				.wait(1000)
				.type('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea', text)
				.evaluate(() => {
					const selector = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea';
					return {
						value: document.querySelector(selector).value,
						isValid: document.querySelector(selector).className
					}
				})
				.then((element) => {
					expect(element.value).to.equal(text);
					expect(element.isValid.indexOf('ng-valid')).to.be.at.least(0);
				}).catch((err) => {
					throw err;
				});
		});

		it('0207-0041 - input textarea in error if pattern not respected', function() {
			const text = 'THIS IS IT';
			return nightmare
				.wait(1000)
				.evaluate(() => {
					document.querySelector('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea').value = '';
				})
				.type('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea', text)
				.evaluate(() => {
					const selector = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea';
					return {
						value: document.querySelector(selector).value,
						isValid: document.querySelector(selector).className
					}
				})
				.then((element) => {
					expect(element.value).to.equal(text);
					expect(element.isValid.indexOf('ng-invalid')).to.be.at.least(0);
					expect(element.isValid.indexOf('ng-valid')).to.equal(-1);
				}).catch((err) => {
					throw err;
				});
		});

		it('0207-0042 - input textarea in error if empty', function() {
			return nightmare
				.wait(1000)
				.click('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(32) > avr-input > div > div > textarea')
				.click('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea')
				.evaluate(() => {
					const selector = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(32) > avr-input > div > div > textarea';
					return {
						value: document.querySelector(selector).value,
						isValid: document.querySelector(selector).className
					}
				})
				.then((element) => {
					expect(element.value).to.equal('');
					expect(element.isValid.indexOf('ng-invalid')).to.be.at.least(0);
					expect(element.isValid.indexOf('ng-valid')).to.equal(-1);
				}).catch((err) => {
					throw err;
				});
		});

		it('0207-0043 - input textarea disabled cannot be touched', function() {
			return nightmare
				.wait(1000)
				.click('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(33) > avr-input > div > div > textarea')
				.evaluate(() => {
					const selector = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(33) > avr-input > div > div > textarea';
					return {
						isDisabled: document.querySelector(selector).disabled,
						classNames: document.querySelector(selector).className,
						borderStyle: window.getComputedStyle(document.querySelector(selector)).border
					}
				})
				.then((element) => {
					expect(element.isDisabled).to.equal(true);
					expect(element.classNames.indexOf('avr-disabled')).to.be.at.least(0);
					expect(element.borderStyle).to.equal('1px solid rgb(231, 236, 237)');
				}).catch((err) => {
					throw err;
				});
		});

		it('0207-0044 - input textarea readonly is text not input', function() {
			return nightmare
				.wait(1000)
				.evaluate(() => {
					const selector = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(34) > avr-input > div > div > textarea';
					return {
						isDisabled: document.querySelector(selector).disabled,
						classNames: document.querySelector(selector).className,
						borderStyle: window.getComputedStyle(document.querySelector(selector)).border
					}
				})
				.then((element) => {
					expect(element.isDisabled).to.equal(true);
					expect(element.classNames.indexOf('ng-valid')).to.be.at.least(0);
					expect(element.borderStyle).to.equal('');
				}).catch((err) => {
					throw err;
				});
		});

		it('0207-0045 - input textarea should have the right size', function() {
			return nightmare
				.wait(1000)
				.evaluate(() => {
					return {
						inputSizeS: window.getComputedStyle(document.querySelector('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea')).width,
						inputSizeM: window.getComputedStyle(document.querySelector('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(32) > avr-input > div > div > textarea')).width
					}
				})
				.then((element) => {
					expect(element.inputSizeS).to.equal("150px");
					expect(element.inputSizeM).to.equal("350px");
				}).catch((err) => {
					throw err;
				});
		});
	});
});
