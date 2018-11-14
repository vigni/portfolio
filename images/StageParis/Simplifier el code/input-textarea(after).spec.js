const selectorToInputText1 = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea' ;
const selectorToInputText2 = 'test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(32) > avr-input > div > div > textarea';
const selectorToInputtext = 'test-formulaire > section > div > div.avr-grid-12 > form> input-text:nth-child(24) > avr-input > div > div > input';

describe('Input Textarea', function() {

	it('0207-0040 - input textarea should contain entered value', (done) => {
		const text = 'toto';
		nightmare
			.type(selectorToInputText1, text)
			.evaluate((selector) => {
				return {
					value: document.querySelector(selector).value,
					classNames: document.querySelector(selector).className
				}
			},selectorToInputText1)
			.then((element) => {
				expect(element.value).to.equal(text);
				expect(element.classNames.indexOf('ng-valid')).to.be.at.least(0);
				done();
			})
			.catch(done);
	});

	it('0207-0041 - input textarea in error if pattern not respected', (done) => {
		const text = 'THIS IS IT';
		nightmare
			.wait(1000)
			.evaluate((selector) => {
				document.querySelector(selector).value = '';
			}, selectorToInputText1)
			.type(selectorToInputText1, text)
			.evaluate((selector) => {
				return {
					value: document.querySelector(selector).value,
					isValid: document.querySelector(selector).className
				}
			}, selectorToInputText1)
			.then((element) => {
				expect(element.value).to.equal(text);
				expect(element.isValid.indexOf('ng-invalid')).to.be.at.least(0);
				expect(element.isValid.indexOf('ng-valid')).to.equal(-1);
				done();
			})
			.catch(done);
	});
	
	// A reprendre / TODO
	it.skip('0207-0042 - input textarea in error if empty', (done) => {
		nightmare
			.click(selectorToInputText2)
			.evaluate((selector) => {
				console.log(document.querySelector(selector).className, selector);
				debugger;
				return {
					value: document.querySelector(selector).value,
					isValid: document.querySelector(selector).className
				}
			}, selectorToInputText2)
			.then((element) => {
				expect(element.value).to.equal('');
				expect(element.isValid.indexOf('ng-invalid')).to.be.at.least(0);
				expect(element.isValid.indexOf('ng-valid')).to.equal(-1);
				done();
			})
			.catch(done);
	});

	it('0207-0043 - input textarea disabled cannot be touched', (done) => {
		selectorToInput='test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(33) > avr-input > div > div > textarea';
		nightmare
			.wait(1000)
			.click(selectorToInput)
			.evaluate((selector) => {
				console.log('border', window.getComputedStyle(document.querySelector(selector)).border);
				debugger;
				return {
					isDisabled: document.querySelector(selector).disabled,
					classNames: document.querySelector(selector).className,
					borderStyle: window.getComputedStyle(document.querySelector(selector)).border
				}
			}, selectorToInput)
			.then((element) => {
				expect(element.isDisabled).to.equal(true);
				//expect(element.classNames.indexOf('avr-disabled')).to.be.at.least(0);
				expect(element.classNames.indexOf('ng-valid')).to.be.at.least(0);
				expect(element.classNames.indexOf('ng-untouched')).to.be.at.least(0);
				expect(element.borderStyle).to.equal('1px solid rgb(231, 236, 237)');
				done();
			})
			.catch(done);
	});

	it('0207-0044 - input textarea readonly is text not input', (done ) => {
		nightmare
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
				expect(element.classNames.indexOf('ng-untouched')).to.be.at.least(0);
				expect(element.borderStyle).to.equal('');
			})
			.catch(done);
	});

	it('0207-0045 - input textarea should have the right size', (done) => {
		nightmare
			.evaluate((selector) => {
				return {
					inputSizeS: window.getComputedStyle(document.querySelector('test-formulaire > section > div > div.avr-grid-12 > form > input-textarea:nth-child(31) > avr-input > div > div > textarea')).width,
					inputSizeM: window.getComputedStyle(document.querySelector(selector)).width
				}
			},selectorToInputText2)
			.then((element) => {
				expect(element.inputSizeS).to.equal("150px");
				expect(element.inputSizeM).to.equal("350px");
				done();
			})
			.catch(done);
	});
});
