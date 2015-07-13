/*global console, $, jQuery */
var updateChanges;
var urlBase = 'https://uab-apsa.googlecode.com/git/';
console.log(urlBase + 'ASPA.js ' +
    "v2.4.3");
//Tracking

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-48393146-1', 'uab-apsa.googlecode.com');
  ga('send', 'pageview');

var getImportantDates, importantDates;
(function () {
    'use strict';
    var main, tabClick, $;
    $ = jQuery;
    main = $('#ASPAmain');


    //actually start making the page, this section creates the interface
    // console.log('Hello from googlecode, source code avaliable at: https://code.google.com/p/uab-apsa/');
    tabClick = function (evt) {
        var text;
        evt.preventDefault();
        text = $($(this).parent().children('div')[0]);
        if (text.is(":visible")) {
            text.hide('slow');
        } else {
            $('.hide').hide('slow');
            text.show('slow');
        }
    };

    //Make tabs/set up page
    main = $('#ASPAmain');
    //About us
    $('<div />', {html: '<a href="#" id="tab1">About Us</a><div class= "hide" style="margin-left:10px">' +
                        '&nbsp;&nbsp;At the national level, APSA works to furthering the training and success of physician scientists by providing resources and opportunities for networking, mentorship, career development, and policy change. For more information, please visit the national organization’s website (http://www.physicianscientists.org) and consider becoming an APSA member.' +
                        '<br />&nbsp;&nbsp;The UAB APSA local chapter was established in Spring 2013 to promote networking within the physician scientist community at UAB, to organize career development events for physician scientists in training, to expand the role of physician scientists into the Birmingham community through outreach events, and to provide a formal platform through which UAB’s future physician-scientists can have an active voice both locally and nationally.  Since then, we have expanded our roster to include over 60 members from the MD, MD/PhD, and MD/MPH programs.  We have sponsored over 50 events ranging from presentations to local high school students on the real-world applications of basic science principles to a roundtable discussion with the CEO of the American Medical Association to workshops on successful grant writing. Each event we sponsor is proposed, planned, and organized by committees composed of APSA members; last year we had over 30 members who served in an active role on these committees.' +
                        '<br />&nbsp;&nbsp;The UAB APSA chapter has been recognized by locally and nationally for our dedication to physician scientist training.  We have received multiple nominations for the outstanding UAB student group of the year and have a strong history of support from both the UAB School of Medicine and the UAB Medical Scientist Training Program.  We have received several grants from the national APSA office including an institutional travel award to the 2014 APSA Annual Meeting, which was attended by 9 of our members.  We were also recognized at the 2014 Annual Meeting as a local chapter of excellence and had the opportunity to speak at the APSA business meeting on our success as a student group.  In addition, we currently have 7 local members serving on national APSA planning committees, including 3 committee vice-Chairs, making UAB the most well-represented institution in the country within the national APSA organization.' +
                        '<br />&nbsp;&nbsp;As our chapter evolves, we continue to increase our involvement in physician scientist development, both locally and nationally.  Anyone interested in joining UAB APSA is welcome to contact us at UAB.APSA@gmail.com or to attend one of our monthly membership meetings.  Thanks, and we encourage you to get involved!' +
                        '<br /><br /><a href=' + urlBase + '"APSAConstitution_2013_01_10.pdf">Download Constitution</a><br /><br /></div>'}).appendTo(main);
    //Officers
    $('<div />', {html: '<a href="#" id="tab2">Officers</a><div class= "hide" style="margin-left:10px"><table><tr>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/TylerMcCaw.jpg"></img><br /><b>President</b><br />Tyler McCaw</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Hu_Muhan.jpg"></img><br /><b>Vice President</b><br />Muhan Hu</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/         "></img><br /><b>Secretary</b><br />Paige Souder</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Sebastian_Chung.jpg"></img><br /><b>Treasurer</b><br />Sebastian Chung</td>' +
                        '</tr><tr>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Weaver_Alice.jpg"></img><br /><b>Past President</b><br />Alice Weaver</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Dussaq_Alex.jpg"></img><br /><b>Webmaster</b><br />Alex Dussaq</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/      "></img><br /><b>SOM Representative MS1/2</b><br />Adam Beg</td>' +
                        // '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Dunlap_Quinn.jpeg"></img><br /><b>SOM Representative MS3/4</b><br />Quinn Dunlap</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Corey.jpg"></img><br /><b>Research Database Director</b><br />Corey Duke</td>' +
                        '</tr><tr>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Lorenz_Robin.jpg"></img><br /><b>Faculty Advisor</b><br />Dr. Robin Lorenz</td>' +
                        '<td style="text-align:center;width:150px;"><img style="width:140px;" src="' + urlBase + 'officerImages/Redmond_Nicole.jpg"></img><br /><b>Faculty Advisor</b><br />Dr. Nicole Redmond</td>' +
                        '</tr>' +
                        '</table></div><br />'}).appendTo(main);

    //Create this is membership section
    $('<div />', {html: '<a href="#" id="tab3">Members</a><div class= "hide" style="margin-left:10px"><div id=thisIsMe></div><div><br /></div>'}).appendTo(main);

    //Important Dates - create the section
    $('<div />', {html: '<a href="#" id="tab6">Upcoming APSA Events</a><div id="importantDates" class= "hide" style="margin-left:10px"></div><br />'}).appendTo(main);

    //Dates at uab - create the section
    // $('<div />', {html: '<a href="#" id="tab9">Events around UAB</a><div id="eventsAtUAB" class= "hide" style="margin-left:10px"></div><br />'}).appendTo(main);

    //Events section
    $('<div />', {html: '<a href="#" id="tab4">Past APSA Events</a><div id=pastEvents class= "hide" style="margin-left:10px"></div>'}).appendTo(main);

    //Medical Student Research Programs at UAB
    // $('<div />', {html: '<a href="#" id="tab10">Medical Student Research Programs at UAB</a><div class= "hide" id="researchPrograms" style="margin-left:10px">Coming Soon!</div><br />'}).appendTo(main);

    //Contact Us
    $('<div />', {html: '<a href="#" id="tab7">Contact Us</a><div class= "hide" style="margin-left:10px"><a  href="mailto:UAB.APSA@gmail.com">UAB.APSA@gmail.com</a><br /><br /></div>'}).appendTo(main);

    //Important Links
    $('<div />', {html: '<a href="#" id="tab5">Important Links</a><div class= "hide" style="margin-left:10px"><a href="http://www.physicianscientists.org">ASPA National Chapter</a><br />' +
                        'Image courtesy of <a href="http://genomicscience.energy.gov">U.S. Department of Energy Genomic Science program</a><br />' +
                        'This page was created using javascript and html by <a href="http://alexdussaq.info">Alex Dussaq</a><br />' +
                        '<br /></div>'}).appendTo(main);

    //Research Opportunities -create the section
    $('<div />', {html: '<a href="#" id="tab8">Research Opportunities</a><div id="researchOps" style="margin-left:10px">Coming Soon!</div><br />'}).appendTo(main);


    //Add some javascript properties to above tabs
    $('.hide').hide();
    $('#tab1').click(tabClick);
    $('#tab2').click(tabClick);
    $('#tab3').click(tabClick);
    $('#tab4').click(tabClick);
    $('#tab5').click(tabClick);
    $('#tab6').click(tabClick);
    $('#tab7').click(tabClick);
    $('#tab8').click(function (evt) {evt.preventDefault(); });
    $('#tab9').click(tabClick);
    // $('#tab10').click(tabClick);

    //Update with new data - all but the research table
    updateChanges = function () {
        var webData = {}, editAllSections, updateRoster, sortByLastName, semesterClick, getThisIsMeImages, url, thisIsMeClick, slideClick, slideClickLast,
            updateDates, updatePastEvents, getEventImages, updateOtherDates;
        url = 'https://3fb447c8ea45275c3e71dc49d678c53d6b103efb.googledrive.com/host/0BwdB5oEiQBYWZFk2ZkRNM1d3ZXc/';
        jQuery.get(url + '?' + (Math.random()).toString().replace('0.', ''), function (x) {
            webData = JSON.parse(x);
            editAllSections();
        });
        editAllSections = function () {
            console.log(webData);

            //update Roster
            updateRoster(webData.roster);

            //update important dates
            updateDates(webData.importantDates);

            //update other dates
            // updateOtherDates(webData.eventsAroundUAB);

            //update past events
            updatePastEvents(webData.pastEvents);

            //update researchPrograms
            $('#researchPrograms').html(webData.medStudentResearch.replace(/[\n\r]{1,2}/g, '<br />').replace(/\/+[\*]|[\*]/g, ""));

            //Hide all divs
            $('.hide').hide();

        };

        updateRoster = function (rost) {
            var div, i, table, trow, indText;

            //sort roster
            rost = rost.sort(sortByLastName);

            //Populate the div
            div = $('#thisIsMe');
            div.html("");
            table = $('<table>', {style: "width:100%"}).appendTo(div);
            for (i = 0; i < rost.length; i += 1) {
                if (!(i % 2)) {
                    trow = $('<tr>', {style: "padding:5px;width:100%;"}).appendTo(table);
                }
                indText = $('<span>', {html: "<b>" + rost[i].name + "</b> " + rost[i].program});
                if (rost[i].hasOwnProperty("office")) {
                    indText.html(indText.html() + ", " + rost[i].office);
                }
                if (rost[i].hasOwnProperty('thisIsMe')) {
                    indText.append(getThisIsMeImages(rost[i].name, rost[i].thisIsMe));
                }
                $('<td>', {style: "width:50%;padding:5px;", html: indText}).appendTo(trow);
            }
            //Hide everything
            $('.slide').hide();
        };

        updateDates = function (dates) {
            //variables
            var div, i;

            //sort dates
            dates = dates.sort(function (a, b) {
                if (new Date(a.date) >= new Date(b.date)) {
                    return 1;
                }
                return -1;
            });

            //update actual elements
            div = $('#importantDates');
            div.text("");
            div = $('<table>').appendTo(div);

            for (i = 0; i < dates.length; i += 1) {
                $('<tr>').append(
                    new Date(dates[i].endTime) - new Date(dates[i].date) > 60 * 60 * 1000 ?
                            $('<td>', {style: "width:25%;padding:5px;", text: (new Date(dates[i].date)).toLocaleString() + " - " + (new Date(dates[i].endTime)).toLocaleString() })
                        :
                                $('<td>', {style: "width:25%;padding:5px;", text: (new Date(dates[i].date)).toLocaleString()})
                ).append(
                    $('<td>', {style: "padding:5px;", html: "<b>" + dates[i].name + '</b><br />' + dates[i].location + (dates[i].description ? "<br />" + dates[i].description : "") })
                ).appendTo(div);
            }
        };


        updateOtherDates = function (dates) {
            //variables
            var div, i;

            //sort dates
            dates = dates.sort(function (a, b) {
                if (new Date(a.date) >= new Date(b.date)) {
                    return 1;
                }
                return -1;
            });

            //update actual elements
            div = $('#eventsAtUAB');
            div.text("");
            div = $('<table>').appendTo(div);

            for (i = 0; i < dates.length; i += 1) {
                $('<tr>').append(
                    new Date(dates[i].endTime) - new Date(dates[i].date) > 60 * 60 * 1000 ?
                            $('<td>', {style: "width:25%;padding:5px;", text: (new Date(dates[i].date)).toLocaleString() + " - " + (new Date(dates[i].endTime)).toLocaleString() })
                        :
                                $('<td>', {style: "width:25%;padding:5px;", text: (new Date(dates[i].date)).toLocaleString()})
                ).append(
                    $('<td>', {style: "padding:5px;", html: "<b>" + dates[i].name + '</b><br />' + dates[i].location + (dates[i].description ? "<br />" + dates[i].description : "") })
                ).appendTo(div);
            }
        };

        updatePastEvents = function (events) {
            //Sort by date
            var semester, i, semStr = "", div, evData, imgHolder;
            events = events.sort(function (a, b) {
                if (new Date(a.date) >= new Date(b.date)) {
                    return 1;
                }
                return -1;
            });
            div = $('#pastEvents');
            div.text("");
            //Start creating list of events, tab
            for (i = 0; i < events.length; i += 1) {
                if (events[i].semester !== semStr) {
                    semStr = events[i].semester;
                    //<a href="#" id="tab5">Important Links</a><div class= "hide" style="margin-left:10px">
                    semester = $('<table>').appendTo(
                        $('<div>', {'class': 'semester', style: 'margin-left:10px'}).appendTo(
                            $('<div>').append(
                                $('<a>', {text: semStr, href: '#'}).click(semesterClick)
                            ).appendTo(div)
                        )
                    );
                }
                evData = '<b>' + events[i].name + '</b>';
                if (events[i].type) {
                    evData += "<br />This event focused on " + events[i].type + ".";
                }
                if (events[i].leaders) {
                    evData += "<br />This event was led by " + events[i].leaders + ".";
                }
                evData = $('<td>', {style: "width:75%;padding:5px;", html: evData});
                if (events[i].images) {
                    imgHolder = getEventImages(events[i].images);
                    evData.append(imgHolder);
                }

                //Now that the semester is build add events, ignore pictures for now
                $('<tr>', {style: "width:100%;padding:5px;"}).append(
                    $('<td>', { style: "width:25%;padding:5px;", text:
                        events[i].endDate ?
                                 (new Date(events[i].date)).toDateString() + " - " + (new Date(events[i].endDate)).toDateString()
                        :
                                (new Date(events[i].date)).toDateString()
                        })
                ).append(evData).appendTo(semester);
            }
            div.append($('<br>'));

            $('.slide').hide();
            $('.semester').hide();
        };


        //Sub functions
        getThisIsMeImages = function (name, number) {
            var i, ret, div, scale, imageBase = url + "thisIsMeImages" + "/" + encodeURIComponent(name) + "/Slide";
            scale = 2;
            ret = $('<span>', {text: ', '});
            $('<a>', {href: "#", text: "This is me"}).click(thisIsMeClick).appendTo(ret);
            div = $('<div>', {'class': "slide", style: "border:2px solid black;height:" + 540 / scale + 'px;overflow: hidden;margin-left: auto;margin-right: auto', id: 'slideContent'}).appendTo(ret);
            for (i = 1; i <= number; i += 1) {
                $('<img>', {'class': 'slideIMG', alt: '#', title: 'Click for next slide.', style: "display:block;position:relative;height:" + 540 / scale + 'px;margin-left: auto;margin-right: auto;', src: imageBase + i + '.jpg'}).click(i === number ? slideClickLast : slideClick).appendTo(div);
            }
            return ret;
        };

        getEventImages = function (images) {
            var i, ret, div, scale, imageBase = url + "images" + "/", imageArr;
            scale = 2;
            imageArr = images.split(';');
            if (!imageArr.length) {imageArr[0] = images; }
            imageArr = imageArr.map(function(x) {return x.replace(/^\s*|\s*$/g, ""); });
            ret = $('<div>');
            $('<a>', {href: "#", text: "Event Images"}).click(thisIsMeClick).appendTo(ret);
            div = $('<div>', {'class': "slide", style: "border:2px solid black;" + "height:" + 540 / scale + 'px;overflow: hidden;margin-left: auto;margin-right: auto;display:block;', id: 'slideContent'}).appendTo(ret);
            for (i = 0; i < imageArr.length; i += 1) {
                $('<img>', {'class': 'slideIMG', alt: '#', title: 'Click for next slide.', style: "margin-left: auto;margin-right: auto;display:block;position:relative;height:" + 540 / scale + 'px;', src: imageBase + encodeURIComponent(imageArr[i])}).click(i === imageArr.length - 1 ? slideClickLast : slideClick).appendTo(div);
            }
            return ret;
        };

        thisIsMeClick = function (evt) {
            var text;
            evt.preventDefault();

            text = $($(this).parent().children('div')[0]);
            if (text.is(":visible")) {
                text.hide('slow');
            } else {
                $('.slide').hide('slow');
                text.show('slow');
            }
        };

        slideClick = function (evt) {
            evt.preventDefault();
            $(this).hide('slow');
        };

        slideClickLast = function (evt) {
            evt.preventDefault();
            $('.slideIMG').show('slow');
        };

        sortByLastName = function (a, b) {
            var aSurname, bSurname;
            aSurname = a.name.split(/\s+/).pop();
            bSurname = b.name.split(/\s+/).pop();
            if (aSurname > bSurname) {
                return 1;
            }
            if (aSurname < bSurname) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return -1;
        };

        semesterClick = function (evt) {
            var text;
            evt.preventDefault();
            text = $($(this).parent().children('div')[0]);
            if (text.is(":visible")) {
                text.hide('slow');
            } else {
                $('.semester').hide('slow');
                text.show('slow');
            }
        };
    };

    //Add in research table stuff
    // jQuery('#researchOps').html('<iframe src="https://uab-apsa.googlecode.com/git/table.html" "border: 0" width="100%" height="900" frameborder="0" scrolling="no">')
    jQuery.getScript(urlBase + 'buildUABresearchTable.js', function (x) {
         APSAtable.makeTable('researchOps');
     });


    updateChanges();
}());













