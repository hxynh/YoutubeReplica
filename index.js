window.addEventListener("load", (event) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            displayContents(data);
        }
    };
    xhttp.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&q=trending&maxResults=10&key=AIzaSyCyEfvXzth1RqEeHpi-msaBAkGIKVgmABI`, true);
    xhttp.send();
    
});

var searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            displayContents(data);
        }
    };
    var searchValue = document.querySelector('.searchText').value;
    console.log(searchValue);
    xhttp.open("GET", `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}&maxResults=10&key=AIzaSyCyEfvXzth1RqEeHpi-msaBAkGIKVgmABI`, true);
    xhttp.send();
});

function displayContents(data) {
    var contents = document.querySelector('#contents');
    var rightContent = document.querySelector('.right-content');
    rightContent.innerHTML = '';
    rightContent.innerHTML = `
        <div class="tags">
            <button class="tag">All</button>
            <button class="tag">Music</button>                
            <button class="tag">Playlist</button>
            <button class="tag">Gaming</button>
            <button class="tag">Love Songs</button>
            <button class="tag">K-Pop</button>
            <button class="tag">Anime</button>
            <button class="tag">Instrumental</button>
        </div>
        <div class="videos">
        </div>
    `;
    contents.append(rightContent);

    let videosContainer = document.getElementsByClassName('videos');
    
    data.items.forEach(item => {
        let video = document.createElement('div');
        video.classList.add('video');

        video.innerHTML = `
            <img src=${item.snippet.thumbnails.high.url}>
            <div class="video-details">
                <img src=${item.snippet.thumbnails.default.url}>
                <div>
                    <h4>${item.snippet.title}</h4>
                    <p>${item.snippet.channelTitle}</p>
                    <p>${timeElapsed(new Date(item.snippet.publishTime))}</p>
                </div>
            </div>
        `
        videosContainer[0].append(video);
    });
}

function timeElapsed (postedDate){
    var dateNow = Date.now();
    var timeDiff = (dateNow - postedDate)/1000; // Difference in seconds
    
    console.log("Now: "+dateNow+" datePosted: "+postedDate+" timeDiff: "+timeDiff);
    
    if (timeDiff/86400 > 1) //Days/Years:
    {
        if ((timeDiff/86400) >= 365)
            return (parseInt((timeDiff/86400)/365)+" years ago");
        else if ((timeDiff/86400)>30)        
            return (parseInt((timeDiff/86400)/30)+" months ago");
        return (parseInt(timeDiff/86400)+" days ago");
    }
    else if (timeDiff/3600 > 1)//Hours
    {
        return (parseInt(timeDiff/3600)+" hrs ago");
    }
    else if(timeDiff/60 > 1) //Minutes
    {
        return (parseInt(timeDiff/60)+" mins ago");
    }
    return((parseInt(timeDiff)+" secs ago")); //Seconds
}

function hideMenu() {
    var leftContent = document.getElementsByClassName("left-content");
    var rightContent = document.getElementsByClassName("right-content");
    console.log(leftContent[0].style);
    if (leftContent[0].style.display === "" || leftContent[0].style.display === "flex") {
        leftContent[0].style.display = "none";
        rightContent[0].style.margin = "30px";
    }
    else {
        leftContent[0].style.display = "flex";
    }
}