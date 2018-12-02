$(function() {
	
	/*$( "#datepicker" ).datepicker({
		
		dateFormat : 'dd/mm/yy'
		
	});*/
	
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '&#x3c;Préc',
		nextText: 'Suiv&#x3e;',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
		'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
		monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
		'Jul','Aou','Sep','Oct','Nov','Dec'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy'/*'DD, d M, yy'*/,
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		minDate: 0,
		maxDate: '+12M +0D',
		numberOfMonths: 1,
		showButtonPanel: true,
		showAnim: 'fold',
		showOn: "button",
      	buttonImage: "../css/images/calendar.gif",
      	buttonImageOnly: true,
      	buttonText: "Choisir une date"	
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
	
	$( "#datepicker" ).datepicker();
	
	/*SEPARATEUR*/
	
	var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    /*$( "#tags" ).autocomplete({
      source: availableTags,
		minLength:2
    });*/
	
	$( "#tags" ).autocomplete({
  source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
          }) );
      },minLength:2
});
	
/*SEPARATEUR*/
	
$.ajax({
	url:'../json/cities.json',/*url:'./json/cities.json',*/
	method: "GET",
	dataType: "json",
	success:function(monObjet) {
		
		/*console.log(monObjet[0].name);*/
		/*console.log(monObjet[0].zip);*/
		/*console.log(monObjet[2].name);*/
		/*console.log(monObjet.length);*/
			
			/*var i = 0;
			for(i=0; i<monObjet.length; i++)
		{
			console.log(monObjet[i].name);
		}*/
		
		/*var i = 0;
		var villes = [];
		
		for(i=0; i<monObjet.length; i++)
			
			{
			villes.push(monObjet[i].name);	
			}
		console.log(villes);
		
		$("#ville").autocomplete({
			source: villes,
			minLength:1
		});
	}*/
 
//	console.log(monObjet.length); 
			var i = 0;
			var villes = [];
					
			for(i=0; i<monObjet.length; i++) 
	
				{
					
					var obj = {};
				
					obj["value"] = monObjet[i].zip;
					obj["label"] = monObjet[i].zip+" "+monObjet[i].name;
					obj["ville"] = monObjet[i].name;

					villes.push(obj);
	
				} // for

			console.log(villes);
			  
			$( "#cp" ).autocomplete({

					source: function( request, response ) {
						var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
						response( $.grep( villes, function( item ){
							return matcher.test( item.label );
						}) );
					},
					minLength: 1,
					select:function(event, ui){		
						$("#ville").val(ui.item.ville);
			
					}
			});		  
					  
	} // success function
	
});
	
$('#form-inscription').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
   //alert( 'Nice, Form is valid.' );
 
 // ici faire la requête ajax
	  
var donnees = $("#form-inscription").serialize();	  
 $.ajax({
   	 // 1) on définit le fichier vers lequel on envoye la requête POST
       url : 'php.php',
	
	// 2/ on spécifie la méthode  
       type : 'POST', // Le type de la requête HTTP, ici  POST
    
	// 3) on définit les variables POST qui sont ennvoyées au fichier .php qui les récupère sous forme de $_POST["nom"] 
	  data : donnees, // On fait passer nos variables au script coucou.php
     
	 // 4) format de retour du fichier php dans "data"
	   dataType : 'html',
	   
	   // 5) fonction à effectuer en cas de succès
	   success : function(data){ //  contient le HTML renvoyé
        
		$('#contenu').html(data);
		
	
	   } // success
   
	// $('#form-inscription').hide();
   
   }); // $.ajax function

 
 }, // valid
  onError : function( event ){
    //alert( 'Stop bro !! There are some errors.');
  
  
  }, // error
  
  
  display : 'bubble',
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  bubblePosition: 'right', // Bubble position // right / bottom
  bubbleGapLeft: 15, // Right gap of bubble (px unit)
  bubbleGapTop: 0, // Top gap of bubble (px unit)
  /* To enable real-time form control, set this option true. */
  realTime : true
  
});


});