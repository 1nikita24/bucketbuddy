var arrData = [];
var labelArr = [];
$.get("/api/countactivities", function(data) {
    console.log(data);
    for (var i = 0; i < 10; i++) {
        arrData.push(data[i].ActCount)
    };
    console.log(arrData);


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Skydiving', 'Run Marathon', 'New Language', 'Go to Alaska', 'Go camping', 'Live in Hobbit Hole','Go to Superbowl','Ride Tandom bike','Meet Bill Gates','Climb Mt.Everst'],
            datasets: [{
                label: 'Trending',
                data: arrData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(7, 223, 207, 0.2)',
                    'rgba(233, 7, 203, 0.2)',
                    'rgba(28, 94, 1, 0.2)',
                    'rgba(88, 23, 12, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(7, 223, 207, 0.2)',
                    'rgba(233, 7, 203, 0.2)',
                    'rgba(28, 94, 1, 0.2)',
                    'rgba(88, 23, 12, 0.2)'
                ],
                borderWidth: 3
            }]
        },
        options: {
           
        }
    });
});