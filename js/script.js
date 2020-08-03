'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  activeLink.classList.remove('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts article.active ');       // 1. why article.active? to find arcticle with class 'active' not to find element with class 'active'
  activeArticle.classList.remove('active');

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add active class to clickedElement, add active class to targetArticle*/
  clickedElement.classList.add('active');
  targetArticle.classList.add('active');

}

function generateTitleLinks(customSelector = '') {
    /* referencje do html-a */
    const titlesList = document.querySelector('.titles');
    titlesList.innerHTML='';
    const articles = document.querySelectorAll('.posts .post' + customSelector);

    /* przechodzimy po wszystkich artykułach */
    for(let article of articles) {

        /* szukamy w artykule id oraz jego tytułu */
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;

        /* generuje kod html / nasz link */
        const link = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* doklejamy wygenerowany link do listy w html-u */
        titlesList.innerHTML = titlesList.innerHTML + link;


    }

    /* znajdujemy pierwszy link z listy */
    const articleFirst = document.querySelector('.titles li:first-child a');

    /* nadajemy klasę active peirwszemu linkowi */
    articleFirst.classList.add('active');

    /* znajdz wszystkie wygwnerowane linki */
    const links = document.querySelectorAll('.titles a');

    /* dodajemy nasłcuhiwacze na linki */
    for(let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();

function generateTags() {

    /* referencje do html-a */
    const articles = document.querySelectorAll('.posts .post');

    /* przechodzimy po wszystkich artykułach */
    for(let article of articles) {

        /* znajdujemy wartosc atrybutu data-tags, to sa nasze tagi */
        const tags = article.getAttribute('data-tags');

        /* znajdujemy referencje do listy z tagami w html, to tu musimy wkleić wygnerowane linki do tagów */
        const articleTagsList = article.querySelector('.post-tags .list');

        /* konwertujemy sobie string z lista tagów na prawdziwą tablicę/listę */
        const tagsArray = tags.split(' ');

        /* przechodzimy po wszystkich tagach i pojedyczno dla kazdego generujemy odpowiadajacy link i doklejamy go lsity tagów danego artykułu */
        for(let tag of tagsArray) {
            const linkTag = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></li>'; //<li><a href="#tag-code"><span>code</span></a></li>
            articleTagsList.innerHTML = articleTagsList.innerHTML + linkTag;
        }

    }

}

function tagClickHandler(event) {
    console.log(this);
    event.preventDefault();
    const href=this.getAttribute('href');
    console.log(href);
    const tag=href.replace('#tag-','');
    console.log(tag);
    generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addListenersToTags() {

    const links = document.querySelectorAll('.post-tags a');
    for(let link of links) {
        link.addEventListener('click', tagClickHandler)
    }

}

function generateAuthors() {

    /* referencje do html-a */
    const articles = document.querySelectorAll('.posts .post');

    /* przechodzimy po wszystkich artykułach */
    for(let article of articles) {

        /* znajdujemy wartosc atrybutu data-author, to sa nasz autor */
        const author = article.getAttribute('data-author');

        /* znajdujemy referencje do kontera z autorem w html, to tu musimy wkleić wygnerowany link do autora*/
        const articleAuthorWrapper = article.querySelector('.post-author');

        /* przechodzimy po wszystkich tagach i pojedyczno dla kazdego generujemy odpowiadajacy link i doklejamy go do autorów danego artykułu */
        const linkAuthor = 'by <a href="#author-' + author + '"><span>' + author + '</span></a>'; //by <a href="#author-eg.Marion Berry"><span>Marion Berry</span></a>*/
        articleAuthorWrapper.innerHTML= linkAuthor;
    }

}
function authorClickHandler(event) {
    console.log(this);
    event.preventDefault();
    const href=this.getAttribute('href');
    console.log(href);
    const author=href.replace('#author-','');
    console.log(author);
    generateTitleLinks(`[data-author="${author}"]`);
}

function addListenersToAuthors() {

    const links = document.querySelectorAll('.post-author a');
    for(let link of links) {
        link.addEventListener('click', authorClickHandler);
    }

}

generateTags();
generateAuthors();
addListenersToTags();
addListenersToAuthors();
