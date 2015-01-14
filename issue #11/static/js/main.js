$(function() {
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.oRequestAnimationFrame      ||
               window.msRequestAnimationFrame     ||
               function(callback) {
                   window.setTimeout(callback, 1000 / 60);
               };
    })();
    
	var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    
    var $input = $(".b-input"),
        $start = $(".b-button[type='submit']"),
        $stop  = $(".b-button[type='reset']");
    
    var work = false,
        ampl = 0;
    
    $start.click(function(event) {
        event.preventDefault();
        
        ampl = +$input.val();
        
        $input.prop('disabled', true);
        $start.prop('disabled', true);
        $stop.prop('disabled', false);
        
        work = true;
        animate((new Date()).getTime());
    });
    
    $stop.click(function(event) {
        event.preventDefault();
        
        $input.prop('disabled', false);
        $start.prop('disabled', false);
        $stop.prop('disabled', true);
        
        work = false;
    });
    
    function stop() {
        work = false;
    }
    
    function animate(startTime) {
        var time = (new Date()).getTime() - startTime;
        draw(ampl * Math.cos(time / 500) / Math.exp(time / 10000));
        
        if (work) {
            requestAnimFrame(function() {
                animate(startTime);
            });
        }
    }
    
    function draw(angle) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'blue';
        
        ctx.save();
    
        ctx.translate(200, 0);
        ctx.rotate(angle * Math.PI / 180);
    
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 150);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(0, 150, 15, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        
        ctx.restore();
    }
    
    draw(0);
});
