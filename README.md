# JsonToForm
A lightweight script to generate forms from objects or JSON files.

<hr>

## Getting Started
Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include JsonToForm on your site
You can [download the files directly from GitHub](https://github.com/israeljunior/json-to-form/archive/master.zip).

```html
<script src="path/to/json-to-form.min.js"></script>
```

### 2. Add the markup to your HTML

Needed only a container for the form.

```html
<div id="form1"></div>
```

### 3. Initialize JsonToForm

In the footer of your page, after the content, initialize JsonToForm by passing in an object or JSON path, and the selector for the container.

```html
<script>
	var form1 = new JsonToForm({
		data: './src/data.json',
		container: '#form1'
	})

	// OR

	var form1 = new JsonToForm({
		data: {
			options: {
				action: 'submit.php'
			},
			fields: [
				{
					name: 'name',
					placeholder: 'Enter your name'
				},
				{
					name: 'email',
					placeholder: 'Enter a valid email address',
					type: 'email'
				},
				{
					name: 'options',
					type: 'checkbox',
					data: [
						{title: 'aaa'},
						{title: 'bbb'},
						{title: 'ccc'},
					]
				}
			]
		},
		container: '#form1'
	})
</script>
```

## License
The code is available under the [MIT License](LICENSE.txt).
