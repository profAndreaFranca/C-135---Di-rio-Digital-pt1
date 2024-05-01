//Crie a variável de data
var date = new Date()
let display_date= "Data: " + date.toLocaleDateString('pt-BR', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})
let new_date = date.toLocaleDateString('pt-BR')
//Carregue o DOM HTML
$(document).ready(function () {
    $("#display_date").html(display_date)
    $("#save_button").prop('disabled',true)
})
//Defina a variável para armazenar a emoção prevista
var predicted_emotion
var predicted_emoji

$(function () {
    $("#predict_button").click(function () {
        // salvar os dados que precisam ser enviados
            var input_data = {
                "text" : $("#text").val()
            }
        //criar a chamada ajax
            $.ajax({
                type: 'POST',
                url: "/predict-emotion",
                data: JSON.stringify(input_data),
                dataType: "json",
                contentType: 'application/json',
                success: function (result) {    
                    predicted_emotion = result.data.predicted_emotion
                    predicted_emoji = result.data.predicted_emoji
                    $("#prediction").html(predicted_emotion)
                    $("#prediction").css("display","block")
                    $("#emo_img_url").attr("src",predicted_emoji)
                    $("#emo_img_url").css("display","block")
                    $("#save_button").prop('disabled',false)
                },
                error : function (result) {
                    alert(result.message)
                },
            })
            //configurar o retorno do ajax

        
    });

    $("#save_button").click(function () {
        // salvar os dados que precisam ser enviados
        var save_data = {
            "date" : new_date,
            "text": $("#text").val(),
            "emotion": predicted_emotion,
        }
        //criar a chamada ajax
        $.ajax({
            type: 'POST',
            url: '/save-entry',
            data:JSON.stringify(save_data),
            dataType: "json",
            contentType: 'application/json',
            success: function(result){
                alert("Salvo!")
                window.location.reload()  
            },
            error:function(result) {
                alert(result.message)
            }

        })
            //configurar o retorno do ajax

    });
})

