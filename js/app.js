$(function () {

    ///*********************************///
    ///***Registration, authorization***///
    ///*********************************///

    const errors = $("#errors");
    const failed = {fail: false, errors: []};
    const userName = $(".user-name");

    initSession();

    handleFormRegistration();

    handleFormLogin();

    logOut();

    /*******removing errors after editing a form*****/
    function changeForm(form) {
        form.change(function () {
            errors.text("");
            failed.fail = false;
            failed.errors = [];
        });
    }

    /***********session initialization***************/
    function initSession() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userName.text("Welcome, " + user.displayName + "!");
                $('ul.autorization').css("display", "none");
                $('div.welcome').css("display", "block");
                $('div.controls').addClass("display_block");
                $('.sidebar #burger').css("display", "block");
            }
        });
    }

    /*************user creating***********************/
    function createUser(email, password, name) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user);
                user
                    .updateProfile({
                        displayName: name
                    })
                    .then(function () {
                        initSession()
                    });
            })
            .catch(function (err) {
                errors.text(err.message);
            });
    }

    /**********registration form handling**************/
    function handleFormRegistration() {
        const form = $('form[name=register]');

        changeForm(form);

        $('#register').click(function (event) {
            event.preventDefault();
            const name = $('#register_login').val();
            const email = $('#register_email').val();
            const password = $('#register_password').val();
            const repeatPassword = $('#register_confirmation').val();

            if (password !== repeatPassword) {
                failed.fail = true;
                failed.errors.push("Пароли не совпадают!");
            }

            if (name.length === 0) {
                failed.fail = true;
                failed.errors.push("Введите имя");
            }

            if (!failed.fail) {
                createUser(email, password, name);

                $('#register_login').value = "";
                $('#register_email').value = "";
                $('#register_password').value = "";
                $('#register_confirmation').value = "";
            } else {
                let stringErrors = "";
                for (let error of failed.errors) {
                    stringErrors += error + "<br>";
                }
                errors.text(stringErrors);
            }
        });
    }

    /**********authentication form handling*************/
    function handleFormLogin() {
        const form = $('form[name=auth]');
        changeForm(form);
        $('#auth').click(function (event) {
            event.preventDefault();
            const email = $('#auth_login').val();
            const password = $('#auth_password').val();

            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    initSession();
                    $('#auth_login').value = '';
                    $('#auth_password').value = '';
                })
                .catch(function (err) {
                    errors.text(err.message);
                });
        });
    }

    /*****************logout****************************/
    function logOut() {
        const btnLogout = $('#btnLogout');
        btnLogout.click(function () {
            firebase
                .auth()
                .signOut().then(function () {
                $('div.welcome').css("display", "none");
                $('ul.autorization').css("display", "block");
                $('div.controls').removeClass("display_block");
                $('.sidebar #burger').css("display", "none");

            })
                .catch(function (err) {
                    console.log(err);
                });
        });
    }

    ///**************************///
    ///***Sidebar fuctionality***///
    ///**************************///

    /*******************toggle sidebar************************/
    $("button#burger").click(function () {
        $("ul.side-menu").toggleClass("display_none");
        $("div.controls").toggleClass("display_block");
        $("#sidebar").toggleClass("col-sm-1 col-sm-3");
        $(".content").toggleClass("col-sm-11 col-sm-9");
    });

    /*******************changing font-size********************/
    $("input#font_size").change(function () {
        var value = $(this).val();
        if ((value < 8 || value > 24) || (value % 1 !== 0)) alert('must be integer value within 8..24');
        else $(".content p").css("font-size", value + "px");
    });

    /***************changing content background***************/
    $('input[type=radio][name=optionsRadios]').change(function () {
        switch (this.value) {
            case 'option1':
                $(".content").css("background", "#d2d6a8");
                break;

            case 'option2':
                $(".content").css("background", "#eee");
                break;

            case 'option3':
                $(".content").css("background", "#fff");
                break;

            case 'option4':
                $(".content").css("background", "#aaa");
                break;
        }

    });

    /*$('input[type=radio][name=optionsRadios]').change(function () {
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
    });*/

    /*******************changing font-family******************/
    $("select#font_family").change(function () {
        $(".content p").css("font-family", $(this).val());
    });

    /****************deleting last paragraph******************/
    $("#delete").click(function () {
        var par = $(".content p");
        var length = par.length;

        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
        par[length - 1].remove();
    });

});



