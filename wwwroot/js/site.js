// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
showInPopup = (url, title) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            /*
             * With the GET Request the action Method Add or Edit will Return a From and we have to render the 
             * Html inide the modal popup in the layout modal popup body 
             */
            //get ythe modal body and append the element  again res is a form 
            $('#form-modal .modal-body').html(res)
            $('#form-modal .modal-title').html(title)
            //call the modal function from Bootstrap
            $("#form-modal").modal('show')

        }
    })
}

JQueryAjaxPost = form => {
    //prevent form submit event 
    try {
        $.ajax({
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.isValid) {
                    $('#view-all').html(res.html)

                    $('#form-modal .modal-body').html('')
                    $('#form-modal .modal-title').html('')
                    $("#form-modal").modal('hide')
                }
                else {
                    $('#form-modal .modal-body').html(res.html)
                }
            },
            error: function (err) {
                console.log(err)
            }

        })
    }
    catch (e) {
        console.log(e)
    }
    return false;
}

jQueryAjaxDelete = form => {
    if (confirm('Are you sure to delete this Record')) {
        try {
            $.ajax({
                type: 'POST',
                url: form.action,
                //the 3 feild has to be set as delete form will generate a hidden feild (Antoforgery Token)
                data: new FormData(form),
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.isValid) {
                        $('#view-all').html(res.html)
                    }
                    else {
                        $('#form-modal .modal-body').html(res.html)
                    }
                },
                error: function (err) {
                    console.log(err)
                }

            })
        }
        catch (e) {
            console.log(e)
        }

    }
    return false;
}