// WBP CSS Kit Ver 1.0
//
//	Copyright 2013 WBP, Inc
//	http://www.bizmpeople.com/
//
//	Designed and built by eden.

$(function() {

	//switch
	$('.switch').on('click', function(){
		var $this = $(this);

		if($this.hasClass('switchOn')){
			$this
				.children('i')
					.animate({left:"-1px"}, 200)
					.end()
				.attr('data-switch','N')
				.removeClass('switchOn', {duration: 200});
		}else{
			$this
				.children('i')
					.animate({left:"15px"}, 200)
					.end()
				.attr('data-switch','Y')
				.addClass('switchOn', {duration: 200});
		}
	});

	//modal
	$('*[data-modal]').on('click', function(){
		var $this = $(this),
			modal = $('#'+$this.data('modal')),
			ajax = $this.data('modal-ajax'),
			modalC = modal.children('div');

		if(ajax){
			//modal clear
			modalC
				.empty();
			$.ajax({
				url: ajax,
				async : false,
				success: function(data){
					modalC.append(data);
				},
				error: function(){
					modalC.append('ajax load error.<br />please check the ajax file.');
				},
				beforeSend:function(){
					var div_loading = $("<div class='fs_14 c_fff loading radius_all'>Loading data...</div>");
			        modalC.append(div_loading);
			    },
			    complete:function(){
			        $(".loading").hide();
			    }
			});			
		}

		//append close button
		modalC.append("<a href='javascript:;' class='modalClose' onclick='modalClose(this);'></a>");
		modal
			.fadeIn(200);

        //modal center align
        modalC
        	.css({marginLeft: -modalC.outerWidth()/2,marginTop: -modalC.outerHeight()/2+30})
        	.animate({marginTop: "-=30"}, 400);
        return false;
	});

	//tooltip
	$('*[data-tooltip]').hover(function(){
		$('div.tooltip').remove();
		var $this = $(this),
			pos = $this.offset();

		//basic tooltip pos set
		if($this.data('tooltip-pos')==undefined){
			var tooltipPos = 'top';
		}else{
			var tooltipPos = $this.data('tooltip-pos');
		}

		$('body').append("<div class='tooltip'><i class='"+tooltipPos+"'></i>"+$this.data('tooltip')+"</div>");
	    var tooltip = $('div.tooltip');
	    tooltip.hide().fadeIn(100);

	     // calculate position of tooltip
	    var w = $this.outerWidth();
	    	h = $this.outerHeight();
		
		if(tooltipPos == "top" || tooltipPos==undefined){
			var newtop = pos.top - tooltip.outerHeight() - 6,
	        newleft = pos.left + (w/2) - (tooltip.outerWidth()/2);
		}else if(tooltipPos == "bottom"){
			var newtop = pos.top + h + 6 ,
	        newleft = pos.left + (w/2) - (tooltip.outerWidth()/2);
		}else if(tooltipPos == "left"){
			var newtop = pos.top + (h/2) - (tooltip.outerHeight()/2) ,
	        newleft = pos.left - tooltip.outerWidth() - 6;
		}else if(tooltipPos == "right"){
			var newtop = pos.top + (h/2) - (tooltip.outerHeight()/2) ,
	        newleft = pos.left + w + 6;
		}
		
	    //set position
	    $('.tooltip').css('left', newleft );
	    $('.tooltip').css('top',  newtop );

	}, function(){
		$('div.tooltip')
			.fadeOut(100, function(){
				$(this).remove();
			});
	});
});

//modal close
function modalClose(event){
	var $this = $(event);
	$this
		.parent('div')
			.animate({marginTop: "+=30"}, 400)
			.end()
		.parents('div.modal')
		.fadeOut(400);
}