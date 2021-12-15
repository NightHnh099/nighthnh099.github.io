/******************************************************************************/
/* D'Fusion Web JavaScript Library                                            */
/*                                                                            */
/* IMPORTANT REMARKS:                                                         */
/*   - To use this file you have to include totalimmersion_dfusion_web.js     */
/******************************************************************************/

function ExecuteCommand(command)
{
	if (document.embeds && document.embeds[g_tiPluginName]) {
		if (document.embeds[g_tiPluginName].ExecuteCommand) {	
			document.embeds[g_tiPluginName].ExecuteCommand(command);
			return true;
		} else {
			alert("Cannot find 'ExecuteCommand' function.\nPlease restart your web browser and retry to play the D'Fusion application.");
			return false;
		}
	} 
	
	if (document.getElementById) {
		document.getElementById(g_tiPluginName).excecuteCommand(command);
		return true;
	}
	
	return false;
}

function CreateOptions()
{    
	var SelectFormHtml = "";
	SelectFormHtml += "<FORM name=\"ChooseCamera\">";
	SelectFormHtml += "  <SELECT  NAME=\"CAMERAS\">";
	SelectFormHtml += "  </SELECT>";
	SelectFormHtml += "  <input type=button value=\"camera selected\" onclick=CamSelected(this.form.CAMERAS.options[this.form.CAMERAS.selectedIndex].value)>";
	SelectFormHtml += "</FORM>";
	

	document.getElementById("InteractionCell").innerHTML = SelectFormHtml;
	for (var i = 0; i < arguments.length; i++) 
	{
		document.forms['ChooseCamera'].CAMERAS.options[i] = new Option(arguments[i],arguments[i]);
	}
}


function CamSelected(camname)
{
	document.getElementById("InteractionCell").innerHTML = "";
	ExecuteCommand("CamSelected '"+camname+"'");
}
function goFullScreen()
{
	ExecuteCommand("GoFullScreen");
}

function MakeKeystrokeActions()
{
	for (var i = 0; i < arguments.length; i++) 
	{
		ExecuteCommand("PLAYWITHKEY '"+arguments[i]+"'");
	}
}
//-- end of file --