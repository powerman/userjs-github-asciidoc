// ==UserScript==
// @name        GitHub: fix Asciidoc rendering
// @namespace   https://github.com/powerman/userjs-github-asciidoc
// @description Fix Asciidoc rendering on GitHub: add standard Asciidoc icons to NOTE/TIP/etc., highlight block titles, fix TOC.
// @include     /^https://github.com/[^/]+/[^/]+$/
// @include     /^https://github.com/[^/]+/[^/]+/blob/.*\.(asciidoc|adoc|asc)$/
// @include     /^https://github.com/[^/]+/[^/]+/wiki.*$/
// @downloadURL https://github.com/powerman/userjs-github-asciidoc/raw/master/github-asciidoc.user.js
// @updateURL   https://github.com/powerman/userjs-github-asciidoc/raw/master/github-asciidoc.user.js
// @version     1.0
// @grant       none
// ==/UserScript==

window.addEventListener('load', function(){
	'use strict';
	var icons='https://raw.githubusercontent.com/powerman/asciidoc-cheatsheet/master/images/icons/';

	// Replace text with icons for NOTE/TIP/etc.
	$('tbody > tr > td:first-child > div')
		.filter(function(){ return this.innerHTML==='Note'; })
		.html('<img src="'+icons+'note.png">');
	$('tbody > tr > td:first-child > div')
		.filter(function(){ return this.innerHTML==='Tip'; })
		.html('<img src="'+icons+'tip.png">');
	$('tbody > tr > td:first-child > div')
		.filter(function(){ return this.innerHTML==='Important'; })
		.html('<img src="'+icons+'important.png">');
	$('tbody > tr > td:first-child > div')
		.filter(function(){ return this.innerHTML==='Warning'; })
		.html('<img src="'+icons+'warning.png">');
	$('tbody > tr > td:first-child > div')
		.filter(function(){ return this.innerHTML==='Caution'; })
		.html('<img src="'+icons+'caution.png">');
	// Remove border around NOTE/TIP/etc.
	$('tbody:has(> tr > td:first-child > div > img)').find('tr, td').css({'border':'none'});

	// Make block titles bold
	$('.markdown-body div > div:first-child + *').prev().filter(':not(:has(*))').css({'font-weight':'bold'});
	$('.markdown-body td > div:first-child').filter(':not(:has(*))').css({'font-weight':'bold'});

	// Fix TOC
	$('#user-content-toc ul ul li:has(ul)').addClass('toc-node');
	$('head').append('<style>#user-content-toc ul ul li.toc-node:before { content:\'\' }</style>');

}, false);