var domains = {
		'cu': 'Cuba',
		'it': 'Italia',
		'be': 'Bélgica',
		'us': 'USA',
		'fr': 'Francia',
		'ca': 'Canadá',
		'es': 'España',
		'cn': 'China',
		'ru': 'Rusia',
		'uy': 'Uruguay',
		'do': 'R.Dominicana',
		'hr': 'Croacia',
		'co': 'Colombia'
	};

var contagio = {
	'importado': 0,
	'introducido': 0,
	'autoctono': 0,
	'desconocido': 0	
}

$.getJSON("data/paises-info-dias.json",function(countriesdays){
$.getJSON("data/covid19-cuba.json",function(data){
$.getJSON("data/provincias.geojson",function(provincias){
$.getJSON("data/municipios.geojson",
	function(municipios){
		
		var factor = 50;
		
		var curves = {};
		
		
		
		function getCountryFromDomain(dom){
			if (dom in domains){
				return domains[dom];	
			}
			if (dom=='unknown'){
				return 'Desconocido';	
			}
			return dom;
		}
		
		function getAllCasesAndSimpleGraphics(){
			var cases = {};
			var deaths  = 0;
			var gone = 0;
			var recov = 0;
			var sex_male = 0;
			var sex_female = 0;
			var sex_unknown = 0;
			var countries = {};
			var ages = {
				'0-18':0,
				'19-40':0,
				'41-60':0,
				'61 o más': 0,
				'Desconocido': 0	
			}
			var total_cu = 0;
			var total_no_cu = 0;
			var total_unk = 0;
			var total_tests = 0;
			
			for(var day in data.casos.dias){
				if ('diagnosticados' in data.casos.dias[day]){
					var diag = data.casos.dias[day].diagnosticados;
					for(var p in diag){
						cases[diag[p].id] = diag[p];
						cases[diag[p].id]['fecha']= data.casos.dias[day].fecha;
						
						//cuban/no cuban
						if (diag[p].pais=='cu'){
							total_cu +=1; 
						} else {
							if (diag[p].pais=='unknown') {
								total_unk +=1;
							} else {
								total_no_cu +=1;	
							}
						}
						
						//sex
						if (diag[p].sexo=='hombre'){
							sex_male +=1; 
						} else {
							if (diag[p].sexo=='mujer'){
								sex_female +=1; 
							} else {
								sex_unknown +=1;	
							}
						}
						
						//countries
						if (!(diag[p].pais in countries)){
							countries[diag[p].pais] = 1;	
						} else {
							countries[diag[p].pais] += 1;		
						}
						
						//ages
						if (diag[p].edad==null){
							ages['Desconocido'] +=1	
						} else if ((diag[p].edad>=0)&&(diag[p].edad<19)) {
							ages['0-18'] +=1	
						} else if ((diag[p].edad>=19)&&(diag[p].edad<=40)) {
							ages['19-40'] +=1	
						} else if ((diag[p].edad>=41)&&(diag[p].edad<=60)) {
							ages['41-60'] +=1	
						} else {
							ages['61 o más'] +=1	
						}
						
						//contagio
						if (diag[p].contagio==null){
							contagio.desconocido +=1;
						} else {
							contagio[diag[p].contagio]+=1;	
						}
						 
					}
				}
				if ('muertes_numero' in data.casos.dias[day]){
					deaths += data.casos.dias[day].muertes_numero;
				}
				if ('evacuados_numero' in data.casos.dias[day]){
					gone += data.casos.dias[day].evacuados_numero;
				}
				if ('recuperados_numero' in data.casos.dias[day]){
					recov += data.casos.dias[day].recuperados_numero;
				}
				
				if ('tests_total' in data.casos.dias[day]){
					if (total_tests<=data.casos.dias[day].tests_total){
						total_tests=data.casos.dias[day].tests_total;
					}
				}
			}
			 
			//Pie for sex
			c3.generate({
				bindto: "#sex-info",
				data: {
				  columns: [['Hombres',sex_male],['Mujeres',sex_female],['No reportado',sex_unknown]] ,
				  type: 'pie',
				  colors: {
					 'Mujeres': '#B01E22',
					 'Hombres': '#1C1340',
					 'No reportado': '#1A8323' 
				  }
				}
			});
			
			
			//Pie for cubans/no cubans
			c3.generate({
				bindto: "#countries-info-pie",
				data: {
				  columns: [['cubanos',total_cu],['extranjeros',total_no_cu],['no reportado',total_unk]] ,
				  type: 'pie',
				  colors: {
					 'cubanos': '#B01E22',
					 'extranjeros': '#1C1340',
					 'no reportado': '#1A8323'
				  }
				}
			});
			
			//Donut for tests
			c3.generate({
				bindto: "#tests-donut-info",
				data: {
				  columns: [['Tests Positivos',total_cu+total_no_cu+total_unk],['Tests Negativos',total_tests -(total_cu+total_no_cu+total_unk)]] ,
				  type: 'donut',
				  colors: {
					 'Tests Positivos': '#B01E22',
					 'Tests Negativos': '#1C1340',
				  }
				},
		        donut: {
		          title: total_tests+" tests",
		        }
			});
			
			//Bar for countries
			var country = ['País'];
			var countryDiagnoses = ['Diagnosticados'];
			for(var c in countries){
				if (c!='cu'){
					country.push(getCountryFromDomain(c));
					countryDiagnoses.push(countries[c]);	
				}
			}
			c3.generate({
            bindto: "#countries-info",
            data: {
	              x : country[0],
	              columns: [
					country, 
					countryDiagnoses
	              ],
	              type: 'bar',
	              colors: {
					 'Diagnosticados': '#B01E22' 
				  }
	            },
	            axis: {
	              x: {
	                label: 'País',
	                type: 'categorical'
	              },
	              y: {
	                label: 'Casos',
	                position: 'outer-middle',
	              }
	            }
			});
			
			//Bar for ages
			var range = ['Rango Etario'];
			var rangeDiagnoses = ['Diagnosticados'];
			for(var r in ages){
				range.push(r);
				rangeDiagnoses.push(ages[r]);	
			}
			c3.generate({
            bindto: "#ages-info",
            data: {
	              x : range[0],
	              columns: [
					range, 
					rangeDiagnoses
	              ],
	              type: 'bar',
	              colors: {
					 'Diagnosticados': '#B01E22' 
				  }
	            },
	            axis: {
	              x: {
	                label: 'Rango etario',
	                type: 'categorical'
	              },
	              y: {
	                label: 'Casos',
	                position: 'outer-middle',
	              }
	            }
			});
			
			//Pie for contagio
			c3.generate({
				bindto: "#contagio-info",
				data: {
				  columns: [['Importado',contagio.importado],['Introducido',contagio.introducido],['Autóctono',contagio.autoctono],['Desconocido',contagio.desconocido]] ,
				  type: 'pie',
				  colors: {
					 'Introducido': '#B01E22',
					 'Importado': '#1C1340',
					 'Autóctono': '#1A8323',
					 'Desconocido': '#CA9F31' 
				  }
				}
			});
			
			//Lines for contagio evolution
			var dates = ['Fecha'];
			var dias = ['Días'];
			var dailySingle = ['Casos en el día'];
			var dailySum = ['Casos acumulados'];
			var cuba = ['Cuba'];
			var test_days = ['Fecha'];
			var test_negative = ['Tests Negativos'];
			var test_positive = ['Tests Positivos'];
			var test_cases = ['Total de Tests'];
			var total = 0;
			
			
			
			for(var i=1;i<=Object.keys(data.casos.dias).length;i++){
				dias.push('Día '+i);
				dates.push(data.casos.dias[i].fecha.replace('2020/',''));
				if ('diagnosticados' in data.casos.dias[i]){
					dailySingle.push(data.casos.dias[i]['diagnosticados'].length);
					total += data.casos.dias[i]['diagnosticados'].length;
				} else {
					dailySingle.push(0);
				}
				if ('tests_total' in data.casos.dias[i]){
					test_days.push(data.casos.dias[i].fecha.replace('2020/',''));
					test_cases.push(data.casos.dias[i].tests_total);
					test_negative.push(data.casos.dias[i].tests_total-total);
					test_positive.push(total);	
				}
				dailySum.push(total);
				cuba.push(total);
			}
			$('#update').html('2020/'+dates[dates.length-1]);
			
			
			tests = c3.generate({
					bindto: "#tests-line-info",
						data: {
							  x : test_days[0],
							  columns: [
								test_days,
								test_negative,
								test_positive,
								test_cases
							  ],
							  type: 'bar',
							  groups : [['Tests Negativos','Tests Positivos']],
				              colors: {
								 'Tests Negativos': '#1C1340',
								 'Tests Positivos': '#B01E22',
								 'Total de Tests': '#1A8323' 
							  }
							},
							axis: {
							  x: {
								label: 'Fecha',
								type: 'categorical',
								//show: false
							  },
							  y: {
								label: 'Tests acumulados',
								position: 'outer-middle'
							  }
							}
					});
			
			var countrysorted= [];
			for(var c in countriesdays.paises){
				if ((countriesdays.paises[c].length+1)>=cuba.length){
					console.log(countriesdays.paises[c].length+1,cuba.length);
					var c_temp = [c];
					var d_temp = ['Días'];
					for(var i=1;i<countriesdays.paises[c].length;i++){
						c_temp.push(countriesdays.paises[c][i]);
						d_temp.push('Día '+i);	
					}
					curves[c] = {'dias':d_temp, 'data': c_temp};
					countrysorted.push(c);
				}	
			}
			countrysorted.sort();
			for(var c=0;c<countrysorted.length;c++){
				var cc = curves[countrysorted[c]]['data'][0];
				$('#countrycurve-select').append('<option value="'+cc+'">'+cc+'</option>');
			}
			var countryselected = 'Greece';
			$('#countrycurve-select').val('Greece');
			$('#countries-date').html(countriesdays['dia-actualizacion']);	
			
			$('#countrycurve-select').on('change',function(){
				var val = $('#countrycurve-select').val();
				comparison.unload({ids:countryselected});
				curve.unload({ids:countryselected});
				countryselected  = val;
				comparison.load({columns:[ curves[countryselected]['data']]});
				curve.load({columns:[ curves[countryselected]['data']]});
				
				comparison = c3.generate({
					bindto: "#countries-comparison",
						data: {
							  x : dias[0],
							  columns: [
								dias,
								cuba,
								curves[countryselected]['data']
							  ],
							  type: 'line',
				              colors: {
								 'Cuba': '#B01E22' 
							  }
							},
							axis: {
							  x: {
								label: 'Fecha',
								type: 'categorical',
								show: false
							  },
							  y: {
								label: 'Casos',
								position: 'outer-middle'
							  }
							}
					});
					
					curve = c3.generate({
					bindto: "#countries-curve",
						data: {
							  x : 'Días',
							  columns: [
								curves[countryselected]['dias'],
								curves[countryselected]['data'],
								cuba,
							  ],
							  type: 'line',
				              colors: {
								 'Cuba': '#B01E22' 
							  }
							},
							axis: {
							  x: {
								label: 'Fecha',
								type: 'categorical',
								show: false
							  },
							  y: {
								label: 'Casos',
								position: 'outer-middle'
							  }
							},
							grid: {
					          x: {
					            lines: [{'value':dias[dias.length-1],'text':dias[dias.length-1]}]
					          }
					        }		
						});
					
			});
			
			c3.generate({
			bindto: "#daily-single-info",
				data: {
					  x : dates[0],
					  columns: [
						dates,
						dailySingle,
						dailySum
					  ],
					  type: 'line',
		              colors: {
						 'Casos en el día': '#B01E22',
						 'Casos acumulados': '#1C1340' 
					  }
					},
					axis: {
					  x: {
						label: 'Fecha',
						type: 'categorical',
						show: false
					  },
					  y: {
						label: 'Casos',
						position: 'outer-middle',
					  }
					}
			});
			
			comparison = c3.generate({
			bindto: "#countries-comparison",
				data: {
					  x : dias[0],
					  columns: [
						dias,
						cuba,
						curves['Greece']['data'].slice(0,cuba.length)
					  ],
					  type: 'line',
		              colors: {
						 'Cuba': '#B01E22' 
					  }
					},
					axis: {
					  x: {
						label: 'Fecha',
						type: 'categorical',
						show: false
					  },
					  y: {
						label: 'Casos',
						position: 'outer-middle'
					  }
					}
			});
			
			curve = c3.generate({
			bindto: "#countries-curve",
				data: {
					  x : 'Días',
					  columns: [
						curves['Greece']['dias'],
						curves['Greece']['data'],
						cuba,
					  ],
					  type: 'line',
		              colors: {
						 'Cuba': '#B01E22' 
					  }
					},
					axis: {
					  x: {
						label: 'Fecha',
						type: 'categorical',
						show: false
					  },
					  y: {
						label: 'Casos',
						position: 'outer-middle'
					  }
					},
					grid: {
			          x: {
			            lines: [{'value':dias[dias.length-1],'text':dias[dias.length-1]}]
			          }
			        }		
				});
			
			return {"cases":cases,"deaths":deaths,"gone":gone,"recov":recov,"female":sex_female,"male":sex_male,"unknownsex":sex_unknown};	
		}
		
		
		
		
		var globalInfo = getAllCasesAndSimpleGraphics();
		
		
		var casos = globalInfo.cases;
		
		
		
		function getAllRegions(){
			var muns = {};
			var pros = {};
			for(var c in casos){
				
				if (!(casos[c].dpacode_municipio_deteccion in muns)){
					muns[casos[c].dpacode_municipio_deteccion] = {"total":1}
				} else {
					muns[casos[c].dpacode_municipio_deteccion].total +=1; 	
				}
				if (!(casos[c].dpacode_provincia_deteccion in pros)){
					pros[casos[c].dpacode_provincia_deteccion] = {"total":1}
				} else {
					pros[casos[c].dpacode_provincia_deteccion].total +=1; 	
				}
			}
			return {'muns':muns,'pros':pros};	
		}
		
		var regions = getAllRegions();
		var muns = regions.muns;
		var pros = regions.pros;
		
		function resumeCases(){
			var max_muns = 0;
			var max_pros = 0;
			var total = 0;
			for(var m in muns){
				if (max_muns<muns[m].total){
					max_muns = muns[m].total;	
				}
				total += muns[m].total;	
			}
			for(var p in pros){
				if (max_pros<pros[p].total){
					max_pros = pros[p].total;	
				}
			}
			
			
			
			return {'max_muns':max_muns,
			        'max_pros':max_pros,
			        'total':total,
			        "deaths":globalInfo.deaths,
			        "gone":globalInfo.gone,
			        "recov": globalInfo.recov,
			        "male":globalInfo.male,
			        "female":globalInfo.female,
			        "sexunknown":globalInfo.sex_unknown};
		}
		
		var genInfo = resumeCases();
		
		$('#gen-info-diagn-data').html(genInfo.total);
		$('#gen-info-activ-data').html(genInfo.total -(genInfo.deaths + genInfo.gone +genInfo.recov));
		$('#gen-info-death-data').html(genInfo.deaths);
		$('#gen-info-gone-data').html(genInfo.gone);
		$('#gen-info-recov-data').html(genInfo.recov);
		
		
		
		
		
		var geojsonM = L.geoJSON(municipios,{style:styleM});
		
		var geojsonP = L.geoJSON(provincias,{style:styleP});
		
		geojsonM.bindTooltip(function(layer){
			return '<span class="bd">'+layer.feature.properties.province+'</span> - '+layer.feature.properties.municipality;
		},{'sticky':true});
		
		geojsonP.bindTooltip(function(layer){
			return '<span class="bd">'+layer.feature.properties.province+'</span>';
		},{'sticky':true});
		
		function getMunProfile(code,mun,pro){
			var t = '';
			t += '<div class="small-pname"><span class="bd">'+pro+'</span> - <span>'+mun+'</span></div>';
			if (code in muns) {
				t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>'+muns[code].total+'</span></div>';
			} else {
				t += '<div class="small-content">No hay casos diagnosticados</div>';
			}
			t += '<div class="small-plink">&nbsp;</div>';
			
			return t;
		}
		
		function getProProfile(code,pro){
			var t = '';
			t += '<div class="small-pname"><span class="bd">'+pro+'</span></div>';
			if (code in pros) {
				t += '<div class="small-content"><span class="bd">Diagnosticados:</span> <span>'+pros[code].total+'</span></div>';
			} else {
				t += '<div class="small-content">Sin casos reportados aún</div>';
			}
			t += '<div class="small-plink">&nbsp;</div>';
			
			return t;
		}
		
		geojsonM.bindPopup(function(layer){
			var mcode = layer.feature.properties.DPA_municipality_code;
			var mun = layer.feature.properties.municipality;
			var pro = layer.feature.properties.province;
			return getMunProfile(mcode,mun,pro);	
		});
		
		geojsonP.bindPopup(function(layer){
			var pcode = layer.feature.properties.DPA_province_code;
			var pro = layer.feature.properties.province;
			return getProProfile(pcode,pro);	
		});
		
		function styleM(feature){
			 return {
				weight: 0.5,
				opacity: 0.8,
				color: '#f5f1f1',
				fillOpacity: 1,
				fillColor: getColorM(feature.properties.DPA_municipality_code)
			};
		}
		
		function styleP(feature){
			 return {
				weight: 0.5,
				opacity: 0.8,
				color: '#f5f1f1',
				fillOpacity: 1,
				fillColor: getColorP(feature.properties.DPA_province_code)
			};
		}
		
		$('#cases1').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.2/genInfo.max_muns)+")");
		$('#cases2').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.4/genInfo.max_muns)+")");
		$('#cases3').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.6/genInfo.max_muns)+")");
		$('#cases4').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.8/genInfo.max_muns)+")");
		$('#cases5').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor/genInfo.max_muns)+")");
		$('#cases').html(genInfo.max_muns);
		
		function getColorM(code){
			if (code in muns) {
				var opac = Math.log10(muns[code].total*factor/genInfo.max_muns);
				return "rgba(176,30,34,"+opac+")";
			}
			return '#D1D2D4';
		}
		
		function getColorP(code){
			if (code in pros) {
				var opac = Math.log10(pros[code].total*factor/genInfo.max_pros);
				return "rgba(176,30,34,"+opac+")";
			}
			return '#D1D2D4';
		}
		 
		var map_mun = L.map('map-mun', {
		    center: [21.5, -79.371124],
		    zoom: 15,
		    layers: [geojsonM],
		    keyboard: false,
		    dragging: true,
		    zoomControl: true,
		    boxZoom: false,
		    doubleClickZoom: false,
		    scrollWheelZoom: false,
		    tap: true,
		    touchZoom: true,
		    zoomSnap: 0.05,
		    maxBounds: geojsonM.getBounds()
		});
		map_mun.zoomControl.setPosition('topright');
		map_mun.fitBounds(geojsonM.getBounds());
		
		var map_pro = L.map('map-pro', {
		    center: [21.5, -79.371124],
		    zoom: 15,
		    layers: [geojsonP],
		    keyboard: false,
		    dragging: true,
		    zoomControl: true,
		    boxZoom: false,
		    doubleClickZoom: false,
		    scrollWheelZoom: false,
		    tap: true,
		    touchZoom: true,
		    zoomSnap: 0.05,
		    maxBounds: geojsonP.getBounds()
		});
		map_pro.zoomControl.setPosition('topright');
		map_pro.fitBounds(geojsonP.getBounds());
		
		
		function setBounds(){
			var val = $('#select-map').val();
			$('#map-mun').show();
			$('#map-pro').show();
			map_pro.fitBounds(geojsonP.getBounds());		
			map_mun.fitBounds(geojsonM.getBounds());
			if (val=='map-mun'){
				$('#map-pro').hide();		
			}
			if (val=='map-pro'){
				$('#map-mun').hide();		
			}
		}
		
		window.addEventListener('resize', setBounds);
		
		$('#select-map').on('change',function(e){
		var val  = $('#select-map').val();
		if (val=='map-mun'){
			$('#cases1').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.2/genInfo.max_muns)+")");
			$('#cases2').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.4/genInfo.max_muns)+")");
			$('#cases3').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.6/genInfo.max_muns)+")");
			$('#cases4').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor*0.8/genInfo.max_muns)+")");
			$('#cases5').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_muns*factor/genInfo.max_muns)+")");
		$('#cases').html(genInfo.max_muns);
			$('#map-pro').hide();	
			$('#map-mun').show();	
		} else {
			$('#cases1').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_pros*factor*0.2/genInfo.max_pros)+")");
			$('#cases2').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_pros*factor*0.4/genInfo.max_pros)+")");
			$('#cases3').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_pros*factor*0.6/genInfo.max_pros)+")");
			$('#cases4').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_pros*factor*0.8/genInfo.max_pros)+")");
			$('#cases5').css('color',"rgba(176,30,34,"+Math.log10(genInfo.max_pros*factor/genInfo.max_pros)+")");
			$('#cases').html(genInfo.max_pros);
			$('#map-mun').hide();	
			$('#map-pro').show();	
		}
		
});

		
		$('#map-pro').hide();
		
		console.log(curves);	
		
});
});
});
}); 
