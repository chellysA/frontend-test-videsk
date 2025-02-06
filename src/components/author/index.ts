import usersServices from "../../services/users-services";

class Author extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["name", "avatar", "birthdate", "bio"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    if (!this.getAttribute("name")) {
      this.shadowRoot.innerHTML = "";
      return;
    }
    const date = this.getAttribute("birthdate");
    const birthdate = date && new Date(date).toDateString();

    this.shadowRoot.innerHTML = `
            <style>
              p {
                  color: var(--text-color);
                  line-height: 1.6;
                  margin: 8px 0;
              }
              .author-card {
                display: flex;
                flex-direction: column;
                background-color: #f2f2f2;
                border-radius: 8px;         
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 16px;
                max-height: 250px;
                overflow-y: auto;
                scrollbar-width: thin; 
                scrollbar-color:rgb(112, 184, 233) #f2f2f2; 
              }   
                
              .author-card img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-bottom: 8px;
              }
                  
              .author-card p {
                margin: 4px 0;
              }

              #author-name {
                font-weight: bold;
                color: #3498db
              }
            </style>
            <div class="author-card">   
                <div style="display: flex; gap: 16px; align-items: center">
                  <img src="${this.getAttribute("avatar")}" alt="">
                  <p id="author-name">${this.getAttribute("name")}</p>
                </div>
               <p id="author-birthdate"><strong>Birthdate:</strong> ${birthdate}</p>
                <p id="author-bio"><strong>Bio:</strong> ${this.getAttribute(
                  "bio"
                )}</p>
            </div>
        `;
  }
}
export default Author;
