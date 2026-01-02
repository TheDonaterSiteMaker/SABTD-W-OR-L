
const units = [
    { name: "Nobini-Pizanini", price: "100$", demand: "3/10", rarity: "uncommon", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/52163474745.png" },
    { name: "Lirili Larila", price: "150$", demand: "4/10", rarity: "uncommon", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/42154743224.png" },
    { name: "Boneca Ambalabu", price: "200$", demand: "4/10", rarity: "rare", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/241562112421.png" },
    { name: "Tung Sahur", price: "$250", demand: "5/10", rarity: "rare", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/TungtungPizdun.png" },
    { name: "Ta Sahur", price: "$200", demand: "5.5/10", rarity: "rare", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/9977435231.png" },
    { name: "Cappuccino Assassino", price: "$400", demand: "3.5/10", rarity: "epic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/7686586585.png" },
    { name: "Tree Tree Sahur", price: "$400", demand: "6.3/10", rarity: "epic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067461-removebg-preview.png" },
    { name: "Br Br Patapim", price: "$500", demand: "4.5/10", rarity: "epic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067462-removebg-preview.png" },
    { name: "Trulimero Trulichina", price: "$200", demand: "5/10", rarity: "epic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/6767676767.png" },
    { name: "Ballerina Cappuccina", price: "$300", demand: "7/10", rarity: "legendary", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067460-removebg-preview.png" },
    { name: "Cocoa Assassino", price: "$400", demand: "6/10", rarity: "legendary", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067469-removebg-preview.png" },
    { name: "Shimpanzini Bananini", price: "$500", demand: "6.7/10", rarity: "legendary", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/iiiiiiiiiiiii.png" },
    { name: "Ballerina Peppermintina", price: "$400", demand: "8/10", rarity: "mythic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067468-removebg-preview.png" },
    { name: "Bombardiro Crocodilo", price: "$600", demand: "7/10", rarity: "mythic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/5555555555555555555555.png" },
    { name: "Bombombini Gusini", price: "$600", demand: "6.7/10", rarity: "mythic", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067465-removebg-preview.png" },
    { name: "Cocofanto Elefanto", price: "$1000", demand: "7.3/10", rarity: "brainrotgod", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/523623512312.png" },
    { name: "Tralalelo Tralala", price: "$1200", demand: "7.5/10", rarity: "brainrotgod", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067464-removebg-preview.png" },
    { name: "Reindeer Tralala", price: "$2000", demand: "7.1/10", rarity: "brainrotgod", img: "file:///C:/Users/Anome/Downloads/IMG_20251231_140616_101-removebg-preview.png" },
    { name: "Odin Din Din Dun", price: "$1000", demand: "7.5/10", rarity: "brainrotgod", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067466-removebg-preview.png" },
    { name: "La Vacca Prese Presente", price: "$2000", demand: "8/10", rarity: "secret", img: "file:///C:/Users/Anome/Downloads/Telegram%20Desktop/1000067470-removebg-preview.png" },
    { name: "La Vacca Saturnita", price: "$2000", demand: "8.5/10", rarity: "secret", img: "file:///C:/Users/Anome/Downloads/IMG_20251231_140616_854-removebg-preview.png" }
];

function renderUnits(data = units) {
    const container = document.getElementById('unit-container');
    if (!container) return;
    container.innerHTML = "";

    data.forEach(unit => {
        const card = document.createElement('div');
        card.className = 'unit-card';
        
        // Извлекаем имя файла без расширения для резервного поиска
        const pathParts = unit.img.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const basePath = pathParts.slice(0, -1).join('/') + '/' + fileName.split('.')[0];
        
        card.innerHTML = `
            <div class="card-img-wrap" style="background:#111; height:150px; border-radius:10px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img src="${unit.img}" 
                     style="max-width:100%; max-height:100%; object-fit:contain;"
                     onerror="tryNextExtension(this, '${basePath}')">
            </div>
            <span class="rarity-tag ${unit.rarity}-tag">${unit.rarity.toUpperCase()}</span>
            <h3>${unit.name}</h3>
            <div style="color:#00ffa3; font-weight:bold;">${unit.price}</div>
        `;
        
        card.onclick = () => openModule(unit);
        container.appendChild(card);
    });
}

// Функция пробует разные форматы изображений, если основной не найден
function tryNextExtension(imgElement, basePath) {
    const exts = ['.png', '.jpg', '.jpeg', '.webp'];
    const currentSrc = imgElement.src;
    const currentExt = '.' + currentSrc.split('.').pop().split('?')[0];
    let nextIdx = exts.indexOf(currentExt) + 1;

    if (nextIdx > 0 && nextIdx < exts.length) {
        imgElement.src = basePath + exts[nextIdx];
    } else if (nextIdx === 0) {
        // Если текущее расширение не в списке, пробуем первое альтернативное
        imgElement.src = basePath + exts[1];
    } else {
        // Если ничего не подошло, показываем заглушку
        imgElement.style.display = 'none';
        imgElement.parentElement.innerHTML = '<span style="color:#444; font-size:10px;">IMAGE NOT FOUND</span>';
    }
}

function filterUnits(rarity) {
    if (rarity === 'all') renderUnits(units);
    else renderUnits(units.filter(u => u.rarity === rarity));
}

function searchUnits() {
    const val = document.getElementById('searchInput').value.toLowerCase();
    renderUnits(units.filter(u => u.name.toLowerCase().includes(val)));
}

function openModule(unit) {
    const modal = document.getElementById('unit-modal');
    if(!modal) return;
    document.getElementById('m-name').innerText = unit.name;
    document.getElementById('m-price').innerText = unit.price;
    document.getElementById('m-demand').innerText = unit.demand;
    modal.classList.remove('hidden');
}

function closeModule() { 
    document.getElementById('unit-modal').classList.add('hidden'); 
}

window.onload = () => renderUnits();