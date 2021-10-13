let i = 0;
const page = `page=${i}`;
const images = document.querySelector('.images');
const API_KEY = 'oFrLYaMiv1LdUJWqLDR8B65JwhmJJXT4ed5FkELN_AA';
// const url = `https://api.unsplash.com/photos?${page}&per_page=10&client_id=${API_KEY}`;
async function postData() {
    const response = await fetch(
        `https://api.unsplash.com/photos?page=${
            i + 1
        }&per_page=10&client_id=${API_KEY}`
    ).then((response) => {
        return response.json();
    });
    return response;
}
postData().then((data) => {
    console.log(data);
    data.forEach((pic) => {
        images.innerHTML += `<img src ="${pic.urls.small}" />`;
    });
    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            i++;
            -console.log("you're at the bottom of the page");
            postData().then((data) => {
                console.log(data);
                data.forEach((pic) => {
                    images.innerHTML += `<img src ="${pic.urls.small}" />`;
                });
            });
        }
    });
});
