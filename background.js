'use strict';

let suggestions = [];

const getSuggestions = (text, suggest) => {
    const FEED_URL = "https://ccgaming.xyz/feed";
    let descLen = 100;

    fetch(FEED_URL)
    .then(response => response.text())
    .then(data => { 

        const itemList = data.split('<item>');
        itemList.forEach((item, index) => {
            let title = item.split('<title>')[1].split('</title>')[0];
            let url = item.split('<link>')[1].split('</link>')[0];
            if (index == 0) return;
            let desc = item.split('<description><![CDATA[')[1].split(']]></description>')[0].substring(0, descLen);
            suggestions.push({content: `${title} url: ${url}`, description: `${desc}`});
        });
    })
    .then(() => {
        suggest(suggestions);
    });
}


chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    getSuggestions(text, suggest);
  });

chrome.omnibox.onInputEntered.addListener((text, OnInputEnteredDisposition) => {
    const prefixIndex = text.indexOf('url: ');

    if (prefixIndex !== -1) {
        const url = text.substring(prefixIndex + 'url: '.length);

        if (OnInputEnteredDisposition === 'currentTab') {
            chrome.tabs.create({url});
        } else {
            chrome.tabs.update({url});
        }
    } else {
        var newURL = 'https://ccgaming.xyz/?s=' + encodeURIComponent(text);

        if (!text) {
            newURL = 'https://ccgaming.xyz';
        }
        chrome.tabs.create({ url: newURL });
    }
  });