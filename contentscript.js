(function () {
	var //$ = jQuery,
		docId = "",
		bookmarked = -1,
		buttonCSS = {
			"position": "relative",
			"top":	0,
			"left": 0,
			"margin": 0,
			"padding": 0,
			"margin-bottom":"-15px",
			"text-align":"center",
			"cursor":"pointer"
		},
		url,
		urlPieces,
		userTag,
		saveBookmark;	
	
	saveBookmark = function () {
		$("body").append('<img style="display:none" id="bookmarksync" src="http://wespickett.com/testx?bookmarkPDF='+docId+'&bookmarkPage='+bookmarked+'"/>');
		$("#bookmarksync").remove();
	};	
		
	url = window.location.pathname;
	docId = url.match(/\/d\/([0-9A-Za-z]+)\//)[1];
	
	userTag = document.getElementById("gbmpn").nextSibling.innerHTML;
	docId = userTag+docId;
	
	$(document).ready(function(){
	
		$("body").append('<img id="bookmarksyncIn" src="http://wespickett.com/testx?bookmarkPDF='+docId+'" />');
		
		$("#bookmarksyncIn").load(function(){
			var syncedBookmark = this.width - 1,
				bookmarkedPage,
				page;
				
			if( syncedBookmark >= 0 )
			{
				page = $('.thumb-elements',$('#gview-embed-content').contents()).children().eq(syncedBookmark);	   
				$('<img id="bookmarked" alt="Bookmarked!" width="120" height="15" src="data:image/png;base64,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" />').prependTo($(page).children().first());
				$(page).addClass("is-bookmarked");
				$("#bookmarked").css(buttonCSS);
				bookmarkedPage = $("#page-pane", $('#gview-embed-content').contents()).children().eq(syncedBookmark);
				$("#content-pane",$('#gview-embed-content').contents()).scrollTop(bookmarkedPage[0].offsetTop);
				bookmarked = syncedBookmark;
			}
		});


		$(".thumb-element", $('#gview-embed-content').contents()).mouseenter(function(){
			if(!$(this).hasClass("is-bookmarked"))
			{
				$(this).children("#bookmark").remove();
				$(this).prepend('<img id="bookmark" alt="Bookmark" width="120" height="15" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAPCAYAAAAvQwurAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHFBIWC02eQdUAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAAZiS0dEAHYApAB26MaPpQAACf5JREFUWMPFWWtQlOcV3hkT84Mx3lL90RmdTpv2ly2buLudWRhcXegM6CYKZBRlCezKguzKsisIYgRHMAGtitwUlgioibYmVk3rZdppbG3aJmNNpqaaoDYo2ubSv/7c03POe/neb8GfaZk58573XJ5zznP4vl3F4ZA/T/3gqVWO5xzRJb4lj5etWwbZr2RLcYITxboLcc4gls9pO02cTJ+wTc/NNk7nE+xmvjMDS8Q7M/KU35lRd3pe9hPq2ed3znC3amRPs2Xi2GfPntabcxrXM+/DCbSzpb6lj2mHvEv1M+v7s+bM/uHs8wuWL4SagRpIjCWgYTQB8dEGSKA0oCTl2cA28sc5JmGzCT1u6OwfE/EqJm7LE/6EUSsT264nNU6ScwRuXPdg1khaNfCelKeycTzXjhu5cR1j9ddgy0kYMYlpZ4N9NpueZG4TY6oPY+7xhOQJZxmLS71B1rLXb5hh1jjPkITkeBJqcYcLcZe403MocxyOJY7x5ZtcUD8aT8dGounoSBSiKZQ3Y3zWjeDJEpVnTNqiEJO2upT0vRk17Eq38mOpmLxHDUwRHzPuylYn42IjGbgpEVtnxJv+2Ay1rTrUh/SlhMR0DTFz9Am4gg9rboUfkz4LI8az2uess2HH6J7JbUpylMqsbfHNuCm7PYPHdP1ofdpV7gLarePZ7Gdhy3AtRI5G0pGjNVA7VAs1eCqJGHrN0Qjfa/Fk31DEZhensjGmzo9IaX2rFR795xFMfTPFcv+r+/DRxEew+5e7p9VRuror7Ii222sTNmFavUdsM0SGps8UMfB5LjXTkBE3gx7Rs0Zgh6w7HbeG8aw+anXf9hmMOYfsnNVk8j9kcRkxOKjRPXFsuhZ3Srt1POd5DkIDYZQqCPVXQRWdKFWsh9AmpKq/UtxRKtku/GTnGJlf2S98IbITLuX2iZgw3pvGm2Dq6ynMI3sVNzT+/jh8fO9jEUvYfRSL+IMhqw8pVf3S1y9tqj+0NY03M7bqJ9wnegrL/sMyLkz4hDtIfjF7WM5s5Rp1aHY5V1j10i85QnvTcTFTWPJX1Uf1wnyvHBCYijPFT1jVopPmGhSz0exqnhDaWIxaocEq5o3iuT+JL/xhnkfMUQW0W8dC90IoP1wOQZRyU3qksB6031V8T0aODSdo2C09cSzBZJQb+U3jjXDn0R3Wq49Uw6W/XYIvvvwCJh5NwKk/noJXD1fo/Jn8Fb0VjJVU2D2i584znfDZ1Gf4+Yuff8eS7Dvx/gnOI/u+c/vh9LXTXPvzh59zvModujIEEw8n4MHXD/iXr+1UG/tU/2O/H4PbD27D3X/d1diKp853ZF20BzM4DSo+TY6lPdgzA489Bn9KN3AoJ2jYzXjarWOBewGUHdgAGw6UoWyAsoMb+KT7eq2jHCzDOBmDsp5t5FsvT7IrvUznWPni3DpSz2QoewUu78wH78Dbf3ib75dvXIbzH57jpUUGq+FPtz6Akd+OaDz2//U851UPbrb561MWdsvxFrg9dRsaR7dpH300HLl0BIKHymHg4iA8/OYhDOJ9E98H4Pqd65KLDVA3HIXK3kqes/tX3XDj7g2eoX5E4PT/ph9exR6fVHfb2DY987RTcii4MzjKkDJbTpkt3+SV9rSesGy+MqDdOha4FkDxvmKWkm48u4qhdF8JFKNeQnY6u+Wd/PuFrVT6isnXJfWuEoHVbflKNDbqmLtlaAsTNPnVJAvp9DlMxGw6tJE/yyrxFcT5mNd6opWfIMLaeED46ZVfSnjdpdB6cif7S7BnwiaiY7icW/dvQdNYk+5d+bgnlK3DW2Hyy0nuj++prfxW4HlQ6obr4OL1i3DrwS3uU/hMHMEV9bjlaN20uoI/i48SyWeJwSvXwpgSxhF9Fdt8Vm6xnEP7u5SvFPNLkI9Syyf3R7t1zF8+H156/SWUgHXuxXNvAAJSD7yu7qjz3Yq1dBUnRdn22rE3D1QzGQqXmj/2u2P8RSvcv5mfqsBeC7P2SC3c+/c9rhPuC7Nf+QhD+em+GZ948n86+Slc+8c1WPvGWt1PtaxLOIRfjbG0ONUfvQ34jjrlEQa9huk1WD0YYR/ViKj+uYeXZa697jpZV8++V3ERYB51/1oCkr+A1FVOwOAyoGe24di4tmPPd80Hx9zlc6GwowiK9hRB4Z5CKJI6nYXKJkXcpXQUijibXsh6IZ/ybugUE8Knkwgq6hB2wiLy6bOs+I1ifkI3Htyo69LTQK9Hwl3XJf0HNupem0aFX2CHmOj6VJyJps/nItlvqDck6qo+eqt4aQKn0LqjHuyp4DdLoDMgfH3CZ+uf5xb8qLpxfH1T3dNUt6NoBi4tTgsNv+KzcI9pszhVd72fDoPzjiLNo7ZLbufhbh3zXpwH+e1+yG8jyYf8XXi254MfbX7U/aiT3Y9SsBv19gK2+dtkHJ4FFCPlZ20invD8bQU6nwVzg/hEEEGMjTEv42/gW1dP4heny4jjhwsfXsDP5DOwpnMNlHaVwtW/X4Xe93pF3TbLH+hYw6+0qzfR/+terhM8JLERh56iT/75CfRcOMy+8oPl7GOcXXg/VMFLK8AeC7A3elLplU36asSmj43o0Sj3cRK/mFEscUB5jLPLL2f0cy7bEGutqvveYcTyW1xRnXaLM2HzixjJL/PcLniiPqhP9u0q4LyCdrkHxBI78fPuCnRugewpn3Fpt46sZVng2+mDFTt9aV/rCjwzxGbzyXueOGeKz4xtzYM8vOdJe9nPy8S/g5EQEvoGe/YvZ/lVQ376rXz3z2f5tUvfbIevDIPvtZVAvZEI/7s2/0r0K2zCzJN905NOMS3Hd2gfxREO3Wmh1Kdvp3kXfXb+ooNr3Jy8CakrKeGjvP0KxyewkAsTm2QT1p2guuM7uBefwaPPxqNxytw8xCPMGffQasVl7spn2lpXpFe85gParWPW92YdX7J6CeTsyE17W7zp3GYv5LSg4OltzuEzpyUHvC25KDnCJyWX/TkijmO8HGOJl/PIxzg61it9XokpcVrsNRmTc7xa57jtVj2658q7lmYLX8dl9O5VeNu9Rq6a22vEWv0pv9mr5qRZ8rPdbs9tsfcq5jDmVjw0Z9RqVnMYtW09mjPnSoxcik3ntuaml65eCrRbxzM/embO7Odnn8v6cRa8uPUFcG9zg4uk0Q3uJAqeHra58PTw3Y06nRRHPjfaxemSsVJvdAkMbfNI3WXoFr7QXbKWFW+Ji0+P6k3nqtoenSNiqF/C84ArafXsSrp1vwqTMdjv4VyXtJt1XUYvHp3r4dMlueJ6ScmfjHU1GnM3mvkC86dGLY+e3R5n8eXJsKOOc7oaiW8PvIA7zPpJFv9f9NPPPz1H/9EBl7zK8V1HdJ573uNFvu/A4lWLv11Zufjbr/H/lv/hjIt8i2Cue+5j2qH516T/AvUhmlSbz2ZbAAAAAElFTkSuQmCC" />');
				$("#bookmark").css(buttonCSS);
			}
		});
		$(".thumb-element",  $('#gview-embed-content').contents()).mouseleave(function(){
			$(this).find("#bookmark").remove();
			console.log($("#bookmarked", $('#gview-embed-content').contents()));
		});
		$(".thumb-element", $('#gview-embed-content').contents()).click(function(e){
			console.log(e);
			if (e.srcElement.id === "bookmark") {
				$(".is-bookmarked", $('#gview-embed-content').contents()).removeClass("is-bookmarked");
				$("#bookmarked", $('#gview-embed-content').contents()).remove();
				$('<img id="bookmarked" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAPCAIAAACgIZz8AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHFBIaEoVAphkAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAAZiS0dEAJ8ApACfFNRw1wAAB6tJREFUWMOFVvtPk1cY7j/U/gBJ+4MkNtkSzeJciYFQAgKtXDbc0LTQdu0HFNZPqRbvraSMfibKNtkFdYq3bYoadTc3BW8gitdd/4c957znnO98bcmSNyfv95znfd7nfXt1WcdLFCXHaZV4rhICNbKlqvit5ay1SoJpl2tdLClrUS4RS+nIR9Wr7KpKR8VxNhJWNQ96a9Ip81PSTtuYcxX2aCWnjuVYiC3r0hdX0hah8zRceFUza4tQY1iaxVLlkGUvjwY6NqW1WGtgq9qQlvYaWBW2rcpxSg4blv5iaH3Lfa61a0sTsTTQVSgW8pOFAqKYL1BCuYhCvijA/KRACpP8FCGRyYINcoU8q5UlRUHIi0cuS63LOAKRBE1Q17fxySrleYc3QrgmJzuUhU5e18/bt1JhUji3t6GXQ1MOQoS8bZiuCq7xg+Pjh8bZSVGWH9LAQ1pohKJVfP3v65d/v0S8+OvFvUf3rGmrStVaLViSKx4rory8b1nTMgOVeZk+2auqXFWtAsdomIhw5EKnqpnKcN66zGwGkRnLZLI8VMLD5I9m1gGKK3aaiMMTh+GAwLHxsbMXz95/ct9JU+Kmows9jjHOkaNCxJSIaRsw6aRbs4qHqt5EF7JXVmXqA47JpmNlBIx2BItmLcYyRyaOcIdsZJMFkU3nokznrkw2IxvTdKXShpE2UumUkU6lWGJUICkeAFM8DMUkZO+BHBwYgmPsO7xv5dUKktHdn8zfnl/9Y3Xl5cq5y+eMkUGmM5Ia3T2q44MMN3KayOSx4vLz5dzBHIFnLpwBc/nFsnXCmvtuDuJPXj7B+4vazZyawSPWsbi8iM8sFHIH96Lq1Nzs0urS09dP9x5gjzROUSojH/pk6OKVC1CDk2u350d3jdB06czw5fnLz948W32z+svCr1CmDeRsHTG4vgRjxFBXmJGkGGHE4KDhiiQi0XgkmoiyBGecBZKoOCOROCdwDsAIY9JthMh46eCArhJGHLvAasCfvzV/6eqluJHASD/d/XlmdoapJaJXgc9fAnNodOhnhp+MKpFEZPxQDgvK7suiHUB8KU1/9dlAMjY9M/3qn1fTX07HkrETMyfuPrxLPkd3jSaHkjBfPDZ57/E98oOq4yePx4yYrRyH8vjS86XseJaZj0cuXrl47fY1LCUxGL968+r5789L/MKNn24Mjg72J/onpiae//mc5s3sYToRztEiKpYmF8hF1AIZgZdEXb19vb07qsVauLqVBLwlMRgMIZDgLZDdn93ZvxN7iaViRMabaOHxApKdAxxPxqhW4RgMYwxnhh89e7Q7t1spA6Q8nUlDn5qmd6XxNiQPQ5mhH278gCrcEmhXcbIxUqHc17ujfwfAuBEnEXOP+fDpQyR9kT74T6aTVAsp1pSX6Gbs/fRpSeWjjX/gCneHQt1hBEu6QvZJiAgQAIbDXTooOAPJATgIM0Koq7f7868/v7N4By8pFsqrWMQH4/gUQ0HhIYEngENnIBUD/mDlwa07t7a9v40IAymmTEzkmDnMnVAe6gqDiZKTsyf7on2xVJwTHFWcXEUZNtSbg4LbCEl7NG8oRo34fpSsVA6rFmULUZywSBjTFdza3EzRFkQe3Ioz2CyC4QJpY49BcFgS5CAeGQFDwoHiR2IRfPF1dLYD7Pmom1c1D5vDvz/8HSUdnR0M/7A7qOGohQgmTA5/fPPXm19/+w13IpXbmAfkmJmMqXz7ju3YV2tHK9kgUPppJktSOUnKpED2Qj3hoD0pmwibgmDXB51Bvg2paY8ZbLNXJNfVrBSaBc53JfdDHFd9Y32gsb6eh0gaAvUNSOjkCct5aDScgQYW3dt74KCeP2IpeH/hxwSP+LKePTfb1NLUFt56/cdrR6cmSJDhc4S3Xf/x+gTHe0ikob411II/iIWpo2Di9QDI2wXQBd8MIOCxh+do19TahEVEP+4Pbm36YvYLBjbCTzdJcXKgWymHW5nyp0cD7Cpwau4UnIR7QmjU0dVxoLCfhsVPC34JGpob2ra14ceANAONNHuAmeFTk769HNpJQ0AtU2yS1tUQcG18d6OITfLctNEG17raZD+2d7Wr/9H4A3D6/OnGlkbgW5q2YBh8JB+vPp46PvXO5neIX46/x3CIoJyU8UHDrxZ+Qts7bRAEzEzd7XzTRvyhhNTi0mJpusRAXUqS1aNSRr55y2b838d/FXwpLywtYLlkr6W95crNK3j9fnvwW+mE0GQ6ndR0g2MhchsbKjfm5Lj8b69fz8MvT4n46VQEnSbiLSL49RIn3++s0h/966sxyxB/NUJZC784/XqJPCtl/yf0cfxOt5qaf40pHK50vsu7zudb5/XVeXnCAom3zuer4491Xtx619GJK5Z76zifXXEmp3lFLdGECJX4ZAufvKKEqojgta+8ehef4rOOQt8nDEgFjpMlauoTTcUUXjVFHdcnjrNcSwSTpvatE5P6xCM5tFuQVTWsV95qj0zN5a51u2s8nlqPp8btqaHT7alFeNwccbMrHrVE84hbHh51qxNq7AT6uqBbluMkBdG91i350kmtQ8cjdDzyFGTmn9cKt0qNm3ErVxKxe3ER4Yf6StxdI0ej5TDbYmSho3WxyXIPRBay0sB/kr0yIu+RpLAAAAAASUVORK5CYII=" />').prependTo($(this))
				$(this).addClass("is-bookmarked");
				bookmarked = $(this).children(".page-number").text() - 0;
				saveBookmark();
				$(this).find("#bookmark").remove();
				$("#bookmarked").css(buttonCSS);
			} else if (e.srcElement.id === "bookmarked") {
				$(".is-bookmarked", $('#gview-embed-content').contents()).removeClass("is-bookmarked");
				$("#bookmarked", $('#gview-embed-content').contents()).remove();
				bookmarked = 0;
				saveBookmark();
			}
		});
		
	});
	

})();