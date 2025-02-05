import usersServices from "../../services/users-services";

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

  toggleContent() {
    const expandedContent = this.shadowRoot?.querySelector("#expandedContent");
    const toggleBtn = this.shadowRoot?.querySelector(".toggleBtn");

    this.expanded = !this.expanded;

    if (this.expanded) {
      expandedContent?.classList.remove("hidden");

      if (toggleBtn) toggleBtn.textContent = "See Less";
    } else {
      expandedContent?.classList.add("hidden");

      if (toggleBtn) toggleBtn.textContent = "See More";
    }
  }

  async getAuthorInfo(id?: string) {
    if (!id) {
      console.error("author-id attribute is required");
      return;
    }

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
    }
  }
  showUserDetails() {
    const authorDetails = this.shadowRoot?.querySelector(".author-details");
    const authorBirthdate = this.shadowRoot?.querySelector("#author-birthdate");
    const authorBio = this.shadowRoot?.querySelector("#author-bio");
    const authorAvatar =
      this.shadowRoot?.querySelector<HTMLImageElement>("#author-avatar");

    if (authorDetails) authorDetails.classList.remove("hidden");
    if (authorBirthdate)
      authorBirthdate.innerHTML = new Date(
        this.authorInfo.birthdate
      ).toDateString();
    if (authorBio) authorBio.innerHTML = this.authorInfo.bio;
    if (authorAvatar) authorAvatar.src = this.authorInfo.avatar;
  }

  async render() {
    const title = this.getAttribute("article-title");
    const image = this.getAttribute("image");
    const company = this.getAttribute("company");
    const description = this.getAttribute("description");
    const author = this.getAttribute("author-id");

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

            #expandedContent {
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

            .author-details {
                background-color: var(--background-color);
                border-radius: 8px;
                padding: 16px;
                margin-top: 16px;
            }

            .author-details h3 {
                color: var(--primary-color);
                margin-top: 0;
            }

            .author-details-header {
              display: flex;
              align-items: center;
              gap: 16px
            }

            #author-avatar{
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }

            h3{
              margin:0px
            }
        </style>

        <div class="card">
            <h2>${title}</h2>
            <img src="${image}" alt="${title}">
            <div class="divider"></div>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Description:</strong> ${description}</p>
            <div id="expandedContent" class="hidden">
               
                <p><strong>Author:</strong> <span id="author-name"></span></p>
                <div class="author-details hidden">
                  <div class="author-details-header">
                    <img id="author-avatar" src="" alt="">
                    <h3 >Author Details</h3>
                  </div>
                  <p><strong>Birthdate:</strong> <span id="author-birthdate"></span></p>
                  <p><strong>Bio:</strong> <span id="author-bio"></span></p>
              </div>
            </div>
            <div class="container-button-see-more">
              <button class="toggleBtn">See More</button>
            </div>
        </div>
    `;

      this.shadowRoot
        ?.querySelector(".toggleBtn")
        ?.addEventListener("click", () => this.toggleContent());

      this.shadowRoot
        ?.querySelector("#author-name")
        ?.addEventListener("click", () => {
          this.showUserDetails();
        });

      await this.getAuthorInfo(author || "");
    }
  }
}

export default Article;
