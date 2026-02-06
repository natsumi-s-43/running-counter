document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const dateInput = document.getElementById('date');
    const distanceInput = document.getElementById('distance');
    const list = document.getElementById('list');
    const totalDistance = document.getElementById('totalDistance');

    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`; // 例: "2025-12"
    const storageKey = `runningRecords-${currentMonth}`;

    let records = JSON.parse(localStorage.getItem(storageKey)) || [];

    function updateTable() {
        list.innerHTML = '';
        let total = 0;
        records.forEach((rec, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${rec.date}</td>
                <td>${rec.distance.toFixed(1)}</td>
                <td><button data-index="${index}">削除</button></td>
            `;
            list.appendChild(tr);
            total += rec.distance;
        });
        totalDistance.textContent = total.toFixed(1);

        // 削除ボタン
        list.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', e => {
                const i = e.target.dataset.index;
                records.splice(i, 1);
                saveData();
                updateTable();
            });
        });
    }

    function saveData() {
        localStorage.setItem(storageKey, JSON.stringify(records));
    }

    addBtn.addEventListener('click', () => {
        const date = dateInput.value;
        const distance = parseFloat(distanceInput.value);
        if(date && !isNaN(distance)) {
            const existing = records.find(r => r.date === date);
            if(existing) {
                existing.distance = distance; // 修正
            } else {
                records.push({date, distance});
            }
            saveData();
            updateTable();
            dateInput.value = '';
            distanceInput.value = '';
        } else {
            alert('日付と距離を入力してください');
        }
    });

    // ページ読み込み時にテーブル表示
    updateTable();
});
