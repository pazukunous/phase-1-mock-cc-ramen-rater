document.addEventListener('DOMContentLoaded', function(){
    function fetchRamen(url){
        return fetch(url)
        .then(res => res.json())
    }

    function addRamen(url, body){
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(res => res.json())

    }

    function handleForm(e){
        e.preventDefault();

        
        const ramen = {
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target['new-comment'].value
        }

        ramenCard(ramen)
/*
        console.log(ramen)

        createRamen('http://localhost:3000/ramens', ramen)
        .then(addRamen('http://localhost:3000/ramens', ramen))
        .catch(e = console.error(e))*/
    }

    function createRamen(url, body){
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(res=>console.log(res.json()))
    }

    function ramenCard(rData){
        const name = document.createElement('h2')
        const rest = document.createElement('h3')
        const rating = document.createElement('p')
        const comment = document.createElement('p')
        const img = document.createElement('img')

        name.textContent = rData.name;
        rest.textContent = rData.restaurant;
        rating.textContent = rData.rating
        comment.textContent = rData.comment;
        img.src = rData.image;
        img.className = 'detail-image';

        img.addEventListener('click', ()=>displayRamen(name, rest, rating, comment, img))
        document.querySelector('#ramen-menu').append(img)
        

    }

    function displayRamen(name, rest, rating, comment, img){
        div = document.querySelector('#ramen-detail')
        div.querySelector('.detail-image').src = img.src
        div.querySelector('.name').textContent = name.textContent
        div.querySelector('.restaurant').textContent = rest.textContent
        document.querySelector('#rating-display').textContent = rating.textContent
        document.querySelector('#comment-display').textContent = comment.textContent
    }

    fetchRamen('http://localhost:3000/ramens')
    .then(ramen => ramen.forEach(ramenCard))
    .catch(e => console.log(e))

    document.querySelector('#new-ramen').addEventListener('submit', handleForm)
})