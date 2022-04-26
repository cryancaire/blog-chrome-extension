const FEED_URL = "https://ccgaming.xyz/feed";

const FEED_TITLE = document.querySelector('.feed_title');
const BLOG_LIST = document.querySelector('.blog_list');
const LOADER = document.querySelector('.loading');

fetch(FEED_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => { 
      const channel = data.querySelector("channel");

      //set page title
      const feedTitle = channel.querySelector("title");
      FEED_TITLE.textContent = feedTitle.textContent;

      const itemList = channel.querySelectorAll('item');

      itemList.forEach(item => {
        const item_title = item.querySelector('title');
        const item_url = item.querySelector('link');

        const blogItemContainer = document.createElement('div');

        const blogItemDiv = document.createElement('div');
        blogItemDiv.innerHTML = `
        <a href="${item_url.textContent}" target="_blank">${item_title.textContent}</a>
        `;

        blogItemContainer.append(blogItemDiv);
        BLOG_LIST.append(blogItemContainer);
      });
  })
  .then(() => {
    FEED_TITLE.classList.remove('hide');
    BLOG_LIST.classList.remove('hide');
    LOADER.classList.add('hide');
  });