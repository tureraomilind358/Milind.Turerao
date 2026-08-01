 $(document).ready(function() {
      // ===== PRELOADER =====
      setTimeout(function() {
        $('#preloader').addClass('hide');
      }, 1000);

      // ===== AOS =====
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic'
      });

      // ===== TYPING ANIMATION =====
      const texts = ['Angular Developer', 'Frontend Engineer', 'TypeScript Developer', 'UI Developer'];
      let index = 0, charIndex = 0, isDeleting = false;
      function typeEffect() {
        const current = texts[index];
        if (isDeleting) {
          $('.typing-text').text(current.substring(0, charIndex--));
          if (charIndex < 0) { isDeleting = false; index = (index + 1) % texts.length; setTimeout(typeEffect, 500); return; }
        } else {
          $('.typing-text').text(current.substring(0, charIndex++));
          if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 1500); return; }
        }
        setTimeout(typeEffect, isDeleting ? 60 : 120);
      }
      typeEffect();

      // ===== NAVBAR SOLID ON SCROLL =====
      $(window).on('scroll', function() {
        if ($(window).scrollTop() > 80) {
          $('#mainNav').addClass('nav-solid');
        } else {
          $('#mainNav').removeClass('nav-solid');
        }
        // Scroll progress
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = (scrollTop / docHeight) * 100;
        $('#scroll-progress').css('width', progress + '%');
        // Back to top
        if (scrollTop > 300) {
          $('#backToTop').addClass('visible');
        } else {
          $('#backToTop').removeClass('visible');
        }
      });

      // ===== SMOOTH SCROLL =====
      $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
          $('html, body').animate({ scrollTop: target.offset().top - 70 }, 800);
        }
      });

      // ===== COUNTER ANIMATION =====
      function animateCounters() {
        $('.counter').each(function() {
          const $el = $(this);
          const target = parseInt($el.data('target'));
          if ($el.hasClass('counted')) return;
          if ($(window).scrollTop() + $(window).height() > $el.offset().top + 100) {
            $el.addClass('counted');
            let count = 0;
            const increment = Math.ceil(target / 60);
            const interval = setInterval(() => {
              count += increment;
              if (count >= target) { count = target; clearInterval(interval); }
              $el.text(count);
            }, 25);
          }
        });
      }
      $(window).on('scroll', animateCounters);
      setTimeout(animateCounters, 500);

      // ===== SKILL BARS ANIMATION =====
      function animateSkillBars() {
        $('.progress-bar').each(function() {
          const $bar = $(this);
          if ($bar.hasClass('animated')) return;
          if ($(window).scrollTop() + $(window).height() > $bar.offset().top + 50) {
            $bar.addClass('animated');
            const width = $bar.data('width');
            $bar.css('width', width + '%');
          }
        });
      }
      $(window).on('scroll', animateSkillBars);
      setTimeout(animateSkillBars, 600);

      // ===== CUSTOM CURSOR =====
      const cursor = $('#customCursor');
      $(document).on('mousemove', function(e) {
        cursor.css({ left: e.clientX + 'px', top: e.clientY + 'px' });
      });
      $('a, button, .btn, .project-card, .stat-card').on('mouseenter', function() {
        cursor.css({ transform: 'translate(-50%, -50%) scale(1.5)', background: 'rgba(100,255,218,0.15)' });
      }).on('mouseleave', function() {
        cursor.css({ transform: 'translate(-50%, -50%) scale(1)', background: 'transparent' });
      });

      // ===== CONTACT FORM VALIDATION =====
      $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        if (!name || !email || !message) {
          alert('Please fill in all required fields.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        alert('✅ Message sent successfully! I\'ll get back to you soon.');
        this.reset();
      });

      // ===== BACK TO TOP =====
      $('#backToTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
      });

      // ===== RIPPLE EFFECT =====
      $('.ripple').on('click', function(e) {
        const $ripple = $(this);
        const rect = $ripple[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const $circle = $('<span class="ripple-circle"></span>');
        $circle.css({
          position: 'absolute',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          left: x - 50,
          top: y - 50,
          transform: 'scale(0)',
          animation: 'rippleAnim 0.6s ease-out',
          pointerEvents: 'none'
        });
        $ripple.append($circle);
        setTimeout(() => $circle.remove(), 700);
      });
    });