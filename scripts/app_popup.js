// function chartWrapper(t,a){var e=$("<div/>",{"class":a}),n=$("<div/>",{"class":"chart-wrapper"});
// 	e.append(n),n.append($("<div/>",{"class":"chart-title"}).text(t));
// 	var r=$("<div/>",{"class":"chart"});
// 	return n.append(r),e}
// var kpath="all2000.json";
// var dictdata; // a global
// d3.json(kpath, function(error, json) {
// 	if (error) return console.warn(error);
// 	dictdata = json;
// 	//alert(json);
// 	//visualizeit();
// 	//alert(dictdata[1])	
// 	//alert(dictdata["\u697c"]);
// 	//alert(dictdata["人"]);
// 	//$(".popup-overlay, .popup-content").addClass("active");
// });

function calldetailhv(t,ele){
	var k=t + " : ";
	//alert(t);
	var promises=[];
	//t.forEach(function(c){promises.push(d3.json("data-hv/"+t[i]+".json"));});
	for(var i=0; i < t.length; i++){
		promises.push(d3.json("data-hv/"+t[i]+".json").catch(error=>{return null;}));	
	}
	Promise.all(promises).then(function(values){
		values.forEach(function(v,idx){
			//alert(v);
			if(v!=null)
				k+="["+v["h"]+"]";
			else
				k+=t[idx];
		});
		//console.log(values);
		//alert(k);
		//alert(ele.parent().html());
		var kele=ele.parent().find(".kjwordhv");
		//console.log(kele);
		//alert(kele);
		if(kele.length == 0)
			ele.parent().append($("<span/>",{"class":"kjwordhv"}).html(k));
		else
			kele[0].html(k);
	});	
}
function calldetail(t){
	k=t;//.data.c;
	//alert(dictdata[k]);
	var e=$("<div/>",{"class":"detail-item"});
	e.append($("<h2/>").html(k));
	Promise.all([d3.json("data/"+k+".json")]).then(function(json){
		//if (error) return;
		var dictdata=json[0];
		var idx=["hanviet","keyword","strokeDiagram","constituent","myStory","onYomi","kunYomi","readingExamples"];
		if(dictdata != null)
		for(var i = 0; i < idx.length; i++)
			e.append($("<div/>").html(idx[i] + ": " + dictdata[idx[i]]));
		wl=dictdata["words"];
		for(var i=0; i < wl.length;i++)
		{
			var wdiv=$("<div/>");
			var b=$("<input/>",{"type":"button","value":"hv?","class":"kjregion-detail-button"}).html(wl[i][0]);
			b.click({p1:wl[i][0]},function(e){			
				calldetailhv(e.data.p1,$(this));
				e.stopPropagation();});
			wdiv.append(b);
			for(var k=0; k < wl[i].length; k++)
				wdiv.append($("<span/>",{"class":"kjword"+k}).html(wl[i][k]));
			e.append(wdiv);
		}
	});
	
	  //e.append($("<span/>").html(dictdata[k][3]));
	$(".popup-content-div").html("");
	$(".popup-content-div").append(e);
	$(".popup-overlay, .popup-content").addClass("active");
	//alert($(".popup-overlay, .popup-content").height());
	$(".popup-content-div").height($(".popup-overlay, .popup-content").height() - 10);
	var top = $(window).scrollTop() + 20 + 'px';
	//alert(top);
  $('.popup-overlay').css({top:top});
}
//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close, .popup-bar").on("click", function(e){
	$(".popup-overlay, .popup-content").removeClass("active");
	e.stopPropagation();
});
$("body").click(function(){
	if($(".popup-overlay, .popup-content").hasClass("active"))
		$(".popup-overlay, .popup-content").removeClass("active");	
});
$(".popup-overlay, .popup-content").click(function(e){
	if($(".popup-overlay, .popup-content").hasClass("active"))
		$(".popup-overlay, .popup-content").removeClass("active");	
  e.stopPropagation();
});
$(".popup-content-div").click(function(e){	
  e.stopPropagation();
});
$(document).keyup(function(e) {
	if (e.which == 27) {
		$(".popup-overlay, .popup-content").removeClass("active");
	}
});
function calllist(t){	
	//alert(t);
	//alert(dictdata[k]);
	//var e=$("<div/>",{"class":"detail-item"});
	//e.append($("<h2/>").html(k));
	// d3.json("data-order/"+t+pageidx+".json", function(error, json){
	// 	if (error) return;
	// 	var dictdata=json;
	// 	genlist(dictdata);
	// });
	var idxcount = pagesize / 100;
	var startidx = pageidx * idxcount;
	var endidx = startidx + idxcount;
	var dlist=[];
	for(var i = startidx; i < endidx; ++i)
		dlist.push(d3.json("data-order/"+t+i+".json"))
	Promise.all(dlist).then(function(values){
		//console.log(values[0]);
		var valueall=[];
		for(var i = 0; i < values.length; i++)
			for(var j=0; j < values[i].length; ++j)
				valueall.push(values[i][j])
		genlist(valueall);
	});
}
function genlist(tdata){
	//console.log(tdata);
	data2 = $("#table-list");//a.parents(".table-wrapper").find(".table-list");
//alert("hello " + data2_);
//alert(data2_.html());
if(data2 != null)
	data2.html("");
tdata.forEach(function(t){
	//alert(t);
		//if(idx == 0) return;
		// if(idx%100==1)
		// 	data2.append($("<div/>",{"class":"kjbr"}).html(idx));
		var e=$("<span/>",{"class":"element_region"});
		var h=$("<span/>",{"class":"kjregion  " + (showlink?"kjregion-detail-hide":"")}).html(t[0]);
		var k=$("<span/>",{"class":"kjregion-detail " + (showlink?"":"kjregion-detail-hide")});
		var b=$("<input/>",{"type":"button","value":t[0],"class":"kjregion-detail-button"}).html(t[0]);
		//b.click({c:t[0]},calldetail);
		b.click(function(e){			
			calldetail($(this).val());
			e.stopPropagation();});
		k.append(b);			
		e.append(h);
		e.append(k);			
		data2.append(e);			
		});
};
var idx=["anki2k","news","aozora","twitter","wikipedia"];
var pageidx=0;var catname=idx[0];var showlink=true;
var mcontainer=$("#table");
var l=$("<select/>",{"class":"input-sm"});
var prevb=$("<input/>",{"type":"button","value":"Previous","class":"kjregion-detail-button"}).html("Previous");
var nextb=$("<input/>",{"type":"button","value":"Next","class":"kjregion-detail-button"}).html("Next");
prevb.click(function(){pageidx--;if(pageidx <0) pageidx=0;calllist(catname);lblpage.html(pageidx);});
nextb.click(function(){pageidx++;calllist(catname);lblpage.html(pageidx);});
var lblpage=$("<span/>",{"class":"page-index"}).html(pageidx);
mcontainer.append(l);
mcontainer.append(prevb);
mcontainer.append(lblpage);
mcontainer.append(nextb);
var b=$("<input/>",{type: "checkbox","class":"show-detail", id:'cbshowlink', checked:showlink});
//b.checked=showlink;
	var bl=$("<span/>",{'for':'cbshowlink', text:"Show link"});
	mcontainer.append(b);
	mcontainer.append(bl);
	b.change(function(){
		showlink=this.checked;		
		if(this.checked) {
			$(".kjregion-detail").removeClass("kjregion-detail-hide"); 
			$(".kjregion").addClass("kjregion-detail-hide");
		}else {
			$(".kjregion-detail").addClass("kjregion-detail-hide");
			$(".kjregion").removeClass("kjregion-detail-hide");
		}
		});
//var data2=$("<div/>",{"class":"table-list"});
//alert(data2);


for(var i = 0; i < idx.length; i++)
{var a=idx[i];var n=$("<option/>").val(a).text(a);
	l.append(n),0==i&&n.attr("selected",!0)};
l.change(function(a){a.preventDefault();
	catname=$(this).val();
	calllist(catname);
});

var pagesizelist=[100,200,300,400,500,600,700,800,900,1000];
var pagesize=100;
var pagesizectrl=$("<select/>",{"class":"input-sm"});
mcontainer.append(pagesizectrl);
for(var i = 0; i < pagesizelist.length; i++)
{var a=pagesizelist[i];var n=$("<option/>").val(a).text(a);
pagesizectrl.append(n),0==i&&n.attr("selected",!0)};
pagesizectrl.change(function(a){a.preventDefault();
	pagesize=$(this).val();
	pageidx=0;
	lblpage.html(pageidx);
	calllist(catname);
	});
calllist(catname);