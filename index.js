window.onclick = function () {
    let searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", searchImgs);
}

function searchImgs(e) {
    e.preventDefault();
    let str = document.querySelector("#imgSearch").value;
    getImgs(str);
}

async function getImgs(str) {
    try {
        let res = await fetch(`https://api.unsplash.com/search/photos?per_page=100&query=${str}`, {
            headers: {
                'Authorization': 'Client-ID WYxvqBZJZNGDrKICInnzfrHy-kYI43F_7Rn4ecefMzc'
            }
        });
        let data = await res.json();

        if (!res.ok) {
            const err = { status: res.status, statusText: res.statusText }
            throw err;
        }
        viewImgs(data.results);

    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        console.log(message)
    }
}

function viewImgs(imgs) {
    document.querySelector("#txtIntro").style.display = "none";
    let list = document.querySelector("#listImgs");
    
    list.innerHTML = "";
    imgs.forEach(img => {
        let imgItem = document.createElement("img");
        imgItem.src = img.urls.regular;

        let dwnBtn = document.createElement("a");
        dwnBtn.innerHTML = "<i class='fa fa-download'></i>";
        dwnBtn.classList.add("dwnBtn");
        dwnBtn.href = img.links.download;
        dwnBtn.rel = "nofollow";
        dwnBtn.download = "";
        dwnBtn.title = "Descargar foto";

        let articleItem = document.createElement("article");
        articleItem.appendChild(imgItem);
        articleItem.appendChild(dwnBtn);

        list.appendChild(articleItem);
    });
}
