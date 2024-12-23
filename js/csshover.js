/**
 *	HOVER - V1.00.031224 - whatever:hover in IE
 *	---------------------------------------------
 *	Peterned - http://www.xs4all.nl/~peterned/
 *	(c) 2003 - Peter Nederlof
 *
 *	howto: body { behavior:url("csshover.htc"); }
 *	---------------------------------------------
 */

var CSSBuffer, doc = window.document;

function parseStylesheets() {
	var rules, sheet, sheets = doc.styleSheets;
	var bufferIndex = sheets.length;	
	var head = doc.getElementsByTagName('head')[0];

	var buffer = doc.createElement('style');

	buffer.setAttribute('media', 'screen');
	buffer.setAttribute('type', 'text/css');
	head.appendChild(buffer);
	CSSBuffer = sheets[bufferIndex];

	for(var i=0; i<sheets.length -1; i++) {
		sheet = sheets[i];
		if(!sheet.media || sheet.media == 'screen') {
			rules = sheet.rules;
			for(var j=0; j<rules.length; j++) {
				parseCSSRule(rules[j]);
			}
		}
	}
}
	function parseCSSRule(rule) {
		var select = rule.selectorText, style = rule.style.cssText;
		if(!select || !style || select.indexOf(':hover') < 0) return;
		var newSelect = select.replace(/\:hover/g, '.onHover');
		CSSBuffer.addRule(newSelect, style);
		
		var affected = select.replace(/\:hover.*$/g, '');
		
		var elements = getElementsBySelect(affected);
		
		for(var i=0; i<elements.length; i++) {
			
			if(elements[i].nodeName == 'A') continue;
			
			new HoverElement(elements[i]);
		}
	}

/**
 *	HoverElement
 *	-------------------------
 *	applies the hover
 */

function HoverElement(element) {
	if(element.isHoverElement) return;
	element.isHoverElement = true;
	
	element.attachEvent('onmouseover', 
		function() { element.className += ' onHover'; });

	element.attachEvent('onmouseout', 
		function() { element.className = element.className.replace(/onHover/g, ''); });
}

/**
 *	domFinder
 *	-----------------------------------
 *	returns list of elements based on css selector
 */

function getElementsBySelect(rule) {
	var nodeList = [doc], sets = rule.split(' ');
	for(var i=0; i<sets.length; i++) {
		nodeList = domFinder.filterNodes(sets[i], nodeList);
	}	return nodeList;
}

var domFinder = {
	findNodes:function(tag, docs) {
		var res, nodes = [];
		
		for(var i=0; i<docs.length; i++) {
			res = docs[i].getElementsByTagName(tag);
			for(var j=0; j<res.length; j++) nodes[nodes.length] = res[j];
		}	return nodes;
	},
	
	filterNodes:function(select, docs) {
		var filtered = [], nodes,rule,atr,s = (/#|\./).exec(select);
		if(!s) return this.findNodes(select, docs);
		nodes = this.findNodes((rule = select.split(s))[0], docs);
		atr = (s == '#')? 'id':'className';
		for(var i=0; i<nodes.length; i++) {
			if(new RegExp('(^|\\s)' +  rule[1] + '(\\s|$)').exec(nodes[i][atr]))
				filtered[filtered.length] = nodes[i];
		}	return filtered;
	}
}


