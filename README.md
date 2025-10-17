# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 📄 PDF Compression Setup (Node.js + Ghostscript)

This project supports **server-side PDF compression** using **Ghostscript**, allowing efficient file size reduction while maintaining acceptable quality.

---

### 🧩 Requirements

- **Node.js** (v18+ recommended)
- **Ghostscript** — must be installed and added to your system `PATH`

---

### ⚙️ Installation (Windows)

1. **Download Ghostscript**

   👉 [Ghostscript Official Download Page](https://ghostscript.com/releases/gsdnld.html)

   Download the latest **Windows (64-bit)** version — for example:

Ghostscript 10.x for Windows (64 bit)

2. **Install Ghostscript**

- Run the downloaded installer.
- Keep the default path (`C:\Program Files\gs\gs10.x.x\`).
- ✅ **Important:** Check the option “Add to PATH” during installation.

3. **Verify Installation**
   Open a **new terminal** and run:

```bash
gs --version

If you see a version number (e.g., 10.03.1), it’s working fine.


🛠️ Manual PATH Setup (if needed)

If the command above fails, you can manually add Ghostscript to your PATH:

Press Win + R, type sysdm.cpl, and press Enter.

Go to Advanced → Environment Variables.

Under System Variables, find and select Path, then click Edit.

Click New, then add:

C:\Program Files\gs\gs10.03.1\bin


(Adjust version if needed)

Click OK to save all changes.

Restart your terminal and run:

gs --version
```
