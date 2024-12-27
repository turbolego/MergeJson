document.getElementById('inputJson1').addEventListener('input', populateKeys);
document.getElementById('inputJson2').addEventListener('input', populateKeys);

function populateKeys() {
    const inputJson1 = document.getElementById('inputJson1').value;
    const inputJson2 = document.getElementById('inputJson2').value;
    let keys = new Set();

    try {
        const json1 = JSON.parse(inputJson1);
        const json2 = JSON.parse(inputJson2);

        if (Array.isArray(json1) && json1.length > 0) {
            Object.keys(json1[0]).forEach(key => keys.add(key));
        }
        if (Array.isArray(json2) && json2.length > 0) {
            Object.keys(json2[0]).forEach(key => keys.add(key));
        }
    } catch (e) {
        console.error('Invalid JSON');
    }

    const select = document.getElementById('keysToMerge');
    select.innerHTML = '';
    keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
    });
}

function mergeJson() {
    const inputJson1 = document.getElementById('inputJson1').value;
    const inputJson2 = document.getElementById('inputJson2').value;
    const keysToMerge = Array.from(document.getElementById('keysToMerge').selectedOptions).map(option => option.value);
    let outputJson = '';

    try {
        const json1 = JSON.parse(inputJson1);
        const json2 = JSON.parse(inputJson2);
        const mergedJson = json1.map(obj1 => {
            const match = json2.find(obj2 => obj2.Verksemd === obj1.name);
            if (match) {
                keysToMerge.forEach(key => {
                    if (match[key]) {
                        obj1[key] = match[key];
                    }
                });
            }
            return obj1;
        });
        outputJson = JSON.stringify(mergedJson, null, 2);
    } catch (e) {
        outputJson = 'Invalid JSON';
    }

    document.getElementById('outputJson').value = outputJson;
}
