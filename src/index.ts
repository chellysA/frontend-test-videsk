import Article from "./components/article";
import ArticleList from "./components/article-list";
import Authors from "./components/author";
import Loader from "./components/loader";
import ToastComponent from "./components/toast";

customElements.define("toast-component", ToastComponent);
customElements.define("article-component", Article);
customElements.define("articles-list", ArticleList);
customElements.define("author-component", Authors);
customElements.define("loader-component", Loader);
