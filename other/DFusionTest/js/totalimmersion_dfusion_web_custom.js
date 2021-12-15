/******************************************************************************/
/* D'Fusion Web JavaScript Library                                            */
/*                                                                            */
/* This files contains functions that be customized to feet your needs.       */
/*                                                                            */
/* IMPORTANT REMARKS:                                                         */
/* To use this file you have to include                                       */
/* - totalimmersion_dfusion_web_plugin.js                                     */
/* - totalimmersion_dfusion_web_pluginMac.js                                  */
/* - javascript_browser_sniffer.js                                            */
/* - totalimmersion_dfusion_web_config.js                                     */
/* - totalimmersion_dfusion_web.js                                            */
/******************************************************************************/

//ID of the div which contains the plugin. And only the plugin. The div content 
var g_tiDivPluginName = "plugin_dfusion";

// This function is called by tiGenerateDFusionWebHTML if the system is not supported.
// Use this function to display an error message to the end user.
// THE NAME OF THIS FUNCTION MUST NOT BE CHANGED.
function tiDFusionWebNotSupported()
{
}

// This function is called by ExecuteCommand if the function cannot be called on the plugin.
// Use this function to display an error message to the end user.
// THE NAME OF THIS FUNCTION MUST NOT BE CHANGED.
function tiDFusionWebCanFindExecuteCommand()
{
    alert("Cannot find 'ExecuteCommand' function.\nPlease restart your web browser and retry to play the D'Fusion application.");
}

function tiLaunchSetupTest()
{
    var div_plugin = document.getElementById(g_tiDivPluginName);
    div_plugin.innerHTML = "Waiting plug-in installed complet ...";

    setTimeout("tiCheckGeckPluginTimer()",2000);
}

function tiCheckGeckPluginTimer()
{
    if(tiIsInstallNeededForGecko()==false)
    {
        document.getElementById(g_tiDivPluginName).innerHTML = "";
        setTimeout('window.location.reload()', 2000)
        return;
    }
    
    setTimeout('tiCheckGeckPluginTimer()',500);
}

// This function is called by tiGenerateDFusionWebHTML if the plugin need to be (re)installed.
// This function is not used under Internet Explorer but by all other browser (Firefox, ...).
// Use this function to display informations to the end user so it call download the plugin setup.
// THE NAME OF THIS FUNCTION MUST NOT BE CHANGED.
function tiInstallationRequieredForGecko()
{
    var div_plugin = document.getElementById(g_tiDivPluginName);
    div_plugin.innerHTML = "Total Immersion D'Fusion Web Plug-in Installation Required<br><br>";
	if (tiMacOSXSupported()) {
		div_plugin.innerHTML += "Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerNameMacOSX + "\" onclick=\"tiLaunchSetupTest();\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>";
	} else {
		div_plugin.innerHTML += "Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerName + "\" onclick=\"tiLaunchSetupTest();\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>";
	}
    div_plugin.innerHTML += "You have to manually launch it.<br><br>";
    div_plugin.innerHTML += "<br><br>";
}

// This function can only be called under Mozilla Firefox MacOSX.
// Our plugin version detection does not work correctly on this configuration.
// So the version is checked while the plugin is running.
// The plugin asked the web page which version is required.
// If the plugin version is older, it stops and calls this function (defined by g_NeedToUpdateFunc).
// Then your are responsible to do something (change the webpage, remove the plugin by updated
// the content of the current web page, ...) and then inform the end user it will need to update the plugin
// (like what is done in tiInstallationRequieredForGecko).
// If you change the name of this function update the value of g_NeedToUpdateFunc
// in totalimmersion_dfusion_web.js.
function tiDFusionPluginNeedToBeUpdated(version)
{
    var div_plugin = document.getElementById(g_tiDivPluginName);
    div_plugin.innerHTML = "Total Immersion D'Fusion Web Plug-in Installation Required<br><br>";
	if (tiMacOSXSupported()) {
		div_plugin.innerHTML += "Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerNameMacOSX + "\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>";
	} else {
		div_plugin.innerHTML += "Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerName + "\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>";
	}
    div_plugin.innerHTML += "You have to manually launch it.<br><br>";
    div_plugin.innerHTML += "<br><br>";
}

// Function called by the plugin when a camera selection is required.
// The name of this function is passed to the plugin through tiGenerateDFusionWebHTML().
// This function receive an array of string as unique parameter.
// Each string is a camera name.
// To select a camera look at the CamSelected function.
function ChooseCamera()
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
		document.forms['ChooseCamera'].CAMERAS.options[i] = new Option(utf8_decode(arguments[i]),utf8_decode(arguments[i]));
	}
}

// Function called when a camera is called through the webform option generated by ChooseCamera().
// To select you have to execute the CamSelected command with the name of the camera.
function CamSelected(camname)
{
	document.getElementById("InteractionCell").innerHTML = "";
	ExecuteCommand("CamSelected '"+camname+"'");
}

// Function called by the plugin when the scenario is starting.
// The name of this function is passed to the plugin through tiGenerateDFusionWebHTML().
// This function does not receive any parameter.
function ReadyToStart()
{  
    // do what you want here
}

// THE NAME OF THIS FUNCTION MUST NOT BE CHANGED.
function DFUSION_EVENT_Error(status)
{
}

function utf8_decode(utftext)
{
    var string = "";
    var i = 0;
	var c = c1 = c2 = 0;
 
	while ( i < utftext.length )
    {
		c = utftext.charCodeAt(i);
 
        if (c < 128)
        {
            string += String.fromCharCode(c);
			i++;
		}
		else if((c > 191) && (c < 224))
        {
			c2 = utftext.charCodeAt(i+1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		}
		else
        {
			c2 = utftext.charCodeAt(i+1);
			c3 = utftext.charCodeAt(i+2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
 
	return string;
}

//-- end of file --