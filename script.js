document.getElementById('inputJson1').addEventListener('input', populateKeys);
document.getElementById('inputJson2').addEventListener('input', populateKeys);

function populateKeys() {
    const inputJson1 = document.getElementById('inputJson1').value.trim();
    const inputJson2 = document.getElementById('inputJson2').value.trim();
    let keys1 = new Set();
    let keys2 = new Set();

    try {
        if (inputJson1) {
            const json1 = JSON.parse(inputJson1);
            if (Array.isArray(json1) && json1.length > 0) {
                Object.keys(json1[0]).forEach(key => keys1.add(key));
            }
        }
        if (inputJson2) {
            const json2 = JSON.parse(inputJson2);
            if (Array.isArray(json2) && json2.length > 0) {
                Object.keys(json2[0]).forEach(key => keys2.add(key));
            }
        }
    } catch (e) {
        console.error('Invalid JSON in input fields:', e);
        return;
    }

    const select1 = document.getElementById('keyFromJson1');
    const select2 = document.getElementById('keyFromJson2');
    const select3 = document.getElementById('keyToKeep');
    select1.innerHTML = '';
    select2.innerHTML = '';
    select3.innerHTML = '';

    keys1.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select1.appendChild(option);
    });

    keys2.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select2.appendChild(option);
    });

    keys1.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select3.appendChild(option);
    });

    keys2.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select3.appendChild(option);
    });
}

function mergeJson() {
    const inputJson1 = document.getElementById('inputJson1').value.trim();
    const inputJson2 = document.getElementById('inputJson2').value.trim();
    const keyFromJson1 = document.getElementById('keyFromJson1').value;
    const keyFromJson2 = document.getElementById('keyFromJson2').value;
    const keyToKeep = document.getElementById('keyToKeep').value;
    let outputJson = '';

    try {
        const json1 = JSON.parse(inputJson1);
        const json2 = JSON.parse(inputJson2);
        const mergedJson = json1.map(obj1 => {
            const match = json2.find(obj2 => obj2[keyFromJson2] === obj1[keyFromJson1]);
            if (match) {
                obj1[keyToKeep] = match[keyFromJson2];
            }
            return obj1;
        });
        outputJson = JSON.stringify(mergedJson, null, 2);
    } catch (e) {
        outputJson = 'Invalid JSON: ' + e.message;
    }

    document.getElementById('outputJson').value = outputJson;
}
