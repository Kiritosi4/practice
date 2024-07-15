const API_URL = "https://stroymedium.ru/api/"

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

$(document).ready(function(){
    

    $(".phone_input").mask("+7 (999) 999-99-99");

    $('input[name="method"]').on('change', function() {
        if ($(this).val() === 'phone' || $(this).val() === 'telegram' || $(this).val() === 'whatsapp') {
            $('.contact_phone_input').show();
            $('.contact_email_input').hide();
        } else{
            $('.contact_phone_input').hide();
            $('.contact_email_input').show();
        }
    });

    $('.sm_contact_form').on('submit', function(event) {
        event.preventDefault();
        var formData = getFormData($(this));
        console.log(formData);
        var submitBtn = $('.sm_submit_btn');
        submitBtn.prop('disabled', true);
        submitBtn.addClass('disabled');
        submitBtn.val('Отправка...');

        $.ajax({
            type: 'POST',
            url: API_URL + "order",
            dataType: 'json',
            processData: false,
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(response) {
                alert('Заявка успешно отправлена!');
                submitBtn.val('Заявка отправлена!');
                localStorage.setItem("ordered", Date.now());
                $(".sm_contact_form").hide();
                $(".sm_contact_form_success").show();
            },
            error: function(response) {
                alert('Произошла ошибка при отправке заявки.');
                submitBtn.val('Отправить');
                submitBtn.prop('disabled', false);
            }
        });
    });

    const orderData = localStorage.getItem("ordered");

    if(orderData != null && Date.now() < orderData + 900000){
        $(".sm_contact_form").hide();
        $(".sm_contact_form_success").show();
    }
    $('.call_sm_contact_form').on('click', function() {
        $('.sm_contact_form_popup_container').show();
    });

    $('.sm_contact_close_btn').on('click', function() {
        $(".sm_contact_form_popup_container").hide();
    });
    
});