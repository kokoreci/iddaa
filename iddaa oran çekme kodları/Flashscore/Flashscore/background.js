var matches = [];
var currentPos = 0;
var season = '';

$(document).ready(function() {
	
	if(window.location.href.indexOf("results/") > -1 || window.location.href.indexOf("fixtures/") > -1) {
		
		chrome.storage.local.get('matches', function (result) {
			
			if(result.matches === undefined) {
				$("body").append('<button id="copy">Kopyala</button>');
			}
			else {
				
				chrome.storage.local.clear(function() {
																
					var error = chrome.runtime.lastError;
					
					if (!error) {
						location.reload();
					}

				});
				
			}
			
		});
		
		$(document).on("click", "#copy", function() {
			
			$("#copy").attr("disabled", true).text("BAŞLADI");
		
			var interval = setInterval(function() {
		
				if(window.location.href.indexOf("results/") > -1 && (($("a:contains('Show more matches')").length && $("a:contains('Show more matches')").is(":visible")) || !$(".event_round:contains('Round 1')").length)) {
				
					$("a:contains('Show more matches')")[0].click();
				
				}
				else if(window.location.href.indexOf("fixtures/") > -1) {
					
					clearInterval(interval);
					
					season = $(".tournament-name").text().split(" ");
					season = season[season.length - 1];
					
					chrome.storage.local.set({'season': season});
					
					var counter = 0;
					
					$(".soccer tbody tr").each(function() {
						
						if($(this).is('[id]') && counter != 2) {
							var id = $(this).attr("id").split("_");
							matches.push("https://www.flashscore.com/match/"+id[id.length - 1]+"/#match-summary");
						}
						else if(counter == 2) {
							return false;
						}
						else {
							counter++;
						}
											
					});
								
					matches.reverse();
					
					chrome.storage.local.set({'matches': JSON.stringify(matches)});
					
					window.location.href = matches[0];
				}				
                else {
					
					clearInterval(interval);
					
					currentSeason = $(".tournament span:last").text().split("/");
					var seasonValue = currentSeason[0];

					currentSeason = currentSeason[0] + "-" + currentSeason[1].substring(2);
					chrome.storage.local.set({'currentSeason': currentSeason});
					chrome.storage.local.set({'seasonValue': seasonValue});
					
					season = $(".tournament-name").text().split(" ");
					season = season[season.length - 1];
					
					chrome.storage.local.set({'season': season});
					
					seoleague = season == "LaLiga" ? "la-liga" : ($(".tournament_part").length > 1 ? $(".tournament_part:eq(1)").text().toLowerCase().split(" ").join("-") : $(".tournament_part").text().toLowerCase().split(" ").join("-"));
					chrome.storage.local.set({'seoleague': seoleague});
					
					$(".soccer tbody tr[id]").each(function() {
						
						var id = $(this).attr("id").split("_");
						matches.push("https://www.flashscore.com/match/"+id[id.length - 1]+"/#match-summary");
						
					});
					
					matches.reverse();
					
					chrome.storage.local.set({'matches': JSON.stringify(matches)});
					
					window.location.href = matches[0];
					
				}
			
			}, 2500);
			
		});
					
	}
	else if(window.location.href.indexOf("match/") > -1) {
		
		chrome.storage.local.get(function (result) {
			
			if(result.matches !== undefined) {
				
				matches = JSON.parse(result.matches);
						
				if(result.currentPos !== undefined) {
					currentPos = result.currentPos;
				}
				
				if(result.season !== undefined) {
					season = result.season;
				}
				
				var interval = setInterval(function() {
					
					if(!$(".preload").is(":visible")) {
						
						clearInterval(interval);
						var date = $("#utime").text().split(" ");
						var time = date[1].trim();
						date = date[0].trim().split(".");
		
						var day = date[0];
						var month = date[1];
						var year = date[2];
						var d = new Date(year+"-"+month+"-"+day);
						var dayname = d.getDay();
						var monthname = d.getMonth();
						var weekday = new Array(7);
						weekday[0] = "Pazar";
						weekday[1] = "Pazartesi";
						weekday[2] = "Salı";
						weekday[3] = "Çarşamba";
						weekday[4] = "Perşembe";
						weekday[5] = "Cuma";
						weekday[6] = "Cumartesi";
						
						var monthnames = new Array(13);
						monthnames[0] = "Jan.";
						monthnames[1] = "Feb.";
						monthnames[2] = "March";
						monthnames[3] = "April";
						monthnames[4] = "May";
						monthnames[5] = "June";
						monthnames[6] = "July";
						monthnames[7] = "Aug.";
						monthnames[8] = "Sept.";
						monthnames[9] = "Oct.";
						monthnames[10] = "Nov.";
						monthnames[11] = "Dec.";
						
						var country = $(".header .fleft span").text().split(":");
						var league = country[1];
						country = country[0];
						league = league.split(' - ');
						var round = league[1];
						league = league[0];
						round = round.split(' ');
						round = round[1];
						var result = $("#event_detail_current_result").text().trim();
						var htresult = $(".p1_home").text().trim() + "-" + $(".p1_away").text().trim();
						var htresult2 = $(".p2_home").text().trim() + "-" + $(".p2_away").text().trim();						
						
						if($("#a-match-lineups").length) {
						    $("#a-match-lineups")[0].click();
						}
																
						var interval2 = setInterval(function() {
						
							if(!$(".preload").is(":visible")) {
																						
								clearInterval(interval2);
								var awayformation = $("#a-match-lineups").length ? $(".h-part:eq(3)").text().split(' ').join('') : "";
								var away = $(".tname-away").text().trim();
								var home = $(".tname-home").text().trim();
								var homeformation = $("#a-match-lineups").length ? $(".h-part:eq(1)").text().split(' ').join('') : "";
										
								if($("#a-match-statistics").length){
									$("#a-match-statistics")[0].click();
								}
																					
								var interval3 = setInterval(function() {
						
									if(!$(".preload").is(":visible")) {
										
										clearInterval(interval3);
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Ball Possession')").length) {
											var possession = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--homeValue").text();
											var possession2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--awayValue").text();
										}
										else {
											var possession = '';
											var possession2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goal Attempts')").length) {
											var gattempts = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--homeValue").text();
											var gattempts2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--awayValue").text();
										}
										else {
											var gattempts = '';
											var gattempts2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots on Goal')").length) {
											var ongoal = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--homeValue").text();
											var ongoal2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var ongoal = '';
											var ongoal2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots off Goal')").length) {
											var offgoal = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--homeValue").text();
											var offgoal2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var offgoal = '';
											var offgoal2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Blocked Shots')").length) {
											var bshots = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--homeValue").text();
											var bshots2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--awayValue").text();
										}
										else {
											var bshots = '';
											var bshots2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Free Kicks')").length) {
											var fkicks = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--homeValue").text();
											var fkicks2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var fkicks = '';
											var fkicks2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Corner Kicks')").length) {
											var ckicks = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--homeValue").text();
											var ckicks2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var ckicks = '';
											var ckicks2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Offsides')").length) {
											var offsides = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--homeValue").text();
											var offsides2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--awayValue").text();
										}
										else {
											var offsides = '';
											var offsides2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").length) {
											var gsaves = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--homeValue").text();
											var gsaves2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--awayValue").text();
										}
										else {
											var gsaves = '';
											var gsaves2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Fouls')").length) {
											var fouls = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--homeValue").text();
											var fouls2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--awayValue").text();
										}
										else {
											var fouls = '';
											var fouls2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Yellow Cards')").length) {
											var yellowcard = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--homeValue").text();
											var yellowcard2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var yellowcard = '';
											var yellowcard2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Red Cards')").length) {
											var redcard = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--homeValue").text();
											var redcard2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var redcard = '';
											var redcard2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Total Passes')").length) {
											var passes = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--homeValue").text();
											var passes2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--awayValue").text();
										}
										else {
											var passes = '';
											var passes2 = '';
										}
										
										if($("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Tackles')").length) {
											var tackles = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--homeValue").text();
											var tackles2 = $("#tab-statistics-0-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--awayValue").text();
										}
										else {
											var tackles = '';
											var tackles2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Ball Possession')").length) {
											var fpossession = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--homeValue").text();
											var fpossession2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--awayValue").text();
										}
										else {
											var fpossession = '';
											var fpossession2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goal Attempts')").length) {
											var fgattempts = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--homeValue").text();
											var fgattempts2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--awayValue").text();
										}
										else {
											var fgattempts = '';
											var fgattempts2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots on Goal')").length) {
											var fongoal = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--homeValue").text();
											var fongoal2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var fongoal = '';
											var fongoal2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots off Goal')").length) {
											var foffgoal = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--homeValue").text();
											var foffgoal2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var foffgoal = '';
											var foffgoal2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Blocked Shots')").length) {
											var fbshots = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--homeValue").text();
											var fbshots2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--awayValue").text();
										}
										else {
											var fbshots = '';
											var fbshots2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Free Kicks')").length) {
											var ffkicks = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--homeValue").text();
											var ffkicks2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var ffkicks = '';
											var ffkicks2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Corner Kicks')").length) {
											var fckicks = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--homeValue").text();
											var fckicks2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var fckicks = '';
											var fckicks2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Offsides')").length) {
											var foffsides = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--homeValue").text();
											var foffsides2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--awayValue").text();
										}
										else {
											var foffsides = '';
											var foffsides2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").length) {
											var fgsaves = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--homeValue").text();
											var fgsaves2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--awayValue").text();
										}
										else {
											var fgsaves = '';
											var fgsaves2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Fouls')").length) {
											var ffouls = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--homeValue").text();
											var ffouls2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--awayValue").text();
										}
										else {
											var ffouls = '';
											var ffouls2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Yellow Cards')").length) {
											var fyellowcard = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--homeValue").text();
											var fyellowcard2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var fyellowcard = '';
											var fyellowcard2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Red Cards')").length) {
											var fredcard = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--homeValue").text();
											var fredcard2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var fredcard = '';
											var fredcard2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Total Passes')").length) {
											var fpasses = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--homeValue").text();
											var fpasses2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--awayValue").text();
										}
										else {
											var fpasses = '';
											var fpasses2 = '';
										}
										
										if($("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Tackles')").length) {
											var ftackles = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--homeValue").text();
											var ftackles2 = $("#tab-statistics-1-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--awayValue").text();
										}
										else {
											var ftackles = '';
											var ftackles2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Ball Possession')").length) {
											var spossession = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--homeValue").text();
											var spossession2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Ball Possession')").parent().find(".statText--awayValue").text();
										}
										else {
											var spossession = '';
											var spossession2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goal Attempts')").length) {
											var sgattempts = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--homeValue").text();
											var sgattempts2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goal Attempts')").parent().find(".statText--awayValue").text();
										}
										else {
											var sgattempts = '';
											var sgattempts2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots on Goal')").length) {
											var songoal = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--homeValue").text();
											var songoal2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots on Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var songoal = '';
											var songoal2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots off Goal')").length) {
											var soffgoal = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--homeValue").text();
											var soffgoal2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Shots off Goal')").parent().find(".statText--awayValue").text();
										}
										else {
											var soffgoal = '';
											var soffgoal2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Blocked Shots')").length) {
											var sbshots = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--homeValue").text();
											var sbshots2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Blocked Shots')").parent().find(".statText--awayValue").text();
										}
										else {
											var sbshots = '';
											var sbshots2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Free Kicks')").length) {
											var sfkicks = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--homeValue").text();
											var sfkicks2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Free Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var sfkicks = '';
											var sfkicks2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Corner Kicks')").length) {
											var sckicks = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--homeValue").text();
											var sckicks2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Corner Kicks')").parent().find(".statText--awayValue").text();
										}
										else {
											var sckicks = '';
											var sckicks2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Offsides')").length) {
											var soffsides = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--homeValue").text();
											var soffsides2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Offsides')").parent().find(".statText--awayValue").text();
										}
										else {
											var soffsides = '';
											var soffsides2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").length) {
											var sgsaves = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--homeValue").text();
											var sgsaves2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Goalkeeper Saves')").parent().find(".statText--awayValue").text();
										}
										else {
											var sgsaves = '';
											var sgsaves2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Fouls')").length) {
											var sfouls = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--homeValue").text();
											var sfouls2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Fouls')").parent().find(".statText--awayValue").text();
										}
										else {
											var sfouls = '';
											var sfouls2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Yellow Cards')").length) {
											var syellowcard = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--homeValue").text();
											var syellowcard2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Yellow Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var syellowcard = '';
											var syellowcard2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Red Cards')").length) {
											var sredcard = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--homeValue").text();
											var sredcard2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Red Cards')").parent().find(".statText--awayValue").text();
										}
										else {
											var sredcard = '';
											var sredcard2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Total Passes')").length) {
											var spasses = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--homeValue").text();
											var spasses2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Total Passes')").parent().find(".statText--awayValue").text();
										}
										else {
											var spasses = '';
											var spasses2 = '';
										}
										
										if($("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Tackles')").length) {
											var stackles = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--homeValue").text();
											var stackles2 = $("#tab-statistics-2-statistic").find(".statText--titleValue:contains('Tackles')").parent().find(".statText--awayValue").text();
										}
										else {
											var stackles = '';
											var stackles2 = '';
										}
										
										if($("#a-match-lineups").length) {
										
											var goals = [];
											var counter = 0;
											
											$(".detailMS__incidentRow").each(function() {
																							
												if($(this).find(".icon-box.soccer-ball").length) {
													
													if(counter <= 11) {
												
														goals[counter] = [];
													
														if($(this).hasClass("incidentRow--home")) {
															
															if($(this).find(".time-box").length) {
																goals[counter][0] = "Ev";
																goals[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																goals[counter][0] = "Ev";
																goals[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														else {
															
															if($(this).find(".time-box").length) {
																goals[counter][0] = "Dep";
																goals[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																goals[counter][0] = "Dep";
																goals[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														
														counter++;
														
													}
																				
												}
												
											});
											
											var yellows = [];
											counter = 0;
											
											$(".detailMS__incidentRow").each(function() {
																							
												if($(this).find(".icon.y-card").length) {
													
													if(counter <= 4) {
												
														yellows[counter] = [];
													
														if($(this).hasClass("incidentRow--home")) {
															
															if($(this).find(".time-box").length) {
																yellows[counter][0] = "Ev";
																yellows[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																yellows[counter][0] = "Ev";
																yellows[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														else {
															
															if($(this).find(".time-box").length) {
																yellows[counter][0] = "Dep";
																yellows[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																yellows[counter][0] = "Dep";
																yellows[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														
														counter++;
														
													}
																				
												}
												
											});
											
											var reds = [];
											counter = 0;
											
											$(".detailMS__incidentRow").each(function() {
																							
												if($(this).find(".icon.r-card").length) {
													
													if(counter <= 4) {
												
														reds[counter] = [];
													
														if($(this).hasClass("incidentRow--home")) {
															
															if($(this).find(".time-box").length) {
																reds[counter][0] = "Ev";
																reds[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																reds[counter][0] = "Ev";
																reds[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														else {
															
															if($(this).find(".time-box").length) {
																reds[counter][0] = "Dep";
																reds[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																reds[counter][0] = "Dep";
																reds[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														
														counter++;
														
													}
																				
												}
												
											});
											
											var penalties = [];
											counter = 0;
											
											$(".detailMS__incidentRow").each(function() {
																							
												if($(this).find(".icon-box.soccer-ball").length && $(this).find(".subincident-name:contains('Penalty')").length) {
													
													if(counter <= 2) {
												
														penalties[counter] = [];
													
														if($(this).hasClass("incidentRow--home")) {
															
															if($(this).find(".time-box").length) {
																penalties[counter][0] = "Ev";
																penalties[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																penalties[counter][0] = "Ev";
																penalties[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														else {
															
															if($(this).find(".time-box").length) {
																penalties[counter][0] = "Dep";
																penalties[counter][1] = $(this).find(".time-box").text().replace("'","");
															}
															else {
																penalties[counter][0] = "Dep";
																penalties[counter][1] = $(this).find(".time-box-wide").text().replace("'","");
															}
															
														}
														
														counter++;
														
													}
																				
												}
												
											});
											
										}
										else {
											
											var goals = [];
											var yellows = [];
											var reds = [];
											var penalties = [];
											
										}
										
										$("#a-match-odds-comparison")[0].click();
										
										var ms1 = [[],[],[],[],[],[],[]];
										var ms0 = [[],[],[],[],[],[],[]];
										var ms2 = [[],[],[],[],[],[],[]];
										var htms1 = [[],[],[],[],[],[],[]];
										var htms0 = [[],[],[],[],[],[],[]];
										var htms2 = [[],[],[],[],[],[],[]];
										var ht2ms1 = [[],[],[],[],[],[],[]];
										var ht2ms0 = [[],[],[],[],[],[],[]];
										var ht2ms2 = [[],[],[],[],[],[],[]];
										
										var hams1 = [[],[],[],[],[],[],[]];
										var hams2 = [[],[],[],[],[],[],[]];
										var hahtms1 = [[],[],[],[],[],[],[]];
										var hahtms2 = [[],[],[],[],[],[],[]];
										var haht2ms1 = [[],[],[],[],[],[],[]];
										var haht2ms2 = [[],[],[],[],[],[],[]];
										
										var ms1x = [[],[],[],[],[],[],[]];
										var ms12 = [[],[],[],[],[],[],[]];
										var msx2 = [[],[],[],[],[],[],[]];
										var htms1x = [[],[],[],[],[],[],[]];
										var htms12 = [[],[],[],[],[],[],[]];
										var htmsx2 = [[],[],[],[],[],[],[]];
										var ht2ms1x = [[],[],[],[],[],[],[]];
										var ht2ms12 = [[],[],[],[],[],[],[]];
										var ht2msx2 = [[],[],[],[],[],[],[]];
										
										var odd = [[],[],[],[],[],[],[]];
										var even = [[],[],[],[],[],[],[]];
										var htodd = [[],[],[],[],[],[],[]];
										var hteven = [[],[],[],[],[],[],[]];
										var ht2odd = [[],[],[],[],[],[],[]];
										var ht2even = [[],[],[],[],[],[],[]];
										
										var yes = [[],[],[],[],[],[],[]];
										var no = [[],[],[],[],[],[],[]];
										var htyes = [[],[],[],[],[],[],[]];
										var htno = [[],[],[],[],[],[],[]];
										var ht2yes = [[],[],[],[],[],[],[]];
										var ht2no = [[],[],[],[],[],[],[]];		

										var limit = ["0.5","1","1.25","1.5","1.75","2","2.25","2.5","2.75","3","3.25","3.5","3.75","4","4.25","4.5","4.75","5","5.25","5.5","5.75","6","6.25","6.5","6.75","7","7.25","7.5","7.75","8","8.25","8.5","8.75"];
										var over = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var under = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var htover = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var htunder = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ht2over = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ht2under = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										
										var htftlimit = ["27","30","33","28","31","34","29","32","35"];
										var htft = [[],[],[],[],[],[],[],[],[]];
										
										var cslimit = ["2","5","6","10","11","12","18","19","20","21","36","37","44","45","46","38","39","47","48","49","63","50","51","52","84","85","66","67","73","74","68","95","96","69","106","105","1","3","7","13","17","53","4","9","8","16","15","14","25","24","23","22","40","41","54","55","56","42","43","57","58","59","64","60","61","62","88","89","65","70","78","79","71","100","101","72","117","147"];
										var cs = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var htcs = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ht2cs = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										
										var ahlimit = ["-6.5","-6.25","-6","-5.75","-5.5","-5.25","-5","-4.75","-4.5","-4.25","-4","-3.75","-3.5","-3.25","-3","-2.75","-2.5","-2.25","-2","-1.75","-1.5","-1.25","-1","-0.75","-0.5","-0.25","0","0.25","0.5","0.75","1","1.25","1.5","1.75","2","2.25","2.5","2.75","3","3.25","3.5","3.75","4","4.25","4.5","4.75","5","5.25","5.5","5.75","6","6.25","6.5"];
										var ahms1 = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ahms2 = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ahhtms1 = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										var ahhtms2 = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
										
										var ehlimit = ["-6","-5","-4","-3","-2","-1","1","2","3","4","5","6"];
										var ehms1 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehms0 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehms2 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehhtms1 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehhtms0 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehhtms2 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehht2ms1 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehht2ms0 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										var ehht2ms2 = [[],[],[],[],[],[],[],[],[],[],[],[]];
										
										var interval = setInterval(function() {
											
											if(!$(".preload").is(":visible")) {
												
												clearInterval(interval);
												
												var typecounter = 0;
												var typecurrent = 0;
												var oddtypes = ["EU", "UK", "US", "HK", "MA", "IN"];
												
												var typeinterval = setInterval(function() {
												
													if(typecurrent == typecounter && typecurrent != 6) {
														
														$(".odds-comparison-spacer").find("a:contains('"+oddtypes[typecounter]+"')")[0].click();
														typecurrent++;
														
														var waitinterval = setInterval(function() {
																														
															if($(".odds-comparison-spacer").find("span.active-odds-format").length == 1) {
																
																clearInterval(waitinterval);
															
																var bookmaker = ["bet365", "William Hill", "Unibet", "bwin", "1xBet", "bet-at-home", "Betfair"];
																var bmcounter = 0;
																var bmcurrent = 0;
																
																var bminterval = setInterval(function() {
																
																	if(bmcounter == bmcurrent) {
																		
																		// MS Tüm Oranlar
																		
																		var id = "block-1x2-ft";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				ms1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				ms0[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				ms2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ms1[bmcounter].push("");
																			ms0[bmcounter].push("");
																			ms2[bmcounter].push("");
																			ms1[bmcounter].push("");
																			ms0[bmcounter].push("");
																			ms2[bmcounter].push("");
																			
																		}
																		
																		// HT Oranlar
																		
																		var id = "block-1x2-1hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htms1[bmcounter].push(encodeURIComponent(explode[0]));
																				htms1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htms1[bmcounter].push(encodeURIComponent(explode[0]));
																				htms1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htms0[bmcounter].push(encodeURIComponent(explode[0]));
																				htms0[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htms0[bmcounter].push(encodeURIComponent(explode[0]));
																				htms0[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htms2[bmcounter].push(encodeURIComponent(explode[0]));
																				htms2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htms2[bmcounter].push(encodeURIComponent(explode[0]));
																				htms2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			htms1[bmcounter].push("");
																			htms1[bmcounter].push("");
																			htms0[bmcounter].push("");
																			htms0[bmcounter].push("");
																			htms2[bmcounter].push("");
																			htms2[bmcounter].push("");
																			
																		}
																		
																		// HT2 Oranlar
																		
																		var id = "block-1x2-2hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2ms0[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms0[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ht2ms1[bmcounter].push("");
																			ht2ms0[bmcounter].push("");
																			ht2ms2[bmcounter].push("");
																			ht2ms1[bmcounter].push("");
																			ht2ms0[bmcounter].push("");
																			ht2ms2[bmcounter].push("");
																			
																		}
																		
																		// Home/Away Oranlar
																		
																		var id = "block-moneyline-ft";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				hams1[bmcounter].push(encodeURIComponent(explode[0]));
																				hams1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				hams1[bmcounter].push(encodeURIComponent(explode[0]));
																				hams1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				hams2[bmcounter].push(encodeURIComponent(explode[0]));
																				hams2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				hams2[bmcounter].push(encodeURIComponent(explode[0]));
																				hams2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			hams1[bmcounter].push("");
																			hams2[bmcounter].push("");
																			hams1[bmcounter].push("");
																			hams2[bmcounter].push("");
																			
																		}
																																																						
																		// Home/Away HT Oranlar
																		
																		var id = "block-moneyline-1hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				hahtms1[bmcounter].push(encodeURIComponent(explode[0]));
																				hahtms1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				hahtms1[bmcounter].push(encodeURIComponent(explode[0]));
																				hahtms1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				hahtms2[bmcounter].push(encodeURIComponent(explode[0]));
																				hahtms2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				hahtms2[bmcounter].push(encodeURIComponent(explode[0]));
																				hahtms2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			hahtms1[bmcounter].push("");
																			hahtms2[bmcounter].push("");
																			hahtms1[bmcounter].push("");
																			hahtms2[bmcounter].push("");
																			
																		}
																		
																		// Home/Away HT2 Oranlar
																		
																		var id = "block-moneyline-2hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				haht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				haht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				haht2ms1[bmcounter].push(encodeURIComponent(explode[0]));
																				haht2ms1[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				haht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				haht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				haht2ms2[bmcounter].push(encodeURIComponent(explode[0]));
																				haht2ms2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			haht2ms1[bmcounter].push("");
																			haht2ms2[bmcounter].push("");
																			haht2ms1[bmcounter].push("");
																			haht2ms2[bmcounter].push("");
																			
																		}
																		
																		// MS DC Tüm Oranlar
																		
																		var id = "block-double-chance-ft";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				ms1x[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				ms12[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				msx2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ms1x[bmcounter].push("");
																			ms12[bmcounter].push("");
																			msx2[bmcounter].push("");
																			ms1x[bmcounter].push("");
																			ms12[bmcounter].push("");
																			msx2[bmcounter].push("");
																			
																		}
																		
																		// HT DC Oranlar
																		
																		var id = "block-double-chance-1hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				htms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				htms1x[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htms12[bmcounter].push(encodeURIComponent(explode[0]));
																				htms12[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htms12[bmcounter].push(encodeURIComponent(explode[0]));
																				htms12[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htmsx2[bmcounter].push(encodeURIComponent(explode[0]));
																				htmsx2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htmsx2[bmcounter].push(encodeURIComponent(explode[0]));
																				htmsx2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			htms1x[bmcounter].push("");
																			htms1x[bmcounter].push("");
																			htms12[bmcounter].push("");
																			htms12[bmcounter].push("");
																			htmsx2[bmcounter].push("");
																			htmsx2[bmcounter].push("");
																			
																		}
																		
																		// HT2 DC Oranlar
																		
																		var id = "block-double-chance-2hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2ms1x[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms1x[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {													
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2ms12[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2ms12[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2msx2[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2msx2[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ht2ms1x[bmcounter].push("");
																			ht2ms12[bmcounter].push("");
																			ht2msx2[bmcounter].push("");
																			ht2ms1x[bmcounter].push("");
																			ht2ms12[bmcounter].push("");
																			ht2msx2[bmcounter].push("");
																			
																		}
																		
																		// O/E Oranlar
																		
																		var id = "block-oddeven-ft";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				odd[bmcounter].push(encodeURIComponent(explode[0]));
																				odd[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				odd[bmcounter].push(encodeURIComponent(explode[0]));
																				odd[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				even[bmcounter].push(encodeURIComponent(explode[0]));
																				even[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				even[bmcounter].push(encodeURIComponent(explode[0]));
																				even[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			odd[bmcounter].push("");
																			even[bmcounter].push("");
																			odd[bmcounter].push("");
																			even[bmcounter].push("");
																			
																		}
																																																						
																		// O/E HT Oranlar
																		
																		var id = "block-oddeven-1hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htodd[bmcounter].push(encodeURIComponent(explode[0]));
																				htodd[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htodd[bmcounter].push(encodeURIComponent(explode[0]));
																				htodd[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				hteven[bmcounter].push(encodeURIComponent(explode[0]));
																				hteven[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				hteven[bmcounter].push(encodeURIComponent(explode[0]));
																				hteven[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			htodd[bmcounter].push("");
																			htodd[bmcounter].push("");
																			hteven[bmcounter].push("");
																			hteven[bmcounter].push("");
																			
																		}
																		
																		// O/E HT2 Oranlar
																		
																		var id = "block-oddeven-2hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2odd[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2odd[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2odd[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2odd[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2even[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2even[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2even[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2even[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ht2odd[bmcounter].push("");
																			ht2odd[bmcounter].push("");
																			ht2even[bmcounter].push("");
																			ht2even[bmcounter].push("");
																			
																		}
																		
																		// BTS Oranlar
																		
																		var id = "block-both-teams-to-score-ft";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				yes[bmcounter].push(encodeURIComponent(explode[0]));
																				yes[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				yes[bmcounter].push(encodeURIComponent(explode[0]));
																				yes[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				no[bmcounter].push(encodeURIComponent(explode[0]));
																				no[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				no[bmcounter].push(encodeURIComponent(explode[0]));
																				no[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			yes[bmcounter].push("");
																			no[bmcounter].push("");
																			yes[bmcounter].push("");
																			no[bmcounter].push("");
																			
																		}
																																																						
																		// BTS HT Oranlar
																		
																		var id = "block-both-teams-to-score-1hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htyes[bmcounter].push(encodeURIComponent(explode[0]));
																				htyes[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htyes[bmcounter].push(encodeURIComponent(explode[0]));
																				htyes[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				htno[bmcounter].push(encodeURIComponent(explode[0]));
																				htno[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				htno[bmcounter].push(encodeURIComponent(explode[0]));
																				htno[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			htyes[bmcounter].push("");
																			htyes[bmcounter].push("");
																			htno[bmcounter].push("");
																			htno[bmcounter].push("");
																			
																		}
																		
																		// BTS HT2 Oranlar
																		
																		var id = "block-both-teams-to-score-2hf";
																		
																		if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").length) {
														
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt") !== 'undefined') {
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(1) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2yes[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2yes[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2yes[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2yes[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																																					
																			if(typeof $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																				if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																				}
																				else if($("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																					var explode = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																			}
																			else {													
																				var explode = [];
																				explode[0] = $("#"+id).find("a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																			}
																			
																			if(explode.length == 1) {
																				
																				ht2no[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2no[bmcounter].push(encodeURIComponent(explode[0]));
																				
																			}
																			else {
																				
																				ht2no[bmcounter].push(encodeURIComponent(explode[0]));
																				ht2no[bmcounter].push(encodeURIComponent(explode[1]));
																				
																			}
																			
																		}
																		else {
																			
																			ht2yes[bmcounter].push("");
																			ht2yes[bmcounter].push("");
																			ht2no[bmcounter].push("");
																			ht2no[bmcounter].push("");
																			
																		}
																		
																		// Over Under Oranlar
																																				
																		for(i = 0; i < limit.length;i++) {
													
																			// Over Under Oranlar
																			
																			var id = "block-under-over-ft";
																																						
																			if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					over[i].push(encodeURIComponent(explode[0]));
																					over[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					over[i].push(encodeURIComponent(explode[0]));
																					over[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					under[i].push(encodeURIComponent(explode[0]));
																					under[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					under[i].push(encodeURIComponent(explode[0]));
																					under[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																			}
																			else {
																				
																				over[i].push("");
																				over[i].push("");
																				under[i].push("");	
																				under[i].push("");
																				
																			}
																			
																			// Over Under IY Oranlar
																			
																			var id = "block-under-over-1hf";
																			
																			if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					htover[i].push(encodeURIComponent(explode[0]));
																					htover[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					htover[i].push(encodeURIComponent(explode[0]));
																					htover[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					htunder[i].push(encodeURIComponent(explode[0]));
																					htunder[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					htunder[i].push(encodeURIComponent(explode[0]));
																					htunder[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																			}
																			else {
																				
																				htover[i].push("");
																				htover[i].push("");
																				htunder[i].push("");	
																				htunder[i].push("");
																																								
																			}
																			
																			// Over Under 2. Yarı
																			
																			var id = "block-under-over-2hf";
																			
																			if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ht2over[i].push(encodeURIComponent(explode[0]));
																					ht2over[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ht2over[i].push(encodeURIComponent(explode[0]));
																					ht2over[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ou_"+limit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ht2under[i].push(encodeURIComponent(explode[0]));
																					ht2under[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ht2under[i].push(encodeURIComponent(explode[0]));
																					ht2under[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																			}
																			else {

																				ht2over[i].push("");
																				ht2over[i].push("");
																				ht2under[i].push("");	
																				ht2under[i].push("");
																				
																			}
																		
																		}
																		
																		for(i = 0; i < htftlimit.length;i++) {
													
																			// HT FT
																			
																			var id = "block-ht-ft";
																																						
																			if($("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_htft_"+htftlimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					htft[i].push(encodeURIComponent(explode[0]));
																					htft[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					htft[i].push(encodeURIComponent(explode[0]));
																					htft[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				htft[i].push("");
																				htft[i].push("");
																				
																			}
																																					
																		}
																		
																		for(i = 0; i < cslimit.length;i++) {
													
																			// Correct Score
																			
																			var id = "block-correct-score-ft";
																																						
																			if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					cs[i].push(encodeURIComponent(explode[0]));
																					cs[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					cs[i].push(encodeURIComponent(explode[0]));
																					cs[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				cs[i].push("");
																				cs[i].push("");
																				
																			}
																			
																			var id = "block-correct-score-1hf";
																																						
																			if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					htcs[i].push(encodeURIComponent(explode[0]));
																					htcs[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					htcs[i].push(encodeURIComponent(explode[0]));
																					htcs[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				htcs[i].push("");
																				htcs[i].push("");
																				
																			}
																			
																			var id = "block-correct-score-2hf";
																																						
																			if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_correct_score_"+cslimit[i]+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ht2cs[i].push(encodeURIComponent(explode[0]));
																					ht2cs[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ht2cs[i].push(encodeURIComponent(explode[0]));
																					ht2cs[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ht2cs[i].push("");
																				ht2cs[i].push("");
																				
																			}
																																					
																		}
																		
																		for(i = 0; i < ahlimit.length;i++) {
													
																			// AH 
																																					
																			var id = "block-asian-handicap-ft";
																																						
																			if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ahms1[i].push(encodeURIComponent(explode[0]));
																					ahms1[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ahms1[i].push(encodeURIComponent(explode[0]));
																					ahms1[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ahms2[i].push(encodeURIComponent(explode[0]));
																					ahms2[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ahms2[i].push(encodeURIComponent(explode[0]));
																					ahms2[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ahms1[i].push("");
																				ahms1[i].push("");
																				ahms2[i].push("");
																				ahms2[i].push("");
																				
																			}
																			
																			var id = "block-asian-handicap-1hf";
																																						
																			if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ahhtms1[i].push(encodeURIComponent(explode[0]));
																					ahhtms1[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ahhtms1[i].push(encodeURIComponent(explode[0]));
																					ahhtms1[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_ah_"+ahlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ahhtms2[i].push(encodeURIComponent(explode[0]));
																					ahhtms2[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ahhtms2[i].push(encodeURIComponent(explode[0]));
																					ahhtms2[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ahhtms1[i].push("");
																				ahhtms1[i].push("");
																				ahhtms2[i].push("");
																				ahhtms2[i].push("");
																				
																			}
																																					
																		}
																		
																		for(i = 0; i < ehlimit.length;i++) {
													
																			// EH
																																					
																			var id = "block-european-handicap-ft";
																																						
																			if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehms1[i].push(encodeURIComponent(explode[0]));
																					ehms1[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehms1[i].push(encodeURIComponent(explode[0]));
																					ehms1[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehms0[i].push(encodeURIComponent(explode[0]));
																					ehms0[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehms0[i].push(encodeURIComponent(explode[0]));
																					ehms0[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehms2[i].push(encodeURIComponent(explode[0]));
																					ehms2[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehms2[i].push(encodeURIComponent(explode[0]));
																					ehms2[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ehms1[i].push("");
																				ehms1[i].push("");
																				ehms0[i].push("");
																				ehms0[i].push("");
																				ehms2[i].push("");
																				ehms2[i].push("");
																				
																			}
																			
																			// EH İlk Yarı
																			
																			var id = "block-european-handicap-1hf";
																																						
																			if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehhtms1[i].push(encodeURIComponent(explode[0]));
																					ehhtms1[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehhtms1[i].push(encodeURIComponent(explode[0]));
																					ehhtms1[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehhtms0[i].push(encodeURIComponent(explode[0]));
																					ehhtms0[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehhtms0[i].push(encodeURIComponent(explode[0]));
																					ehhtms0[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehhtms2[i].push(encodeURIComponent(explode[0]));
																					ehhtms2[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehhtms2[i].push(encodeURIComponent(explode[0]));
																					ehhtms2[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ehhtms1[i].push("");
																				ehhtms1[i].push("");
																				ehhtms0[i].push("");
																				ehhtms0[i].push("");
																				ehhtms2[i].push("");
																				ehhtms2[i].push("");
																				
																			}
																			
																			// EH İkinci Yarı
																			
																			var id = "block-european-handicap-2hf";
																																						
																			if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").length) {
																																						
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(2) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehht2ms1[i].push(encodeURIComponent(explode[0]));
																					ehht2ms1[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehht2ms1[i].push(encodeURIComponent(explode[0]));
																					ehht2ms1[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(3) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehht2ms0[i].push(encodeURIComponent(explode[0]));
																					ehht2ms0[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehht2ms0[i].push(encodeURIComponent(explode[0]));
																					ehht2ms0[i].push(encodeURIComponent(explode[1]));
																					
																				}
																				
																				if(typeof $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt") !== 'undefined') {												
																					if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[u]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[u]");
																					}
																					else if($("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").indexOf('[d]') > -1) {
																						var explode = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").attr("alt").split("[d]");
																					}
																					else {													
																						var explode = [];
																						explode[0] = $$("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																					}
																				}
																				else {													
																					var explode = [];
																					explode[0] = $("#"+id+" #odds_eh_"+ehlimit[i].replace(".","\\.")+" a[title='" + bookmaker[bmcounter] + "']").parents("tr").find("td:eq(4) span").text();													
																				}
																				
																				if(explode.length == 1) {
																					
																					ehht2ms2[i].push(encodeURIComponent(explode[0]));
																					ehht2ms2[i].push(encodeURIComponent(explode[0]));
																					
																				}
																				else {
																					
																					ehht2ms2[i].push(encodeURIComponent(explode[0]));
																					ehht2ms2[i].push(encodeURIComponent(explode[1]));
																					
																				}
																																								
																			}
																			else {
																				
																				ehht2ms1[i].push("");
																				ehht2ms1[i].push("");
																				ehht2ms0[i].push("");
																				ehht2ms0[i].push("");
																				ehht2ms2[i].push("");
																				ehht2ms2[i].push("");
																				
																			}
																																					
																		}
																		
																		bmcounter++;
																	
																	}
																	else if(bmcounter > bmcurrent && bmcounter != 7) {
																		
																		bmcurrent = bmcounter;
																		
																	}
																	else if(bmcounter == 7) {
																		
																		clearInterval(bminterval);
																			
																			clearInterval(typeinterval);
																													
																			var data = [];
									
																			data[0] = day;
																			data[1] = month;
																			data[2] = year;
																			data[3] = weekday[dayname];
																			data[4] = country;
																			data[5] = season;
																			data[6] = league;
																			data[7] = round;
																			data[8] = result;
																			data[9] = htresult;
																			data[10] = htresult2;
																			data[11] = awayformation;
																			data[12] = away;
																			data[13] = home;
																			data[14] = homeformation;
																			
																			data[15] = possession;
																			data[16] = possession2
																			data[17] = gattempts;
																			data[18] = gattempts2;
																			data[19] = ongoal;
																			data[20] = ongoal2;
																			data[21] = offgoal;
																			data[22] = offgoal2;
																			data[23] = bshots;
																			data[24] = bshots2;
																			data[25] = fkicks;
																			data[26] = fkicks2;
																			data[27] = ckicks;
																			data[28] = ckicks2;
																			data[29] = offsides;
																			data[30] = offsides2;
																			data[31] = gsaves;
																			data[32] = gsaves2;
																			data[33] = fouls;
																			data[34] = fouls2;
																			data[35] = yellowcard;
																			data[36] = yellowcard2;
																			data[37] = redcard;
																			data[38] = redcard2;
																			data[39] = passes;
																			data[40] = passes2;
																			data[41] = tackles;
																			data[42] = tackles2;
																			
																			data[43] = fpossession;
																			data[44] = fpossession2;
																			data[45] = fgattempts;
																			data[46] = fgattempts2;
																			data[47] = fongoal;
																			data[48] = fongoal2;
																			data[49] = foffgoal;
																			data[50] = foffgoal2;
																			data[51] = fbshots;
																			data[52] = fbshots2;
																			data[53] = ffkicks;
																			data[54] = ffkicks2;
																			data[55] = fckicks;
																			data[56] = fckicks2;
																			data[57] = foffsides;
																			data[58] = foffsides2;
																			data[59] = fgsaves;
																			data[60] = fgsaves2;
																			data[61] = ffouls;
																			data[62] = ffouls2;
																			data[63] = fyellowcard;
																			data[64] = fyellowcard2;
																			data[65] = fredcard;
																			data[66] = fredcard2;
																			data[67] = fpasses;
																			data[68] = fpasses2;
																			data[69] = ftackles;
																			data[70] = ftackles2;
																			
																			data[71] = spossession;
																			data[72] = spossession2;
																			data[73] = sgattempts;
																			data[74] = sgattempts2;
																			data[75] = songoal;
																			data[76] = songoal2;
																			data[77] = soffgoal;
																			data[78] = soffgoal2;
																			data[79] = sbshots;
																			data[80] = sbshots2;
																			data[81] = sfkicks;
																			data[82] = sfkicks2;
																			data[83] = sckicks;
																			data[84] = sckicks2;
																			data[85] = soffsides;
																			data[86] = soffsides2;
																			data[87] = sgsaves;
																			data[88] = sgsaves2;
																			data[89] = sfouls;
																			data[90] = sfouls2;
																			data[91] = syellowcard;
																			data[92] = syellowcard2;
																			data[93] = sredcard;
																			data[94] = sredcard2;
																			data[95] = spasses;
																			data[96] = spasses2;
																			data[97] = stackles;
																			data[98] = stackles2;
																			data[99] = "";
																			data[100] = "";
																			data[101] = "";
																			data[102] = "";
																			data[103] = "";
																			data[104] = "";
																			data[105] = "";
																			data[106] = "";
																			data[107] = "";
																			data[108] = "";
																			data[109] = "";
																			data[110] = "";
																			data[111] = "";
																			data[112] = "";
																			data[113] = "";
																			data[114] = "";
																			data[115] = "";
																			data[116] = "";
																			data[117] = "";
																			data[118] = "";
																			data[119] = "";
																			data[120] = "";
																			data[121] = "";
																			data[122] = "";
																			
																			data[123] = "";
																			data[124] = "";
																			data[125] = "";
																			data[126] = "";
																			data[127] = "";
																			data[128] = "";
																			data[129] = "";
																			data[130] = "";
																			data[131] = "";
																			data[132] = "";
																			
																			data[133] = "";
																			data[134] = "";
																			data[135] = "";
																			data[136] = "";
																			data[137] = "";
																			data[138] = "";
																			data[139] = "";
																			data[140] = "";
																			data[141] = "";
																			data[142] = "";
																			
																			data[143] = "";
																			data[144] = "";
																			data[145] = "";
																			data[146] = "";
																			data[147] = "";
																			data[148] = "";																																															
																																																									
																			var current = 99;
																			
																			for(i = 0; i < goals.length; i++) {
																			
																				data[current] = goals[i][0];
																				current++; 
																				data[current] = encodeURIComponent(goals[i][1]);
																				current++;
																			
																			}
																			
																			current = 123;
																			
																			for(i = 0; i < yellows.length; i++) {
																			
																				data[current] = yellows[i][0];
																				current++; 
																				data[current] = encodeURIComponent(yellows[i][1]);
																				current++;
																			
																			}
																			
																			current = 133;
																			
																			for(i = 0; i < reds.length; i++) {
																			
																				data[current] = reds[i][0];
																				current++; 
																				data[current] = encodeURIComponent(reds[i][1]);
																				current++;
																			
																			}
																			
																			current = 143;
																			
																			for(i = 0; i < penalties.length; i++) {
																			
																				data[current] = penalties[i][0];
																				current++; 
																				data[current] = encodeURIComponent(penalties[i][1]);
																				current++;
																			
																			}
																			
																			data[149] = ms1;
																			data[150] = ms0;
																			data[151] = ms2;
																			data[152] = htms1;
																			data[153] = htms0;
																			data[154] = htms2;
																			data[155] = ht2ms1;
																			data[156] = ht2ms0;
																			data[157] = ht2ms2;
																			
																			data[158] = hams1;
																			data[159] = hams2;
																			data[160] = hahtms1;
																			data[161] = hahtms2;
																			data[162] = haht2ms1;
																			data[163] = haht2ms2;
																			
																			data[164] = over;
																			data[165] = under;
																			data[166] = htover;
																			data[167] = htunder;
																			data[168] = ht2over;
																			data[169] = ht2under;
																			
																			data[170] = ahms1;
																			data[171] = ahms2;
																			data[172] = ahhtms1;
																			data[173] = ahhtms2;
																			
																			data[174] = ehms1;
																			data[175] = ehms0;
																			data[176] = ehms2;
																			data[177] = ehhtms1;
																			data[178] = ehhtms0;
																			data[179] = ehhtms2;
																			data[180] = ehht2ms1;
																			data[181] = ehht2ms0;
																			data[182] = ehht2ms2;
																			
																			data[183] = ms1x;
																			data[184] = ms12;
																			data[185] = msx2;
																			data[186] = htms1x;
																			data[187] = htms12;
																			data[188] = htmsx2;
																			data[189] = ht2ms1x;
																			data[190] = ht2ms12;
																			data[191] = ht2msx2;
																			
																			data[192] = htft;
																			
																			data[193] = cs;
																			data[194] = htcs;
																			data[195] = ht2cs;
																			
																			data[196] = odd;
																			data[197] = even;
																			data[198] = htodd;
																			data[199] = hteven;
																			data[200] = ht2odd;
																			data[201] = ht2even;
																			
																			data[202] = yes;
																			data[203] = no;
																			data[204] = htyes;
																			data[205] = htno;
																			data[206] = ht2yes;
																			data[207] = ht2no;
																			
																			console.log(htft);
																			
																			$.ajax({
																				type: "POST",
																				url: "http://localhost/flashscore/controller.php",
																				data: "data="+JSON.stringify(data),
																				success: function(html){
																					
																					currentPos++;
													
																					if(currentPos < matches.length) {
																						
																						chrome.storage.local.set({'currentPos': currentPos});
																						window.location.href = matches[currentPos];
																						
																					}
																					else {
																						
																						chrome.storage.local.clear(function() {
																							
																							var error = chrome.runtime.lastError;
																							
																							if (!error) {
																								alert("İşlem tamamlandı");
																							}

																						});
																					
																					}
																					
																				}
																				
																			});
																			
																		
																	
																	}
																	
																}, 10);		

															}
															
														}, 100);
														
													}
													
												}, 10);
																																																
											}
											
										}, 500);
										
									}
								
								},500);
								
							}
						
						}, 500);
						
					}
										
				}, 500);
			
			}

		});
		
	}
		
});