# GitExplorer

A high-performance GitHub profile explorer designed for developers. Search for any GitHub user to view profile statistics, public information, and their top 4 most recently updated repositories in a modern, dark-themed interface.

**Live:** [GitHub Explorer](https://github-explorer-eight-tau.vercel.app/)

---

## 🛠 Tech Stack

| Layer          | Technology      |
| :------------- | :-------------- |
| **Framework**  | Astro 5/6       |
| **UI Library** | React 19        |
| **Styling**    | Tailwind CSS 4  |
| **Icons**      | Lucide React    |
| **API**        | GitHub REST API |

---

## 🚀 Key Features

- **Real-time Search:** Instantly fetch user data via GitHub's REST API.
- **Loading States:** Immersive skeleton screens providing visual feedback during network requests.
- **Error Handling:** Graceful 404 handling for invalid usernames.
- **Responsive Design:** Fluid layout optimized for both desktop and mobile devices.
- **Optimized Performance:** Built with Astro for minimal footprint and fast load times.

---

## 📂 Folder Structure

```text
gitexplorer/
├── public/                 # Static assets (favicons)
├── src/
│   ├── components/         # React components (Card, Grid, Skeletons)
│   ├── layouts/            # Astro layout wrapper
│   ├── pages/              # Astro routing
│   └── styles/             # Global CSS and Tailwind directives
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies
└── README.md               # Project documentation

```

---

## 💻 Local Development

1. **Clone the repository**

```bash
git clone [https://github.com/rterminus/git-explorer.git](https://github.com/rterminus/git-explorer.git)
cd gitexplorer

```

2. **Install dependencies**

```bash
npm install

```

3. **Start the development server**

```bash
npm run dev
# Server running at http://localhost:4321

```

---

## 👤 Author

**Renan Pontes (rterminus)**

- [GitHub](https://github.com/rterminus/)
- [Codeberg](https://codeberg.com/rterminus/)
- [LinkedIn](https://www.linkedin.com/in/renanspontes/)
