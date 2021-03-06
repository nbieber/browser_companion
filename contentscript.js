var companion_id = "bro";

//TODO put characters in separate json file
var characters = 
{
	"bro": {
		"name": "Browser Bro",
		"text": [{
			"urls": ["epicurious", "allrecipes"],
			"text": "Step 1) Cook protein Step 2) Eat protein. Boom!"
		},
		{
			"urls": ["okcupid", "match.com"],
			"text": "Dude, I hope you filtered out the fatties and the uggos this time!"
		},
		{
			"urls": ["stackoverflow", "ycombinator"],
			"text": "Time to bro down and crush some code!"
		}
		],
		"animation": "up-and-down"
	},
	"hipster": {
		"name": "Hipster Harry",
		"text" :[{
			"urls": ["okcupid", "match.com"],
			"text": "Getting married isn’t a race. It’s more like an exclusive club you probably won’t get into."
		},
		{
			"urls": ["webmd"],
			"text": "Shit - do you think it’s an STD? I got an STD once. It was a pretty obscure one… you’ve probably never heard of it."
		},
		{
			"urls": ["epicurious", "allrecipes"],
			"text": "Every time you don't eat local, a farmer's child can't afford shoes.... Think about it, asshole."
		},
		{
			"urls": ["twitter"],
			"text": "While you struggle to come up with 140 characters of original content, that copy of Kerouac gathers another layer of dust."
		}],
		"animation": "up-and-down"
	},
	"bieber": {
		"name": "Justin Bieber",
		"text": [{
			"urls": ["twitter"],
			"text": "Baby, baby, baby... you’re super witty and clever. Just not within the confines of 140 characters."
		}],
		"animation": "up-and-down"
	},
	"kale": {
		"name": "Judgy Kale",
		"text": [
			{
				"urls": ["epicurious", "allrecipes"],
				"text": "Vegans don't only live longer, they have better sex. How long was your last orgasm?"
			}
		],
		"animation": "up-and-down"
	},
	"rat": {
		"name": "Subway Rat",
		"text": [{
			"urls": ["webmd"],
			"text": "Hopefully you’re not dying. That’d be a real bummer if you died with so little to show for yourself."
		},
		{
			"urls": ["twitter"],
			"text": "Even I have more social interaction than you do."
		},
		{
			"urls": ["reddit", "4chan", "buzzfeed"],
			"text": "Everyday I manage to avoid rat poison and deadly traps and you can't even steer past click-bait."
		}],
		"animation": "back-and-forth"
	},
	"gosling": {
		"name": "Ryan Gosling",
		"text": [
			{
				"urls": ["okcupid", "tinder"],
				"text": "Hey, gurrrrl."
			},
			{
				"urls": ["netflix"],
				"text": "Hey girl, one of the advantages to being alone is that you can stream all of my movies on Netflix without judgement."
			}],
		"animation": "up-and-down"
	},
	"snitch": {
		"name": "The Golden Snitch",
		"text": [
			{
				"urls": ["harrypotter"],
				"text": "Catch me if you can!"
			}],
		"animation": "back-and-forth"
	}
}

function getMatchText() {
	var characterText = characters[companion_id].text;

    for(var i = 0; i < characterText.length; i++)
    {
    	var matchObject = characterText[i];
    	for(var j = 0; j < matchObject.urls.length; j++)
    	{
    		var url = matchObject.urls[j];
    		if(location.hostname.indexOf(url) > -1)
    		{
    			if(typeof matchObject.text == "string")
	    			return matchObject.text;
	    		else {
	    			return matchObject.text[parseInt(Math.random()*matchObject.text.length+1)];
	    		}
    		}
    	}
    }
    return undefined;
}

function displayCharacter() {
	var IMG_URL = chrome.extension.getURL("images/"+ companion_id + '.png');

	var textToDisplay = getMatchText();
	if(textToDisplay != undefined)
	{
		$("body").append("<div id='character'><span class='tooltip hide'></span><img src='"+ IMG_URL +"'></div>");

		$(".tooltip").html(textToDisplay);
		$(".tooltip").css('opacity', 1);

		/*if (companion_id === "hipster") {
			//animateHipster();
		} else if (companion_id === "bieber") {
			animateBieber();
		} else if (companion_id === "kale") {
			//TBD
		} else if (companion_id === "snitch") {
			animateSnitch();
		}
		else
		{*/
			$("#character img").addClass(characters[companion_id].animation);
	//	}
	}
	
}

function animateHipster() {
	$('#character').animate({
		 opacity: .5,
		height: "50%"
	});
}

function animateBieber() {
  $('#character').toggle(function() {
    $('#character').animate({ bottom: '-=120' }, 1000);
  }, function() {
    $('#character').animate({ bottom: '+=120' }, 1000);
  });
}

function animateSnitch() {
  $('#character').hover(function() {
    $('#character').animate({ bottom: '-=120' }, 1000);
  }, function() {
    $('#character').animate({ bottom: '+=120' }, 1000);
  });
}

jQuery(document).ready(function($) {
	chrome.storage.sync.get("companion", function(data) {

		companion_id = data.companion;

   		displayCharacter(companion_id);
	});
   
}); //document ready




