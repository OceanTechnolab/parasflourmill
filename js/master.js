// JavaScript Document
// this is file code created by "Dipan Chokshi" on 3rd June 2008.
var ext;

function _validate()
{
	var arg = arguments;	
	var formName = arg[0];
	for(i=1;i<arg.length;i+=3)
	{
		var id = arg[i];
		var para = arg[i+1];
		var msg = arg[i+2];
		switch(para)
		{
			case "validateBlank":  // for validating blank 
								 if(!validateBlank(id,msg))
										return; 
									break;
			case "validateRadio" : // for validation of Radio button whether checked or not
								 if(!validateRadio(id,msg))
										return; 
									break;

			case "validateCheckBox" : // for validation of Check box whether checked or not
								 if(!validateCheckBox(id,msg))
										return; 
									break;
			case "validateCheckBoxGroup" :// for validation of Check boxes whether one check box is checked or not
									 if(!validateCheckBoxGroup(id,msg))
										return; 
									break; 									
			case "validatePass" : // for validation password and confirm password are same or not
								  // in this pass both controls name by conatinating '#' both field name 
								  // e.g. one text box name is 'pwd'  and other is 'cnfPwd' then pass 'pwd#cnfPwd'
								 if(!validatePass(id,msg))
										return; 
									break;									
			case "validateEmail" : // for validating email id
								 if(!validateEmail(id,msg))
										return; 
									break;									
			case "validateUrl" : // for validating url
								 if(!validateUrl(id,msg))
										return; 
									break;				
			case "validateFile" : // for validating File Extension
								 if(!validateFile(id,msg))
										return; 
									break;				
			case "validateMultipleCombo" : // for validating Multiple Selction in Select box
								 if(!validateMultipleCombo(id,msg))
										return; 
									break;				
			case "validateNumber" : // for validating number
								if(!validateNumber(id,msg))
										return; 
									break;					
						
		}// switch case ends here....
	}	//for loop ends here
	return true;
}
function validateBlank(id,msg)
{	
//	alert(id+":"+document.getElementById(id).value);
	if(trim(document.getElementById(id).value)=="")
	{
		alert(msg);
		document.getElementById(id).value = trim(document.getElementById(id).value);
		document.getElementById(id).focus();
		return false;
	}
	else
	{
			if(document.getElementById(id).type != "file" && document.getElementById(id).type != "FILE" && document.getElementById(id).type != "select-multiple") 
				document.getElementById(id).value = trim(document.getElementById(id).value);

			return true;
	}
}
function validateRadio(id,msg)
{
	var rObj = document.getElementsByName(id)	
	var flg = 0;
	for(j=0;j<rObj.length;j++)
	{
		if(rObj[j].checked)
			flg++;
	}
	if(!flg)
	{
		alert(msg);		
		return false;
	}
	else
		return true;
	
}
function validateCheckBox(id,msg)
{
	
	var chkObj = document.getElementById(id);	
//	alert(chkObj.checked);
	if(!chkObj.checked)
	{	
		alert(msg);		
		return false;
	}
	else
		return true;
	
}
function validateCheckBoxGroup(id,msg)
{
	var rObj = document.getElementsByName(id)	
	var flg = 0;
	for(j=0;j<rObj.length;j++)
	{
		if(rObj[j].checked)
			flg++;
	}
	if(!flg)
	{
		alert(msg);		
		return false;
	}
	else
		return true;
	
}
function validatePass(id,msg)
{
	var pwdArr;
	pwdArr = id.split("#");
	var pwd = document.getElementById(pwdArr[0]).value;
	var cnfpwd = document.getElementById(pwdArr[1]).value;
	if(pwd != cnfpwd)
	{	
		alert(msg);		
		document.getElementById(pwdArr[1]).focus();
		return false;
	}
	else
		return true;
	
}
function validateEmail(id,msg)
{
	var email = document.getElementById(id);
	 var str=trim(email.value);
	 var filter=/^.+@.+\..{2,3}$/ 
	 if (filter.test(str))
	 {
		 return true;
	  }
	else
	 { 
	 	alert(msg);
		email.focus();
		return false;
	 }	
}
function validateUrl(id,msg){
	var theUrl = document.getElementById(id).value;
	if(theUrl || theUrl == "")
	{
		  if(theUrl.match(/^(http|ftp)\:\/\/\w+([\.\-]\w+)*\.\w{2,4}(\:\d+)*([\/\.\-\?\&\%\#]\w+)*\/?$/i) ||
			 theUrl.match(/^mailto\:\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w{2,4}$/i)){
			return true; // url is valid
		  } else {
			  alert(msg);
			  document.getElementById(id).focus();
			return false; // url is not valid
		  }
	}
	else
		return true;
}
function validateNumberReg(form_name, element_name) {
	return (document.forms[form_name].elements[element_name].value == '') ? false : new RegExp('^-?[0-9]*\\.?[0-9]*$').test(document.forms[form_name].elements[element_name].value);
	//testRegExp(form_name, element_name, '^-?[0-9]*\\.?[0-9]*$');
}
function testRegExp(form_name, element_name, re) {
	return new RegExp(re).test(document.forms[form_name].elements[element_name].value);
}
/*
//	validation with regular expression

function validateFile(id,msg)
{
	var fileObj = document.getElementById(id);	
	var extVal = GetExt(fileObj.value);	
	var path = fileObj.value;
	var str = "";

	for(i=0;i<ext.length;i++)
	{
		var bar = i+1 != ext.length ? "|":"";	
	//	alert(bar);
		str += "(\."+ext[i]+")" + bar;
	}
	//alert(str);
	RgExp= new RegExp(str+"$");

	if (!RgExp.test(path))
	{
		alert(msg);
		return false;
	}

	return true;
		
//	RgExp= new RegExp("(\.png)|(\.jpg)|(\.gif)|(\.jpe)|(\.jpeg)|(\.bmp)$");
}*/

//	validation WITHOUT regular expression

function validateFile(id,msg)
{
	var fileObj = document.getElementById(id);	
	//alert(fileObj+"::"+fileObj.type);
	if(fileObj.type != "hidden")	
	{
		var extVal = GetExt(fileObj.value);	
		var path = fileObj.value;
		var str = "";
		extn = path.substr(path.lastIndexOf("."));
		extn = extn.toLowerCase();
		validate_str  = ext
		//alert(ext);
		if(validate_str.indexOf(extn)<0)
		{
			alert(msg)
			return false;
		}
	}
return true;
}
function validateMultipleFiles(name,msg)
{
	var fileObj = document.getElementsByName(name);	
	for(i=0;i<fileObj.length;i++)
	{
		if(fileObj[i].value)	
		{
			var extVal = GetExt(fileObj[i].value);	
			var path = fileObj[i].value;
			var str = "";
			extn = path.substr(path.lastIndexOf("."));
			extn = extn.toLowerCase();
			validate_str  = ext
			//alert(ext);
			if(validate_str.indexOf(extn)<0)
			{
				alert(msg)
				fileObj[i].focus();
				return false;
			}
		}
	}
return true;
}
function validateMultipleCombo(id,msg)
{
	if(!trim(document.getElementById(id).value))
	{
		alert(msg);
		document.getElementById(id).value = trim(document.getElementById(id).value);
		document.getElementById(id).focus();
		return false;
	}
	else
		return true;
}
function validateNumber(id,msg)
{
	if(isNaN(trim(document.getElementById(id).value)) || trim(document.getElementById(id).value) == "")
	{
		alert(msg);
		document.getElementById(id).value = trim(document.getElementById(id).value);
		document.getElementById(id).focus();
		return false;
	}
	else
		return true;
}
function trim(s) 
{
	while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
	{ s = s.substring(1,s.length); }
	while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || (s.substring(s.length-1,s.length) == '\r'))
	{ s = s.substring(0,s.length-1);}
	return s;
}

// Extra Function
function passwordValidator(str,limit)
{
var input = str;
var reD = /\d+/;
var reLow = /[a-z]+/;
var reUp = /[A-Z]+/;
var validDigit = reD.test(input);
var validLow = reLow.test(input);
var validUp = reUp.test(input);
//alert(input.length+"::"+validDigit+":validLow:"+validLow+":validUp:"+validUp);
var msg = "";
flg=0;
if(input.length<limit)
{flg++;
msg += "Password Must be atleast "+limit+" characters long\n";

}
if(!validLow)
{    
flg++;
msg +="Password Must Contain atleast one Lower Case Letter\n"; 
}

if(!validUp)
{    
flg++;
msg +="Password Must Contain atleast one Upper Case Letter";
}

if(flg > 0){ alert(msg);return false;}

return true;
}    

function numOnly(field, event)
{
 var key,keychar;

 if (window.event)
   key = window.event.keyCode;
 else if (event)
    key = event.which;
 else
    return true;
 
 keychar = String.fromCharCode(key);

var valid_str="0123456789.";
  // then check for the numbers 

 if ((key==null) || (key==0) || (key==8) || 
     (key==9) || (key==13) || (key==27) )
   return true;

  else if ((valid_str.indexOf(keychar) > -1))
         {
           window.status = "";
           return true;
         }
       else
         {
           window.status = "Field accepts Alphabetical characters only"; 
           return false;
         }
	return false;	 
 }
function charsOnly(field, event)
{
 var key,keychar;

 if (window.event)
   key = window.event.keyCode;
 else if (event)
    key = event.which;
 else
    return true;
 
 keychar = String.fromCharCode(key);

var valid_str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  // then check for the numbers 

 if ((key==null) || (key==0) || (key==8) || 
     (key==9) || (key==13) || (key==27) )
   return true;

  else if ((valid_str.indexOf(keychar) > -1))
         {
           window.status = "";
           return true;
         }
       else
         {
           window.status = "Field accepts Alphabetical characters only"; 
           return false;
         }
	return false;	 
 }
 
 function GetExt(str) 
 {
  /*var limage_name =str.split("\\");		 
		   var arr = limage_name[limage_name.length -1].split(".");
		   return arr[1];	  
		   */
		//   alert(str.indexOf(".")+"::"+str.indexOf("\\"));
//		alert(str.lastIndexOf("."));
/*if(str.indexOf(".") != -1 || str.indexOf("\\") != -1)
{
shortName = str.match(/[^\/\\]+$/);///(.*)\/([^\/\\]+)(\.\w+)$/
alert(shortName);

splitName = str.split(".");
fileType = typeof(splitName[1]) != "undefined" ? splitName[1] : "noval";
return fileType = fileType.toLowerCase();		   
}
else if(str != "")
	return "noval";
	*/
var st = str.lastIndexOf(".");		
st = st ? st+1:st;
var myext = str.substr(st);
return myext = myext.toLowerCase();

 }
function email_validate(val)
{
			var str=Trim(val);
			 var filter	=	/^.+@.+\..{2,3}$/ 
			 if (filter.test(str))
			 {}
			else
			 {       
				 return false;
			 }	
	return true;		 
}

//document.oncontextmenu=function() { return false; } // for disabling right click..
function FileLock(Doc) //to Restrict File Field Editing
{	
	for(f=0;f<Doc.forms.length;f++)
	{
		Elems=Doc.forms[f].elements;
		for(i=0;i<Elems.length;i++)
		{
			if(Elems[i].type=="file")
			{	
				Elems[i].onkeydown= function (){return false;}
				Elems[i].onpaste= function (){return false;}
			}
		}
	}
}
function setBackFire()
{
	var len = Math.abs(document.forms[0].elements.length);

	for(i=0;i<len;i++)
	{
		var id = document.forms[0].elements[i].id;
		var obj = document.getElementById(id)
		var type = new String(obj.type);
		type = type.toLowerCase();
		var tag = new String(obj.tagName);
		tag = tag.toLowerCase();
		
		if(tag == "select")
				obj.selectedIndex = 0;
		else if(type != "button" && type != "hidden" && type != "reset" && type != "submit")
		{
			if(type == "checkbox" )
				obj.checked = false;
			else 	
				obj.value = "";
		}	
	}
}

function checkEnter(evt,idbtn)
{ //e is event object passed from function invocation

var characterCode; //literal character code will be stored in this variable

	 if ("which" in evt)
  {// NN4 & FF &amp; Opera
    keyCode=evt.which;
  } else if ("keyCode" in evt)
  {// Safari & IE4+
    keyCode=evt.keyCode;
  } else if ("keyCode" in window.event)
  {// IE4+
    keyCode=window.event.keyCode;
  } else if ("which" in window.event)
  {
    keyCode=evt.which;
  } else  {    alert("the browser don't support");  }
  
	if(keyCode == 13)
	{ 
		document.getElementById(idbtn).click();
		return false;	
	}
	else
		return true
}

function textCounter(field,cntfield,maxlimit) 
{
if (field.value.length > maxlimit) // if too long...trim it!
field.value = field.value.substring(0, maxlimit);
// otherwise, update 'characters left' counter
else
cntfield.value = maxlimit - field.value.length;
}
function terms(pg)
{
	var hand = window.open(pg,"winName","width=700,height=800","");
	hand.focus();
}

function setMenuScript(obj,parentDiv,flg)
{ //  alert(obj+","+parentDiv+","+flg)
	var subDiv = "SubMenu";
	hideMenu(parentDiv,subDiv);
	var disp = flg > 0 ? "" : "none";
	if(obj)
		obj.style.display = disp;
}	 
function hideMenu(parentDiv,subDiv)
{//alert(parentDiv+","+subDiv)
	var mainDivObj = document.getElementById(parentDiv);
	var len = mainDivObj.getElementsByTagName("div").length;
 	for(i=1;i<=len;i++)
 	{
		var id = "SubMenu"+i;
		var dObj = document.getElementById(id);
		if(dObj)
			dObj.style.display = "none";
	}
}
