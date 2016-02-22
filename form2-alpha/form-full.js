//Disclaimer: this is some of the worst code I have ever written, it will be rewritten given tool use.

var main, form, warnTitle, list, ilist, listArr, oldEditKey;
var main = $("#main");
var files = {};
//?$$$$$
//tempFunc = function(x) {console.log(x,"temp");}
//$.post("https://script.google.com/macros/s/AKfycbwaaNIG1tZXJz26-7FWZIQG1HeMnyPPlRs4D0S6hx-JXoN9bVo/exec?callback=tempFunc",{data:'hi'})
//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$



//var submitFunc = "$('#submitText').text('Loading, please wait - this may take a while especially if you are submitting a file.').attr('style','color:black;font-weight:normal;');google.script.run('processForm', this.parentNode, 'formResp')";
var submitFunc = function (evt) {
  evt.preventDefault();

  $('#submitText').text('Loading, please wait - this may take a while especially if you are submitting a file.').attr('style','color:black;font-weight:normal;');
  google.script.run('processForm', this.parentNode, 'formResp');
  return;
}
var resubmitFunc = "$('#submitText').text('Loading, please wait - this may take a while especially if you are submitting a file.').attr('style','color:black;font-weight:normal;');google.script.run('reprocessForm', this.parentNode, 'formResp')";
var google = {script: {}};
google.script.run = function (gscript, data, callback) {
  console.log(data, $(data));
  data = $(data).serializeArray();
  data.push({name: 'funcToCall', value: gscript});
  // $.each(files, function(key, value) {
  //    data.push({name:'file', value:value});
  // });
  console.log(data);
  $.post("https://script.google.com/macros/s/AKfycbwaaNIG1tZXJz26-7FWZIQG1HeMnyPPlRs4D0S6hx-JXoN9bVo/exec?callback=" + callback, data);
}


$('<h1>', {text: "Submit Research Project"}).appendTo(main);
var form = $('<form>', {id:"lookUpOld"}).appendTo(main);
$('<h2>', {text: "* - indicates required field"}).appendTo(form);

//Choice if you are editing a past submission...
$('<h2>', {text: "Please indicate if this is a first submission of a new project or an update to a previously submitted project."}).appendTo(form);
list = $('<select>', {name:'formtype', id:'formtype'}).appendTo(form).change(function () {
   if($('#formtype option:selected').val() === 'Previous') {
      $('<div>', {text:'Enter your editing key:'}).appendTo(forID);
      $('<input>', {type:'text',id:'keyForEdit'}).appendTo(forID);
//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$
      $('<input>', {value: "submit", class: "login login-submit", id: "secondSub",style:"width:100%", onclick: "$('#findText').text('Looking up your project, give this a minute.');google.script.run.withSuccessHandler(oldResp).findOld($('#keyForEdit').val())"}).appendTo(forID);
      $('<span>', {id: 'findText'}).appendTo(forID);
      $('#rest').hide();
   } else {
       forID.empty();
       $('#rest').show();
   }
   
} );
$('<option>', {value:"NewForm", text:"New project"}).appendTo(list);
$('<option>', {value:"Previous", text:"Previous project"}).appendTo(list);

var oldResp = function(resp) {
    if (!resp) {
         $('#findText').text("Sorry, could not find your project, make sure you did not make a typo.");
    } else {
        $('#mainSub').attr('onclick',resubmitFunc);
        $('<input>', {type:'text', name:'id', val:$('#keyForEdit').val()}).appendTo(form).hide();
       
        for (var old in resp) {
            if (old === 'file') {
               $('#additionalInfoForFile').html('Already have <a target="_blank" href="'+ resp[old][1]+ '">' + resp[old][0] +'</a>. If you would like to replace this file then feel free to upload a new one.'); 
                $('<input>', {type:'text', name:'oldFile', val:JSON.stringify(resp[old])}).appendTo(form).hide();
            } else if (old==='Division') {
               for( var q =0; q<resp[old].length; q+=1 ) {
                  var rsp = resp[old][q]
                  var rspA = (rsp.split('-'))[0];
                  $("#dep"+rspA).prop('checked', true).click();
                  $("[name="+old+"]").val(resp[old]);
               }
            } else if (old === 'understand') {
            } else if (old.match(/Other\-/)) {
               $("#"+old).prop('checked', true).click();
               $("[name="+old+"]").val(resp[old]);
            } else {
                $("[name="+old+"]").val(resp[old]);
            }
        }
        $('#secondSub').remove();
        oldEditKey = $('#keyForEdit').val();
        $('#lookUpOld').html("<h2><b>"+$('#keyForEdit').val()+" was found, please make any edits below, submission date will be updated to today's date</b></h2>");
//        $('[name=Summary]').val("Does it work?");
        $('#rest').append($('<input>', {name: "ftID", type: "hidden", val:resp.ftID}));
        $('#rest').show();  
        var button = $('<button>', {class: "login login-submit", style:"width:100%;background-color:red;", text:"Delete this entry."}).click(function(evt) {
           evt.preventDefault();
           if(window.confirm("Are you sure you would like to delete this entry?")) {
//?$$$$$
//?$$$$$//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$
//?$$$$$

              google.script.run.withSuccessHandler(deleteResp).deleteEntry(resp.ftID);
           }
        });
        $('#lookUpOld').append(button);
        $('#lookUpOld').append($('<div>', {id: "dwarn"}));
    }
    
    console.log(resp);
};
//Delete function
var deleteResp = function (res) {
   if(res) {
      main.text("Successfully Deleted File: " + oldEditKey + ". Thank you. To complete another submission, please refresh the page.");
   } else {
      $('#dwarn').text("Delete failed due to a database error, if this problem occurs again please email us at <a href='mailto:UAB.APSA@gmail.com'>UAB.APSA@gmail.com</a>.").attr('style', "color:red;font-weight:bold;");
   }
}

var forID = $('<span>').appendTo(form);
var form = $('<form>', {id:"rest"}).appendTo(main);
//Title
$('<h2>', {id: "Summary", text: "Project Name/Summary*"}).appendTo(form);
$('<div>', {text: "150 character maximum"}).appendTo(form);
$('<input>', {name: "Summary", type: 'text'}).appendTo(form).keyup(function(evt) {
   if ( $(evt.target).val().length > 75 ) {
      warnTitle.text("Currently you have " + $(evt.target).val().length + " characters, please limit this to 75");
   } else {
      warnTitle.text("");
   }
});
warnTitle = $('<div>', {id: "warnTitle", class: "warn"}).appendTo(form);

//Audience
$('<h2>', {id: "Audience", text: "Audience*"}).appendTo(form);
$('<span>', {text: "Select All That Apply"}).appendTo(form);
list = $('<ul>').appendTo(form);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Undergraduate Student - Summer"}).appendTo(ilist);
$('<span>', {text:"Undergraduate Student - Summer"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Undergraduate Student - Academic Year"}).appendTo(ilist);
$('<span>', {text:"Undergraduate Student - Academic Year"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Medical Student - Summer"}).appendTo(ilist);
$('<span>', {text:"Medical Student - Summer"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Medical Student - Scholarly Activity"}).appendTo(ilist);
$('<span>', {text:"Medical Student - Scholarly Activity"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Graduate or MD/PhD Student"}).appendTo(ilist);
$('<span>', {text:"Graduate or MD/PhD Student"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Audience", type: "checkbox", value: "Resident"}).appendTo(ilist);
$('<span>', {text:"Resident"}).appendTo(ilist);

//Research Sites
$('<h2>', {id: "Site", text: "Research Site*"}).appendTo(form);
list = $('<ul>').appendTo(form);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Birmingham Campus"}).appendTo(ilist);
$('<span>', {text:"Birmingham Campus"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Huntsville Campus"}).appendTo(ilist);
$('<span>', {text:"Huntsville Campus"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Tuscaloosa Campus"}).appendTo(ilist);
$('<span>', {text:"Tuscaloosa Campus"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Montgomery Campus"}).appendTo(ilist);
$('<span>', {text:"Montgomery Campus"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Children’s of Alabama"}).appendTo(ilist);
$('<span>', {text:"Children’s of Alabama"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Birmingham VA Medical Center"}).appendTo(ilist);
$('<span>', {text:"Birmingham VA Medical Center"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Southern Research Institute"}).appendTo(ilist);
$('<span>', {text:"Southern Research Institute"}).appendTo(ilist);
ilist = $('<li>').appendTo(list);
$('<input>', {name: "Site", type: "radio", value: "Hudson Alpha"}).appendTo(ilist);
$('<span>', {text:"Hudson Alpha"}).appendTo(ilist);

ilist = $('<li>').appendTo(list);
$('<input>', {id: "Other-Site",name: "Site", type: "radio", value: "Other"}).appendTo(ilist)

$("[name=Site]").click(function(evt) {
    tempSite.find('input').remove();
    if($(this).val() === "Other") {
       tempSite.append($('<input>', {style:"width:400px;", name: "Other-Site", type: 'text'}));
    }
});
var tempSite = $('<span>', {html:'<span style="display: inline-block;width:60px;">Other</span>'}).appendTo(ilist);

//Department
listArr = {"Anesthesiology":[], "Biochemistry & Molecular Genetics":[], "Cell, Developmental, & Integrative Biology": [], "Dermatology": [], "Emergency Medicine":[],
                        "Family & Community Medicine": [], "Genetics": [], "Medical Education": [], 
                        "Medicine":["Cardiology", "Immunology & Rheumatology", "Endocrinology, Diabetes, & Metabolism", "Gastroenterology & Hepatology", "General Internal Medicine", "Gerontology, Geriatrics, & Palliative Care", "Hematology/Oncology", "Infectious Diseases", "Nephrology", "Preventative Medicine", "Pulmonary, Allergy, & Critical Care"],
                        "Microbiology": [], "Neurobiology":[], "Neurology":[], "Neurosurgery":[],"Obstetrics & Gynecology": [], "Ophthalmology": [], "Pathology": [], 
                        "Pediatrics": ["Allergy & Immunology", "Cardiology", "Critical Care", "Emergency Medicine", "Endocrinology", "Gastroenterology", "General Pediatrics & Adolescent Medicine", "Hospital Medicine", "Hematology/Oncology", "Infectious Diseases", "Neonatology", "Nephrology", "Child Neurology", "Pulmonary & Sleep Medicine", "Rehabilitation Medicine", "Rheumatology"], 
                        "Pharmacology & Toxicology": [], "Physical Medicine & Rehabilitation": [], "Psychiatric & Behavioral Neurobiology": [], 
                        "Radiation Oncology": [], "Radiology": [],
                        "Surgery": ["Cardiothoracic Surgery", "General Surgery", "Oral & Maxillofacial Surgery", "Orthopedic Surgery", "Otolaryngology, Head, & Neck Surgery", "Pediatric Surgery", "Plastic Surgery", "Transplantation Surgery"],
                        "Urology":[]};
            
$('<h2>').append($('<span>',{id:'Department', text:'Department*/'})).append($('<span>',{id:'Division', text:'Division*'})).appendTo(form);
$('<span>', {text: "Select All That Apply"}).appendTo(form);
list = $('<ul>').appendTo(form);
for (var depart in listArr) {
    ilist = $('<li>').appendTo(list);
    if (listArr[depart].length > 0) {
        $('<input>', {id: "dep"+depart, name: "Department", type: "checkbox", value: depart}).appendTo(ilist);
        $('<span>', {text: depart}).appendTo(ilist);
        (function (arr, htmll, name) {
            htmll.find('input').click(function(evt) {
                if(this.checked) {
                    var sel = $('<select>', {name: "Division"}).appendTo(htmll);
                         $('<option>', {value:false, text:"Select a Division*"}).appendTo(sel);
                    for (var i = 0; i < arr.length; i += 1) {
                         $('<option>', {value:name + "-" + arr[i], text:arr[i]}).appendTo(sel);
                    }
//                    $('<span>', {id:'Division'}).appendTo(sel);
                } else {
                    htmll.find('select').remove();
                }
            });
        }(listArr[depart], ilist, depart));
    } else {
        $('<input>', {name: "Department", type: "checkbox", value: depart}).appendTo(ilist);
        $('<span>', {text: depart}).appendTo(ilist);
    }
}
ilist = $('<li>').appendTo(list);
$('<input>', {id: "Other-Department", name: "Department", type: "checkbox", value: "Other"}).appendTo(ilist).click(function(evt) {
    if(this.checked) {
    tempDep.append($('<input>', {style:"width:400px;", name: "Other-Department", type: 'text'}));
    } else {
        tempDep.find('input').remove();
    }

});
var tempDep = $('<span>', {html:'<span style="display: inline-block;width:60px;">Other</span>'}).appendTo(ilist);


//Research Type
listArr = ["Basic science","Translational science","Clinical Research","Behavioral Research", "Chart Review", "Community-based", "Education", "Public Health/Epidemiology", "Health Outcomes"]
$('<h2>', {id: 'RType', text: "Research Type*"}).appendTo(form);
$('<span>', {text: "Select All That Apply"}).appendTo(form);
list = $('<ul>').appendTo(form);
for (var i = 0; i < listArr.length; i += 1) {
    ilist = $('<li>').appendTo(list);
    $('<input>', {name: "RType", type: "checkbox", value: listArr[i]}).appendTo(ilist);
    $('<span>', {text: listArr[i]}).appendTo(ilist);
}
//Other
ilist = $('<li>').appendTo(list);
$('<input>', {id: "Other-RType", name: "RType", type: "checkbox", value: "Other"}).appendTo(ilist).click(function(evt) {
    if(this.checked) {
    tempRType.append($('<input>', {style:"width:400px;", name: "Other-RType", type: 'text'}));
    } else {
        tempRType.find('input').remove();
    }

});
var tempRType = $('<span>', {html:'<span style="display: inline-block;width:60px;">Other</span>'}).appendTo(ilist);


// //Stipend
// $('<h2>', {text: "Does this research include a stipend"}).appendTo(form);
// list = $('<ul>').appendTo(form);
// ilist = $('<li>').appendTo(list);
// $('<input>', {name: "Stipend", type: "radio", value: "Yes"}).appendTo(ilist);
// $('<span>', {text:"Yes"}).appendTo(ilist);
// ilist = $('<li>').appendTo(list);
// $('<input>', {name: "Stipend", type: "radio", value: "No"}).appendTo(ilist);
// $('<span>', {text:"No"}).appendTo(ilist);
// ilist = $('<li>').appendTo(list);
// $('<input>', {name: "Stipend", type: "radio", value: "Contact for more details"}).appendTo(ilist);
// $('<span>', {text:"Contact for more details"}).appendTo(ilist);


//Primary Investigator
$('<h2>', {id: 'PI', text: "Primary Investigator*"}).appendTo(form);
$('<input>', {name: "PI", type: 'text'}).appendTo(form);

//Contact Name
$('<h2>', {text: "Project Contact Information*"}).appendTo(form);
$('<span>', {id: 'cName', text:"Contact Name*"}).appendTo(form);
$('<input>', {name: "cName", type: 'text'}).appendTo(form);

//Contact Email
var warnEmail;
$('<span>', {id: 'cEmail', text: "Contact E-mail*"}).appendTo(form);
$('<input>', {name: "cEmail", type: 'text'}).appendTo(form).keyup(function(evt) {
   if ( ! $(evt.target).val().match(/[\s\S]+@[\s\S]+\.[\s\S]+/) ) {
      warnEmail.text("Must be a valid email address.");
   } else {
      warnEmail.text("");
   }
});
warnEmail = $('<div>', {id: "warnTitle", class: "warn"}).appendTo(form);


//Contact Phone #
var warnPhone;
$('<span>', {id: 'cPN', text: "Contact Phone Number* [123-123-1234]"}).appendTo(form);
$('<input>', {name: "cPN", type: 'text'}).appendTo(form).keyup(function(evt) {
   if ( ! $(evt.target).val().match(/^\d{3}\-\d{3}\-\d{4}$/) ) {
      warnPhone.text("Must be a 10 digit phone number in this form: 123-123-1234.");
   } else {
      warnPhone.text("");
   }
});
warnPhone = $('<div>', {id: "warnTitle", class: "warn"}).appendTo(form);

//Full Opportunity Description*
var warnDesc;
$('<h2>', {id: 'description', text: "Full Opportunity Description*"}).appendTo(form);
$('<div>', {text: "5,000 character maximum"}).appendTo(form);
$('<textarea>', {name: "description", rows: 20, cols: 82}).appendTo(form).keyup(function(evt) {
   if ( $(evt.target).val().length > 5000 ) {
      warnDesc.text("Currently you have " + $(evt.target).val().length + " characters, please limit this to 5,000");
   } else {
      warnDesc.text("");
   }
});
warnDesc = $('<div>', {id: "warnTitle", class: "warn"}).appendTo(form);

//URL to additional information or online application
$('<h2>', {text: "URL to additional information or online application"}).appendTo(form);
$('<input>', {name: "urlToAddRes", type: 'text'}).appendTo(form);

// //File for additional information
// $('<h2>', {text: "Attach a document with more information"}).appendTo(form);
// $('<span>', {id:'additionalInfoForFile'}).appendTo(form);
// $('<input>', {name: "file", type: 'file'}).appendTo(form);

//Checkbox
$('<br>').appendTo(form);
$('<br>').appendTo(form);
$('<span>', {id: 'understand', text: "*This database is intended solely as a resource to advertise available research opportunities at UAB.  Checking the box below indicates you understand that posting a research opportunity does not guarantee you will be contacted by a student."}).appendTo(form);
$('<br>').appendTo(form);
$('<input>', {name: "understand", type: "checkbox", value: true}).appendTo(form);
$('<span>', {text: "I understand the above statement"}).appendTo(form);
$('<br>').appendTo(form);$('<br>').appendTo(form);

//Submit Button
$('<input>', {id: 'mainSub', class: "login login-submit", type:"submit", style:"width:100%", value:"Submit"}).click(submitFunc).appendTo(form);

$('<h2>', {id:"submitText"}).appendTo(form);

var formResp = function(resp) {
    var good = true;
    if (!resp) {
       good = false;
       $('#submitText').html("Submit failed due to a database error, if this problem occurs again please email us at <a href='mailto:UAB.APSA@gmail.com'>UAB.APSA@gmail.com</a>").attr('style', "color:red;font-weight:bold;");
    }
    for (var key in resp) {
       if(resp.hasOwnProperty(key)) {
          if (resp[key] === false) {
             good = false;
             if(key.match(/Other\-/)) { key = key.split('-')[1]; }
             var items = $('#'+key).attr('style',"color:red;font-weight:bold;");
             console.log(key)
             $(items).html($(items).html().replace("! Required Field: ",""));
             $(items).html("! Required Field: " + $(items).html());
             $('#submitText').text("Submit failed, please fill in all necessary feilds.").attr('style', "color:red;font-weight:bold;");
          } else if($('#'+key).text()) {
             var items = $('#'+key).attr('style',"color:black;font-weight:normal;");
             $(items).html($(items).html().replace("! Required Field: ",""));
             //$('#submitText').text("Submit failed, please fill in all necessary feilds.");
          }
       }
    }
    if(good) {
        main.html("<h2>Thank you for submitting, within 30 minutes you will be able to find your project here <a href='http://bit.ly/UABapsa'> UAB APSA</a>. Your personal key for editing this research submission is: " + resp.uuid + ". This information has been sent to your contact email as well.<br />To complete another submission, please refresh the page.</h2>");
    }
}

//deal with files for submit...
$('input[type=file]').on('change', prepareUpload);
 
// Grab the files and set them to our variable
function prepareUpload(event) {
  files = event.target.files;
}

