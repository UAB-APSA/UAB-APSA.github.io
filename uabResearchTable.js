/*global parent, console, $, jQuery, window */
var APSAtable = (function () {
  'use strict';
  console.log('https://uab-apsa.googlecode.com/git/uabResearchTable.js ' +
    'v2.1.2');

  //variables
  var makeActualTable, parent_url, updateSize, setUpSizing, madeBy, table, myModalLabel, modalBody, searchStr, filterMaker, tableRows, updateData, pageText, rightClick, leftClick, cPage, maxPage, getList, dict, options, main, makeTable, makeTableBody, $, div, data, dataArr, startBuilding, wordSearch, order, perPage;

  parent_url = decodeURIComponent(document.location.hash.replace(/^#/, '')) || undefined;

  //variable declaration
  wordSearch = function (evt) {
    var mini, mymain, removed = [];
    mymain = function (evt) {
      var checked, search, i, j, k, searchArr, newScore, regex, found = [], keep = {}, previousScore, totalScore;
      // console.log("main");
      evt.preventDefault();
      search = evt.target.value;
      searchArr = search.split(/\s/);
      if (search.length > 0) {
        for (i = 0; i < searchArr.length; i += 1) {
          if (searchArr[i] && searchArr[i] !== "") {
            checked = {};
            regex = new RegExp('\\S*' + searchArr[i] + '\\S*', 'ig');
            found = searchStr.match(regex);
            for (k = 0; found && k < found.length; k += 1) {
              if (found[k] && found[k] !== "") {
                for (j = 0; j < dict[found[k]].length; j += 1) {
                  newScore = searchArr[i].length * searchArr[i].length / found[k].length;
                  previousScore = checked[dict[found[k]][j]];
                  totalScore = keep[dict[found[k]][j]];
                  if (!previousScore) {
                    if (!totalScore) {
                      keep[dict[found[k]][j]] = newScore; // Set total score to new score 
                    } else {
                      keep[dict[found[k]][j]] += newScore; // Add new score to total score
                    }
                    checked[dict[found[k]][j]] = newScore; // save previous score
                  } else if (previousScore < newScore) {
                    keep[dict[found[k]][j]] -= previousScore; // remove previous score from total
                    keep[dict[found[k]][j]] += newScore; // add new score
                    checked[dict[found[k]][j]] = newScore; // set new previous score
                  }
                }
              }
            }
          }
        }
        for (i = 0; i < dataArr.length; i += 1) {
          if (!keep.hasOwnProperty(dataArr[i].uuid)) {
            removed.push(dataArr.splice(i, 1)[0]);
            i -= 1;
          } else {
            dataArr[i].score = keep[dataArr[i].uuid];
          }
        }
      }
      // console.log(dataArr.length);
      updateData();
    };
    mini = function (evt) {
      var putBack;
      // console.log('mini');
      while (removed.length) {
        putBack = removed.pop();
        putBack.score = 0;
        dataArr.push(putBack);
      }
      mymain(evt);
    };
    $(evt.target).unbind("keyup", wordSearch);
    $(evt.target).keyup(mini);
    mini(evt);
  };

  order = function () {
    // console.log('other');
    return;
  };
  main = {};
  perPage = 5;
  options = {
    visible: {
      order: [["Audience", "22%", "Audience"], ["RType", "10%", "Research Type"], ["Summary", "60%", "Research Summary"], ["Department", "9%", "Department"], ["Site", "10%", "Research Site"], ["date", "8%", "Date Posted"]],
      Audience: ["Undergraduate Student - Summer", "Undergraduate Student - Academic Year", "Medical Student - Summer", "Medical Student - Scholarly Activity", "Graduate or MD/PhD Student", "Resident"],
      RType: ["Basic science", "Translational science", "Clinical Research", "Behavioral Research", "Chart Review", "Community-based", "Education", "Public Health/Epidemiology", "Health Outcomes", "Other"],
      Summary: wordSearch,
      Department: ["Anesthesiology", "Biochemistry & Molecular Genetics", "Cell, Developmental, & Integrative Biology", "Dermatology", "Emergency Medicine", "Family & Community Medicine", "Genetics", "Medical Education", "Medicine", "Microbiology", "Neurobiology", "Neurology", "Neurosurgery", "Obstetrics & Gynecology", "Ophthalmology", "Pathology", "Pediatrics", "Pharmacology & Toxicology", "Physical Medicine & Rehabilitation", "Psychiatric & Behavioral Neurobiology", "Radiation Oncology", "Radiology", "Surgery", "Urology", "Other"],
      Site: ["Birmingham Campus", "Huntsville Campus", "Tuscaloosa Campus", "Montgomery Campus", "Children’s of Alabama", "Birmingham VA Medical Center", "Southern Research Institute", "Hudson Alpha", "Other"],
      date: order
    },
    invisible: ["Stipend", "description", "cPN", "cEmail", "cName", "PI", "file", "urlToAddRes"]
  };

  //Global functions
  //Actual table maker
  main.makeTable = function (divID) {
    // These functions require jQuery and a div id to
    // be pointed to, all other functionality is built in
    // divID should be a string.
    return makeTable(divID);
  };

  //Local functions
  makeTable = function (divID) {
    //variables

    //variable declarations

    //check input
    if (typeof jQuery !== "function") {
      console.error('jQuery must be defined to continue.');
    } else {
      $ = jQuery;
      div = $('#' + divID);
      div.empty();
      // div = $("<iframe>", {sandbox: "allow-popups allow-same-origin allow-scripts", style:'width:100%;', seamless: ""}).appendTo(div);
      // frame = div;
      // div = div.contents().find('body');
      // div.append('<style>', {html: 'html, body {height:100%}'});
      div.text("");
      if (div.length < 1) {
        console.error('Could not find div that was indicated, make sure one exists with id=[divID].');
      } else {
        jQuery.get('https://3fb447c8ea45275c3e71dc49d678c53d6b103efb.googledrive.com/host/0BwdB5oEiQBYWZFk2ZkRNM1d3ZXc/research.json', startBuilding);
      }
    }
  };

  startBuilding = function (x) {
    //variable

    //set css and modal functionality
    $('<style type="text/css">.uabR-table{margin:0;padding:0;width:100%;border:1px solid #1e6b52;-moz-border-radius-bottomleft:0;-webkit-border-radius:0;border-radius:0;-moz-border-radius-bottomright:0;-moz-border-radius-topright:0;-moz-border-radius-topleft:0}.uabR-table table{border-collapse:collapse;border-spacing:0;width:100%;height:100%;margin:0;padding:0}.uabR-table tr:last-child td:last-child{-moz-border-radius-bottomright:0;-webkit-border-bottom-right-radius:0;border-bottom-right-radius:0}.uabR-table table tr:first-child td:first-child{-moz-border-radius-topleft:0;-webkit-border-top-left-radius:0;border-top-left-radius:0}.uabR-table table tr:first-child td:last-child{-moz-border-radius-topright:0;-webkit-border-top-right-radius:0;border-top-right-radius:0}.uabR-table tr:last-child td:first-child{-moz-border-radius-bottomleft:0;-webkit-border-bottom-left-radius:0;border-bottom-left-radius:0}.uabR-table tr:nth-child(odd){background-color:#a4d363}.uabR-table tr:nth-child(even){background-color:#fff}.uabR-table td{vertical-align:middle;border:1px solid #1e6b52;border-width:0 1px 1px 0;text-align:left;padding:5px;font-size:14px;font-family:Times New Roman;font-weight:400;color:#000}.uabR-table tr:last-child td{border-width:0 1px 0 0}.uabR-table tr td:last-child{border-width:0 0 1px}.uabR-table tr:last-child td:last-child{border-width:0}.uabR-table tr:first-child td{background:#1e6b52 -webkit-gradient(linear,left top,left bottom,color-stop(0.05,#1e6b52),color-stop(1,#a3d55d));background:#1e6b52 -moz-linear-gradient(center top,#1e6b52 5%,#a3d55d 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#1e6b52", endColorstr="#a3d55d");background:#1e6b52 -o-linear-gradient(top,#1e6b52,a3d55d);border:0 solid #1e6b52;text-align:center;border-width:0 0 1px 1px;font-size:18px;font-family:Times New Roman;font-weight:700;color:#fff}.uabR-table tr:first-child:hover td{background:#1e6b52 -webkit-gradient(linear,left top,left bottom,color-stop(0.05,#1e6b52),color-stop(1,#a3d55d));background:#1e6b52 -moz-linear-gradient(center top,#1e6b52 5%,#a3d55d 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#1e6b52", endColorstr="#a3d55d");background:#1e6b52 -o-linear-gradient(top,#1e6b52,a3d55d)}.uabR-table tr:first-child td:first-child{border-width:0 0 1px}.uabR-table tr:first-child td:last-child{border-width:0 0 1px 1px}</style>').appendTo(div);
    $("<style type='text/css'> .tableButton{-moz-box-shadow:inset 0 1px 0 0 #fff;-webkit-box-shadow:inset 0 1px 0 0 #fff;box-shadow:inset 0 1px 0 0 #fff;background:#ededed -webkit-gradient(linear,left top,left bottom,color-stop(0.05,#ededed),color-stop(1,#dfdfdf));background:#ededed -moz-linear-gradient(center top,#ededed 5%,#dfdfdf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#dfdfdf');-webkit-border-radius:6px;-moz-border-radius-topleft:6px;border-radius:6px;-moz-border-radius-topright:6px;-moz-border-radius-bottomright:6px;-moz-border-radius-bottomleft:6px;text-indent:0;border:1px solid #dcdcdc;display:inline-block;color:#777;font-family:arial;font-size:15px;font-weight:700;font-style:normal;text-decoration:none;text-align:center;text-shadow:1px 1px 0 #fff}.tableButton:hover{background:#dfdfdf -webkit-gradient(linear,left top,left bottom,color-stop(0.05,#dfdfdf),color-stop(1,#ededed));background:#dfdfdf -moz-linear-gradient(center top,#dfdfdf 5%,#ededed 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#dfdfdf', endColorstr='#ededed')}.tableButton:active{position:relative;top:1px}</style>").appendTo(div);
    $('<style type="text/css"> .modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transform:translate3d(0,-25%,0);transform:translate3d(0,-25%,0);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:6px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0}.modal-backdrop{position:relative;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.43px}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}</style>').appendTo(div);
    //Comment out for jslint put back in for modules to work.
    if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";function e(e,s){return this.each(function(){var i=t(this),n=i.data("bs.modal"),a=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);n||i.data("bs.modal",n=new o(this,a)),"string"==typeof e?n[e](s):a.show&&n.show(s)})}var o=function(e,o){this.options=o,this.$body=t(document.body),this.$element=t(e),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};o.VERSION="3.2.0",o.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},o.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},o.prototype.show=function(e){var o=this,s=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var s=t.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),s&&o.$element[0].offsetWidth,o.$element.addClass("in").attr("aria-hidden",!1),o.enforceFocus();var i=t.Event("shown.bs.modal",{relatedTarget:e});s?o.$element.find(".modal-dialog").one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(i)}).emulateTransitionEnd(300):o.$element.trigger("focus").trigger(i)}))},o.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},o.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},o.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},o.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$element.trigger("hidden.bs.modal")})},o.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},o.prototype.backdrop=function(e){var o=this,s=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=t.support.transition&&s;if(this.$backdrop=t('<div class="modal-backdrop '+s+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;i?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(150):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(150):n()}else e&&e()},o.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},o.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",t+this.scrollbarWidth)},o.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},o.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=o,t.fn.modal.noConflict=function(){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(o){var s=t(this),i=s.attr("href"),n=t(s.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,"")),a=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(i)&&i},n.data(),s.data());s.is("a")&&o.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){s.is(":visible")&&s.trigger("focus")})}),e.call(n,a,this)})}(jQuery);

    //Make modal
    $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3 class="modal-title" id="myModalLabel">Modal title</h3></div><div class="modal-body" id="modalBody"></div><div class="modal-footer"><button type="button" id="editButton" class="btn btn-default" data-dismiss="modal">Edit/New</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>').appendTo(div);

    myModalLabel = $('#myModalLabel');
    modalBody = $('#modalBody');
    $('#editButton').click(function (evt) {
      evt.preventDefault();
      window.open('https://script.google.com/macros/s/AKfycbx5bv2SQtwYvwAxs0NYTkjuypDXgsotKjESKAf1uOwRijXCMELb/exec', '_parent');
    });

    data = JSON.parse(x);
    dict = data.dict;
    dataArr = data.data;
    searchStr = data.str;
    madeBy = $('<div>', {style: "font-size:110%"});
    div.append(madeBy);
    table = $("<table>", {"class": "uabR-table", style: "width:100%"}).appendTo(div);
    setUpSizing();
    makeActualTable();
  };

  makeActualTable = function () {
    //make table header
    var i, row1, row2, length;
    table.empty();
    if (window.document.body.clientWidth > 600) {
      options.visible.order = [["Audience", "22%", "Audience"], ["RType", "10%", "Research Type"], ["Summary", "60%", "Research Summary"], ["Department", "9%", "Department"], ["Site", "10%", "Research Site"], ["date", "8%", "Date Posted"]];
      madeBy.html("This table is powered by <a href='http://www.uab.edu/medicine/mstp/academics/mstp/uab-apsa-chapter' target='_parent'>UAB APSA</a>. <a target='_parent' href='https://script.google.com/macros/s/AKfycbx5bv2SQtwYvwAxs0NYTkjuypDXgsotKjESKAf1uOwRijXCMELb/exec'>Click here</a> to edit your entry or submit a new project.")
    } else {
      options.visible.order = [["Summary", "75%", "Research Summary"], ["date", "25%", "Date Posted"]];
      madeBy.html("This table is powered by <a href='http://www.uab.edu/medicine/mstp/academics/mstp/uab-apsa-chapter' target='_parent'>UAB APSA</a>. <a target='_parent' href='https://script.google.com/macros/s/AKfycbx5bv2SQtwYvwAxs0NYTkjuypDXgsotKjESKAf1uOwRijXCMELb/exec'>Click here</a> to edit your entry or submit a new project.<br />*<b>Note:</b> This is better viewed from a larger screen.")
    }
    length = options.visible.order.length;
    row1 = $("<tr>", {style: "width:100%;padding:5px"}).appendTo(table);
    row2 = $("<tr>", {style: "width:100%;padding:5px"}).appendTo(table);
    for (i = 0; i < length; i += 1) {
      $("<td>", {style: "padding:5px;width:" + options.visible.order[i][1], text: options.visible.order[i][2]}).appendTo(row1);
      $("<td>", {style: "padding:5px;width:" + options.visible.order[i][1]}).append(filterMaker(options.visible.order[i][0])).appendTo(row2);
    }
    makeTableBody(table);
  };

  setUpSizing = function () {
    updateSize = function () {
      console.log('updateSize does not do anything outside the context of an iframe');
      return;
    };
    if (parent_url) {
      updateSize = function () {
        parent.postMessage(table.height() + madeBy.height(), parent_url);
      };
    }
    window.addEventListener('message',
      function (evt) {
        if (evt.data === 'height') {
          makeActualTable();
          //updateSize(); Should be called automatically.
        }
      }, false);
  };

  filterMaker = function (cat) {
    var ret, i, changeFunc, mainFunc;

    mainFunc = function (evt) {
      var j, that, removed = [];
      that = evt.target;
      evt.preventDefault();
      if (that.value) {
        for (j = 0; j < dataArr.length; j += 1) {
          if (!dataArr[j][cat].join(',').match(that.value)) {
            removed.push(dataArr.splice(j, 1)[0]);
            j -= 1;
          }
        }
      }
      if (removed.length > 0) {
        changeFunc = function (evt) {
          var k;
          for (k = 0; k < removed.length; k += 1) {
            dataArr.push(removed[k]);
          }
          removed = [];
          mainFunc(evt);
        };
        ret.change(changeFunc);
      }
      updateData();
    };
    changeFunc = mainFunc;

    if (typeof options.visible[cat] !== 'function') {
      ret = $("<select>", {style: "width:100%"}).append($('<option>', {style: "width:100%;", value: "", text: 'filter'})).change(changeFunc);
      for (i = 0; i < options.visible[cat].length; i += 1) {
        $('<option>', {value: options.visible[cat][i], text: options.visible[cat][i]}).appendTo(ret);
      }
    } else if (cat !== 'date') {
      ret = $('<input>', {placeholder: "Search by keyword or PI", style: 'width:95%'}).keyup(options.visible[cat]);
    }
    return ret;
  };


  makeTableBody = function (table) {
    var i, j, cat, pager;
    tableRows = [];
    for (i = 0; i < perPage; i += 1) {
      tableRows[i] = {};
      tableRows[i].row = $('<tr>', {style: "padding:5px;width:100%"}).hide().appendTo(table);
      for (j = 0; j < options.visible.order.length; j += 1) {
        cat = options.visible.order[j][0];
        tableRows[i][cat] = $("<td>", {style: "width:" + options.visible.order[j][1]}).appendTo(tableRows[i].row);
      }
    }
    pager = $('<td>', {colspan: 6, style: "text-align: center;padding:5px;width:100%"}).appendTo($('<tr>', {style: "padding:5px;width:100%"}).appendTo(table));
    cPage = 1;
    maxPage = Math.ceil(dataArr.length / perPage);
    pageText = $('<span>', {text: 'Page ' + cPage + ' of ' + maxPage, style: "padding:15px"});
    $('<button>', {style: '-moz-transform: rotate(-180deg);-webkit-transform: rotate(-180deg);transform: rotate(-180deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2)',
            "class": "tableButton", html: '&#10140;'}).appendTo(pager).click(leftClick);
    pageText.appendTo(pager);
    $('<button>', {"class": "tableButton", html: '&#10140;'}).appendTo(pager).click(rightClick);
    updateData();
    // console.log(tableRows);
    // div.append($('<div>', {html: "This table is powered by <a href='http://www.uab.edu/medicine/mstp/academics/mstp/uab-apsa-chapter' target='_parent'>UAB APSA</a>. <a target='_parent' href='https://script.google.com/macros/s/AKfycbx5bv2SQtwYvwAxs0NYTkjuypDXgsotKjESKAf1uOwRijXCMELb/exec'>Click here</a> to edit your entry or submit a new project."}))
  };

  getList = function (obj, cat, len) {
    var ret = "", arr = obj[cat];
    if (typeof arr === 'string' || !arr) {
      ret = arr;
    } else {
      arr.map(function (x) {
        if (x.match(/other/i)) {
          ret = ret ? ret + ", " + 'Other - ' + obj['Other-' + cat] : 'Other - ' + obj['Other-' + cat];
        } else {
          ret = ret ? ret + ", " + x : x;
        }
      });
    }
    if (cat === 'Audience' && len === 'short') {
      ret = ret.replace(/student\s|\sstudent/ig, '');
    }
    if (len === 'short' && ret.length > 120) {
      ret = "Multiple";
    }
    return ret;
  };

  leftClick = function (evt) {
    evt.preventDefault();
    if (cPage > 1) {
      cPage -= 1;
      updateData();
    }
  };

  rightClick = function (evt) {
    evt.preventDefault();
    if (cPage < maxPage) {
      cPage += 1;
      updateData();
    }
  };

  updateData = function () {
    var i, j, add, cat;
    maxPage = Math.ceil(dataArr.length / perPage);
    if (cPage > maxPage) {
      cPage = maxPage;
    }
    if (maxPage === 0) {
      cPage = 1;
      pageText.text('Page ' + cPage + ' of ' + 1);
    } else {
      pageText.text('Page ' + cPage + ' of ' + maxPage);
    }

    dataArr = data.data.sort(function (a, b) {
      var ret = 1;
      a.score = a.score || 0;
      b.score = b.score || 0;
      if (a.score > b.score) {
        ret = -1;
      }
      if (a.score === b.score && new Date(a.date) > new Date(b.date)) {
        ret = -1;
      }
      return ret;
    });

    add = (cPage - 1) * perPage;
    for (i = 0; i < perPage; i += 1) {
      if (i + add < dataArr.length) {
        tableRows[i].row.show();
        for (j = 0; j < options.visible.order.length; j += 1) {
          cat = options.visible.order[j][0];
          tableRows[i][cat].text(getList(dataArr[i + add], cat, 'short'));
          if (cat === 'Summary') {
            tableRows[i][cat].text("");
            (function (obj, cat) {
            //(function (loc, obj, cat) {
              tableRows[i][cat].append($('<a>', {href: "#", style: "font-weight:bold;", 'data-toggle': "modal", 'data-target': "#myModal", text: getList(obj, cat, 'long')})).click(function (evt) {
                evt.preventDefault();
                myModalLabel.text(obj[cat]);
                modalBody.html(
                  obj.description.replace(/\n/g, "<br />") +
                    "<br /><br />" +
                    "<h3>Basic Information</h3>" +
                    "<b>Principle Investigator</b>: " + obj.PI +
                    "<br /><b>Department(s) Involved</b>: " + getList(obj, "Department", 'long') +
                    "<br /><b>Date Posted</b>: " + obj.date +
                    "<br /><b>Location</b>: " + obj.Site +
                    "<br /><b>Type of research</b>: " + obj.RType.join(', ') +
                    "<br /><b>Audience</b>: " + getList(obj, 'Audience', 'long') +
                    "<br /><b>Research Type</b>: " + getList(obj, 'RType', 'long') +
                    (obj.urlToAddRes ? "<br /> <b>URL for more information</b>: <a href=" + obj.urlToAddRes + " target='_blank'>" + obj.urlToAddRes + "</a>" : "") +
                    (obj.file ? "<br /><b>File for more information</b>: <a href=" + obj.file[1] + " target='_blank'>" + obj.file[0] + "</a>" : "") +
                    "<br /><br /><h3>Contact Information</h3>" +
                    obj.cName +
                    "<br />" + obj.cEmail +
                    "<br />" + obj.cPN
                );
              });
            //}(tableRows[i], dataArr[i + add], cat));
            }(dataArr[i + add], cat));
          }
        }
      } else {
        tableRows[i].row.hide();
      }
    }
    updateSize();
  };

  return main;

}());