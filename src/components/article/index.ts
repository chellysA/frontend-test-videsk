import usersServices from "../../services/users-services";
import { setLoading } from "../../utils/setLoading";
import "../loader";

class Article extends HTMLElement {
  expanded: boolean;
  authorInfo: {
    name: string;
    avatar: string;
    birthdate: string;
    bio: string;
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // states
    this.expanded = false;
    this.authorInfo = {
      name: "",
      avatar: "",
      birthdate: "",
      bio: "",
    };
  }

  connectedCallback() {
    this.render();
  }

  async toggleContent() {
    const author = this.getAttribute("author-id");
    const modal = this.shadowRoot?.querySelector("#modal");
    const authorComponent = this.shadowRoot?.querySelector("#author-details");
    this.expanded = !this.expanded;

    if (this.expanded) {
      if (!this.authorInfo.name) {
        await this.getAuthorInfo(author || "");
      }

      modal?.classList.remove("hidden");
      modal?.classList.add("modal");
    } else {
      modal?.classList.toggle("hidden");
    }
  }

  async getAuthorInfo(id?: string) {
    if (!id) {
      console.error("author-id attribute is required");
      return;
    }
    setLoading(true);
    try {
      const author = await usersServices.getUserById(id);

      this.authorInfo = {
        name: author.name,
        avatar: author.avatar,
        birthdate: author.birthdate,
        bio: author.bio,
      };

      const authorName = this.shadowRoot?.querySelector("#author-name");

      if (authorName) authorName.innerHTML = this.authorInfo.name;
    } catch (error) {
      console.error("Error fetching author:", error);
    } finally {
      setLoading(false);
    }
  }
  showUserDetails() {
    const authorDetails = this.shadowRoot?.querySelector("#author-details");
    const authorvisible = authorDetails?.attributes.getNamedItem("name");

    if (authorDetails && !authorvisible) {
      console.log(authorDetails);
      authorDetails.setAttribute("name", this.authorInfo.name);
      authorDetails.setAttribute("birthdate", this.authorInfo.birthdate);
      authorDetails.setAttribute("bio", this.authorInfo.bio);
      authorDetails.setAttribute("avatar", this.authorInfo.avatar);
    } else {
      authorDetails?.removeAttribute("name");
      authorDetails?.removeAttribute("birthdate");
      authorDetails?.removeAttribute("bio");
      authorDetails?.removeAttribute("avatar");
    }
  }

  async render() {
    const title = this.getAttribute("article-title");
    const image = this.getAttribute("image");
    const company = this.getAttribute("company");
    const description = this.getAttribute("description");
    const content = this.getAttribute("content");
    const date = this.getAttribute("publishedAt") ?? "";
    const publishedAt = new Date(date).toDateString();

    if (this?.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
            :host {
                --primary-color: #3498db;
                --secondary-color: #2ecc71;
                --text-color: #34495e;
                --background-color: #ecf0f1;
                --card-background: #ffffff;
                --shadow-color: rgba(0, 0, 0, 0.1);
            }

            .card {
                background-color: var(--card-background);
                border-radius: 12px;
                box-shadow: 0 4px 6px var(--shadow-color);
                padding: 24px;
                max-width: 350px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                transition: all 0.3s ease;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px var(--shadow-color);
            }

            h2 {
                color: var(--primary-color);
                margin-top: 0;
                font-size: 1.5em;
            }

            img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
            }

            p {
                color: var(--text-color);
                line-height: 1.6;
                margin: 8px 0;
            }

            .hidden {
                display: none;
            }

            button {
                background-color: var(--secondary-color);
                border: none;
                color: white;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 16px 0 8px;
                cursor: pointer;
                border-radius: 25px;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #27ae60;
            }

            .divider {
              border-top: 1px solid var(--background-color);
              margin: 16px 0px;
            }

            img{
              width: 100%;
            }

            .container-button-see-more {
              display: flex;
              justify-content: flex-end;
            }
              
            #author-name {
              cursor: pointer;
              color: var(--primary-color);
            }

            h3{
              margin:0px
            }
            .description {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 3; 
                height: 4.5em; 
                line-height: 1.5em; 
            }

            .title {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 1; 
                height: 1.5em; 
                line-height: 1.5em; 
            }

            .modal {
            display: flex ;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.55);
            justify-content: center;
            align-items: center;
            }

            .modal-content {
              display: flex;
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              width: 80%;
              max-height: 90vh;
              position: relative;
              gap: 20px
            }

            .close-button {
              position: absolute;
              top: 10px;
              right: 15px;
              font-size: 20px;
              cursor: pointer;
            }
            
            .modal-content-left {
              width: 30%;
            }

            .modal-content-right {
              width: 70%;
            }

            @media (max-width: 600px) {
              .modal-content {
                flex-direction: column;
                max-height: min-content;
                margin: 1rem 0;
              }

              .modal-content-left , .modal-content-right {
                width: 100%;
              }

              .modal {
                align-items: start;
                 padding: 1rem 0;
              }
            }

        </style>
       
        <div class="card">
            <div>
              <h2 id="title" class="title">${title}</h2>
              <img src="${image}" alt="${title}">
            </div>
            <div>
              <div class="divider"></div>
              <p><strong>Company:</strong> ${company}</p>
              <p id="description" class="description"><strong>Description:</strong> ${description}</p>
              <div class="container-button-see-more">
                <button class="toggleBtn">See More</button>
              </div>
            </div>
        </div>
        <div id="modal" class="hidden">
          <div class="modal-content"> 

            <div class="modal-content-left"> 
              <span class="close-button">&times;</span>
              <h2 class="modal-title">${title}</h2>
              <img src="${image}" alt="${title}">
              <p><strong>Company:</strong> ${company}</p>
              <p class="description-modal" id="description-modal"><strong>Description:</strong> ${description}</p>
            </div>

            <div class="modal-content-right">
              <p><strong>Content:</strong> ${content}</p>
              <p><strong>Published at:</strong> ${publishedAt}</p>
              <p><strong>Author:</strong> <span id="author-name"></span></p>

              <author-component id="author-details"></author-component>
            <div>
          </div> 
        </div>
    `;

      this.shadowRoot
        ?.querySelector(".toggleBtn")
        ?.addEventListener("click", () => this.toggleContent());

      this.shadowRoot
        ?.querySelector(".close-button")
        ?.addEventListener("click", () => {
          const modal = this.shadowRoot?.querySelector("#modal");
          modal?.classList.remove("modal");
          modal?.classList.toggle("hidden");
          this.expanded = false;
          const toggleBtn = this.shadowRoot?.querySelector(".toggleBtn");
          if (toggleBtn) toggleBtn.textContent = "See More"; // Restablecer el texto del botón
        });

      this.shadowRoot
        ?.querySelector("#author-name")
        ?.addEventListener("click", () => {
          this.showUserDetails();
        });
    }
  }
}

export default Article;
