jquery.easy-dependent-required-fields.js
===================================

Make fields required based on the value of another field.

The API
-------

To make fields required based on the value of another field, you must define the field and the value that triggers the field to be required. These are defined using the data attributes `data-required-dependency-field` and `data-required-dependency-value`, respectively:

	<label for="department">Department</label>
	<input type="email" id="department" name="department" 
		data-required-dependency-field="industry"
		data-required-dependency-value="Academia"/>

 *    `data-required-dependency-field` must match the `name` attribute of the field to observe
 *    `data-required-dependency-field` is the value to look for (matches are case insensitive)

When a field becomes required, its `required` attribute is set and its `label` is given a "*" in the form of an abbreviation: `<abbr title="required">*</abbr>`. When the field is un-required, the abbreviation and the `required` attribute are removed.

If multiple values from the same field will trigger a field to be required, then use a comma separated list in the HTML, like so:

    <label for="department">Department</label>
    <input type="email" id="department" name="department" 
        data-required-dependency-field="industry"
        data-required-dependency-value="Academia,Education"/>