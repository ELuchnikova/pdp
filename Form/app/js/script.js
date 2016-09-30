(function () {

	function ComplexForm () {

		this.getAllFields();

		this.fillSelects();

		this.addListeners();
	}

	ComplexForm.prototype.getAllFields = function() {

		this.firstPart = document.getElementById('first-part');

		this.firstPart.fields =	{
				email : document.getElementById('email'),
				password : document.getElementById('password'),
				name : document.getElementById('name')
			};

		this.firstPart.userData = {
			gender: 'male'
		};

		this.firstPart.errors = {
			emailError: document.getElementById('email-error'),
			passwordError : document.getElementById('password-error'),
			nameError : document.getElementById('name-error'),
		};

		this.firstPart.progress = document.getElementById('first-part-progress');

		this.secondPart = document.getElementById('second-part');

		this.secondPart.fields = {
			country: document.getElementById('country'),
			city: document.getElementById('city'),
			add1: document.getElementById('add1'),
			add2: document.getElementById('add2'),
			zip: document.getElementById('zip'),
			phone: document.getElementById('phone'),
		};

		this.secondPart.userData = {
			country: 'USA',
			city: 'NY'
		}

		this.secondPart.fields.country.isCounted = this.secondPart.fields.city.isCounted = true;


		this.secondPart.errors = {
			add1Error: document.getElementById('add1-error'),
			zipError: document.getElementById('zip-error'),
			phoneError: document.getElementById('phone-error')
		};

		this.secondPart.progress = document.getElementById('second-part-progress');

		this.thirdPart = document.getElementById('third-part');

		this.thirdPart.fields = {
			upload: document.getElementById('upload'),
			interests: document.getElementById('interests'),
			about: document.getElementById('about'),
			counter: document.getElementById('char-counter'),
			date: document.getElementById('date'),
			conditions: document.getElementById('conditions'),
		};

		this.thirdPart.fields.interests.checkboxes = this.thirdPart.fields.interests.getElementsByTagName('input');

		this.thirdPart.userData = {};

		this.thirdPart.errors = {
			dateError: document.getElementById('date-error'),
			conditionsError: document.getElementById('conditions-error')
		};

		this.thirdPart.progress = document.getElementById('third-part-progress');

		this.finishPart = document.getElementById('finish-part');

		this.serverErrorPopup = document.getElementById('popup');
	};

	ComplexForm.prototype.fillSelects = function() {
		this.secondPart.fields.city.USA = '<option selected="selected">NY</option>' +
						'<option>Denver</option>' +
						'<option>Boston</option>' +
						'<option>Washington</option>' +
						'<option>Seattle</option>';
		this.secondPart.fields.city.Canada = '<option selected="selected">Vancoover</option>' +
						'<option>Toronto</option>';
		this.secondPart.fields.city.Mexica = '<option selected="selected">Mexico</option>' +
						'<option>Tihuana</option>';
		this.secondPart.fields.city.Germany = '<option selected="selected">Berlin</option>' + 
						'<option>Drezden</option>' +
						'<option>Frankfurt</option>';
		this.secondPart.fields.city.France = '<option selected="selected">Paris</option>' +
						'<option>Bordo</option>' +
						'<option>Marsel</option>';
		this.secondPart.fields.city.Italy = '<option selected="selected">Rome</option>' +
						'<option>Como</option>';
	};

	ComplexForm.prototype.addListeners = function() {
		var self = this;
		var firstPartFields = this.firstPart.fields;
		var secondPartFields = this.secondPart.fields;
		var thirdPartFields = this.thirdPart.fields;

		document.getElementById('first-part-submit').addEventListener('click', function() {
			self.submitForm(event, self.firstPart, self.secondPart);
		});

		document.getElementById('second-part-submit').addEventListener('click', function() {
			self.submitForm(event, self.secondPart, self.thirdPart);
		});

		document.getElementById('third-part-submit').addEventListener('click', function() {
			self.submitForm(event, self.thirdPart, self.finishPart);
		});


		document.getElementById('second-part-back').addEventListener('click', function() {
			self.back(event, self.secondPart, self.firstPart);
		});

		document.getElementById('third-part-back').addEventListener('click', function() {
			self.back(event, self.thirdPart, self.secondPart);
		});

		document.getElementById('first-part-reset').addEventListener('click', function() {
			self.reset(event, self.firstPart);
		});

		document.getElementById('second-part-reset').addEventListener('click', function() {
			self.reset(event, self.secondPart);
		});

		document.getElementById('third-part-reset').addEventListener('click', function() {
			self.reset(event, self.thirdPart);
		});

		document.getElementById('finish').addEventListener('click', function() {
			self.finish();
		});

		document.getElementById('restart').addEventListener('click', function() {
			self.restart();
		});


		firstPartFields.email.addEventListener('blur', function() {
			self.emailValidation(event);
		}, true);

		firstPartFields.password.addEventListener('blur', function() {
			self.passwordValidation(event);
		}, true);

		firstPartFields.name.addEventListener('blur', function() {
			self.nameValidation(event);
		}, true);

		document.getElementById('male').addEventListener('change', function(){
			self.firstPart.userData.gender = 'male';
		}, true);

		document.getElementById('female').addEventListener('change', function(){
			self.firstPart.userData.gender = 'female';
		}, true);

		secondPartFields.country.addEventListener('change', function(event) {
			self.secondPart.userData.country = event.currentTarget.value;
			self.countrySelect(event);
		});

		secondPartFields.city.addEventListener('change', function(event) {
			self.secondPart.userData.city = event.currentTarget.value;
		});

		secondPartFields.add1.addEventListener('blur', function() {
			self.add1Validation(event);
		}, true);

		secondPartFields.zip.addEventListener('blur', function() {
			self.zipValidation(event);
		}, true);


		thirdPartFields.about.addEventListener('keyup', function() {
			self.countChars(event);
		});

		thirdPartFields.date.addEventListener('blur', function() {
			self.dateValidation(event);
		}, true);

		thirdPartFields.conditions.addEventListener('blur', function() {
			self.conditionsValidation(event);
			self.thirdPart.userData.conditions = event.currentTarget.checked;
		}, true);

		this.progressHandlers([this.firstPart, this.secondPart, this.thirdPart]);

	};

	ComplexForm.prototype.progressHandlers = function(parts) {
		var self = this;
		parts.forEach(function(item) {
			for (var key in item.fields) {
				if (key !== 'interests') {
					item.fields[key].addEventListener('blur', 
						self.changeProgress.bind(self, item, item.fields[key] )
					);
				} else {
					var checkboxes = item.fields[key].checkboxes;
					for (var i = 0; i < checkboxes.length; i++) {
						checkboxes[i].addEventListener('change', 
							self.changeProgress.bind(self, item, item.fields[key] )
						);
					}
				}
			}
		});
	};

	ComplexForm.prototype.changeProgress = function(part, field) {
		var currentValue = part.progress.getAttribute('aria-valuenow');
		var maxValue = part.progress.getAttribute('aria-valuemax');

		if (field.id === 'interests') {
			field.value = false;
			for (var i = 0; i < field.checkboxes.length; i++) {
				if ( field.checkboxes[i].checked) {
					field.value = true;
				}
			}
		}

		if (field.value && field.valid !== false && !field.isCounted) {
			field.isCounted = true;
			currentValue++;
		} else if ( (!field.value || field.valid === false) && field.isCounted) {
			field.isCounted = false;
			currentValue--;
		}

		part.progress.setAttribute('aria-valuenow', currentValue);
		part.progress.style.width = currentValue/maxValue * 100 + '%';


		part.userData[field.id] = field.value;
	};

	ComplexForm.prototype.validationUIChanges = function(part, fieldName, errorText) {
		if (errorText) {
			part.fields[fieldName].valid = false;
			part.errors[fieldName + 'Error'].innerHTML = errorText;
			addClass(part.errors[fieldName + 'Error'], 'shown-error');
		} else {
			removeClass(part.errors[fieldName + 'Error'], 'shown-error');
			part.fields[fieldName].valid = true;
		}
	};

	ComplexForm.prototype.emailValidation= function(event) {
		var emailValue = this.firstPart.fields.email.value;
		var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		var errorText;

		if (!emailValue) {
			errorText = 'Email cannot be empty!';
		} else if (!re.test(emailValue) ) {
			errorText = 'Email is not valid!';
		}

		

		this.validationUIChanges(this.firstPart, 'email', errorText);
	};

	ComplexForm.prototype.passwordValidation = function(event) {
		var passValue = this.firstPart.fields.password.value;
		var re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		var errorText;

		if (!passValue) {
			errorText = 'Password cannot be empty!';
		} else if (passValue.length < 6) {
			errorText = 'Password must be at least 6 characters length';
		} else if (passValue.length > 16) {
			errorText = 'Password must be at shorter than 17 characters';
		} else if (!re.test(passValue) ) {
			errorText = 'Password must contain letters, \nnumbers and special characters';
		}

		this.validationUIChanges(this.firstPart, 'password', errorText);
	};

	ComplexForm.prototype.nameValidation = function(event) {
		var nameValue = this.firstPart.fields.name.value;
		var errorText;

		if (!nameValue) {
			errorText = 'Name cannot be empty!';
		} else if (nameValue.length < 4) {
			errorText = 'Name must be at least 4 characters length';
		} 

		this.validationUIChanges(this.firstPart, 'name', errorText);
	};

	ComplexForm.prototype.countrySelect = function(event) {
		var newCountry = this.secondPart.fields.country.value;
		this.secondPart.fields.city.innerHTML = this.secondPart.fields.city[newCountry];
	};

	ComplexForm.prototype.add1Validation = function(event) {
		var addressValue = this.secondPart.fields.add1.value;
		var errorText;

		if (!addressValue) {
			errorText = 'Address cannot be empty!';
		} else {
			
		}

		this.validationUIChanges(this.secondPart, 'add1', errorText);
	};

	ComplexForm.prototype.zipValidation = function(event) {
		var zipValue = this.secondPart.fields.zip.value;
		var country = this.secondPart.fields.country.value;
		var postalCodeRegex;
		var errorText;

		if (!zipValue) {
			errorText = 'Zip code cannot be empty!';
		} else {
			switch (country) {
				case "USA":
					postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
					break;
				case "Canada":
					postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
					break;
				default:
					postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
			}
			if (!postalCodeRegex.test(zipValue)) {
				errorText = 'Zip code is not valid!';
			}
		}

		this.validationUIChanges(this.secondPart, 'zip', errorText);
	};

	ComplexForm.prototype.countChars = function(event) {
		var text = this.thirdPart.fields.about.value;
		if (text.length > 500) {
			text = text.slice(0, 500);
			this.thirdPart.fields.about.value = text;
		}
		this.thirdPart.fields.counter.innerHTML = text.length;
	};

	ComplexForm.prototype.dateValidation = function(event) {
		var dateValue = this.thirdPart.fields.date.value;
		var dateRegex = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
		var errorText;

		var date = new Date(dateValue);
		if ( isNaN( date.getTime() ) ) {
			errorText = 'Date is invalid!';
		}

		this.validationUIChanges(this.thirdPart, 'date', errorText);
	};

	ComplexForm.prototype.conditionsValidation = function(event) {
		if (!this.thirdPart.fields.conditions.checked) {
			var errorText = 'You must check this point!';
		}

		this.validationUIChanges(this.thirdPart, 'conditions', errorText);
	};


	ComplexForm.prototype.validation = function(part) {
		var allowSubmition = true;
		for (var key in part.fields) {
			if (part.fields[key].valid === undefined && this[key + 'Validation']) {
				this[key + 'Validation']();
			}
			if (part.fields[key].valid === false) {   
				allowSubmition = false;
			}
		}
		return allowSubmition;
	};

	ComplexForm.prototype.back = function(event, part, prevPart) {
		removeClass(part, 'active-part');
		addClass(prevPart, 'active-part');
	};

	ComplexForm.prototype.reset = function(event, part) {
		var minValue = part.progress.getAttribute('aria-valuemin');
		var maxValue = part.progress.getAttribute('aria-valuemax');

		part.progress.setAttribute('aria-valuenow', minValue);
		part.progress.style.width = minValue/maxValue * 100 + '%';

		for (var key in part.fields) {
			part.fields[key].isCounted = false;
		}
	};

	ComplexForm.prototype.submitForm = function(event, part, nextPart) {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);

		if(!this.validation(part)) {
			return;
		}

		var self = this;

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8888/', true);
		xhr.send(JSON.stringify(part.userData));

		console.log('post send', JSON.stringify(part.userData));

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// part.classList.remove('active-part');
				removeClass(part, 'active-part');
				// nextPart.classList.add('active-part');
				addClass(nextPart, 'active-part');
			} else if (xhr.readyState == 4 && xhr.status == 500) {
				addClass(self.serverErrorPopup, 'shown');
				setTimeout(removeClass.bind(self, self.serverErrorPopup, 'shown'), 1500);
			}

		}
	};


	ComplexForm.prototype.finish = function(first_argument) {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8888/', true);
		xhr.send();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.info(xhr.responseText);
			} else if (xhr.readyState == 4 && xhr.status == 500) {
				addClass(self.serverErrorPopup, 'shown');
				setTimeout(removeClass.bind(self, self.serverErrorPopup, 'shown'), 1500);
			}

		}
	};

	ComplexForm.prototype.restart = function() {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8888/', true);
		xhr.send('{"refresh": true}');

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.info(xhr.responseText);
			} else if (xhr.readyState == 4 && xhr.status == 500) {
				addClass(self.serverErrorPopup, 'shown');
				setTimeout(removeClass.bind(self, self.serverErrorPopup, 'shown'), 1500);
			}

		}

		window.location.reload();
	};

	var form = new ComplexForm();

	function addClass(elem, className) {
		if (elem.classList) {
			elem.classList.add(className);
			return;
		}

		var classList = elem.className.split(' ');
		var isFound = false;
		classList.forEach(function(item) {
			if (item === className) {
				isFound = true;
			}
		});

		if (isFound) {
			return;
		}

		classList.push(className);
		elem.className = classList.join(' ');
	};


	function removeClass(elem, className) {
		if (elem.classList) {
			elem.classList.remove(className);
			return;
		}

		var classList = elem.className.split(' ');
		var isFound = false;
		classList.forEach(function(item, i) {
			if (item === className) {
				isFound = true;
				classList.splice(i, 1);
			}
		});

		if (!isFound) {
			return;
		}

		elem.className = classList.join(' ');
	};

})();