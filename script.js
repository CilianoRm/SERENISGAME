const voucherStock = {
  "20% de desconto em massagens e drenagens": 24,
  "30% de desconto em pilates": 4,
  "30% de desconto em yoga": 4,
  "100% de desconto em massagens e drenagens": 7
};


$(document).ready(function () {
    var box = $(".box"),
        orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        temp = orginal,
        x = [],
        sec = 0,
        date1, date2,
        moves = 0,
        mm = 0,
        ss = 0,
        upIMG,
        timerInterval,
        timeLeft = 90,
        images = [
            "https://i.postimg.cc/DwmCv64B/02.jpg",
            "https://i.postimg.cc/bwd6ygSV/04.jpg",
            "https://i.postimg.cc/Cxdvh7nQ/05.jpg",
            "https://i.postimg.cc/NjLNsD27/0b19d768-3e35-4834-b197-1ff84c2beaf9.jpg",
            "https://i.postimg.cc/BnthSpPw/18abb1c3-b796-49d8-aaab-e970e37c9364.jpg",
            "https://i.postimg.cc/dVDWs6ZB/1dcfda86-2af0-41fa-a396-c91f87e3f3ee.jpg",
            "https://i.postimg.cc/t47rqknz/1ed6f139-313e-419c-ac16-3c367d9bcd6e.jpg",
            "https://i.postimg.cc/x1qsf5N5/1f074925-7ac7-476a-8294-b39b12ade3fe.jpg",
            "https://i.postimg.cc/x176cmL3/24f7d459-3c48-4d93-a030-c03d220b4042.jpg",
            "https://i.postimg.cc/sg1njmG6/2c0029ea-0667-4121-b90f-1f45638ea40b.jpg",
            "https://i.postimg.cc/Sx5gJ9cG/42bda245-bfb0-41d5-be84-7ceb26ba9d82.jpg",
            "https://i.postimg.cc/Cxtcz8bN/774caffb-ffad-4a6d-a8f4-28dd8dd4b157.jpg",
            "https://i.postimg.cc/FHqT7S0p/849cf5e3-cb0d-4b7f-9a27-9296b1526711.jpg",
            "https://i.postimg.cc/bwMmsn1m/8542e67d-a742-41d1-9a0b-e2f253fa2216.jpg",
            "https://i.postimg.cc/jS9MLfyg/cb736d12-4e00-4509-be11-7b58c8fdcf72.jpg",
            "https://i.postimg.cc/Mp49vB14/d20520c2-6a12-4653-bc6c-e40eafbc0ef2.jpg",
            "https://i.postimg.cc/wjPw7Nh8/d20520c2-6a12-4653-bc6c-e40eafbc0ef2-Copia.jpg",
            "https://i.postimg.cc/htw2fmVN/ebbf9f5e-f3ba-4e35-bb2b-723ae9458954.jpg",
            "https://i.postimg.cc/RZ8gNtwY/HOSPICE-COAPH-SA-DE.jpg",
            "https://i.postimg.cc/JzgpGXbm/RENDER-TIPO-A.png",
            "https://i.postimg.cc/jS9MLfzt/RENDER-TIPO-B.png",
            "https://i.postimg.cc/QdPfH7pZ/Whats-App-Image-2023-11-13-at-10-49-47.jpg",
            "https://i.postimg.cc/R0HXf0R5/Whats-App-Image-2023-11-13-at-10-49-48.jpg",
            "https://i.postimg.cc/jS9MLfzx/Whats-App-Image-2023-11-13-at-10-49-48-1.jpg",
            "https://i.postimg.cc/8z3Zjvhz/Whats-App-Image-2023-11-13-at-10-49-48-2.jpg",
            "https://i.postimg.cc/g0ZNR0D9/Whats-App-Image-2023-11-13-at-10-49-48-3.jpg",
            "https://i.postimg.cc/fb9BXbKM/Whats-App-Image-2023-11-13-at-10-49-50.jpg",
            "https://i.postimg.cc/N0HpT04c/Whats-App-Image-2023-11-13-at-10-49-50-2.jpg",
            "https://i.postimg.cc/KYMJLYNb/Whats-App-Image-2023-11-13-at-10-49-50-3.jpg",
            "https://i.postimg.cc/hGdpxGr4/Whats-App-Image-2024-03-22-at-10-14-05-AM.jpg",
            "https://i.postimg.cc/HLyB5L2p/Whats-App-Image-2024-03-22-at-10-14-05-AM-1.jpg",
            "https://i.postimg.cc/vmV39mz1/Whats-App-Image-2024-03-22-at-10-14-06-AM.jpg"
        ],
        img = Math.floor(Math.random() * images.length),
        gameWon = false;

    $('.me').css({ "background-image": 'url(' + images[img] + ')' });
    $('#reference-image').attr("src", images[img]);

    $(".start").click(function () {
        $(".start").addClass('prevent_click');
        $(".start").delay(100).slideUp(500);
        $(".full").hide();
        $(".pre_img").addClass("prevent_click");

        date1 = new Date();
        img = getRandomImageIndex(img);
        randomTile();

        setTimeout(function () {
            changeBG(img);
        }, 50);

        startTimer();
        Start();
        return 0;
    });

    function drawVoucher() {
  const available = Object.entries(voucherStock)
    .filter(([_, count]) => count > 0);

  if (available.length === 0) return "⚠️ Todos os vouchers foram distribuídos.";

  const randomIndex = Math.floor(Math.random() * available.length);
  const [selectedVoucher, count] = available[randomIndex];

  voucherStock[selectedVoucher]--; // reduz o estoque
  return selectedVoucher;
}


    function getRandomImageIndex(excludeIndex) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * images.length);
        } while (newIndex === excludeIndex);
        return newIndex;
    }

    function Start() {
        var count = 0,
            a, b, A, B;

        $(".me").click(function () {
            count++;
            if (count == 1) {
                a = $(this).attr("data-bid");
                $('.me_' + a).css({ "opacity": ".65" });
            } else {
                b = $(this).attr("data-bid");
                $('.me_' + a).css({ "opacity": "1" });
                if (a != b) {
                    $(".me_" + a)
                        .addClass("me_" + b)
                        .removeClass("me_" + a);
                    $(this)
                        .addClass("me_" + a)
                        .removeClass("me_" + b);
                    $(".me_" + a).attr("data-bid", a);
                    $(".me_" + b).attr("data-bid", b);
                }
                moves++;
                swapping(a, b);
                checkCorrect(a);
                checkCorrect(b);
                a = b = count = A = B = 0;
            }
            if (arraysEqual(x)) {
                clearInterval(timerInterval);
                date2 = new Date();
                timeDifferece();
                gameWon = true;
                showScore(true);
                return 0;
            }
        });
        return 0;
    }

    function preencherVoucher() {
  const estoque = {
    "20% de desconto em massagens e drenagens": 24,
  "30% de desconto em pilates": 4,
  "30% de desconto em yoga": 4,
  "100% de desconto em massagens e drenagens": 7
  };

  // Gera uma lista com base no estoque
  const lista = Object.entries(estoque).flatMap(([nome, qtd]) =>
    Array(qtd).fill(nome)
  );

  // Sorteia um voucher
  const sorteado = lista[Math.floor(Math.random() * lista.length)];

  // Atualiza o texto no popup
  $('#voucher-text').text(sorteado);
}


    function startTimer() {
        timeLeft = 90;
        $("#timer").show().html("Tempo restante: 1:30");
        timerInterval = setInterval(function () {
            timeLeft--;
            let min = Math.floor(timeLeft / 60);
            let sec = timeLeft % 60;
            $("#timer").html("Tempo restante: " + min + ":" + (sec < 10 ? "0" + sec : sec));
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                $(".me").addClass("prevent_click");
                showScore(false);
            }
        }, 1000);
    }

    function randomTile() {
        var i;
        for (i = orginal.length - 1; i >= 0; i--) {
            var flag = getRandom(0, i);
            x[i] = temp[flag];
            temp[flag] = temp[i];
            temp[i] = x[i];
        }
        for (i = 0; i < orginal.length; i++) {
            box.append(
                '<div class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
            );
            if ((i + 1) % 6 == 0) box.append("<br>");
        }
        i = 17;
        return 0;
    }

    function arraysEqual(arr) {
        for (var i = orginal.length - 1; i >= 0; i--) {
            if (arr[i] != i) return false;
        }
        return true;
    }

    function checkCorrect(N1) {
        var pos = x.indexOf(parseInt(N1, 10));
        if (pos != N1) return;
        $(".me_" + N1).addClass("correct prevent_click");
        return;
    }

    function swapping(N1, N2) {
        var first = x.indexOf(parseInt(N1, 10)),
            second = x.indexOf(parseInt(N2, 10));
        x[first] = parseInt(N2, 10);
        x[second] = parseInt(N1, 10);
        return 0;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function timeDifferece() {
        var diff = date2 - date1;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        return 0;
    }

    function changeBG(img) {
        var imageUrl = img != 3 ? images[img] : upIMG;

        $('.me').css({ "background-image": "url(" + imageUrl + ")" });
        $('#reference-image').attr("src", imageUrl);
    }

    $('.pre_img li').hover(function () {
        img = $(this).attr("data-bid");
        changeBG(img);
    });

   function showScore(won) {
  $('#min').html(mm);
  $('#sec').html(ss);
  $('#moves').html(moves);

  if (won && timeLeft > 0) {
    $('#bonus').html("🎉 Você ganhou um brinde!");
    preencherVoucher(); // define o texto do voucher
    $('.cover').slideDown(350); // mostra tudo junto
  } else {
    setTimeout(function () {
      $('.cover-lost').slideDown(350);
    }, 1050);
  }
  return 0;
}

$('.OK').click(function () {
    $('.cover').slideUp(350);
    if (gameWon) {
        window.location.href = "https://www.seulink.com.br"; // Altere para seu link
    }
});

$('.try-again').click(function () {
    location.reload(); // reinicia o jogo
});

$('.exit-game').click(function () {
    window.location.href = "https://cilianocarvalho.wixsite.com/serenisgame"; // Altere para seu link de saída
});


    $('.OK').click(function () {
        $('.cover').slideUp(350);
        if (gameWon) {
            window.location.href = "https://cilianocarvalho.wixsite.com/serenisgame"; // 🔗 Altere para o link desejado
        }
    });

    // Botão reset removido
    // $('.reset').click(function () {
    //     clearInterval(timerInterval);
    //     $(".tile").remove();
    //     $("br").remove();
    //     $(".full").show();
    //     $(".start").show();
    //     $(".pre_img, .start").removeClass("prevent_click");
    //     $("#timer").hide();
    //     $('#bonus').html("");
    //     temp = orginal;
    //     x = [];
    //     moves = ss = mm = 0;
    //     return 0;
    // });
	
	$('#bug-button').click(function () {
    clearInterval(timerInterval);
    $(".tile").remove();
    $("br").remove();
    $(".full").show();
    $(".start").show();
    $(".pre_img, .start").removeClass("prevent_click");
    $("#timer").hide();
    $('#bonus').html("");
    $('.cover').hide();
    $('.cover-lost').hide();
    temp = orginal;
    x = [];
    moves = ss = mm = 0;
    gameWon = false;
});


    $("#upfile1").click(function () {
        $("#file1").trigger('click');
    });

    $("#file1").change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                upIMG = e.target.result;
                img = 3;
                changeBG(3);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
});
