/*! Dependent Required Fields (c) Aaron Gustafson (@AaronGustafson). MIT License. http://github.com/easy-designs/jquery.easy-dependent-required-fields.js */

/* Dependent Required Fields API
 * 
 * To make fields required based on the value of another field, you must define the field 
 * and the value that triggers the field to be required. These are defined using
 * the data attributes data-required-dependency-field and data-required-dependency-value,
 * respectively:
 * 
 *  <label for="department">Department</label>
 * 		<input type="email" id="department" name="department" 
 * 				data-required-dependency-field="industry"
 * 				data-required-dependency-value="Academia"/>
 * 
 * data-required-dependency-field must match the `name` attribute of the field to observe
 * data-required-dependency-field is the value to look for (matches are case insensitive)
 * 
 * When a field becomes required, its required attribute is set and its label is given
 * a * in the form of an abbreviation: <abbr title="required">*</abbr>. When the field is
 * un-required, the abbreviation and the required attribute are removed.\
 * 
 * If multiple values from the same field will trigger a field to be required, then use a comma
 * separated list in the HTML, like so:
 * 
 * <label for="department">Department</label>
 * 		<input type="email" id="department" name="department" 
 * 				data-required-dependency-field="industry"
 * 				data-required-dependency-value="Academia,Education"/>
 * 
 **/
(function( $, $dependent_fields ){
	
	if ( $dependent_fields.length )
	{
		var $observing = $([]),
			LABEL = 'label',
			REQUIRED = 'required',
			DEPENDENCY = REQUIRED + '-dependency',
			DEPENDENCIES = REQUIRED + '-dependencies',
			$required = $('<abbr title="required">*</abbr>'),
			required_selector = 'abbr[title=required]';
		
		$dependent_fields
			.each(function(){
			
				var $field = $(this),
					$form = $field.closest('form'),
					$observe = $( '[name="' + $field.data( DEPENDENCY + '-field' ) + '"]', $form ),
					trigger_value = $field.data( DEPENDENCY + '-value' ).toLowerCase().split(','),
					dependencies = $observe.data( DEPENDENCIES ) || [];
				
				$field.data( LABEL, $( LABEL + '[for=' + $field.attr('id') + ']', $form ) );
				
				// update the dependencies
				dependencies.push({
					$field: $field,
					trigger_value: trigger_value
				});
				$observe.data( DEPENDENCIES, dependencies );
			
				$observing = $observing.add( $observe );
				
			 })
			.on( 'field.require', function(){
				
				$label = $(this)
							// require the field first
							.attr( REQUIRED, REQUIRED )
							// return the label
							.data( LABEL );
				
				// if no *, add one
				if ( $label.length &&
					 ! $label.find( required_selector ).length )
				{
					$label.append( $required.clone() );
				}
				
			 })
			.on( 'field.un-require', function(){

				$label = $(this)
							// require the field first
							.removeAttr( REQUIRED )
							// return the label
							.data( LABEL );
				
				// if label, remove the *
				if ( $label.length )
				{
					$label.find( required_selector )
						.remove();
				}

			 });
		
		$observing
			.on( 'change keyup', function(){

				var $field = $(this),
					dependencies = $field.data( DEPENDENCIES );
			
				$.each( dependencies, function( i, dependency ){
				
					// gonna use event triggering to allow us to maintain the code in one place
					// this also makes it extensible
					if ( $.inArray($field.val().toLowerCase(), dependency.trigger_value ) !== -1)
					{
						dependency.$field.trigger( 'field.require' );
					}
					else
					{
						dependency.$field.trigger( 'field.un-require' );
					}
				
				});
			
			})
			// starting positions
			.triggerHandler('change');
		
	}
	
})( jQuery, jQuery('[data-required-dependency-field]') );