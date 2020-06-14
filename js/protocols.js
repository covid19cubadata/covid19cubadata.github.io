$.getJSON("data/protocols.json",function(protocols){
	
	var escen = Object.keys(protocols.escenarios);
	escen.sort(function (a, b){
		if (protocols.escenarios[a].orden > protocols.escenarios[a].orden) {
			return 1	;
		} 
		return -1;
	});
	var prots = Object.keys(protocols.protocolos);
	$('#slider-max').html(prots.length);
	$('#last-version').html(prots.length);
	
	
	function setProtocol(ver){
		var version = $('#slider').val();
		$('#slider-value').html(version);
		if (version!=1){
			$('#date').html('Fecha: '+protocols.protocolos[version].fecha+' -');
		}
		var text = '<table class="table table-striped table-sm mb-0">';
		var textp = '';
		text += '<thead><tr><td></td>';
		
		
		for(var i in escen){
			var clas = 'class="escenario  '+protocols.escenarios[escen[i]].categoria+'"';
			text += '<td '+clas+'>'+protocols.escenarios[escen[i]]['nombre-corto']+'</td>';	
		};
		
		text += '</tr></thead><tbody>';
		
		var indic = protocols.protocolos[version].indicaciones.general; 
		var meds = Object.keys(indic);
		
		for(var i in meds){
			text +='<tr>';
			textp +=  '<p>';
			var nw = '';
			if (version!=1){
				if (!(meds[i] in protocols.protocolos[version-1].indicaciones.general)){
					nw= " new ";	
				}
			}
			var clas = 'class="'+protocols.medicamentos[meds[i]].categoría+nw+' med"';
			text += '<td><span '+clas+'>'+protocols.medicamentos[meds[i]]['nombre-corto']+'</span></td>';
			textp += '<span '+clas+'>'+protocols.medicamentos[meds[i]]['nombre-corto']+'</span> ';
			for(var j in escen){
				if (escen[j] in indic[meds[i]].escenarios){
					var nw = '';
					if (version!=1){
						if (!(meds[i] in protocols.protocolos[version-1].indicaciones.general)){
							nw= " new ";	
						} else if (!(escen[j] in protocols.protocolos[version-1].indicaciones.general[meds[i]].escenarios)) {
							nw= " new ";	
						}	
					}
					var clas = 'class="center"';
					var clasp ='class="med '+nw+'"'
					text += '<td '+clas+'><span><i class="fa fa-square selection'+nw+'"></i><span></td>';
					textp += '&nbsp;<span '+clasp+'>'+protocols.escenarios[escen[j]].abreviatura+'</span>';
				} else {
					text += '<td></td>';	
				}
			}
			text +='</tr>';
			textp +=  '</p>';	
		}
		
		text += '</tbody></table>'
		$('#protocolos').html(text);
		$('#protocolos-resp').html(textp);
	}
	
	
	
	$('#slider').on("change",function(e){
		version = $('#slider').val();
		$('#slider-value').html(version);
		setProtocol(version);
	});
	
	setProtocol(1);
	
});
