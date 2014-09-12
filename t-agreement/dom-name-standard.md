###DOM元素命名规则后续补进

####input->txt
	<input type='text' id='txt-xx'> 
	var txtXX = document.getElementById('txt-xx');
	
####input->hid
	
	<input type='hidden' id='hid-xx'> 
	var hidXX = document.getElementById('hid-xx');
		
####a->lnk
	<a href='http://www.baidu.com' id='lnk-Baidu' >baidu</a>
	var lnkBaidu = document.getElementById('lnk-Baidu);

####a->btn

	<a href='#' id='btn-xx'>立即兑换</a>
	var btnXX = document.getElementById('txt-xx');

####input->btn

	<input type='button' id='btn-xx' value='Click Me' />
	var btnXX = document.getElementById('btn-xx');
	
####label->lbl

	<label for="" id="lbl-xxx">This is label text </label>
	var lblXxx = document.getElementById('lbl-xxx);
	
####div->dv

	<div id="dv-xxx"></div>
	var dvXxx = document.getElementById('dv-xxx');
	
####span-sp

	<span id="sp-xx"></span>
	var spXxx = document.getElementById('sp-xxx');

####p->p

	<p id="p-xx"></p>
	var pXX = document.getElementById('p-xx');
	
####section-sct

	<section id="sct-xx"></section>
	var sctXX = document.getElementById('sct-xx');
	
####ul->ul

	<ul id="ul-xx"></ul>
	var ulXx = document.getElementById('ul-xx');

####li->li

	<li id="li-xx"></li>
	var liXx = document.getElementById('li-xx');

####select->sel

	<select name="" id="sel-xx"></select>
	var selXo = document.getElementById('sel-xx');
	
####option->opt

	<option value="" id="opt-xx"></option>
	var optXX = document.getElementById('opt-xx');
