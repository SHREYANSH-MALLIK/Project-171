AFRAME.registerComponent("markerhandler",{
    init: async function(){
        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost();
        })
        this.el.addEventListener("markerFound", () => {
            var markerId = this.el.id;      
            this.handleMarkerFound(toys, markerId);
        })
    },

    handleMarkerFound: function(){

        var todayDate = new Date()
        var todayDay = todayDate.getDay()

        var days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
        ]

        var toy = toys.filter(toy => toy.id === markerId)[0]
        if(toy.unavailable_days.includes(days[todayDay])){
        swal({
            icon : "warning",
            title : toy.toy_name.toUpperCase(),
            text : "This toy is not available today",
            timer : 2500,
            buttons : false
        })
        } else {
        
        }

        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "flex"

        var orderSummaryButton = document.getElementById("order-summary-button")
        var orderButton = document.getElementById("order-button")

        orderSummaryButton.addEventListener("click",function(){
            swal({
                icon : "warning",
                title: "Order Summary",
                text : "Work In Progress"
            })
        })

        orderButton.addEventListener("click",() => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks For Order!",
                text: " ",
                timer: 2000,
                buttons: false
            })
        })
    },

    handleMarkerLost: function(){
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "none"
    },

    gettoys: async function () {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      }
})