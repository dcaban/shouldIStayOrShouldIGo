$(document).ready(function(){


	$('.input-dark').hide();

});

$('.bttn-dark').click(function(){

	$('.bttn-dark').hide();
	$('.input-dark').fadeIn(2000);
});

$('input#city').cityAutocomplete();