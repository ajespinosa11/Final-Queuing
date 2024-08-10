function updateUserCounters() {
    const sellingCounter = localStorage.getItem('sellingCounter') || '000';
    const deliveryCounter = localStorage.getItem('deliveryCounter') || '000';
    const consultationCounter = localStorage.getItem('consultationCounter') || '000';

    document.getElementById('selling-counter-number').textContent = sellingCounter;
    document.getElementById('delivery-counter-number').textContent = deliveryCounter;
    document.getElementById('consultation-counter-number').textContent = consultationCounter;
}

function updateNowClaiming() {
    const nowClaiming = JSON.parse(localStorage.getItem('nowClaiming')) || [];
    const nowClaimingDiv = document.getElementById('now-claiming');
    nowClaimingDiv.innerHTML = ''; // Clear current display

    nowClaiming.forEach(num => {
        const numDiv = document.createElement('div');
        numDiv.textContent = num;
        nowClaimingDiv.appendChild(numDiv);
    });
}

// Update counters on page load
window.onload = function() {
    updateUserCounters();
    updateNowClaiming();
};

// Optionally update counters and "Now Claiming" every second
setInterval(function() {
    updateUserCounters();
    updateNowClaiming();
}, 1000);
