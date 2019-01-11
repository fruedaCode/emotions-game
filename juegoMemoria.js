$(document).ready(function (){

	reiniciarJuego();

	function reiniciarJuego(){
		addClicksHandler();
		$('div.flip-container').removeClass('hover');
		$('div.front[data-id]').attr('data-estado', 'sinPareja');
		$('div#contenidoJuego').randomize('div.flip-container');	
	}
	
	function addClicksHandler(){
		$('div.flip-container').off().click(function(){
			toggleTarjeta(this);
			checkPareja();
			checkJuegoCompletado();
		});
	}
	
	$('button#reiniciarJuego').click(function(){
		reiniciarJuego();
	});
	
	function checkPareja(){
		var imagenesVisibles = $('div.flip-container.hover div.front[data-estado="sinPareja"]');
		if(imagenesVisibles.length == 2){
			if(imagenesVisibles.eq(0).attr('data-id') == imagenesVisibles.eq(1).attr('data-id')){
				imagenesVisibles.attr('data-estado', 'conPareja');
				$.each(imagenesVisibles, function(key, item){
					bloquearTarjeta($(item.parentNode.parentNode));
				});
			}else{
				setTimeout(function(){
					$.each(imagenesVisibles, function(key, item){
						toggleTarjeta(item.parentNode.parentNode);
					});
				}, 500);
			}
		}
	}
	
	function checkJuegoCompletado(){
		var totalCaras = $('div.flip-container');
		var imagenesConPareja = $('div[data-estado="conPareja"]');
		if(totalCaras.length == imagenesConPareja.length){
			reiniciarJuego();
			$.fancybox.close();
			$( "#dialog-message" ).dialog( "open" );
		}
	}
	
	function toggleTarjeta(div){
		div.classList.toggle('hover');
	}
	
	function bloquearTarjeta(div){
		div.off();
	}
	
	$("#dialog-message").dialog({
		autoOpen: false,
	    modal: true,
	    draggable: false,
	    resizable: false,
	    show: 'blind',
	    hide: 'blind',
	    width: 400,
	    buttons: {
	        "Reiniciar Juego": function() {
	        	$(this).dialog("close");
	        	$("a#fancyBoxLink").click();
	        }
	    }
	});
	
});