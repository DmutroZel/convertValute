
fetch('https://open.er-api.com/v6/latest/USD')
.then((res) => {
    return res.json();
})
    .then(data => {
        let currency = Object.keys(data.rates);
        for (let el of currency) {
            $('#currency1').append(`<option value="${el}">${el}</option>`);
            $('#currency2').append(`<option value="${el}">${el}</option>`);
        }
    });

$('#currency1').on('input', function () {
    $('#amount1').attr('placeholder', $('#currency1').val());
});
$('#currency2').on('input', function () {
    $('#amount2').attr('placeholder', $('#currency2').val());
});

$('#convert').click(function () {
    let amount1 = parseFloat($('#amount1').val());
    let currency1 = $('#currency1').val();
    let currency2 = $('#currency2').val();

    fetch(`https://open.er-api.com/v6/latest/${currency1}`)
        .then((res) => res.json())
        .then(data => {
            let rate = data.rates[currency2];
            if (amount1) {
                $('#amount2').val((amount1 * rate).toFixed(2));
            } else {
                let amount2 = parseFloat($('#amount2').val());
                $('#amount1').val((amount2 / rate).toFixed(2));
            }
        });
});