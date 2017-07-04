/**
 * Created by arvind on 3/7/17.
 */
$(function () {
    var out = $('#out');
    $.ajax({url: "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=56e3159a16df4273aff81748170307&q=Kolkata&format=json&num_of_days=5&fx=yes", success: function(result){
        console.log(result);
        // $("#div1").html(result);
        var obj = result;
        var curr = obj.data.current_condition[0];
        $('#cityName').text(obj.data.request[0].query);
        $('#curtempval').text(curr.FeelsLikeC);
        $('#tmin').text(obj.data.weather[0].mintempC);
        $('#tmax').text(obj.data.weather[0].maxtempC);
        $('#thumidity').text(curr.humidity);
        $('#tclouds').text(curr.cloudcover);
        $('#twind').text(curr.windspeedKmph);
        $('#twindir').text(curr.winddirDegree);
        $('#tdescription').text(curr.weatherDesc[0].value);

        endLoader();
    }})


    $(function(){
        $(".flip").flip({
            trigger: 'hover'
        });
    });
});
function endLoader() {
        $('#body').css({'display':'block'});
        $(".loader").css({'display':'none'});
    };

