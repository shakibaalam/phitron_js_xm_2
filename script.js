const div = document.getElementById('results');
const totalMem = document.getElementById('total_mem');
const group = document.getElementById('group_div');
let count = 0;
const Url = 'https://';
const addedPlayers = new Set(); 

const allPlayers = () => {
    console.log('all players');
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=`)
    .then(res => res.json())
    .then(data => {
        if (data?.player?.length > 0) {
            const playerData = data?.player?.slice(0, 12);
            console.log(playerData);
            displayPlayer(playerData);
        } else {
            div.innerHTML = `<h2 class='text-center my-[10px] text-[20px] font-bold'>No Player Found</h2>`;
        }
    })
    .catch(err => console.log(err));
};

const searchPlayer = () => {
    const searchInput = document.getElementById('search').value;
    console.log(searchInput);
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput}`)
    .then(res => res.json())
    .then(data => {
        if (data?.player?.length > 0) {
            const playerData = data?.player?.slice(0, 12);
            console.log(playerData);
            displayPlayer(playerData);
        } else {
            div.innerHTML = `<h2 class='text-center my-[10px] text-[20px] font-bold'>No Player Found</h2>`;
        }
    })
    .catch(err => console.log(err));
};

const displayPlayer = (data) => {
    div.innerHTML = '';
    data?.map(d => {
        const description = d?.strDescriptionEN?.replace(/'/g, "&apos;").replace(/"/g, "&quot;") || '';
        div.innerHTML += `
        <div class="border border-gray-300 rounded p-5">
            <img src="${d?.strThumb}" class='w-full h-[250px]' alt="player_img">
            <div>
                <h2 class='text-center my-[10px] text-[20px] font-bold'>${d?.strPlayer}</h2>
                <p class='text-center my-[10px] text-[14px]'>Nationality: ${d?.strNationality}</p>
                <p class='text-center my-[10px] text-[14px]'>Team: ${d?.strTeam}</p>
                <p class='text-center my-[10px] text-[14px]'>Sport: ${d?.strSport}</p>
                <p class='text-center my-[10px] text-[14px]'>Salary: ${d?.strWage}</p>
                <p class='text-center my-[10px] text-[14px]'>Gender: ${d?.strGender}</p>
                <div class='text-[20px] flex justify-center align-center gap-[10px]'>
                    <a target="_blank" href="${Url + d?.strTwitter}">
                      <i class="fa-brands fa-twitter text-blue-500"></i>
                    </a>
                    <a target="_blank" href="${Url + d?.strInstagram}">
                      <i class="fa-brands fa-square-instagram text-red-500"></i>
                    </a>
                    <a target="_blank" href="${Url + d?.strFacebook}">
                      <i class="fa-brands fa-facebook text-blue-500"></i>
                    </a>
                </div>
                <div class='flex flex-col justify-center align-center'>
                    <button onclick='addToGroup("${d?.strPlayer}", "${d?.strThumb}", "${d?.idPlayer}")' class='my-[5px] bg-green-400 text-white font-semibold text-[14px] p-2 rounded'>Add to group</button>
                    <button onclick="showDetails('${d?.idPlayer}')" class=' bg-gray-400 text-white font-semibold text-[14px] p-2 rounded'>Details</button>
                </div>
            </div>
        </div>
        `;
    });
};

const showDetails = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
        if (data?.players?.length > 0) {
            const d = data?.players[0];
            document.getElementById('details').style.display = 'block';
            const showDiv = document.getElementById('details');
            showDiv.innerHTML = `<div class='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#252525b0] z-[99999999]'>
                <div class=" bg-[#FAFAFA] rounded-[8px] w-[90%] md:w-[60%]  xl:w-[50%] ">
                        <div class="text-right flex justify-end">
                            <i onclick='handleClose()' class="fa-solid fa-circle-xmark text-[40px] cursor-pointer m-[-14px] text-red-500"></i>
                        </div>

                        <div class='p-[40px] text-start'>
                            <img src="${d?.strThumb}" class='w-[200px] h-[250px] mx-auto' alt="player_img">
                            <span class='text-textColor font-[600] text-[16px] leading-[18px] break-all my-3'>${d?.strPlayer}</span>

                            <p class='text-textColor font-[400] text-[12px] leading-[18px] mb-[10px]'>Nationality: ${d?.strNationality}</p>
                            <p class='text-textColor font-[400] text-[12px] leading-[18px] mb-[10px]'>Date of Birth: ${d?.dateBorn}</p>
                            <p class='text-textColor font-[400] text-[12px] leading-[18px] mb-[20px]'>${d?.strDescriptionEN}</p>

                            <div class='text-[20px] flex justify-center align-center gap-[10px] my-3'>
                                <a target="_blank" href="${d?.strTwitter}">
                                <i class="fa-brands fa-twitter text-blue-500"></i>
                                </a>
                                <a target="_blank" href="${d?.strInstagram}">
                                <i class="fa-brands fa-square-instagram text-red-500"></i>
                                </a>
                                <a target="_blank" href="${d?.strFacebook}">
                                <i class="fa-brands fa-facebook text-blue-500"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;
        } else {
            div.innerHTML = `<h2 class='text-center my-[10px] text-[20px] font-bold'>No Player Found</h2>`;
        }
    })
    .catch(err => console.log(err));
};

const addToGroup = (name, img, id) => {
    if (addedPlayers.has(id)) {
        alert('Player is already in the group.');
        return;
    }

    if (count < 11) {
        count += 1;
        addedPlayers.add(id);
        totalMem.innerHTML = count;
        document.getElementById('group').style.display = 'block';
        group.innerHTML += `
            <div class="border border-gray-300 rounded p-5 mb-4">
                <img src="${img}" class='w-full h-[250px]' alt="player_img">
                <div>
                    <h2 class='text-center my-[10px] text-[20px] font-bold'>${name}</h2>
                    <p></p>
                </div>
            </div>
        `;
    } else {
        alert('Group is full! You cannot add more players.');
    }
};

const handleClose = () => {
    document.getElementById('details').style.display = 'none';
};

allPlayers();
