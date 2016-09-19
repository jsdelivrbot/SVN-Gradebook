import 'babel-polyfill';
import $ from 'jquery';
import func from './func.js';

func.dynamicLoading.css("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css");

/* parse netid from url */
var url = window.location.href;
var re = /\/([a-zA-Z0-9-]*)\/[a-zA-Z.]*$/g;
var netid = re.exec(url);
netid = netid ? netid[1] : null;

console.log(func);
func.uiData['netid'] = netid;

import courseList from './courseList.js';

$(document).ready(function() {

    func.updateViewer();

    const ul = $('<ul></ul>').appendTo('body');
    const ul_courseList = $('#courseList');

    console.log(courseList)

    for (var key in courseList) {
        var course = courseList[key];
        func.verify(course.url + netid,
            (function(name, obj) {
                return function() {
                    console.log(name, obj);
                    $('<a class="item"></a>').text(name).appendTo(obj)
                };
            }(course.name, ul_courseList)),
            function() {
                return;
            }
        );
    }

});
