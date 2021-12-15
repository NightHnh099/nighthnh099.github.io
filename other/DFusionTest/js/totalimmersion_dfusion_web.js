/******************************************************************************/
/* D'Fusion Web JavaScript Library                                            */
/*                                                                            */
/* IMPORTANT REMARKS:                                                         */
/*   - To use this file you have to include javascript_browser_sniffer.js     */
/******************************************************************************/

////////////////////////////////////////////////////////////////////////////////
// global variables

// error
var g_tiError = "";
// activate debug
var g_tiDebug = false;
//ID of the ActiveX
var g_tiPluginName = "";
// enable Mac OS X support ?
var g_tiMacOSXEnabled = false;
// disable static version check for Firefox under MacOSX ?
var g_tiDisableStaticVersionDetectionFirefoxMacOSX = false;
// Does the TI logo appear?
var g_tiLogoEnabled = true;
// function used to indicate the plugin need to be update (only used by Firefox under MacOSX)
var g_NeedToUpdateFunc = "tiDFusionPluginNeedToBeUpdated";


////////////////////////////////////////////////////////////////////////////////
// errors strings array
// some error messages
var TI_ERR_NOT_SUPPORTED = "D'Fusion Web is not supported by this operating system or web browser.";
var TI_ERR_EMBED_FAILED = "<p>Failed to start D'Fusion Web.</p>";


////////////////////////////////////////////////////////////////////////////////
// Main functions

/*****************************************************************************/
/* tiGenerateDFusionWebHTML:                                                 */
/*                                                                           */
/* Check the operating system, the browser and the plugin version.           */
/* If everything is ok HTML is generated to embed the DFusionWeb plugin      */
/* into the web page.                                                        */
/* With gecko compatible browser is the plugin is not installed or a newer   */
/* version is present online instead of embedding the plugin this function   */
/* generate HTML code to install the plugin.                                 */
/*                                                                           */
/* Returns is successful                                                     */
/*****************************************************************************/
function tiGenerateDFusionWebHTML(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	g_tiPluginName = iPluginName;
    if (tiOperatingSystemSupported()==false) {
        g_tiError = TI_ERR_NOT_SUPPORTED;
        return false;
    }
    
    if (tiWindowsSupported() && tiInternetExplorer()) {
        return tiGenerateDFusionWebHTML_Object(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID);
    }
    
    if (tiGecko()) {
    
        if(tiCheckInstallatioNeedForGecko()==false)
        {
            return tiGenerateDFusionWebHTML_Embed(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID);
        } else
		{
			return true;
		}
    }
    
    g_tiError = TI_ERR_NOT_SUPPORTED;
    return false;
}


////////////////////////////////////////////////////////////////////////////////
// functions specific to Internet Explorer


/*****************************************************************************/
/* tiGenerateDFusionWebHTML_Object:                                          */
/*                                                                           */
/* Generates the HTMl code to embed the DFusionWeb plugin into               */
/* Microsoft Internet Explorer.                                              */
/*                                                                           */
/* Returns is successful                                                     */
/*****************************************************************************/
function tiGenerateDFusionWebHTML_Object(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine,iChooseCameraJSFunc,iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	var html = "";
	html += "<OBJ" + "ECT\n";
	html += "  CLASSID=\"CLSID:" + g_tiIEActiveXClassID + "\"\n";
	html += "  ID=\"" + iPluginName + "\" WIDTH=\"" + iWidth + "\" HEIGHT=\"" + iHeight + "\"\n";
	html += "  CODEBASE=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerName + "#version="+g_tiActivexVersion+"\">\n";
	html += "  <PARAM NAME=\"TEXT\" VALUE=\"TOTO\">\n";
	html += "  <PARAM NAME=\"PLAYERID\" VALUE=\"" + iPlayerID + "\">\n";
	html += "  <PARAM NAME=\"COMMANDLINE\" VALUE=\"" + iCommandLine + "\">\n";
	html += "  <PARAM NAME=\"ChooseCamFunc\" VALUE=\"" + iChooseCameraJSFunc + "\">\n";
	html += "  <PARAM NAME=\"ActionWhenRenderingStart\" VALUE=\"" + iActionWhenStartJSFunc + "\">\n";
	html += "  <PARAM NAME=\"IsUsingJSFuncToSelCam\" VALUE=\"" + iUseJSToSelectCam + "\">\n";
	html += "  <PARAM NAME=\"SplashID\" VALUE=\"" + iSplashID + "\">\n";
	if (g_tiLogoEnabled) {
		html += "  <PARAM NAME=\"tiLogoAppear\" VALUE=\"TRUE\">\n";
	} else {
		html += "  <PARAM NAME=\"tiLogoAppear\" VALUE=\"FALSE\">\n";
	}
	//html += TI_ERR_EMBED_FAILED + "\n";
	
	
	
	html += "</OBJ" + "ECT>\n";
	
	
	if (g_tiDebug) {
		alert("tiGenerateDFusionWebHTML_Object: \n\n" + html);
	}
	
	document.write(html);
	
	return true;
}

function tiInternetExplorer()
{
    return is_ie6up;
}


////////////////////////////////////////////////////////////////////////////////
// functions specific to Gecko based web browser (Firefox & co)


/*****************************************************************************/
/* tiGenerateDFusionWebHTML_Embed:                                           */
/*                                                                           */
/* Generates the HTMl code to embed the DFusionWeb plugin in a gecko         */
/* compatible web browser.                                                   */
/*                                                                           */
/* Returns is successful                                                     */
/*****************************************************************************/
function tiGenerateDFusionWebHTML_Embed(iPluginName, iWidth, iHeight, iPlayerID, iCommandLine, iChooseCameraJSFunc, iActionWhenStartJSFunc, iUseJSToSelectCam, iSplashID)
{
	var html = "";
	html += "<EMB" + "ED\n";

    if (navigator.appVersion.indexOf("Safari")!=-1
        && navigator.appVersion.indexOf("Mac OS X 10_6")!=-1){
        html += "  TYPE=\"" + g_tiDFusionWebMimeTypeS64 + "\"\n";
    }else{
        html += "  TYPE=\"" + g_tiDFusionWebMimeType + "\"\n";
    }
    
	html += "  WIDTH=\"" + iWidth + "\" HEIGHT=\"" + iHeight + "\"\n";
	html += "  ID=\"" + iPluginName + "\" NAME=\"" + iPluginName + "\"\n";  		
	html += "  PLAYERID=\"" + iPlayerID + "\" COMMANDLINE=\"" + iCommandLine + "\"\n";  		
	html += "  CHOOSECAMFUNC=\"" + iChooseCameraJSFunc + "\" ACTIONWHENRENDERINGSTART=\"" + iActionWhenStartJSFunc + "\"\n";  		
	html += "  ISUSINGJSFUNCTOSELCAM=\"" + iUseJSToSelectCam + "\"\n";
	html += "  SPLASHID=\"" + iSplashID + "\"\n";
	if (g_tiLogoEnabled) {
		html += "  TILOGOAPPEAR=\"TRUE\"\n";
	} else {
		html += "  TILOGOAPPEAR=\"FALSE\"\n";
	}
	html += "  NEEDUPDATEFUNC=\"" + g_NeedToUpdateFunc + "\"\n";
	html += "  TEXT=\"TOTO\"\n";
    html += ">\n";  		
    html += "  <NOEMBED>\n";  		
	html += "    " + TI_ERR_EMBED_FAILED + "\n";  		
    html += "  </NOEMBED>\n";  		
	html += "</EMB" + "ED>\n";

	if (g_tiDebug) {
		alert("tiGenerateDFusionWebHTML_Embed:\n\n" + html);
	}

	document.write(html);

	// force the focus of the plugin
	if (document.embeds && document.embeds[g_tiPluginName]) {
		document.embeds[g_tiPluginName].focus();
	}	
	
	return true;
}


/*****************************************************************************/
/* tiGecko:                                                                  */
/*                                                                           */
/* Returns true if the current browser is gecko compatible                   */
/*****************************************************************************/
function tiGecko()
{
    return ((is_gecko && tiWindowsSupported()) || tiMacOSXSupported());
}

/*****************************************************************************/
/* tiDFusionPluginForGeckoHere:                                              */
/*                                                                           */
/* Return non null value if the DFusionWeb plug-in has been loaded.          */
/*                                                                           */
/* It means the DFusionWeb plug-in is present in theplugin directory         */
/* (or any alternative directory) of the browser.                            */
/*                                                                           */
/* The object return is a plug-in from the navigator.plugins array.          */
/*****************************************************************************/
function tiDFusionPluginForGeckoHere()
{
  var pluginname = "npdfusionwebfirefox";
  var mimetype = g_tiDFusionWebMimeType;
  if (tiMacOSXSupported()) {
        if (navigator.appVersion.indexOf("Safari")!=-1
            && navigator.appVersion.indexOf("Mac OS X 10_6")!=-1){
            pluginname = "dfusionwebplugins64";
            mimetype = g_tiDFusionWebMimeTypeS64;
        }
        else
            pluginname = "dfusionwebplugin";
  }
  
  // here we go through the plug-in loaded by the bowser
  // to look for the virtools one.
  
  for(i=0;i<navigator.plugins.length;i++) {
    // the current plug-in
    myplug = navigator.plugins[i];
    // first we check the name of the plug-in
    index = myplug.filename.lastIndexOf('\\');
    if (index!=-1) {
      sub = myplug.filename.substring(index+1,myplug.filename.length);
      if (sub.toLowerCase().indexOf(pluginname)!=0) {
        continue;
      }
    } else if (myplug.filename.toLowerCase().indexOf(pluginname)!=0) {
      continue;
    }
    
    // now we check the mime type supported by the plug-in  
    for(j=0;j<myplug.length;j++) {
      if(myplug[j].type==mimetype) {
        return myplug;
      }
    }
    
  }
  	
  // the plug-in has not been found
  return null;
}


function tiIsInstallNeededForGecko()
{
    navigator.plugins.refresh();
    var plugin = tiDFusionPluginForGeckoHere();
    if (plugin==null) {
		if (g_tiDebug) {
			alert("D'Fusion Web plug-in DLL not found");
		}
        return true;
    }

	// if we are under MacOSX and Firefox we did not check the version
	// the version check will be done by the plugin itself (at runtime)
	if (g_tiDisableStaticVersionDetectionFirefoxMacOSX && tiMacOSXSupported() && is_fx) {
		return false;
	}
	
    return tiIsOnlineVersionNewerForGecko(plugin);
}

function tiDFusionPluginForGeckoVersion(plugin)
{
    var description = plugin.description;
    var index = description.lastIndexOf("(");
    if(index == -1) {
        return "";
    }
    
    var index2 = description.lastIndexOf(")");
    var version = description.substr(index+1,index2-index-1);

    return version;
}

function tiIsOnlineVersionNewerForGecko(plugin)
{
    // description must looks like "D'Fusion Web Plugin (1.60.5553.0)"
    // we want to retrieve 1.60.5553
    
    var version = tiDFusionPluginForGeckoVersion(plugin);
    
	return tiIsOnlineVersionNewerForGecko2(version);
}

function tiIsOnlineVersionNewerForGecko2(version)
{
    var index = 0;
    var index2 = version.indexOf(".",index);
    if(index2 == -1) {
		if (g_tiDebug) {
			alert("Current version is not valid (1).");
		}
        return true;
    }
    var maj = version.substr(index,index2-index);
	maj = parseInt(maj);
	if (isNaN(maj)) {
		if (g_tiDebug) {
			alert("Current version is not valid (2).");
		}
        return true;
	}

    index=index2+1;
    index2 = version.indexOf(".",index);
    if(index2 == -1) {
		if (g_tiDebug) {
			alert("Current version is not valid (3).");
		}
        return true;
    }
    var min = version.substr(index,index2-index);
	min = parseInt(min);
	if (isNaN(min)) {
		if (g_tiDebug) {
			alert("Current version is not valid (4).");
		}
        return true;
	}

    index=index2+1;
    index2 = version.indexOf(".",index);
	var rev = 0;
	var build = 0;
    if(index2 == -1) {
		rev = version.substr(index);
		rev = parseInt(rev);
		if (isNaN(rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (5).");
			}
			return true;
		}
    } else {
	    rev = version.substr(index,index2-index);
		rev = parseInt(rev);
		if (isNaN(rev)) {
			if (g_tiDebug) {
				alert("Current version is not valid (6).");
			}
			return true;
		}
    
		index=index2+1;
		build = version.substr(index);
		build = parseInt(build);
		if (isNaN(build)) {
			build = 0
		}
	}

	if (tiMacOSXSupported())
	{
		if (maj< g_tiGeckoLastVersionMajMacOSX ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min < g_tiGeckoLastVersionMinMacOSX)) ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min == g_tiGeckoLastVersionMinMacOSX) && (rev < g_tiGeckoLastVersionRevMacOSX)) ||
			((maj == g_tiGeckoLastVersionMajMacOSX) && (min == g_tiGeckoLastVersionMinMacOSX) && (rev == g_tiGeckoLastVersionRevMacOSX) && (build < g_tiGeckoLastVersionBuildMacOSX)))
		{
			if (g_tiDebug) {
				alert("Online version is newer.");
			}
			return true;
		}
	}
	else
	{
		if (maj< g_tiGeckoLastVersionMaj ||
			((maj == g_tiGeckoLastVersionMaj) && (min < g_tiGeckoLastVersionMin)) ||
			((maj == g_tiGeckoLastVersionMaj) && (min == g_tiGeckoLastVersionMin) && (rev < g_tiGeckoLastVersionRev)) ||
			((maj == g_tiGeckoLastVersionMaj) && (min == g_tiGeckoLastVersionMin) && (rev == g_tiGeckoLastVersionRev) && (build < g_tiGeckoLastVersionBuild)))
		{
			if (g_tiDebug) {
				alert("Online version is newer.");
			}
			return true;
		}
	}
    return false;
}

function tiCheckInstallatioNeedForGecko()
{
    if(!tiIsInstallNeededForGecko()) {
        return false;
    }
    
    document.write("Total Immersion D'Fusion Web Plug-in Installation Required<br><br>");
	if (tiMacOSXSupported()) {
		document.write("Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerNameMacOSX + "\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>");
	} else {
		document.write("Click <a href=\"" + g_tiURLPrefix + g_tiInstallerPath + g_tiInstallerName + "\">here</a> to download the D'Fusion Web Plug-in setup.<br><br>");
	}
    document.write("You have to manually launch it.<br><br>");
    document.write("<br><br>");                
    
    return true;
}	

function tiCheckJavascriptCommandForGecko()
{
	return (document.embeds && document.embeds[g_tiPluginName] && document.embeds[g_tiPluginName].ExecuteCommand)?true:false;
}

function tiDFusionPluginNeedToBeUpdated(version)
{
}

////////////////////////////////////////////////////////////////////////////////
// utility functions


/*****************************************************************************/
/* tiOperatingSystemSupported:                                               */
/*                                                                           */
/* Returns true if the operating system is supported.                        */
/*****************************************************************************/
function tiOperatingSystemSupported()
{
	return (tiWindowsSupported() || tiMacOSXSupported());
}


/*****************************************************************************/
/* tiWindowsSupported:                                                       */
/*                                                                           */
/* Returns true if the current version of Microsoft Windows is supported.    */
/*****************************************************************************/
function tiWindowsSupported()
{
	return is_win32;
}

function tiMacOSXSupported()
{
	return g_tiMacOSXEnabled && is_mac && is_macosx && (is_macintel || (is_macppc==false && is_maciphoneos==false));
}
//-- end of file --