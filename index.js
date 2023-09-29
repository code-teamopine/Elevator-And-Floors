//elevator enum
const Elevators = {
    A: 1,
    B: 2,
    C: 3,
};
Object.freeze(Elevators);

//initial random floor selection
var elevatorA = Math.floor((Math.random() * 20) + 1);
var elevatorB = Math.floor((Math.random() * 20) + 1);
var elevatorC = Math.floor((Math.random() * 20) + 1);

var index = {
    init: function () {
        //create elevators and floors
        for(var i = 1; i <= 20; i++)
        {
            $('.container').append(`
                <li class="elevatorsAndFloors" data-elevatorsAndFloors="`+i+`">
                    <span name="elevatorA" class="elevator elevatorA"><i class="fa fa-circle fa-2x"></i></span>
                    <span name="elevatorB" class="elevator elevatorB"><i class="fa fa-circle fa-2x"></i></span>
                    <span name="elevatorC" class="elevator elevatorC"><i class="fa fa-circle fa-2x"></i></span>
                    <button data-floor=`+i+` class="btn btn-warning floorButton">FLOOR `+i+`</button>
                </li>
            `);
        }

        index.bindEvents();

        //initial elevator floor selection
        $("li[data-elevatorsAndFloors='" + elevatorA + "']").find("span.elevatorA").addClass("text-success");
        $("li[data-elevatorsAndFloors='" + elevatorB + "']").find("span.elevatorB").addClass("text-success");
        $("li[data-elevatorsAndFloors='" + elevatorC + "']").find("span.elevatorC").addClass("text-success");
    },

    bindEvents: function () {
        //floor button click
        $(".floorButton").click(function (e) {
            var floor = $(this).attr("data-floor");
            var closestElevatorFloor = index.closestElevatorFloor(floor);
            var closestElevator = index.elevatorAtFloor(closestElevatorFloor);
            index.moveElevator(closestElevator, floor);
        });
    },

    allElevators: function() {
        return [elevatorA, elevatorB, elevatorC];
    },

    closestElevatorFloor: function(floor) {
        return index.allElevators().reduce(function (prev, curr) {
            return (Math.abs(curr - floor) < Math.abs(prev - floor) ? curr : prev);
        });
    },

    elevatorAtFloor: function(floor) {
        if (elevatorA == floor)
            return Elevators.A;
        if (elevatorB == floor)
            return Elevators.B;
        if (elevatorC == floor)
            return Elevators.C;
    },

    moveElevator: function(elevator, floor)
    {
        switch (elevator) {
            case Elevators.A:
                elevatorA = floor;
                $("span.elevatorA").removeClass("text-success");
                $("li[data-elevatorsAndFloors='"+floor+"']").find("span.elevatorA").addClass("text-success");
                break;
            case Elevators.B:
                elevatorB = floor;
                $("span.elevatorB").removeClass("text-success");
                $("li[data-elevatorsAndFloors='" + floor + "']").find("span.elevatorB").addClass("text-success");
                break;
            case Elevators.C:
                elevatorC = floor;
                $("span.elevatorC").removeClass("text-success");
                $("li[data-elevatorsAndFloors='" + floor + "']").find("span.elevatorC").addClass("text-success");
                break;
        }

        console.log("A=" + elevatorA + "/B=" + elevatorB + "/C=" + elevatorC)
    }
};

index.init();