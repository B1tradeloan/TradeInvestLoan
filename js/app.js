/* ===============================
   B1 TRADE LOAN – Corporate Scripts
   =============================== */

// Show toast message
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Smooth fade-in for all elements with .fade-up
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-up");
  const appearOptions = { threshold: 0.3 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));
});

/* ===============================
   User Login (index.html)
   =============================== */
const userForm = document.getElementById("loginForm");
if (userForm) {
  userForm.addEventListener("submit", e => {
    e.preventDefault();

    const number = document.getElementById("userNumber").value.trim();
    const pass = document.getElementById("userPassword").value.trim();

    if (number === "" || pass === "") {
      showToast("Please enter your number and password");
      return;
    }

    // Save session data locally
    localStorage.setItem("b1_user_number", number);
    localStorage.setItem("b1_user_loggedin", true);

    showToast("Login successful — redirecting...");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  });
}

/* ===============================
   Membership Proof Upload (membership.html)
   =============================== */
const proofForm = document.getElementById("proofForm");
if (proofForm) {
  proofForm.addEventListener("submit", e => {
    e.preventDefault();
    const file = document.getElementById("proofFile").files[0];
    if (!file) {
      showToast("Please attach a screenshot or image proof.");
      return;
    }
    showToast("Upload successful — pending admin verification.");
    proofForm.reset();
  });
}

/* ===============================
   Feedback Form (feedback.html)
   =============================== */
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Feedback sent successfully. Thank you!");
    feedbackForm.reset();
  });
}

/* ===============================
   Contact Form (contact.html)
   =============================== */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Message sent successfully!");
    contactForm.reset();
  });
}

/* ===============================
   Admin Login (admin.html)
   =============================== */
const adminForm = document.getElementById("adminLoginForm");
if (adminForm) {
  adminForm.addEventListener("submit", e => {
    e.preventDefault();

    const user = document.getElementById("adminUser").value.trim();
    const pass = document.getElementById("adminPass").value.trim();

    // Admin credentials (you can modify these)
    const adminNumber = "09264068522";
    const adminPass = "123456789";

    if (user === adminNumber && pass === adminPass) {
      localStorage.setItem("b1_admin_loggedin", true);
      showToast("Welcome, Admin!");
      setTimeout(() => {
        window.location.href = "admin_dashboard.html";
      }, 1000);
    } else {
      showToast("Invalid admin credentials.");
    }
  });
}

/* ===============================
   Admin Dashboard (admin_dashboard.html)
   =============================== */
const proofsContainer = document.getElementById("proofsContainer");
if (proofsContainer) {
  // Sample pending proofs
  const pendingProofs = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      amount: "₱1,000",
      img: "https://via.placeholder.com/300x200.png?text=Proof+1"
    },
    {
      id: 2,
      name: "Maria Santos",
      amount: "₱500",
      img: "https://via.placeholder.com/300x200.png?text=Proof+2"
    },
    {
      id: 3,
      name: "Carlos Dizon",
      amount: "₱1,500",
      img: "https://via.placeholder.com/300x200.png?text=Proof+3"
    }
  ];

  const noProof = document.getElementById("noProof");

  function renderProofs() {
    proofsContainer.innerHTML = "";
    if (pendingProofs.length === 0) {
      noProof.style.display = "block";
      return;
    }

    noProof.style.display = "none";
    pendingProofs.forEach(proof => {
      const card = document.createElement("div");
      card.className = "proof-card";
      card.innerHTML = `
        <img src="${proof.img}" alt="Proof Image">
        <h4>${proof.name}</h4>
        <p>Amount: ${proof.amount}</p>
        <button onclick="verifyProof(${proof.id})">Mark Verified</button>
      `;
      proofsContainer.appendChild(card);
    });
  }

  // Expose function globally
  window.verifyProof = function (id) {
    const index = pendingProofs.findIndex(p => p.id === id);
    if (index > -1) {
      const { name, amount } = pendingProofs[index];
      pendingProofs.splice(index, 1);
      renderProofs();
      showToast(`Payment verified — ${amount} credited to ${name}.`);
    }
  };

  renderProofs();
}
/* ===============================
   USER DASHBOARD
   =============================== */
const dashboard = document.getElementById("proofUploadForm");
if (dashboard) {
  const userNum = localStorage.getItem("b1_user_number") || "Unknown";
  const label = document.getElementById("userNumberLabel");
  if (label) label.textContent = userNum;

  const preview = document.getElementById("proofPreview");
  const fileInput = document.getElementById("proofFile");
  const balanceEl = document.getElementById("userBalance");

  let balance = parseInt(localStorage.getItem("b1_balance") || "0");

  balanceEl.textContent = "₱" + balance.toLocaleString();

  fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      preview.innerHTML = `<img src="${evt.target.result}" alt="Proof Preview">`;
      showToast("Proof preview ready.");
    };
    reader.readAsDataURL(file);
  });

  dashboard.addEventListener("submit", e => {
    e.preventDefault();
    if (!fileInput.files[0]) {
      showToast("Please upload a proof image first.");
      return;
    }
    showToast("Proof submitted — pending admin verification.");
    preview.innerHTML = "";
    fileInput.value = "";
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      showToast("Logged out.");
      setTimeout(() => (window.location.href = "index.html"), 800);
    });
  }
}
