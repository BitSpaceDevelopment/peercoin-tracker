//main JQuery function
$(document).ready(function() {

	// Grab the api key from storeage.
	var api_key = localStorage["api"];

	if (api_key == "" || !(api_key) ){
		
		// Output the error
		$( "div.user_output" ).append("<h4 class='no_api'>Please enter your API key</h4>");


	} else {

		// Remove the error message
		$("h4.no_api").remove();

		// Use the api key to make the query to the server
		var url = "https://ppcoin.d7.lt/api.php?api_key=" + api_key;

		var data =$.getJSON(url, function(data){
			var items = [];

			$( "div.user_output" ).append( "<section class='user' >" +
			"<h3> User ID: " + data.user.id + "</h3>" +

			"<table class='table'>" +
			    "<tr>" +
			    	"<td>Balance</td>" +
			    	"<td><b>" + data.user.balance + "</b></td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Unconfirmed Rewards</td>" +
			    	"<td>" + data.user.unconfirmed_rewards + "</td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Total Earned</td>" +
			    	"<td>" + data.user.total_earned + "</td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Hash Rate</td>" +
			    	"<td>" + data.user.hashrate + "</td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Round Share</td>" +
			    	"<td>" + data.user.roundshares + "</td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Round Estimate</td>" +
			    	"<td>" + data.user.roundestimate + "</td>" + 
			    "</tr>" +
			    "<tr>" +
			    	"<td>Blocks Found</td>" +
			    	"<td>" + data.user.blocksfound + "</td>" + 
			    "</tr>" +
			"</table>" +

			"</section>");

			// Create the worker section
			$( "div.worker_output" ).append( "<section class='worker'>" +
				"<h3> Workers</h3>" + 
				"<table class='table worker_table'>" + 
					"<tr>" + 
        				"<th>Username</th>" + 
        				"<th>Active</th>" +
        				"<th>Hashrate</th>" +
        				"<th>Shares</th>" +
        				"<th>(stale/dupe/other)</th>" +
        			"</tr>" +
        			"</table>" + 
				"</section>" );

			// Loop through the workers and make a snazzy table
	        $.each( data.user.workers, function( key, val ) {
	        	$( "table.worker_table" ).append(
					    "<tr>" +
					    	"<td>" + val.username + "</td>" + 
					    	"<td>" + val.active + "</td>" + 
					    	"<td>" + val.hashrate + "</td>" + 
					    	"<td>" + val.shares + "</td>" + 
					    	"<td>" + val.rejects.stale + "/" + val.rejects.dupe + "/" + val.rejects.other + "</td>" + 
					    "</tr>");
	        });

			// Close the worker output
			$( "div.pool_output" ).append( "<section class='pool'>" +
				"<h3>" + data.pool.host[0] + "</h3>" +
					"<table class='table'>" +
					    "<tr>" +
					    	"<td>Hashrate</td>" +
					    	"<td>" + data.pool.hashrate + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Difficulty</td>" +
					    	"<td>" + data.pool.difficulty + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Block Value</td>" +
					    	"<td>" + data.pool.blockvalue + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Block Height</td>" +
					    	"<td>" + data.pool.blockheight + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Blocks Found</td>" +
					    	"<td>" + data.pool.blocksfound + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Time per block</td>" +
					    	"<td>" + data.pool.timeperblock + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Round Duration</td>" +
					    	"<td>" + data.pool.roundduration + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Round Shares</td>" +
					    	"<td>" + data.pool.roundshares + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Active Users</td>" +
					    	"<td>" + data.pool.activeusers + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Active Workers</td>" +
					    	"<td>" + data.pool.activeworkers + "</td>" + 
					    "</tr>" +
					    "<tr>" +
					    	"<td>Last Update</td>" +
					    	"<td>" + data.pool.lastupdate + "</td>" + 
					    "</tr>" +
					"</table>" +
				"</section>" );


			//  Loop through the blocks and create the blocks tab
			$( "div.block_output" ).append( "<section class='block'>" +
				"<h3>Blocks</h3>" + 
				"<table class='table block_table'>" + 
					"<tr>" + 
        				"<th>Height</th>" + 
        				"<th>Timestamp</th>" +
        				"<th>Vlaue</th>" +
        				"<th>Finder</th>" +
        				"<th>Reward</th>" +
        			"</tr>" +
        			"</table>" + 
				"</section>" );

			$.each( data.pool.blocks, function( key, val ) {
	        	$( "table.block_table" ).append(
					    "<tr>" +
					    	"<td>" + val.height + "</td>" + 
					    	"<td>" + val.timestamp + "</td>" + 
					    	"<td>" + val.value + "</td>" + 
					    	"<td>" + val.finder + "</td>" + 
					    	"<td>" + val.yourreward + "</td>" + 
					    "</tr>");
	        });
	    });
	}
});

// Add an exent listern to external links
document.addEventListener("DOMContentLoaded", function() {

    var anchors = document.querySelectorAll(".ext");
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener("click", function(event) {
    		LaunchURL(event.currentTarget.href);
			event.preventDefault();
        });
    }

    // Open the external link in a new tab
    function LaunchURL(oURL) {
        var launchType = localStorage["LS_LaunchType"];           
            switch (launchType) {
                case "TN":
                    chrome.tabs.create({ url: oURL });
                    break;
                case "WN":
                    chrome.windows.create({ url: oURL });
                    break;
                default:
                    chrome.tabs.create({ url: oURL });
                    break;
            }
        }
});