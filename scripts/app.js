let i = 0;
const API_KEY = 'oFrLYaMiv1LdUJWqLDR8B65JwhmJJXT4ed5FkELN_AA';

const overlay = document.querySelector('.overlay');
const overlay__content = document.querySelector('.overlay__content');
const overlay__inner = document.querySelector('.overlay__inner');
const spinner = document.querySelector('.spinner');
const images = document.querySelector('.images');

function getData() {
    overlay.classList.add('overlay');
    overlay__content.classList.add('overlay__content');
    overlay__inner.classList.add('overlay__inner');
    spinner.classList.add('spinner');
    //Fetch images
    fetch(
        `https://api.unsplash.com/photos?page=${
            i + 1
        }&per_page=10&client_id=${API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            const array = [];
            let imgID = '';
            const idUrl = `https://api.unsplash.com/photos/${imgID}?&client_id=${API_KEY}`;
            console.log(data);
            data.forEach((pic) => {
                let dlNumber = 0;
                // Fetching download numbers of Image
                fetch(idUrl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        dlNumber = data.downloads;
                    });
                imgID = pic.id;
                // HTML items
                const wrapper = this.document.createElement('div');
                const img = this.document.createElement('img');
                const stats = this.document.createElement('div');
                const avatar = this.document.createElement('img');
                const username = this.document.createElement('div');
                const portfolio = this.document.createElement('p');
                const socialMedia = this.document.createElement('div');
                const twitter = this.document.createElement('p');
                const instagram = this.document.createElement('p');
                if (!pic.user.social.portfolio_url) {
                    portfolio.innerText = `Portfolio: Not Available`;
                } else {
                    portfolio.innerHTML = `Portfolio: <a href=${pic.user.social.portfolio_url}>${pic.user.social.portfolio_url}</a>`;
                    portfolio.setAttribute(
                        'href',
                        pic.user.social.portfolio_url
                    );
                }
                if (pic.user.social.twitter_username) {
                    twitter.innerText = `Twitter: ${pic.user.social.twitter_username}`;
                } else {
                    twitter.innerText = `Twitter: Not Available`;
                }
                if (pic.user.social.instagram_username) {
                    instagram.innerText = `Instagram:${pic.user.social.instagram_username}`;
                } else {
                    instagram.innerText = `Instagram: Not Available`;
                }
                stats.innerHTML = `Likes: ${pic.likes}, Downloads: ${dlNumber}`;
                username.innerHTML = `Username: ${pic.user.username}`;
                avatar.setAttribute('src', pic.user.profile_image.small);
                avatar.setAttribute('alt', 'avatar');
                avatar.setAttribute('class', 'avatar');
                img.setAttribute('src', pic.urls.small);
                img.setAttribute('alt', pic.alt_description);
                images.appendChild(wrapper);
                wrapper.appendChild(img);
                wrapper.appendChild(avatar);
                wrapper.appendChild(username);
                wrapper.appendChild(stats);
                wrapper.appendChild(portfolio);
                images.appendChild(socialMedia);
                socialMedia.appendChild(twitter);
                socialMedia.appendChild(instagram);
                // Overlay until onload finished
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
getData();
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        i++;
        getData();
    }
});
