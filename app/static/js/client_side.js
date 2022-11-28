$(document).ready(function() {

    // -[Animasi Scroll]---------------------------

    $(".navbar a, footer a[href='#halamanku']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {
                window.location.hash = hash;
            });
        }
    });

    $(window).scroll(function() {
        $(".slideanim").each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });


    // -[Prediksi Model]---------------------------

    // Fungsi untuk memanggil API ketika tombol prediksi ditekan
    $("#prediksi_submit").click(function(e) {
        e.preventDefault();

        // Set data dari input pengguna
        var input_month = $("#range_month").val();
        var input_ffmc = $("#range_ffmc").val();
        var input_dmc = $("#range_dmc").val();
        var input_temp = $("#range_temp").val();
        var input_rh = $("#range_rh").val();
        var input_dc = $("#range_dc").val();
        // Panggil API dengan timeout 1 detik (1000 ms)
        setTimeout(function() {
            try {
                $.ajax({
                    url: "/api/deteksi",
                    type: "POST",
                    data: {
                        "month": input_month,
                        "ffmc": input_ffmc,
                        "dmc": input_temp,
                        "temp": input_dmc,
                        "rh": input_rh,
                        "dc": input_dc,
                    },
                    success: function(res) {
                        // Ambil hasil prediksi dari API
                        res_data_prediksi = res['prediksi']

                        // // Tampilkan hasil prediksi ke halaman web
                        generate_prediksi(res_data_prediksi);
                    }
                });
            } catch (e) {
                // Jika gagal memanggil API, tampilkan error di console
                console.log("Gagal !");
                console.log(e);
            }
        }, 1000)

    })

    // Fungsi untuk menampilkan hasil prediksi model
    function generate_prediksi(data_prediksi) {
        var str = "";
        str += "<h2>Hasil Prediksi </h2>";
        str += "<br>";
        // str += "<img src='" + image_prediksi + "' width=\"200\" height=\"150\"></img>"
        str += "<h3> Luas Potensi Kebakaran Hutan : </h3>";
        str += "<h3>" + data_prediksi + " Ha </h3>";
        $("#hasil_prediksi").html(str);
    }

})

(function($) {
    $(function() {

        $('.sidenav').sidenav();

    }); // end of document ready
})(jQuery); // end of jQuery name space