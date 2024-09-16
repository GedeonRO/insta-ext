// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchCaption") {
    const post = document.querySelector(
      "div où sont affichées les légendes des posts"
    );
    const caption = post ? post.innerText : "";
    sendResponse({ caption });
  }
});




const article = extractPostByAccount("portugal");
if (article) {
  console.log("Article trouvé:", article);
} else {
  console.log("Aucun article trouvé pour ce compte.");
}
