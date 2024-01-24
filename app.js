// firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to update parking status
function updateParkingStatus() {
    const parkingBlocks = document.querySelectorAll('.parking-block');

    parkingBlocks.forEach((block, index) => {
        const parkingRef = database.ref(`parking/parking${index + 1}`);
        parkingRef.once('value', (snapshot) => {
            const status = snapshot.val();
            console.log(snapshot)
            console.log(status)

            if (status === -1) {
                block.className = 'parking-block green';
                block.innerHTML = '';
            } else if (status === 0) {
                block.className = 'parking-block yellow';
                block.innerHTML = '';
            } else if (status === 1) {
                block.className = 'parking-block red';
                block.innerHTML = '<img src="car.jpg" alt="Car">';
            }
        });
    });
}

// Update parking status every 5 seconds
setInterval(updateParkingStatus, 5000);

// Initial update
updateParkingStatus();
