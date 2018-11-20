function chartWrapper(t,a){var e=$("<div/>",{"class":a}),n=$("<div/>",{"class":"chart-wrapper"});
e.append(n),n.append($("<div/>",{"class":"chart-title"}).text(t));

var r=$("<div/>",{"class":"chart"});
return n.append(r),e}
function freqCoverChart(t,a,e,n){var r={top:20,right:40,bottom:30,left:40},l=Math.max(t.innerWidth(),1100)-r.left-r.right,i=300-r.top-r.bottom,o=d3.scale.ordinal().rangeRoundBands([0,l],.1),s=d3.scale.linear().range([i,0]),c=d3.scale.linear().range([i,0]),d=d3.svg.axis().scale(o).orient("bottom"),p=d3.svg.axis().scale(s).orient("left").ticks(10,"%"),u=d3.svg.axis().scale(c).orient("right").ticks(10,"%"),f=d3.svg.line().x(function(t){return o.rangeBand()/2+o(t[0])}).y(function(t){return c(t[3])}),m=d3.select(t.get()[0]).append("svg").attr("width",l+r.left+r.right).attr("height",i+r.top+r.bottom).append("g").attr("transform","translate("+r.left+","+r.top+")"),g=_(e.table).tail().take(n),h=0;

g.forEach(function(t){t.push(h+t[2]),h+=t[2]}),o.domain(g.map(function(t){return t[0]}).value()),s.domain([0,g.map(function(t){return t[2]}).max()]),c.domain([0,g.map(function(t){return t[3]}).max()]),m.append("g").attr("class","x axis").attr("transform","translate(0,"+i+")").call(d),m.append("g").attr("class","y axis left").call(p).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".7em").style("text-anchor","end").text("Frequency"),m.append("g").attr("class","y axis right").attr("transform","translate("+l+" ,0)").call(u).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","-1.2em").style("text-anchor","end").text("Coverage"),m.selectAll(".bar").data(g.value()).enter().append("rect").attr("class","bar").attr("x",function(t){return o(t[0])}).attr("width",o.rangeBand()).attr("y",function(t){return s(t[2])}).attr("height",function(t){return i-s(t[2])}),m.append("path").attr("class","secondary").attr("d",f(g.value()))}function coverComparisonChart(t,a,e){var n={top:20,right:20,bottom:30,left:40},r=Math.max(t.innerWidth(),1100)-n.left-n.right,l=400-n.top-n.bottom,i=d3.scale.linear().range([0,r]),o=d3.scale.linear().range([l,0]),s=d3.svg.axis().scale(i).orient("bottom").ticks(20),c=d3.svg.axis().scale(o).orient("left").ticks(10,"%"),d=d3.svg.line().x(function(t){return i(t[0])}).y(function(t){return o(t[1])}),p=d3.select(t.get()[0]).append("svg").attr("width",r+n.left+n.right).attr("height",l+n.top+n.bottom).append("g").attr("transform","translate("+n.left+","+n.top+")"),u=_.keys(a).map(function(t){var n=0,r=_(a[t].table).tail().take(e).map(function(t,a){return n+=t[2],[a,n]}).value();

return{key:t,table:r}});
i.domain([0,e]),o.domain([0,_(u).map(function(t){return _.last(t.table)[1]}).max()]),p.append("g").attr("class","x axis").attr("transform","translate(0,"+l+")").call(s),p.append("g").attr("class","y axis").call(c).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".7em").style("text-anchor","end").text("Coverage"),_.forEach(u,function(t,a){p.append("path").attr("class","compare-"+a).attr("data-legend",function(){return t.key}).attr("data-legend-pos",a).attr("d",d(t.table))}),legend=p.append("g").attr("class","legend").attr("transform","translate(50,30)").call(d3.legend)}
function addTable(t,a){
	function e(t){return t==parseInt(t,20)}
	function n(t){
		var a=100*t;
		return(e(a)?a:a.toFixed(6))+"%"}
	function r(t){
		//alert("call table");
		return t.table.map(
		function(t,a){
			return [a].concat([t[0]]).concat('<a href="https://jisho.org/search/'+t[0]+' %23kanji" >'+[t[0]]+'</a>')
		}
	)}
	
	var l=$("<select/>",{"class":"form-control input-sm"});
	//var data2=$("<div/>",{"class":"table-list"});
	//alert(data2);
	_(t).keys().forEach(
		function(a,e){var n=$("<option/>").val(a).text(t[a].name);
		l.append(n),0==e&&n.attr("selected",!0)});

	//var i=a.DataTable({dom:'<"table-toolbar">fti',data:r(t[l.val()]),columns:[{title:"#"},{title:"Kanji"},/*{title:"Count",searchable:!1},{title:"Percent",render:n,type:"num-fmt",searchable:!1},*/{title:"Link to jishoo"}],
//deferRender:!0,scroller:!0,scrollY:500});

	//$(a.parents(".table-wrapper").find(".table-toolbar")[0]).append(l);
	a.append(l);
	//$(a.parents(".table-wrapper").find(".table-list")[0]).clear(),
	//$(a.parents(".table-wrapper").find(".table-list")[0]).append(data2),
	gentable = function(tdata){
		data2 = $("#table-list");//a.parents(".table-wrapper").find(".table-list");
	//alert("hello " + data2_);
	//alert(data2_.html());
	if(data2 != null)
		data2.html("");
	tdata.forEach(function(t,idx){
			if(idx == 0) return;
			if(idx%100==1)
				data2.append($("<div/>",{"class":"kjbr"}).html(idx));//'<div class="kjbr">' + (idx) + "</div>":"")
			var e=$("<span/>",{"class":"element_region"}).html('<span class="kjregion">' + t[0] + '<br/><a href="https://jisho.org/search/'+t[0]+' %23kanji" target="_blank" class="kjtext-link" >'+t[0]+'</a>' + "</span>");
			//alert(e.html());
			data2.append(e);
			//alert(data2.html());
			});
	};
	//alert(t.aozora.table);
	gentable(t.aozora.table);
	//else		
	//	$(a.parents(".table-wrapper").find(".table-toolbar")[0]).append(data2);
	l.change(function(a){a.preventDefault()
	    //,
	    //i.clear(),i.rows.add(r(t[$(this).val()])),i.draw()
		,gentable(t[$(this).val()].table)//,alert(tdata)
		/*,tdata.forEach(function(t,idx){
			var e=$("<div/>",{"class":"col-md-6 col-lg-3"}).html(idx + t[0] + '<a href="https://jisho.org/search/'+t[0]+' %23kanji" >'+[t[0]]+'</a>');
			//alert(e.html());
			data2.append(e);
			//alert(data2.html());
			})
		//,alert(data2.html())*/
	})
} // End addTable

!function(){d3.legend=function(t){return t.each(function(){var t=d3.select(this),a={},e=d3.select(t.property("nearestViewportElement")),n=t.attr("data-style-padding")||5,r=t.selectAll(".legend-box").data([!0]),l=t.selectAll(".legend-items").data([!0]);
r.enter().append("rect").classed("legend-box",!0),l.enter().append("g").classed("legend-items",!0),e.selectAll("[data-legend]").each(function(){var t=d3.select(this),e=void 0!=t.attr("data-legend-color")?t.attr("data-legend-color"):"none"!=t.style("fill")?t.style("fill"):t.style("stroke");

a[t.attr("data-legend")]={pos:t.attr("data-legend-pos")||this.getBBox().y,color:e}}),a=d3.entries(a).sort(function(t,a){return t.value.pos-a.value.pos}),l.selectAll("text").data(a,function(t){return t.key}).call(function(t){t.enter().append("text")}).call(function(t){t.exit().remove()}).attr("y",function(t,a){return a+"em"}).attr("x","1em").text(function(t){return t.key}),l.selectAll("circle").data(a,function(t){return t.key}).call(function(t){t.enter().append("circle")}).call(function(t){t.exit().remove()}).attr("cy",function(t,a){return a-.25+"em"}).attr("cx",0).attr("r","0.4em").style("fill",function(t){return t.value.color});
var i=l[0][0].getBBox();
r.attr("x",i.x-n).attr("y",i.y-n).attr("height",i.height+2*n).attr("width",i.width+2*n)}),t}}();

var kanjiData={aozora:{fileName:"aozora.json",description:'Books from <a href="http://www.aozora.gr.jp/">Aozora Bunko</a>'},news:{fileName:"news.json",description:"Online news articles"},twitter:{fileName:"twitter.json",description:'Twitter messages collected by a <a href="https://github.com/scriptin/twitter-kanji-frequency">bot</a>'},wikipedia:{fileName:"wikipedia.json",description:'Wikipedia articles and pages from <a href="https://dumps.wikimedia.org/jawiki/">dumps<a/>'}},
getJson=Promise.promisify(d3.json);
$(".templates").html('<div class="col-xs-12 loading"><em>Loading...</em></div>'),Promise.all(_.map(_.toPairs(kanjiData),function(t){var a=t[0],e=kanjiData[a];

return getJson(t[1].fileName).then(function(t){e=_.merge(e,{name:_.upperFirst(a),table:t,kanjiTotalCount:t[0][1],kanjiDistinctCount:t.length-1})})
})).then(
function(){
	$(".templates .loading").remove(),
	_.forEach(kanjiData,function(t,a){var e=$("<div/>",{"class":"col-md-6 col-lg-3"}).html(generalInfo(t));
	$("#general-info .templates").append(e)}),
	addTable(kanjiData,$("#table"))//,
	//_.forEach(kanjiData,function(t,a){var e=chartWrapper(t.name,"col-xs-12");
	//	$("#zipf-law .templates").append(e),freqCoverChart(e.find(".chart"),a,t,100)});
	//var t=chartWrapper("Coverage comparison","col-xs-12");
	//$("#zipf-law .templates").append(t),coverComparisonChart(t.find(".chart"),kanjiData,1e3)
});
var generalInfo=_.template('<dl><dt><%- name %></dt><dd><%= description %><ul class="list-unstyled"><li>kanji total: <code><%- kanjiTotalCount %></code> &asymp; <% print((kanjiTotalCount / 1000000).toFixed(1) + "M") %></li><li>kanji distinct: <code><%- kanjiDistinctCount %></code></li></ul></dd></dl>');
var itemInfo=_.template('<dl><dt><%- name %></dt><dd><%= description %><ul class="list-unstyled"><li>kanji total: <code><%- kanjiTotalCount %></code> &asymp; <% print((kanjiTotalCount / 1000000).toFixed(1) + "M") %></li><li>kanji distinct: <code><%- kanjiDistinctCount %></code></li></ul></dd></dl>');