function getPage() {
  let hash = window.location.hash.substr(1);
  let url = hash || "";
  return url.replace(/^\/+|\/+$/g, "");
}
;
export default getPage;
