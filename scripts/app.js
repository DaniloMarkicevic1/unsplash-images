let i = 0;
const API_KEY = 'oqIp3Gl9lXVGzCgOK8SGXM9NSs-5UAqv8W_JTs8jvOA';
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const overlay__content = document.querySelector('.overlay__content');
const overlay__inner = document.querySelector('.overlay__inner');
const spinner = document.querySelector('.spinner');
const images = document.querySelector('.images');
const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modalImg');
getData();
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        i++;
        getData();
    }
});

btn.addEventListener('click', (e) => {
    if (images.classList[1] === 'grid') {
        btn.innerText = 'Grid View';
        images.classList.remove('grid');
        images.classList.add('list');
    } else {
        btn.innerText = 'List View';
        images.classList.remove('list');
        images.classList.add('grid');
    }
});
body.addEventListener('click', (e) => {
    if (e.target.src) {
        modalImg.setAttribute('src', e.target.src);
    } else {
        modalImg.setAttribute('src', '');
    }
});
function getData() {
    overlay.classList.add('overlay');
    overlay__content.classList.add('overlay__content');
    overlay__inner.classList.add('overlay__inner');
    spinner.classList.add('spinner');
    //Fetch images
    fetch(
        `https://api.unsplash.com/photos?page=${
            i + 1
        }&per_page=12&client_id=${API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            const array = [];
            let imgID = '';
            data.forEach((pic) => {
                imgID = pic.id;
                // Fetching download numbers of Image
                fetch(
                    `https://api.unsplash.com/photos/${imgID}?&client_id=${API_KEY}`
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        stats.innerHTML = `<p>Likes: ${pic.likes}</p><p>Downloads: ${data.downloads}</p> `;
                    });
                // Creating HTML items
                const wrapper = this.document.createElement('div');
                const wrapper2 = this.document.createElement('div');
                const img = this.document.createElement('img');
                const stats = this.document.createElement('div');
                const avatar = this.document.createElement('img');
                const username = this.document.createElement('div');
                const user = this.document.createElement('p');
                const portfolio = this.document.createElement('p');
                const socialMedia = this.document.createElement('div');
                const twitter = this.document.createElement('p');
                const instagram = this.document.createElement('p');
                // Adding InnerHtml/InnerText
                if (!pic.user.social.portfolio_url) {
                    portfolio.innerText = `Portfolio: Not Available`;
                } else {
                    portfolio.innerHTML = `Portfolio: <a href=${pic.user.social.portfolio_url}>${pic.user.social.portfolio_url}</a>`;
                }
                if (pic.user.social.twitter_username) {
                    twitter.innerHTML = `Twitter:<a href='https://www.twitter.com/${pic.user.social.twitter_username}' target=_blank>${pic.user.social.twitter_username}</a>`;
                } else {
                    twitter.innerText = `Twitter: Not Available`;
                }
                if (pic.user.social.instagram_username) {
                    instagram.innerHTML = `Instagram:<a href='https://www.instagram.com/${pic.user.social.instagram_username}' target=_blank>${pic.user.social.instagram_username}</a>`;
                } else {
                    instagram.innerText = `Instagram: Not Available`;
                }
                user.innerHTML = `<p>Username: ${pic.user.username}</p>`;
                // Adding attributes
                avatar.setAttribute('src', pic.user.profile_image.large);
                avatar.setAttribute('alt', 'avatar');
                avatar.setAttribute('class', 'avatar');
                username.setAttribute('class', 'username');
                img.setAttribute('src', pic.urls.small);
                img.setAttribute('alt', pic.alt_description);
                img.setAttribute('class', 'mainImg');
                wrapper.setAttribute('class', 'wrapper');
                wrapper2.setAttribute('class', 'wrapper2');
                stats.setAttribute('class', 'stats');
                socialMedia.setAttribute('class', 'socialMedia');
                portfolio.setAttribute('class', 'portfolio');
                //Appending items
                images.appendChild(wrapper);
                wrapper.appendChild(img);
                wrapper.appendChild(wrapper2);
                wrapper2.appendChild(username);
                wrapper2.appendChild(stats);
                wrapper2.appendChild(socialMedia);
                username.appendChild(avatar);
                username.appendChild(user);
                socialMedia.appendChild(portfolio);
                socialMedia.appendChild(twitter);
                socialMedia.appendChild(instagram);
                // Overlay until onload finished
                img.addEventListener('click', () => {
                    // if(modalImg.attributes)
                    modalImg.setAttribute('src', pic.urls.regular);
                });
                img.onload = function () {
                    array.push(img);
                    if (array.length == 10) {
                        overlay.classList.remove('overlay');
                        overlay__content.classList.remove('overlay__content');
                        overlay__inner.classList.remove('overlay__inner');
                        spinner.classList.remove('spinner');
                    }
                };
            });
        });
}
