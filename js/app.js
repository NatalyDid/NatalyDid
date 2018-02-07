$(document).ready(function () {

    /*******************toggle sidebar************************/
    $("button#burger").click(function () {
        $("ul.side-menu, div.controls").toggleClass("display_none");
        $("#sidebar").toggleClass("col-sm-1 col-sm-3");
        $(".content").toggleClass("col-sm-11 col-sm-9");
    });

    /*******************changing font-size********************/
    $("input#font_size").change(function () {
        var value = $(this).val();
        //if(value % 1 !== 0) alert(value);
        //else    $(".content p").css("font-size", value + "px");
        //console.log(value, Number.isInteger(value));
        if ((value < 8 || value > 24) || (value % 1 !== 0)  ) alert('must be integer value within 8..24');
        else    $(".content p").css("font-size", value + "px");
    });

    /***************changing content background***************/
    $('input[type=radio][name=optionsRadios]').change(function () {
        if (this.value === 'option1') {
            $(".content").css("background", "#d2d6a8");
        }
        else if (this.value === 'option2') {
            $(".content").css("background", "#eee");
        }
        else if (this.value === 'option3') {
            $(".content").css("background", "#fff");
        }
        else if (this.value === 'option4') {
            $(".content").css("background", "#aaa");
        }
    });

    /*******************changing font-family******************/
    $("select#font_family").change(function () {
        $(".content p").css("font-family", $(this).val());
    });

    /****************deleting last paragraph******************/
    $("#delete").click(function () {
        var par = $(".content p");
        var length = par.length;

        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
        par[length - 1].remove();
    });
});