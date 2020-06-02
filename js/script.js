$(function() {
	$('#square').keyup(function(){
		var square = $(this).val();
		var niko = $('#niko').val();
		$('#price').val(square/100*niko*3+square*0.15)
	});
	$('#niko').keyup(function(){
		var square = $('#square').val();
		var niko = $('#niko').val();
		$('#price').val(3*(square/100*niko)+square*0.15)
	});
	$('#price').keyup(function(){
		var price = $(this).val();
		$('#square').val((price/1100).toFixed(2))
	});

	$('.ask-blocks .item h4').click(function(){
		var thisH4 = $(this),
			thisSpan = $('div', $(this).parent()),
			outherH4 = $('.ask-blocks .item h4').not(thisH4),
			outherSpan = $('.ask-blocks .item div').not(thisSpan);
		outherH4.removeClass('active');
		outherSpan.hide().removeClass('active');
		thisH4.toggleClass('active');
		thisSpan.fadeToggle().toggleClass('active');
	});
    ymaps.ready(init);
    var myMap, 
        myPlacemark;

    function init(){ 
		if( ($(window).width() <= 767)  ) {
	        myMap = new ymaps.Map("map", {
		            center: [46.584290, 30.805145],
		            zoom: 8
		        }); 
		} else {
	        myMap = new ymaps.Map("map", {
	            center: [46.584290, 30.805145],
	            zoom: 8
	        }); 			
		}

        myPlacemark = new ymaps.Placemark([46.584290, 30.805145], {
            hintContent: 'Одесса',
            balloonContent: 'г. Одесса, ул.Генерала Бочарова, 60'
        });
        myMap.geoObjects.add(myPlacemark);
    }
    $('.up').click(function(e){
    	e.preventDefault();
    	$('html,body').animate({
          scrollTop: 0
        }, 1000);
    });
    $("input.tel").click(function(){
    	$(this).val('+7');
    });
	$(window).scroll(function() {
		var pos = 86;
		if( ($(window).width() <= 1199) || ($(window).width() >= 768) ) {
			pos = 150;
		}
		if( ($(window).width() <= 767) || ($(window).width() >= 576) ) {
			pos = 150;
		}
		if($(window).width() <= 575) {
			pos = 290;
		}

		if($(this).scrollTop() >= pos) {
			$('nav').addClass('stickytop');
		}
		else{
			$('nav').removeClass('stickytop');
		}
	});
    $('.smoothScroll').click(function(event) {
        event.preventDefault();
        var href=$(this).attr('href');
        var target=$(href);
        var top=target.offset().top;
        $('html,body').animate({
          scrollTop: top
        }, 1000);
    });

	$('.modal').on('hidden.bs.modal', function (e) {
	  $('input:not(.type)', $(this)).val('');
	});
	$('form').submit(function(e){
	    e.preventDefault();
		var form_data = {
			'name':$(".name", $(this)).val(),
			'tel':$(".tel", $(this)).val(),
			'price':$("#price", $(this)).val(),
			'square':$("#square", $(this)).val(),
			'type':$(".type", $(this)).val()
		};
		$.ajax({
		  type: "POST",
		  url: "mail.php",
		  data: form_data,
		  success: function(){
		    $('.modal').modal('hide');
		    setTimeout(function() {
		    	$('.success').fadeToggle();
		    }, 1000);
		    setTimeout(function() {
		    	$('.success').fadeToggle();
		    }, 2500);
		  },
		  error: function() {
		  	alert("Произошла какая то ошибка!");
		  }
		}); 
	});
	new WOW().init();
});