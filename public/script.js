document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const donor = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        bloodGroup: document.getElementById('bloodGroup').value.toUpperCase(),
        contact: document.getElementById('contact').value,
        lastDonationDate: document.getElementById('lastDonationDate').value
    };

    const res = await fetch('/api/donor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donor)
    });

    const data = await res.json();
    alert(data.message);
    loadDonors();
});

document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inventory = {
        bloodGroup: document.getElementById('invBloodGroup').value.toUpperCase(),
        unitsAvailable: document.getElementById('unitsAvailable').value
    };

    const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventory)
    });

    const data = await res.json();
    alert(data.message);
    loadInventory();
});

async function loadDonors() {
    const res = await fetch('/api/donors');
    const donors = await res.json();
    const list = document.getElementById('donorList');
    list.innerHTML = '';
    donors.forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.name} (${d.bloodGroup}) - ${d.contact}`;
        list.appendChild(li);
    });
}

async function loadInventory() {
    const res = await fetch('/api/inventory');
    const inventory = await res.json();
    const list = document.getElementById('inventoryList');
    list.innerHTML = '';
    inventory.forEach(i => {
        const li = document.createElement('li');
        li.textContent = `${i.bloodGroup} - ${i.unitsAvailable} units (Updated: ${new Date(i.lastUpdated).toLocaleDateString()})`;
        list.appendChild(li);
    });
}

loadDonors();
loadInventory();
