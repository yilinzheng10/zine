function startCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    var countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            display.textContent = "Time's up! Take a screenshot of your zine :)";
            startCountdown(duration, display); // Restart the countdown
        }
    }, 1000);
}

window.onload = function () {
    var oneMinute = 60, // 1 minute in seconds
        display = document.querySelector('#countdown');
    startCountdown(oneMinute, display);

    var audio = document.getElementById('background-music');
    audio.volume = 0.5; // Set volume between 0.0 and 1.0
    audio.play().catch(function(error) {
        console.log('Playback failed:', error);
    });
};


// Make divs draggable, floating, and randomly positioned
$(function() {
    var horizontalSpacing = 15; // change this value to increase or decrease the horizontal spacing between divs
    var verticalRange = 6; // change this to increase or decrease the range of possible vertical positions

    $(".draggable").each(function(index) {
        //Calculate a random vertical position within the range
        var randomTop = Math.floor(Math.random() * verticalRange);

        // Calculate the left position based on the index of the div
        var leftPosition = index * horizontalSpacing;

        // Set the position
        $(this).css({
            top: randomTop + "vh",
            left: leftPosition + "vw"
        });
    
        // Add a random delay to the animation
        var randomDelay = Math.random() * 1; // Adjust the delay range as desired
        $(this).css("animation-delay", randomDelay + "s");
    });

    $(".draggable").draggable({
        start: function() {
        $(this).css("animation", "none");
    },
    stop: function() {
        $(this).css("animation", "float 5s ease-in-out infinite");
    }
    });
});

// Change opacity based on scroll position
$(window).scroll(function() {
    var scrollLeft = $(this).scrollLeft(),
        windowWidth = $(this).width(),
        opacity;

    $('.draggable').each(function() {
    var leftDistance = $(this).offset().left,
        divWidth = $(this).width(),
        divCenter = leftDistance + (divWidth / 1.5),
        windowCenter = scrollLeft + (windowWidth / 1.5),
        distanceFromCenter = Math.abs(divCenter - windowCenter),
        maxDistance = windowWidth / 2,
        opacity;

    if (distanceFromCenter < maxDistance) {
        opacity = 1.5 - (distanceFromCenter / maxDistance);
    } else {
        opacity = 0.25;
    }

    $(this).css('opacity', opacity);
    });
});

$(function() {
    const container = $('.container');
    const containerWidth = container.width();
    const containerHeight = container.height();

    $('img').each(function() {
        const randomTop = Math.random() * (containerHeight - $(this).height());
        const randomLeft = Math.random() * (containerWidth - $(this).width());

        $(this).css({
            top: randomTop + 'px',
            left: randomLeft + 'px'
        });
    }).draggable({
        containment: "body",
        scroll: false
    });
}); 

// Translate vertical scroll into horizontal scroll
//window.addEventListener("wheel", function(e) {
//    e.preventDefault();
//    window.scroll(window.scrollX + e.deltaY, 0);
//}, { passive: false });