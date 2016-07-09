(function(context){

  var config = {
    startTime: "20:00",
    endTime: "12:00"
  }

  function getNext(now, time) {
    var timeArr = time.split(":");
    goalHours = parseInt(timeArr[0], 10);
    goalMinutes = parseInt(timeArr[1], 10);
    nowHour = now.hours();
    nowMinues = now.minutes();

    if (
      nowHour > goalHours ||
      (nowHour === goalHours && nowMinues >= goalMinutes)
    ){
      // passed, set to tomorrow goal time
      return now.add(1, 'days').hours(goalHours).minutes(goalMinutes);
    }
    return now.hours(goalHours).minutes(goalMinutes);
  }

  function initTimers(now) {
    var $currentTimeExact = context.document.getElementById('currentTimeExact');
    $currentTimeExact.innerHTML = now.format('LLL');

    var $startTime = context.document.getElementById('startTime');
    var $startTimeExact = context.document.getElementById('startTimeExact');
    var startTime = getNext(now.clone(), config.startTime);
    $startTime.innerHTML = now.to(startTime);
    $startTimeExact.innerHTML = startTime.calendar();

    var $endTime = context.document.getElementById('endTime');
    var $endTimeExact = context.document.getElementById('endTimeExact');
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
    setupMoment();
    initTimers(moment());
  }

  context.document.addEventListener('DOMContentLoaded', function() {
    init(context);
  }, false);

})(window);
