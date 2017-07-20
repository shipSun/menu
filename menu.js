/*
 * @author shipSun
 */

function Menu(){
	this.data = [];
	this.inputID='catID';
	this.htmlID='category';
	this.firstID = 'sort-list-first';
	this.secondID = 'sort-list-second';
	this.thirdID = 'sort-list-third';
	this.tmp = '<span title="#title" data-id="#id">#title</span>';
	this.childName='span';
	this.title='#title';
	this.id='#id';
	this.selectClass = 'active';
	
	this.firstEvent=function(){
		var className = this.selectClass;
		var listName=this.firstID+" "+this.childName;
		var parent = this;
		$('#'+this.firstID).on('mouseover', this.childName, function(){
			$('#'+listName).removeClass(className);
			$(this).addClass(className);
			if(parent.data[parent.firstIDIndex()]['child'].length==0){
				$('#'+parent.thirdID).html();
				$('#'+parent.secondID).css('display','none');
				return true;
			}
			parent.second();
			$('#'+parent.secondID).css('display','block');
		});
	}
	this.secondEvent=function(){
		var className = this.selectClass;
		var listName=this.secondID+" "+this.childName;
		var parent = this;
		$('#'+this.secondID).on('mouseover', this.childName, function(){
			$('#'+listName).removeClass(className);
			$(this).addClass(className);
			if(parent.data[parent.firstIDIndex()]['child'][parent.secondIDIndex()]['child'].length==0){
				$('#'+parent.thirdID).html();
				$('#'+parent.thirdID).css('display','none');
				return true;
			}
			parent.third();
			$('#'+parent.thirdID).css('display','block');
		});
	}
	this.thirdEvent=function(){
		var className = this.selectClass;
		var listName=this.thirdID+" "+this.childName;
		var parent = this;
		$('#'+this.thirdID).on('mouseover', this.childName, function(){
			$('#'+listName).removeClass(className);
			$(this).addClass(className);
		});
	}
	this.clickEvent=function(){
		function fillHtml(event){
			var html = new Array();
			var firstTitle = $('#'+event.data.parent.firstID+' .'+event.data.parent.selectClass).attr('title');
			var secondTitle = $('#'+event.data.parent.secondID+' .'+event.data.parent.selectClass).attr('title');
			var thirdTitle = $('#'+event.data.parent.thirdID+' .'+event.data.parent.selectClass).attr('title');
			if(firstTitle!=undefined){
				html.push(firstTitle);
			}
			if(secondTitle!=undefined){
				html.push(secondTitle);
			}
			if(thirdTitle!=undefined){
				html.push(thirdTitle);
			}
			$('#'+event.data.parent.htmlID).html(html.join('>'));
		}
		function fillInput(event){
			var input = new Array();
			var firstID = $('#'+event.data.parent.firstID+' .'+event.data.parent.selectClass).data('id');
			var secondID = $('#'+event.data.parent.secondID+' .'+event.data.parent.selectClass).data('id');
			var thirdID = $('#'+event.data.parent.thirdID+' .'+event.data.parent.selectClass).data('id');
			if(firstID!=undefined){
				input.push(firstID);
			}
			if(secondID!=undefined){
				input.push(secondID);
			}
			if(thirdID!=undefined){
				input.push(thirdID);
			}
			$('#'+event.data.parent.inputID).val(input.join('/'));
			$('#'+event.data.parent.firstID).css('display','none');
			$('#'+event.data.parent.secondID).css('display','none');
			$('#'+event.data.parent.thirdID).css('display','none');
			$('#'+event.data.parent.firstID).parent().css('display','none');
		}
		$('#'+this.firstID).on('click', this.childName, {parent:this}, fillHtml);
		$('#'+this.secondID).on('click', this.childName, {parent:this}, fillHtml);
		$('#'+this.thirdID).on('click', this.childName, {parent:this}, fillHtml);
		
		$('#'+this.firstID).on('click', this.childName, {parent:this}, fillInput);
		$('#'+this.secondID).on('click', this.childName, {parent:this}, fillInput);
		$('#'+this.thirdID).on('click', this.childName, {parent:this}, fillInput);
	}
	this.html=function(titleCode, idCode){
		tmp = this.tmp.replace(this.title, titleCode)
		tmp = tmp.replace(this.title, titleCode);
		tmp = tmp.replace(this.id, idCode);
		return tmp;
	}
	this.firstIDIndex=function(){
		return $('#'+this.firstID+' .'+this.selectClass).index();
	}
	this.secondIDIndex=function(){
		return $('#'+this.secondID+' .'+this.selectClass).index();
	}
}
Menu.prototype.init=function(config){
	if(config.inputID!=undefined){
		this.inputID = config.inputID;
	}
	if(config.htmlID!=undefined){
		this.htmlID = config.htmlID;
	}
	if(config.firstID!=undefined){
		this.inputID = config.inputID;
	}
	if(config.secondID!=undefined){
		this.secondID = config.secondID;
	}
	if(config.inputID!=undefined){
		this.thirdID = config.thirdID;
	}
	if(config.tmp!=undefined){
		this.tmp = config.tmp;
	}
	if(config.data!=undefined){
		this.data = config.data;
	}
	return this;
}
Menu.prototype.setData=function(data){
	if(data!=undefined && data!=''){
		this.data = data;
	}
}
Menu.prototype.first=function(){
	html = '';
	for(var i=0; i<this.data.length;i++){
		html+= this.html(this.data[i]['name'],this.data[i]['id']);
	}
	$('#'+this.firstID).html(html);
}
Menu.prototype.second=function(){
	var firstID = this.firstIDIndex();
	html = '';
	for(var i=0; i<this.data[firstID]['child'].length;i++){
		html+= this.html(this.data[firstID]['child'][i]['name'],this.data[firstID]['child'][i]['id']);
	}
	$('#'+this.secondID).html(html);
}
Menu.prototype.third=function(){
	var firstID = this.firstIDIndex();
	var secondID = this.secondIDIndex();
	html = '';
	for(var i=0; i<this.data[firstID]['child'][secondID]['child'].length;i++){	
		html+= this.html(this.data[firstID]['child'][secondID]['child'][i]['name'],this.data[firstID]['child'][secondID]['child'][i]['id']);
	}
	$('#'+this.thirdID).html(html);
}
Menu.prototype.bind=function(){
	this.firstEvent();
	this.secondEvent();
	this.thirdEvent();
	this.clickEvent();
	return this;
}
$(function(){
	try{
		jQuery.menu = (new Menu()).init(config).bind();
	}catch (e){
		jQuery.menu = (new Menu()).init({}).bind();
	}
})

