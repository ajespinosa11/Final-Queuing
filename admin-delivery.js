let deliveryCounter = 0;

function nextDeliveryNumber() {
    deliveryCounter++;
    const deliveryNumber = `MLD00${deliveryCounter}`;
    document.getElementById('ready-to-serve').textContent = `Ready to Serve: ${deliveryNumber}`;
    localStorage.setItem('deliveryCounter', deliveryNumber); // Store the full value in localStorage
    addDeliveryToOrderList(deliveryNumber); // Add to Orders to be Processed
    toggleResetButton(); // Check if reset button should be enabled or disabled
}

function resetDeliveryNumber() {
    const ordersDiv = document.getElementById('processing-orders');
    if (ordersDiv.children.length > 0) {
        alert('There are still orders to be processed. Please complete all orders before resetting.');
        return; // Prevent resetting if there are still orders
    }
    
    deliveryCounter = 0;
    document.getElementById('ready-to-serve').textContent = 'Ready to Serve: 000';
    ordersDiv.innerHTML = ''; // Clear the list
    localStorage.setItem('deliveryCounter', '000'); // Reset the counter in localStorage
    resetNowClaiming(); // Clear the "Now Claiming" section
    toggleResetButton(); // Check if reset button should be enabled or disabled
}

function resetNowClaiming() {
    localStorage.setItem('nowClaiming', JSON.stringify([])); // Clear the "Now Claiming" list
}

function addDeliveryToOrderList(deliveryNumber) {
    let ordersDiv = document.getElementById('processing-orders');
    let newOrder = document.createElement('div');
    newOrder.className = 'order-item'; // Adding class for easy styling and identification
    newOrder.textContent = deliveryNumber;
    
    let readyBtn = document.createElement('button');
    readyBtn.textContent = 'Request Ready';
    readyBtn.classList.add('active');
    readyBtn.onclick = function() {
        let nowClaiming = JSON.parse(localStorage.getItem('nowClaiming')) || [];
        nowClaiming.push(deliveryNumber);
        localStorage.setItem('nowClaiming', JSON.stringify(nowClaiming));
        this.classList.remove('active');
        this.classList.add('disabled');
        this.disabled = true; // Disable the button once it's clicked
        
        completeBtn.classList.remove('disabled');
        completeBtn.classList.add('active');
        completeBtn.disabled = false; // Enable the Request Complete button
    };
    
    let completeBtn = document.createElement('button');
    completeBtn.textContent = 'Request Complete';
    completeBtn.classList.add('disabled');
    completeBtn.disabled = true; // Initially disabled
    completeBtn.onclick = function() {
        let nowClaiming = JSON.parse(localStorage.getItem('nowClaiming')) || [];
        nowClaiming = nowClaiming.filter(num => num !== deliveryNumber);
        localStorage.setItem('nowClaiming', JSON.stringify(nowClaiming));
        ordersDiv.removeChild(newOrder);
        toggleResetButton(); // Check if reset button should be enabled or disabled
    };
    
    newOrder.appendChild(readyBtn);
    newOrder.appendChild(completeBtn);
    ordersDiv.appendChild(newOrder);
    toggleResetButton(); // Check if reset button should be enabled or disabled
}

function toggleResetButton() {
    const resetButton = document.getElementById('reset-button');
    if (document.getElementById('processing-orders').children.length > 0) {
        resetButton.classList.remove('active');
        resetButton.classList.add('disabled');
        resetButton.disabled = true;
    } else {
        resetButton.classList.remove('disabled');
        resetButton.classList.add('active');
        resetButton.disabled = false;
    }
}

window.onload = function() {
    toggleResetButton();
};
