// Activa el link del navbar según la página
$(function () {
  const page = $('body').data('page');
  $('.nav-link').each(function () {
    const href = $(this).attr('href') || '';
    if ((page === 'inicio' && href.includes('index')) ||
        (page === 'amenazas' && href.includes('amenazas')) ||
        (page === 'consejos' && href.includes('consejos'))) {
      $(this).addClass('active');
    }
  });

  // Tarjetas "Mostrar más" en Amenazas
  $('.btn-toggle').on('click', function () {
    const $extra = $(this).closest('.card').find('.extra');
    $extra.toggleClass('d-none').hide().slideToggle(200);
    $(this).text($extra.hasClass('d-none') ? 'Mostrar más' : 'Ocultar');
  });

  // Validación simple de formulario (sin enviar datos reales)
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const msg = $('#msg').val().trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Bootstrap visual
    $('#name').toggleClass('is-invalid', !name);
    $('#email').toggleClass('is-invalid', !emailOk);
    $('#msg').toggleClass('is-invalid', !msg);

    if (name && emailOk && msg) {
      $('#formAlert').removeClass('d-none alert-danger')
                     .addClass('alert alert-success')
                     .text('¡Gracias! Tu mensaje fue validado localmente.');
      this.reset();
      $('.is-invalid').removeClass('is-invalid');
    } else {
      $('#formAlert').removeClass('d-none alert-success')
                     .addClass('alert alert-danger')
                     .text('Revisa los campos marcados.');
    }
  });

  // Test de seguridad (modal)
  $('#btnQuizSend').on('click', function () {
    const answers = {
      q1: 'b',
      q2: 'a',
      q3: 'b'
    };
    let score = 0;
    Object.keys(answers).forEach(q => {
      const val = $(`input[name="${q}"]:checked`).val();
      if (val === answers[q]) score++;
    });

    const $res = $('#quizResult').removeClass('d-none alert-success alert-warning alert-danger');
    if (score === 3) {
      $res.addClass('alert-success').text('¡Excelente! 3/3. Buenas prácticas a la vista.');
    } else if (score === 2) {
      $res.addClass('alert-warning').html('Bien, 2/3. Revisa señales de <strong>phishing</strong> y uso de <strong>VPN</strong>.');
    } else {
      $res.addClass('alert-danger').html(`Puntaje ${score}/3. Te recomendamos repasar las <a href="amenazas.html">amenazas</a> y las <a href="consejos.html#buenas-practicas">buenas prácticas</a>.`);
    }
  });
});
