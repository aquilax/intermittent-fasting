(function(context){

  var config = {
    startTime: "20:00",
    endTime: "12:00"
  }

  var $currentTimeExact;
  var $startTime;
  var $startTimeExact;
  var $endTime;
  var $endTimeExact;


  function getNext(now, time) {
    var timeArr = time.split(":");
    goalHours = parseInt(timeArr[0], 10);
    goalMinutes = parseInt(timeArr[1], 10);
    nowHour = now.hours();
    nowMinues = now.minutes();

    if (nowHour > goalHours || (nowHour === goalHours && nowMinues >= goalMinutes)) {
      return now.add(1, 'days').hours(goalHours).minutes(goalMinutes);
    }
    return now.hours(goalHours).minutes(goalMinutes);
  }

  function initTimers(now) {
    $currentTimeExact.innerHTML = now.format('LLL');

    var startTime = getNext(now.clone(), config.startTime);
    $startTime.innerHTML = now.to(startTime);
    $startTimeExact.innerHTML = startTime.calendar();

    var endTime = getNext(now.clone(), config.endTime);
    $endTime.innerHTML = now.to(endTime);
    $endTimeExact.innerHTML = endTime.calendar();
  }

  function setupMoment() {
    moment.updateLocale('en', {
      longDateFormat : {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "MM/DD/YYYY",
          l: "M/D/YYYY",
          LL: "MMMM Do YYYY",
          ll: "MMM D YYYY",
          LLL: "MMMM Do YYYY LT",
          lll: "MMM D YYYY LT",
          LLLL: "dddd, MMMM Do YYYY LT",
          llll: "ddd, MMM D YYYY LT"
      }
  });
  }

  function init(context) {
    $currentTimeExact = context.document.getElementById('currentTimeExact');
    $startTime = context.document.getElementById('startTime');
    $startTimeExact = context.document.getElementById('startTimeExact');
    $endTime = context.document.getElementById('endTime');
    $endTimeExact = context.document.getElementById('endTimeExact');

    setupMoment();
    initTimers(moment());
    setInterval(function(){
      initTimers(moment());
    }, 10000)
  }

  context.document.addEventListener('DOMContentLoaded', function() {
    init(context);
  }, false);

})(window);
