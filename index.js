
// Load API
const loadAllPhones = async (status, searchText) => {
    // console.log(searchText);
    document.getElementById('spinner').style.display = 'none';

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`)
    const data = await response.json();

    if (status) {
        displayAllPhones(data.data);
    } else {
        displayAllPhones(data.data.slice(0, 6));
    }
}

// Display All Phones
const displayAllPhones = (phones) => {
    console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    
    // 
    const showBtn = document.getElementById('show-btn');
    if(phones.length === 0){
        showBtn.classList.add('hidden');
        phonesContainer.classList.remove('grid');
        phonesContainer.innerHTML = `
            <div class="text-center text-red-500 py-10">
                <h2 class='text-2xl font-bold'>Sorry! No product found. Please search another device?</h2>
            </div>
        `;
    }else{
        phonesContainer.classList.add('grid');
        showBtn.classList.remove('hidden');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const {brand, phone_name, slug, image} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-gray-100 shadow m-2">
                <figure class="px-10 pt-10">
                    <img
                    src=${image}
                    alt="Coming soon..."
                    class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${brand}</h2>
                    <p>${phone_name}</p>
                    <div class="card-actions">
                    <button onclick=(phoneDetails('${slug}')) class="btn bg-green-400">Show Details</button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(div)
    })
}

// Show Phone Details
const phoneDetails = async(details) => {
    // console.log(details);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    const data = await response.json();
    console.log(data.data.mainFeatures);
    const modalContainer = document.getElementById('modal-container');
    const {image, name, brand, releaseDate} = data.data;
    const {chipSet, displaySize, memory, storage} = data.data.mainFeatures;
    console.log(image);
    modalContainer.innerHTML = `
        <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class='md:flex gap-7'>
                <div class="flex justify-center items-center">
                    <img src=${image} alt='phones...'/>
                </div>
                <div>
                    <h1><span class='font-bold'>Brand:</span> <span class='font-bold text-xl'>${brand}</span></h1>
                    <p><span class='font-bold'>Name:</span> ${name}</p>
                    <p><span class='font-bold'>Release Date:</span> ${releaseDate}</p>
                    <p><span class='font-bold'>ChipSet:</span> ${chipSet}</p>
                    <p><span class='font-bold'>Display Size:</span> ${displaySize}</p>
                    <p><span class='font-bold'>Memory:</span> ${memory}</p>
                </div>
            </div>
        </div>
        </dialog>
    `;
    my_modal_3.showModal();
}

// Show All Btn click then All data showing
const handleShowAll = () => {
    // console.log('click');
    loadAllPhones(true, 'iphone')
}

// Handle Search Btn
const handleSearch = () => {
    // console.log('check');
    const searchText = document.getElementById('search-box').value;
    document.getElementById('spinner').style.display = 'block';
    setTimeout(function () {
        // console.log('wait 2 seconds');
        loadAllPhones(false, searchText);
    }, 500)
}

loadAllPhones(false, 'iphone');