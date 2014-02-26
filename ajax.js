(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    var $document = $(document.body)
    $document.on('submit', 'form[data-send-type=ajax]', function (ev) {
        ev.preventDefault()
        var $form = $(this)
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            dataType: 'json',
            data: {
                data: JSON.stringify($form.serializeObject())
            }
        }).done(function (data) {
                console.log(data)
            }
        ).error(function () {

            }
        )
    })
})()
