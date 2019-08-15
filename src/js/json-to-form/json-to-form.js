(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.JsonToForm = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict'

	let JsonToForm = function(options) {
		const {
			data,
			container
		} = options


		/**
		 * Control generator
		 */
		function generateControl(options, id) {
			let elem = document.createElement('div')

			const {
				type = 'text',
				placeholder = '',
				name = 'field' + id,
				data,
				label = ''
			} = options

			// Input [text, email, tel, file]
			const INPUT = function() {
				let elem = document.createElement('input')
				let className = (type === 'file') ? 'file' : 'input'

				elem.setAttribute('name', name)
				elem.setAttribute('type', type)
				elem.setAttribute('placeholder', placeholder)
				elem.setAttribute('class', className)

				return elem
			}

			// Radio
			const RADIO = function(name, data) {
				let elem = document.createElement('ul')

				data.map((item, index) => {
					elem.innerHTML += `
						<li>
							<label class="radio">
								<input name="${name}" value="${item.value || ('radio' + index)}" type="radio">
								${item.title}
							</label>
						</li>`
				})

				return elem
			}

			// Checkbox
			const CHECKBOX = function(name, data) {
				let elem = document.createElement('ul')

				data.map((item, index) => {
					elem.innerHTML += `
						<li>
							<label class="checkbox">
								<input name="${name}" value="${item.value || ('checkbox' + index)}" type="checkbox">
								${item.title}
							</label>
						</li>`
				})

				return elem
			}

			// Textarea
			const TEXTAREA = function() {
				let elem = document.createElement('textarea')

				elem.setAttribute('class', 'textarea')
				elem.setAttribute('placeholder', placeholder)

				return elem
			}

			// Select
			const SELECT = function() {
				let elem = document.createElement('select')
				
				data.map((item, index) => {
					let option = document.createElement('option')
					
					option.value = item.value || "option" + index
					option.text = item.title
					
					elem.appendChild(option)
				})

				elem.setAttribute('name',name)
				elem.setAttribute('type',type)

				return elem
			}

			switch (type) {
				case 'select':
					elem.appendChild(SELECT())
					break
				
				case 'radio':
					elem.appendChild(RADIO(name,data))
					break
				
				case 'checkbox':
					elem.appendChild(CHECKBOX(name,data))
					break
				
				case 'textarea':
					elem.appendChild(TEXTAREA())
					break
					
				default:
					elem.appendChild(INPUT())
					break
			}

			elem.setAttribute('class', 'control')

			return elem
		}


		/**
		 * Field generator
		 */
		function generateField(options, id) {
			let elem = document.createElement('div')

			// Label
			const LABEL = function() {
				let elem = document.createElement('label')

				elem.innerText = options.label || options.name
				elem.setAttribute('class','label')

				return elem
			}

			elem.setAttribute('class', 'field field--' + (options.type || 'text'))
			elem.appendChild(LABEL())
			elem.appendChild(generateControl(options, id))

			return elem
		}


		/**
		 * Form generator
		 */
		function generateForm(options, fields) {
			let elem = document.createElement('form')

			const SUBMIT = function(){
				let elem = document.createElement('button')

				elem.setAttribute('class','button')
				elem.setAttribute('type','submit')
				elem.innerText = options.submitText || 'Submit'

				return elem
			}

			const {
				method = "GET",
				action = ""
			} = options

			if( fields.length > 0 ) {
				fields.map((item, index) => {
					elem.appendChild(
						generateField(item, index)
					)
				})
			}

			elem.setAttribute('action', action)
			elem.setAttribute('method', method)
			elem.setAttribute('class', 'form')

			elem.appendChild(SUBMIT())

			// Append to container
			document.querySelector(container).appendChild(elem)
		}


		/**
		 * Load fields
		 */
		function loadFields() {
			if( typeof data === 'object' ) {
				return generateForm(data.options, data.fields)
			} else {
				return fetch(data).then(response => response.json()).then(data => {
					generateForm(data.options, data.fields)
				})
			}
		}


		loadFields()
	}

	return JsonToForm

})
