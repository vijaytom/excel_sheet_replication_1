toastr.options = {
    "closeButton": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
var table = document.getElementById("tblbody");
for (i = 0; i < 1; i++) {
    var row = `<tr>
        <td>Clone</td>
        <td></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
        <td><input type="text" class="checkrow" /></td>
    </tr>`
    table.innerHTML += row;
}
addSerialNumber();
function addSerialNumber() {
    console.log("Initializing Serial Number")
    $('#myTable tbody tr').each(function (index) {
        $(this).find('td:nth-child(2)').html(index + 1);
    });
}
var rows = table.rows;
var row = rows.length;
for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].cells;
}
var columncount = cols.length -2;
console.log("Row Length " + row);
console.log("Column Length " + columncount);
$('#tblbody').keydown(function (e) {
    var $table = $(this);
    var $active = $('input:focus,select:focus', $table);
    var $next = null;
    var focusableQuery = 'input:visible,select:visible,textarea:visible';
    var position = parseInt($active.closest('td').index()) + 1;
    console.log('position :', position);
    switch (e.keyCode) {
        case 37: // <Left>
            $next = $active.parent('td').prev().find(focusableQuery);
            console.log("left");
            break;
        case 38: // <Up>                    
            $next = $active
                .closest('tr')
                .prev()
                .find('td:nth-child(' + position + ')')
                .find(focusableQuery)
                ;
            console.log("up");
            break;
        case 39: // <Right>
            $next = $active.closest('td').next().find(focusableQuery);
            console.log("right");
            break;
        case 40: // <Down>
            $next = $active
                .closest('tr')
                .next()
                .find('td:nth-child(' + position + ')')
                .find(focusableQuery)
                ;
            console.log("down");
            break;
    }
    if ($next && $next.length) {
        $next.focus();
    }
});
var serial = 1;
var rowid=1;
$(document).on('keydown', '.checkrow', function (e) {
    if (e.which == 40)
    {
        count = 0;
        var fields = $(this).parent().parent().find("td input");
        console.log("Fields length "+fields.length);
        for (var i = 0; i < fields.length; i++) {
            if ($(fields[i]).val() != '') {
                console.log("Value Present");
            }
            else {
                console.log("Empty");
                count++
            }
        }
        if (count == columncount) {
            document.getElementById('toast').innerHTML = toastr.error("There is Empty Row");
        }
        else {
            var rowlen = $(this).parent().parent().find("td").eq(1).text();
            console.log("Rowlen " +rowlen);
            var totalrows = $("#myTable tbody tr").length;
            if (rowlen != totalrows) {
                console.log("access")
            }
            else {
                $("tbody").append(`<tr class="cell-row" id="row` + rowid + `">
                                <td>Clone</td>
                               <td class="serial "></td>
                               </tr>`);
                serial++;
                var rowtoappend = "#row" + rowid;
                rowid++;
                addSerialNumber();
                for (u = 0; u < columncount; u++)
                {
                    $(rowtoappend).append(`<td class="cells"><input type="text" class="checkrow"></td>`)
                }
            }
        }
    }
});
$(document).on('click', 'td:nth-child(1)', function () {
    count2 = 0;
    var fields = $(this).parent().parent().find("td input");
    console.log("Clone fields length "+fields.length)
    for (var i = 0; i < fields.length; i++) {
        if ($(fields[i]).val() != '') {
            console.log("found");
        }
        else {
            console.log("empty");
            count2++;
        }
    }
    if (count2 == columncount) {
        document.getElementById('toast').innerHTML = toastr.error("This Doesn't Contain Values to Clone");
    }
    else {
        var thisRow = $(this).closest('tr')[0];
        $(thisRow).clone().insertAfter(thisRow);
        var selection = $(this).parent().addClass("selection");
        setTimeout(function () {
            $(selection).removeClass("selection");
        }, 800);
        addSerialNumber();
    }
});