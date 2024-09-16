// background.js
let userAccounts = [];
let userHashtags = [];

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fetchCaptionAndComment,
  });
});

function startAutoCommenting(accounts, hashtags) {
  userAccounts = accounts.split(";").map((acc) => acc.trim().toLowerCase());
  userHashtags = hashtags.split(";").map((tag) => tag.trim().toLowerCase());

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "startAutoCommenting" });
  });
}

function fetchCaptionAndComment() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "fetchCaption" },
      (response) => {
        if (response.caption) {
          const caption = response.caption.toLowerCase();
          if (shouldComment(caption)) {
            sendToChatGPT(caption);
          }
        }
      }
    );
  });
}

function extractPostByAccount(accountName) {
  const articles = document.querySelectorAll("article");

  for (let article of articles) {
    const accountElement = article.querySelector(
      "div.x9f619 ._ap3a._aaco._aacw._aacx._aad7._aade"
    );

    if (
      accountElement &&
      accountElement.textContent.trim().toLowerCase() ===
        accountName.toLowerCase()
    ) {
      return article;
    }
  }

  return null;
}

function containsHashtags(article, hashtagsArray) {
  if (!article || !hashtagsArray || hashtagsArray.length === 0) {
    return false;
  }

  const hashtagElements = article.querySelectorAll('a[href*="/explore/tags/"]');

  const hashtagsInArticle = Array.from(hashtagElements).map((a) =>
    a.textContent.trim().toLowerCase()
  );

  return hashtagsArray.every((hashtag) =>
    hashtagsInArticle.includes(`#${hashtag.toLowerCase()}`)
  );
}

function shouldComment(caption) {
  // Vérifier si le post contient des comptes ou hashtags
  const matchesAccounts = userAccounts.some((account) =>
    caption.includes(account)
  );
  const matchesHashtags = userHashtags.some((hashtag) =>
    caption.includes(hashtag)
  );

  return matchesAccounts || matchesHashtags;
}

function sendToChatGPT(caption) {
 
  getChatGPTResponse(caption).then((response) => {
    console.log("Réponse de ChatGPT :", response);

  });
}
