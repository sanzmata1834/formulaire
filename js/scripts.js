$(function() {
	
	$.datepicker.regional['fr'] = {
		closeText: 'X',
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
      	buttonImage: "../css/images/calendar-alt-solid.svg",
      	buttonImageOnly: true,
      	buttonText: "Choisir une date"	
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
	
	$( "#datepicker" ).datepicker();
	
/*Code postal et ville*/	
$.ajax({
	url:'../json/cities.json',/*url:'./json/cities.json',*/
	method: "GET",
	dataType: "json",
	success:function(monObjet) {
 
		var i = 0;
        var cp = [];
								  
        for(i=0; i<monObjet.length; i++) {
					
            var obj = {};
				
            obj["ville"] = monObjet[i].name;
            obj["value"] = monObjet[i].zip;
            obj["label"] = obj["value"]+" "+obj["ville"];
				
            cp.push(obj);
								
        }//for cp
        var villes = [];
								  
        for(i=0; i<monObjet.length; i++) {
					
            var obj = {};
				
            obj["value"] = monObjet[i].name;
            obj["cp"] = monObjet[i].zip;
            obj["label"] = obj["value"]+" "+obj["cp"];
				
            villes.push(obj);
								
        }//for villes
        
        $( "#cp" ).autocomplete({
            
            source: function( request, response ) {
                
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( cp, function( item ){
                    
                    return matcher.test( item.label );
                    
                }) );
            }, 
            minLength: 1,
            select: function(event, ui) {
                
                $("#ville").val(ui.item.ville);
                
            }
        });//autocomplete cp
        
        $( "#ville" ).autocomplete({
            
            source: function( request, response ) {
                
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( villes, function( item ){
                    
                    return matcher.test( item.label );
                    
                }) );
            }, 
            minLength: 3,
            select: function(event, ui) {
                
                $("#cp").val(ui.item.cp);
                
            }
        });//autocomplete ville	
			
					  
	} // success function
	
});
/* /Code postal et ville*/
	
//Form inscription
$('#form-inscription').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
   //alert( 'Nice, Form is valid.' );
 
 // ici faire la requête ajax
	  
var donnees = $("#form-inscription").serialize();	  
 $.ajax({
   	 // 1) on définit le fichier vers lequel on envoye la requête POST
       url : 'inscription.php',
	
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
   
   }); // $.ajax function
	  
$('.formulaire-comp').hide();
 
 }, // valid
  onError : function( event ){
    //alert( 'Stop bro !! There are some errors.');
  
  
  }, // error

  display : 'inline',
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  /* To enable real-time form control, set this option true. */
  realTime : true,
errorTemplateClass : 'validetta-inline',
/*  bubblePosition: 'bottom',
  bubbleGapTop: 10,
  bubbleGapLeft: -5*/
  
});
// /Form inscription
	
//Form connexion
$('#form-connexion').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
   //alert( 'Nice, Form is valid.' );
 
 // ici faire la requête ajax
	  
var donnees = $("#form-connexion").serialize();	  
 $.ajax({
   	 // 1) on définit le fichier vers lequel on envoye la requête POST
       url : 'connexion.php',
	
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
   
   }); // $.ajax function

$('.formulaire-comp').hide();
 
 }, // valid
  onError : function( event ){
    //alert( 'Stop bro !! There are some errors.');
  
  
  }, // error
  
  display : 'inline',
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  /* To enable real-time form control, set this option true. */
  realTime : true,
errorTemplateClass : 'validetta-inline',
/*  bubblePosition: 'bottom',
  bubbleGapTop: 10,
  bubbleGapLeft: -5*/
});
// /Form connexion

//Toggle connexien et inscription
$('#connexion').click(function(){
	$('#form-connexion').removeClass('hidden');
	$('#connexion').hide();
	$('#inscription').fadeIn("slow");
	$('#form-inscription').addClass('hidden');
})
$('#inscription').click(function(){
	$('#form-inscription').removeClass('hidden');
	$('#inscription').hide();
	$('#connexion').fadeIn("slow");
	$('#form-connexion').addClass('hidden');
})
//Toggle connexien et inscription
});