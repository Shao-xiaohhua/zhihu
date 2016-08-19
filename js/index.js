$(function(){
	var riqi=moment();
	var kaiguan=true;
	$.ajax({
		url:"http://sxhzhihu.duapp.com/shanping",
		dataType:'jsonp',
	}).done(function(ojb){
		var imgaa=ojb.img;
        $('.zhaopian').find('img').attr('src',imgaa)
	})
	//热点新闻
		$.ajax({
		url:"http://sxhzhihu.duapp.com/xinwenredian",
		dataType:'jsonp',
	}).done(function(redian){
		var arr = redian.top_stories.slice(0,-1);
		var raa=redian.stories;
		console.log(redian)
		var row=$('<div class="row"></div>');
		row.appendTo($('.neirong'));
		$('<h4>').text(riqi.format('YYYY年MM月DD日')).appendTo('.you');               
		$.each(arr,function(i,v){
		var iner=$('<div class="col-sm-3 col-xs-12 rean" data-id="'+v.id+'"><div class="thumbnail"><img src="'+v.image+'" alt=""><div class="caption"><h3>'+v.title+'</h3></div></div>')
		iner.appendTo(row)
		})
		$.each(raa, function(i,v) {
			$('<div class="lie list-group"><a class="list-group-item anniu" data-id="'+v.id+'"><img class="media-object" src="'+v.images+'" alt=""><h4 class="list-group-item-heading">'+v.title+'</h4><p class="list-group-item-text"></p></a></div>').appendTo('.you');
		});

	});
	
	//滑动
	$(window).on('scroll',function(){
		var hi=$(window).scrollTop()+$(this).height();
		var cg=$('.you').height();
		if(hi>=cg){
			console.log(riqi.format('YYYYMMDD'))
			if(kaiguan){
				kaiguan=false;
							$.ajax({
				url:"http://sxhzhihu.duapp.com/lishixinwen",
				data:{ida:riqi.format('YYYYMMDD')},
				dataType:'jsonp'
			}).done(function(obj){
				var t=riqi.subtract(1,'day');
				kaiguan=true;
				console.log(obj)
				$('<h4>').text(t.format('YYYY年MM月DD日')).appendTo('.you');               
				var raa=obj.stories;
						$.each(raa, function(i,v) {
			$('<div class="lie list-group"><a class="list-group-item anniu" data-id="'+v.id+'"><img class="media-object" src="'+v.images+'" alt=""><h4 class="list-group-item-heading">'+v.title+'</h4><p class="list-group-item-text"></p></a></div>').appendTo('.you');
		});
			})
			}

		}
	})
	//主题列表
	$.ajax({
		url:"http://sxhzhihu.duapp.com/zhutiliebiao",
		dataType:'jsonp'
	}).done(function(data){
		console.log(data);
		var box=data.others;
		$.each(box,function(i,v){
			var name=v.name;
			var id=v.id;
	$('<div class="list-group"><a class="list-group-item cdan" data-id="'+id+'"><h4 class="list-group-item-heading">'+name+'</h4></a></div>').appendTo('.caidan');
		})

	})
	//列表详情
	$('.caidan').on('click','.cdan',function(){
		var ida = $(this).attr('data-id');
		console.log(ida)
			$.ajax({
		url:"http://sxhzhihu.duapp.com/zhutineirong",
		data:{ida:ida},
		dataType:'jsonp',
	}).done(function(data){
		console.log(data)
		var box=data.stories;
		$('.you').empty();
		$.each(box,function(i,v){
			$('<div class="lie list-group"><a class="list-group-item anniu" data-id="'+v.id+'"><img class="media-object" src="'+v.images+'" alt=""><h4 class="list-group-item-heading">'+v.title+'</h4><p class="list-group-item-text"></p></a></div>').appendTo('.you');
		})
	})
		
	})

//新闻详情
$('.you').on('click','.anniu',function(){
	var id=$(this).attr('data-id');
	console.log(id)
	$('.zhezhao').show();
	$.ajax({
		url:"http://sxhzhihu.duapp.com/xinwenxiangqing",
		data:{id:id},
		dataType:'jsonp'
	}).done(function(data){
		var neirong=data.body;
		$(neirong).appendTo($('.zhezhao .zzz .inner'))
	})
})
$('.you').on('click','.rean',function(){
	var id=$(this).attr('data-id');
	console.log(id)
	$('.zhezhao').show();
	$.ajax({
		url:"http://sxhzhihu.duapp.com/xinwenxiangqing",
		data:{id:id},
		dataType:'jsonp'
	}).done(function(data){
		var renei=data.body;
		$(renei).appendTo($('.zhezhao .zzz .inner'))
	})
})
$('.zhezhao').on('click',function(){
	$(this).hide();
	$(this).find('.inner').empty();
})
$('.zhezhao .zzz').on('click',false);
$('.zhezhao .zzz .jiao').on('click',function(){
	$('.zhezhao').hide();
	$('.inner').empty();
})
	$('.cehezi').on('mouseover',function(e){
		$('.you').addClass('bian');
		$('.mianbao').fadeOut(500);
		$('.caidan').addClass('chu');
	})
		$('.cehezi').on('mouseout',function(){
		$('.you').removeClass('bian');
		$('.mianbao').fadeIn(500);
		$('.caidan').removeClass('chu');
	})
		
//返回首页
$('.mianbao').on('click',function(){
	$('.you').empty();
			$.ajax({
		url:"http://sxhzhihu.duapp.com/xinwenredian",
		dataType:'jsonp',
	}).done(function(redian){
		var arr = redian.top_stories.slice(0,-1);
		var raa=redian.stories;
		console.log(redian);
		$('<div class="title container"><h2>有趣的新闻</h2></div><div class="neirong container"></div>').appendTo('.you');
		var row=$('<div class="row"></div>');
		row.appendTo($('.neirong'));
		$('<h4>').text(riqi.format('YYYY年MM月DD日')).appendTo('.you');               
		$.each(arr,function(i,v){
		var iner=$('<div class="col-sm-3 col-xs-12 rean" data-id="'+v.id+'"><div class="thumbnail"><img src="'+v.image+'" alt=""><div class="caption"><h3>'+v.title+'</h3></div></div>')
		iner.appendTo(row)
		})
		$.each(raa, function(i,v) {
			$('<div class="lie list-group"><a class="list-group-item anniu" data-id="'+v.id+'"><img class="media-object" src="'+v.images+'" alt=""><h4 class="list-group-item-heading">'+v.title+'</h4><p class="list-group-item-text"></p></a></div>').appendTo('.you');
		});

	});
})

});
